import type { MouseEvent } from "react";
import type Lenis from "lenis";

export function scrollToAnchor(
  event: MouseEvent<HTMLAnchorElement>,
  href: string,
  lenis: Lenis | null,
): void {
  if (!href.startsWith("#")) return;
  const target = document.querySelector(href);
  if (!target) return;

  event.preventDefault();
  if (lenis) {
    lenis.scrollTo(href);
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
