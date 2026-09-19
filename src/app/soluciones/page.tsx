import type { Metadata } from "next";
import { Solutions } from "@/components/sections/Solutions";
import { PAGE_DESCRIPTIONS } from "@/lib/ciiia";

export const metadata: Metadata = {
  title: "Soluciones",
  description: PAGE_DESCRIPTIONS.soluciones,
};

export default function SolucionesPage() {
  return <Solutions headingLevel="h1" />;
}
