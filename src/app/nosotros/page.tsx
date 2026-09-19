import type { Metadata } from "next";
import { About } from "@/components/sections/About";
import { MANIFESTO } from "@/lib/ciiia";

export const metadata: Metadata = {
  title: "Nosotros",
  description: MANIFESTO.lead,
};

export default function NosotrosPage() {
  return <About headingLevel="h1" />;
}
