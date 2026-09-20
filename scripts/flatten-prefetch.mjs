import { copyFileSync, existsSync, readdirSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const OUT_DIR = process.argv[2] ?? join(dirname(fileURLToPath(import.meta.url)), "..", "out");
const PAYLOAD_DIR = /^__next\./;
const FLAT_PAYLOAD = /^__next\..+\.__PAGE__\.txt$/;
const PAGE_PAYLOAD = "__PAGE__.txt";
const SAMPLE_SIZE = 12;

// El aplanado es para hosts estáticos (Cloudflare Workers, ver wrangler.toml). En
// Vercel el export no trae los payloads en carpetas y no hay nada que aplanar.
const IS_VERCEL = Boolean(process.env.VERCEL);

function fail(message) {
  console.error(`\n[flatten-prefetch] ${message}\n`);
  process.exit(1);
}

function* files(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "_next") continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* files(path);
    else yield path;
  }
}

if (!existsSync(OUT_DIR)) fail(`No existe ${OUT_DIR}. Corre "next build" antes.`);

// Se lista todo antes de copiar: así los duplicados que crea este script no se
// cuentan como payloads que ya venían planos.
const all = [...files(OUT_DIR)].map((file) => relative(OUT_DIR, file).split(sep));
const alreadyFlat = all.filter((parts) => FLAT_PAYLOAD.test(parts.at(-1))).length;
const samples = all
  .filter((parts) => parts.some((part) => part.startsWith("__next")))
  .slice(0, SAMPLE_SIZE)
  .map((parts) => parts.join("/"));

let pages = 0;
for (const parts of all) {
  const start = parts.findIndex((part) => PAYLOAD_DIR.test(part));
  if (start < 0 || start === parts.length - 1) continue;
  copyFileSync(join(OUT_DIR, ...parts), join(OUT_DIR, ...parts.slice(0, start), parts.slice(start).join(".")));
  if (parts.at(-1) === PAGE_PAYLOAD) pages++;
}

if (pages === 0 && alreadyFlat > 0) {
  console.log(`[flatten-prefetch] ${alreadyFlat} payloads ${PAGE_PAYLOAD} ya vienen con nombre plano: nada que duplicar`);
  process.exit(0);
}

if (pages === 0) {
  // Sirve para saber en qué formato exportó Next cuando este paso falla.
  const found = samples.length > 0 ? samples.join("\n    ") : "(ninguno)";

  if (IS_VERCEL) {
    console.warn(
      `\n[flatten-prefetch] AVISO: en Vercel no se encontró ningún __next.*/${PAGE_PAYLOAD} en ${OUT_DIR}.\n` +
        "  Este paso es para Cloudflare Workers (wrangler.toml); se omite y el build continúa.\n" +
        `  Archivos __next* que sí hay:\n    ${found}\n`,
    );
    process.exit(0);
  }

  fail(
    `No se encontró ningún __next.*/${PAGE_PAYLOAD} en ${OUT_DIR}.\n` +
      "  Next cambió el formato del export estático: el prefetch volverá a dar 404.\n" +
      "  Revisa scripts/flatten-prefetch.mjs antes de desplegar.\n" +
      `  Archivos __next* que sí hay:\n    ${found}`,
  );
}

console.log(`[flatten-prefetch] ${pages} payloads ${PAGE_PAYLOAD} duplicados con nombre plano`);
