import fs from "node:fs";
import path from "node:path";

const CLARO_DIR = path.join(process.cwd(), "public", "logos", "ecosistema", "claro");
const EXTENSIONS = ["svg", "png"] as const;

/**
 * Ruta pública de la versión clara (blanca o monocroma, pensada para fondo
 * oscuro) del logo `id`, o `undefined` si no existe. Se decide en el build, solo
 * en servidor: un logo con archivo en `public/logos/ecosistema/claro/{id}.svg`
 * o `.png` sale sin tile en el siguiente build; sin archivo, usa el tile claro.
 */
export function claroSrc(id: string): string | undefined {
  const extension = EXTENSIONS.find((ext) => fs.existsSync(path.join(CLARO_DIR, `${id}.${ext}`)));
  return extension ? `/logos/ecosistema/claro/${id}.${extension}` : undefined;
}
