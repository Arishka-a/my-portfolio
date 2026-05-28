import Hero from "@/sections/Hero/Hero";
import About from "@/sections/About/About";
import Approach from "@/sections/Approach/Approach";
import Cases from "@/sections/Cases/Cases";
import ContactForm from "@/components/ContactForm/ContactForm";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Approach />
      <Cases />
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "4rem 1rem" }}>
        <ContactForm />
      </div>
    </main>
  );
}