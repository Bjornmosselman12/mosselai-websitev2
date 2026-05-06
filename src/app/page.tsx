import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import Research from "@/components/Research";
import Momentum from "@/components/Momentum";
import HowItWorks from "@/components/HowItWorks";
import QuizFunnel from "@/components/QuizFunnel";
import Comparison from "@/components/Comparison";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
// import Cases from "@/components/Cases";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollObserver from "@/components/ScrollObserver";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero + TechStack samen exact 100vh zodat de carousel altijd zichtbaar is */}
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <Hero />
          <TechStack />
        </div>
        <Momentum />
        <HowItWorks />
        <ScrollObserver>
          <About />
        </ScrollObserver>
        <ScrollObserver>
          <Contact />
        </ScrollObserver>
        <ScrollObserver>
          <FAQ />
        </ScrollObserver>
        <ScrollObserver>
          <Research />
        </ScrollObserver>
      </main>
      <Footer />
    </>
  );
}
