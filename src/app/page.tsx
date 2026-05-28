import Hero from "@/sections/Hero/Hero";
import About from "@/sections/About/About";
import Approach from "@/sections/Approach/Approach";
import Cases from "@/sections/Cases/Cases";
import Contact from "@/sections/Contact/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Approach />
      <Cases />
      <Contact />
    </main>
  );
}