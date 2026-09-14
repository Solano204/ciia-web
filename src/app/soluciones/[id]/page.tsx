import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SolutionDetail } from "@/components/sections/SolutionDetail";
import { EXECUTION_STAGES, SERVICES_DATA } from "@/lib/ciiia";

type Params = { id: string };

export function generateStaticParams() {
  return SERVICES_DATA.map((item) => ({ id: item.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = SERVICES_DATA.find((s) => s.id === id);
  if (!item) return {};
  return {
    title: `${item.title} — CII.IA`,
    description: item.tagline,
  };
}

export default async function SolutionDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const index = SERVICES_DATA.findIndex((s) => s.id === id);
  if (index === -1) notFound();

  return <SolutionDetail service={SERVICES_DATA[index]} index={index} stages={EXECUTION_STAGES} />;
}
