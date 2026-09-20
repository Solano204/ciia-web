import { copyFileSync, existsSync, readdirSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const OUT_DIR = process.argv[2] ?? join(dirname(fileURLToPath(import.meta.url)), "..", "out");
const PAYLOAD_DIR = /^__next\./;
const PAGE_PAYLOAD = "__PAGE__.txt";

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

let pages = 0;
for (const file of files(OUT_DIR)) {
  const parts = relative(OUT_DIR, file).split(sep);
  const start = parts.findIndex((part) => PAYLOAD_DIR.test(part));
  if (start < 0 || start === parts.length - 1) continue;
  copyFileSync(file, join(OUT_DIR, ...parts.slice(0, start), parts.slice(start).join(".")));
  if (parts.at(-1) === PAGE_PAYLOAD) pages++;
}

if (pages === 0) {
  fail(
    `No se encontró ningún __next.*/${PAGE_PAYLOAD} en ${OUT_DIR}.\n` +
      "  Next cambió el formato del export estático: el prefetch volverá a dar 404.\n" +
      "  Revisa scripts/flatten-prefetch.mjs antes de desplegar.",
  );
}

console.log(`[flatten-prefetch] ${pages} payloads ${PAGE_PAYLOAD} duplicados con nombre plano`);
