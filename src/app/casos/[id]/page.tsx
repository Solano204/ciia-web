import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseDetail } from "@/components/sections/CaseDetail";
import { PROJECT_CASES } from "@/lib/ciiia";

type Params = { id: string };

export function generateStaticParams() {
  return PROJECT_CASES.map((item) => ({ id: item.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = PROJECT_CASES.find((c) => c.id === id);
  if (!item) return {};
  return {
    title: `${item.title} — CII.IA`,
    description: item.challenge,
  };
}

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const index = PROJECT_CASES.findIndex((c) => c.id === id);
  if (index === -1) notFound();

  const total = PROJECT_CASES.length;
  const prev = PROJECT_CASES[(index - 1 + total) % total];
  const next = PROJECT_CASES[(index + 1) % total];

  return <CaseDetail item={PROJECT_CASES[index]} prev={prev} next={next} />;
}
