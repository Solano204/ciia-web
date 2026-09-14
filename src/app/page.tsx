import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Challenge } from "@/components/sections/Challenge";
import { About } from "@/components/sections/About";
import { ExecutionCycle } from "@/components/sections/ExecutionCycle";
import { Solutions } from "@/components/sections/Solutions";
import { Cases } from "@/components/sections/Cases";
import { Ecosystem } from "@/components/sections/Ecosystem";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Challenge />
        <About />
        <ExecutionCycle />
        <Solutions />
        <Cases />
        <Ecosystem />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
