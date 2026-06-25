import Nav from "@/components/nav";
import Hero from "@/components/hero";
import Collab from "@/components/collab";
import Events from "@/components/events";
import Community from "@/components/community";
import Faq from "@/components/faq";
import Team from "@/components/team";
import Footer from "@/components/footer";

function Divider() {
  return <div className="section-divider mx-auto max-w-5xl" />;
}

export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative">
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <div className="pulse-glow absolute top-[20%] -left-40 h-[600px] w-[600px] rounded-full bg-accent-pink/[0.08] blur-[150px]" />
          <div className="pulse-glow absolute top-[45%] -right-40 h-[500px] w-[500px] rounded-full bg-accent-purple/[0.08] blur-[120px]" style={{ animationDelay: "1s" }} />
          <div className="pulse-glow absolute top-[70%] left-1/3 h-[400px] w-[400px] rounded-full bg-accent-cyan/[0.06] blur-[120px]" style={{ animationDelay: "2s" }} />
          <div className="pulse-glow absolute top-[90%] -right-20 h-[350px] w-[350px] rounded-full bg-accent-orange/[0.06] blur-[100px]" style={{ animationDelay: "3s" }} />
        </div>
        <div className="relative z-10">
          <Hero />
          <Divider />
          <Collab />
          <Divider />
          <Events />
          <Divider />
          <Community />
          <Divider />
          <Faq />
          <Divider />
          <Team />
        </div>
      </main>
      <Footer />
    </>
  );
}
