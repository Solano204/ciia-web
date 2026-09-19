import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { inflateRawSync } from "node:zlib";

const API = "https://api.fontshare.com/v2/fonts/download";
const TIMEOUT_MS = 60_000;
const FONTS_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "fonts");

const FAMILIES = {
  "clash-display": ["ClashDisplay-Variable.woff2"],
  satoshi: ["Satoshi-Variable.woff2", "Satoshi-VariableItalic.woff2"],
  "cabinet-grotesk": ["CabinetGrotesk-Variable.woff2"],
  "general-sans": ["GeneralSans-Variable.woff2"],
};

const CD_SIGNATURE = 0x02014b50;
const EOCD_SIGNATURE = Buffer.from([0x50, 0x4b, 0x05, 0x06]);

function zipEntries(zip) {
  const eocd = zip.lastIndexOf(EOCD_SIGNATURE);
  if (eocd < 0) throw new Error("la respuesta no es un zip válido");
  const count = zip.readUInt16LE(eocd + 10);
  let pos = zip.readUInt32LE(eocd + 16);
  const entries = [];
  for (let i = 0; i < count; i++) {
    if (zip.readUInt32LE(pos) !== CD_SIGNATURE) throw new Error("directorio del zip corrupto");
    const nameLen = zip.readUInt16LE(pos + 28);
    const extraLen = zip.readUInt16LE(pos + 30);
    const commentLen = zip.readUInt16LE(pos + 32);
    entries.push({
      name: zip.toString("utf8", pos + 46, pos + 46 + nameLen),
      method: zip.readUInt16LE(pos + 10),
      size: zip.readUInt32LE(pos + 20),
      localOffset: zip.readUInt32LE(pos + 42),
    });
    pos += 46 + nameLen + extraLen + commentLen;
  }
  return entries;
}

function extract(zip, { method, size, localOffset }) {
  const start = localOffset + 30 + zip.readUInt16LE(localOffset + 26) + zip.readUInt16LE(localOffset + 28);
  const data = zip.subarray(start, start + size);
  if (method === 0) return data;
  if (method === 8) return inflateRawSync(data);
  throw new Error(`método de compresión zip no soportado (${method})`);
}

async function download(slug) {
  const res = await fetch(`${API}/${slug}`, { signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
  return Buffer.from(await res.arrayBuffer());
}

async function fetchFamily(slug, files) {
  const zip = await download(slug);
  const entries = zipEntries(zip);
  return files.map((file) => {
    const entry = entries.find((e) => e.name.split("/").pop() === file);
    if (!entry) throw new Error(`no se encontró ${file} dentro del zip`);
    return [file, extract(zip, entry)];
  });
}

mkdirSync(FONTS_DIR, { recursive: true });

for (const [slug, files] of Object.entries(FAMILIES)) {
  if (files.every((file) => existsSync(join(FONTS_DIR, file)))) continue;
  try {
    for (const [file, data] of await fetchFamily(slug, files)) {
      writeFileSync(join(FONTS_DIR, file), data);
    }
    console.log(`[fetch-fonts] ${slug}: descargada`);
  } catch (error) {
    console.error(
      `\n[fetch-fonts] No se pudo obtener la fuente "${slug}" desde Fontshare.\n` +
        `  URL: ${API}/${slug}\n` +
        `  Causa: ${error.cause?.code ?? error.message}\n` +
        `  Las .woff2 no se versionan (licencia ITF FFL); el build las necesita en src/fonts/.\n`,
    );
    process.exit(1);
  }
}
