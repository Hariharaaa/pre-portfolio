import { Skiper39 } from "@/components/v1/skiper39";
import { ProjectsSection } from "@/components/v1/ProjectsSection";
import { SkillsSection } from "@/components/v1/SkillsSection";
import { AboutSection } from "@/components/v1/AboutSection";
import { ContactSection } from "@/components/v1/ContactSection";

export default function Home() {
  return (
    <main className="w-full bg-white relative">
      <Skiper39 />
      <ProjectsSection />
      <SkillsSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
