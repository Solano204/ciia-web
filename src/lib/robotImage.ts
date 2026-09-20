import fs from "node:fs";
import path from "node:path";

const EXTENSIONS = ["webp", "jpg"] as const;

/**
 * Ruta pública de la imagen del robot `name` (p. ej. `casos/caso-01` o
 * `contacto`): el `.webp` si existe, si no el `.jpg`, y `undefined` si no hay
 * ninguno. Se decide en el build y solo en servidor: un archivo que no existe ni
 * se pide, así que no hay 404. Sin imagen, cada sección usa su fallback.
 */
export function robotImage(name: string): string | undefined {
  const extension = EXTENSIONS.find((ext) =>
    fs.existsSync(path.join(process.cwd(), "public", `${name}.${ext}`)),
  );
  return extension ? `/${name}.${extension}` : undefined;
}
