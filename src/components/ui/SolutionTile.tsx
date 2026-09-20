import Image from "next/image";
import { MediaCard } from "@/components/ui/MediaCard";
import type { ServiceItem } from "@/lib/ciiia";
import { robotImage } from "@/lib/robotImage";

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
  const imageSrc = robotImage(`soluciones/${service.id}`);

  return (
    <MediaCard
      href={`/soluciones/${service.id}`}
      media={
        <div className="relative aspect-video bg-white/[0.03]">
          {imageSrc && <Image src={imageSrc} alt="" fill sizes={sizes} className="object-cover" />}
        </div>
      }
      title={service.title}
      description={service.tagline}
    />
  );
}
