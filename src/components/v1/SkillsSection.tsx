import React from "react";
import { SkillCard } from "@/components/v1/SkillCard";
import { SkillLinkCard } from "@/components/v1/SkillLinkCard";

export function SkillsSection() {
  const skillsData = [
    {
      domainName: "AI & Machine Learning",
      badgeText: "AI · ML",
      skills: ["Python", "ML Algorithms", "Data Modeling", "AI Integration"],
    },
    {
      domainName: "Blockchain & Web3",
      badgeText: "WEB3 · DECENTRALIZED",
      skills: ["Blockchain Architecture", "Cryptography", "Smart Contracts", "Decentralized Storage"],
    },
    {
      domainName: "Mobile Development",
      badgeText: "MOBILE · CROSS-PLATFORM",
      skills: ["Flutter", "Cross-platform", "NLP", "UI Components"],
    },
    {
      domainName: "Full Stack & Backend",
      badgeText: "BACKEND · API",
      skills: ["Full Stack Dev", "Backend Routing", "Payment APIs", "REST APIs"],
    },
    {
      domainName: "UI/UX & Frontend",
      badgeText: "FRONTEND · DESIGN",
      skills: ["Frontend Architecture", "Brand Strategy", "Animation", "Figma"],
    },
    {
      domainName: "Freelance & Consulting",
      badgeText: "INDEPENDENT · CLIENTS",
      skills: ["Client Communication", "Project Management", "Agile Delivery", "Technical Scoping"],
    },
  ];

  return (
    <section id="skills" className="bg-white text-black font-sans w-full py-20 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-24 md:mb-32 max-w-4xl">
          <p className="text-xs font-bold uppercase tracking-widest text-[#888888] mb-6">
            MY SKILLS
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none mb-8">
            What I bring to the table.
          </h1>
          <p className="text-lg md:text-xl font-medium tracking-wide text-[#888888] max-w-2xl leading-relaxed">
            A breakdown of the languages, tools, and domains I've worked with — proven across real projects.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillsData.map((data, idx) => (
            <SkillCard
              key={idx}
              index={idx + 1}
              domainName={data.domainName}
              badgeText={data.badgeText}
              skills={data.skills}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
