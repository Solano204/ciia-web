import { Hero } from "@/components/sections/Hero";
import { Challenge } from "@/components/sections/Challenge";
import { Solutions } from "@/components/sections/Solutions";
import { ExecutionCycle } from "@/components/sections/ExecutionCycle";
import { Cases } from "@/components/sections/Cases";
import { About } from "@/components/sections/About";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Solutions limit={3} />
      <ExecutionCycle teaser />
      <Cases teaser />
      <About teaser />
      <Ecosystem teaser />
      <Challenge />
      <Contact teaser />
    </>
  );
}
