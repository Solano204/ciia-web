import Image from "next/image";
import { MediaCard } from "@/components/ui/MediaCard";
import type { ServiceItem } from "@/lib/ciiia";

/**
 * Tile de imagen: imagen, nombre y una frase. Lo comparten el teaser de la
 * home y las soluciones relacionadas de la ficha.
 */
export function SolutionTile({
  service,
  sizes = "(min-width: 768px) 33vw, 78vw",
}: {
  service: ServiceItem;
  sizes?: string;
}) {
  const image = service.media?.kind === "image" ? service.media : null;

  return (
    <MediaCard
      href={`/soluciones/${service.id}`}
      media={
        <div className="relative aspect-video bg-white/[0.03]">
          {image && <Image src={image.src} alt="" fill sizes={sizes} className="object-cover" />}
        </div>
      }
      title={service.title}
      description={service.tagline}
    />
  );
}
