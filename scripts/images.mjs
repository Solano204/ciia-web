// Convierte los originales de design/originales/ a WebP de 1600 px de ancho y
// los coloca en su ruta final de public/. Reporta cuáles faltan.
//
//   npm run images            convierte lo nuevo o modificado
//   npm run images -- --force reconvierte todo
//
// Un original se llama como su archivo final: caso-01.png, ai-lab.jpg,
// descubrir.png, contacto.png… (kit completo en docs/IMAGENES-ROBOT.md).
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const ORIGINALES = path.join(ROOT, "design", "originales");
const INPUT_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp"];
const WIDTH = 1600;
const QUALITY = 80;
const ASPECT = 16 / 9;
const ASPECT_TOLERANCE = 0.02;
const FORCE = process.argv.includes("--force");

// Las 23 imágenes. Los ids son los de src/lib/ciiia.ts: si cambian allí, aquí también.
const TARGETS = [
  ...["ai-execution", "ai-lab", "academy", "hiva", "pymes"].map((id) => ({
    group: "Soluciones",
    id,
    out: `public/soluciones/${id}.webp`,
  })),
  ...Array.from({ length: 12 }, (_, index) => `caso-${String(index + 1).padStart(2, "0")}`).map((id) => ({
    group: "Casos",
    id,
    out: `public/casos/${id}.webp`,
  })),
  ...["descubrir", "disenar", "desarrollar", "desplegar", "escalar"].map((id) => ({
    group: "Ciclo",
    id,
    out: `public/ciclo/${id}.webp`,
  })),
  { group: "Contacto", id: "contacto", out: "public/contacto.webp" },
];

const findOriginal = (id) =>
  INPUT_EXTENSIONS.map((extension) => path.join(ORIGINALES, `${id}${extension}`)).find((file) =>
    fs.existsSync(file),
  );

async function convert(target, input) {
  const output = path.join(ROOT, target.out);
  const isUpToDate =
    fs.existsSync(output) && fs.statSync(output).mtimeMs >= fs.statSync(input).mtimeMs;
  if (!FORCE && isUpToDate) return { detail: "al día", notes: [] };

  const { width, height } = await sharp(input).metadata();
  fs.mkdirSync(path.dirname(output), { recursive: true });
  const info = await sharp(input)
    .rotate()
    .resize({ width: WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(output);

  const notes = [];
  const ratio = width / height;
  if (Math.abs(ratio - ASPECT) > ASPECT_TOLERANCE) {
    notes.push(`relación ${ratio.toFixed(2)}, se espera 16:9`);
  }
  if (width < WIDTH) notes.push(`el original mide ${width} px: no se amplía a ${WIDTH}`);

  return {
    detail: `${width}x${height} -> ${info.width}x${info.height}, ${(info.size / 1024).toFixed(0)} KB`,
    notes,
  };
}

async function main() {
  fs.mkdirSync(ORIGINALES, { recursive: true });

  let failed = false;
  for (const target of TARGETS) {
    const input = findOriginal(target.id);
    if (!input) continue;
    try {
      const { detail, notes } = await convert(target, input);
      console.log(`ok     ${target.out}  (${detail})`);
      for (const note of notes) console.log(`aviso  ${target.id}: ${note}`);
    } catch (error) {
      failed = true;
      console.error(`error  ${target.id}: ${error.message}`);
    }
  }

  const known = new Set(TARGETS.map((target) => target.id));
  for (const file of fs.readdirSync(ORIGINALES)) {
    const { name, ext } = path.parse(file);
    if (INPUT_EXTENSIONS.includes(ext.toLowerCase()) && !known.has(name)) {
      console.log(`aviso  archivo no reconocido en design/originales/: ${file}`);
    }
  }

  const missing = TARGETS.filter((target) => !fs.existsSync(path.join(ROOT, target.out)));
  const done = TARGETS.length - missing.length;
  console.log(`\n${done}/${TARGETS.length} imágenes finales (.webp) en public/.`);
  if (missing.length > 0) {
    console.log("Faltan:");
    for (const group of [...new Set(missing.map((target) => target.group))]) {
      const ids = missing.filter((target) => target.group === group).map((target) => target.id);
      console.log(`  ${group}: ${ids.join(", ")}`);
    }
  }

  if (failed) process.exit(1);
}

main();
