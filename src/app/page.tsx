import Nav from "@/components/nav";
import Hero from "@/components/hero";
import ParticipationPaths from "@/components/participation-paths";
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
        <div className="relative z-10">
          <Hero />
          <ParticipationPaths />
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
