export type LinkState = "page" | "section" | null;

/**
 * Estado de un enlace de navegación respecto a la ruta actual. Las fichas
 * (/casos/caso-01) marcan como activa la sección a la que pertenecen.
 */
export function linkState(pathname: string, href: string): LinkState {
  if (pathname === href) return "page";
  return pathname.startsWith(`${href}/`) ? "section" : null;
}
