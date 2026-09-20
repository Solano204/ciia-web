import { Reveal } from "@/components/ui/Reveal";
import { ABOUT_DATA } from "@/lib/ciiia";

/** Los nueve principios en tamaño h3, con reveal escalonado. */
export function WorkPrinciples() {
  const { principlesTitle, workPrinciples } = ABOUT_DATA;

  return (
    <div className="grid gap-10 border-t border-[var(--line)] pt-16 lg:grid-cols-12">
      <h2 className="font-display text-h2 font-semibold text-foreground lg:col-span-4">
        {principlesTitle}
      </h2>

      <ul className="lg:col-span-8">
        {workPrinciples.map((principle, index) => (
          <li key={principle.id}>
            <Reveal index={index}>
              <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-[var(--line)] py-4">
                <span className="font-display text-h3 font-semibold uppercase text-foreground">
                  {principle.affirmative}
                </span>
                <span aria-hidden className="text-muted">
                  /
                </span>
                <s className="text-[15px] italic text-muted decoration-white/25">
                  {principle.negative}
                </s>
              </p>
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  );
}
