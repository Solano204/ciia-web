import { Navbar } from "@/components/ui/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Challenge } from "@/components/sections/Challenge";
import { Solutions } from "@/components/sections/Solutions";
import { ExecutionCycle } from "@/components/sections/ExecutionCycle";
import { Cases } from "@/components/sections/Cases";
import { About } from "@/components/sections/About";
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
        <Solutions />
        <ExecutionCycle />
        <Cases />
        <About />
        <Ecosystem />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
