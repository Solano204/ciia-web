import Image from "next/image";
import { MediaCard } from "@/components/ui/MediaCard";
import { technologyLabel } from "@/lib/cases";
import { caseImageSrc, caseResults, type ProjectCase } from "@/lib/ciiia";

/**
 * Tile de imagen de un caso: imagen, "Sector · Tecnología" y título. Lo
 * comparten la retícula de /casos, el teaser de la home y los casos
 * relacionados de la ficha.
 */
export function CaseTile({
  item,
  sizes = "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw",
}: {
  item: ProjectCase;
  sizes?: string;
}) {
  const [result] = caseResults(item);

  return (
    <MediaCard
      href={`/casos/${item.id}`}
      media={
        <div className="relative aspect-video bg-white/[0.03]">
          <Image src={caseImageSrc(item.id)} alt="" fill sizes={sizes} className="object-cover" />
        </div>
      }
      label={`${item.sector} · ${technologyLabel(item.technology)}`}
      title={item.title}
      datum={result && `${result.value} · ${result.label}`}
    />
  );
}
