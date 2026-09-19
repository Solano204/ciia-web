import type { Metadata } from "next";
import { Cases } from "@/components/sections/Cases";
import { PAGE_DESCRIPTIONS } from "@/lib/ciiia";

export const metadata: Metadata = {
  title: "Casos",
  description: PAGE_DESCRIPTIONS.casos,
};

export default function CasosPage() {
  return <Cases headingLevel="h1" />;
}
