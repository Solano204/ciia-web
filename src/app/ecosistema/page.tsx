import type { Metadata } from "next";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { ECOSYSTEM_INTRO } from "@/lib/ciiia";

export const metadata: Metadata = {
  title: "Ecosistema",
  description: ECOSYSTEM_INTRO,
};

export default function EcosistemaPage() {
  return <Ecosystem headingLevel="h1" />;
}
