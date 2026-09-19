import type { Metadata } from "next";
import { ExecutionCycle } from "@/components/sections/ExecutionCycle";
import { PAGE_DESCRIPTIONS } from "@/lib/ciiia";

export const metadata: Metadata = {
  title: "Ciclo de ejecución",
  description: PAGE_DESCRIPTIONS.ciclo,
};

export default function CicloPage() {
  return <ExecutionCycle headingLevel="h1" />;
}
