import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import About from "@/components/about";
import FeaturedProject from "@/components/featured-project";
import GitHubProjects from "@/components/github/github-projects";
import Skills from "@/components/skills";
import WhatIBuild from "@/components/what-i-build";
import Experience from "@/components/experience";
import Achievements from "@/components/achievements";
import AgentArchitecture from "@/components/agent-architecture";
import TechMarquee from "@/components/tech-marquee";
import GitHubStats from "@/components/github/github-stats";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import ChatWidget from "@/components/chat-widget";

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <About />
        <FeaturedProject />
        <GitHubProjects />
        <Skills />
        <WhatIBuild />
        <AgentArchitecture />
        <Experience />
        <Achievements />
        <TechMarquee />
        <GitHubStats />
        <Contact />
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
