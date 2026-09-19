import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { PAGE_DESCRIPTIONS } from "@/lib/ciiia";

export const metadata: Metadata = {
  title: "Contacto",
  description: PAGE_DESCRIPTIONS.contacto,
};

export default function ContactoPage() {
  return <Contact headingLevel="h1" />;
}
