import React from "react";
import { ProjectCard } from "@/components/v1/ProjectCard";
import { AcrossProjectsCard } from "@/components/v1/AcrossProjectsCard";

export function ProjectsSection() {
  const filters = [
    "All Projects",
    "AI / ML",
    "Web3",
    "Mobile",
    "Fintech",
    "Full Stack",
  ];

  const projectsData = [
    {
      number: "01",
      name: "Valter AI",
      tagline: "Intelligent financial analytics with real-time market insight",
      badge: "AI · FINANCE",
      description: "Processes complex market data using custom ML algorithms to surface actionable stock insights. Built to work like a smart financial advisor — always on, always learning.",
      techStack: ["Python", "Machine Learning", "Data Modeling", "API Integration"],
      link: "https://valterai.vercel.app/",
      highlights: [
        { text: "Custom AI algorithms" },
        { text: "Real-time stock analysis" },
        { text: "Actionable investment signals" }
      ]
    },
    {
      number: "02",
      name: "DHRW",
      tagline: "Decentralized healthcare records on a tamper-proof blockchain",
      badge: "WEB3 · HEALTH",
      description: "Gives patients full ownership of their medical records through a decentralized architecture. Every access is cryptographically verified — no central point of failure, no unauthorized reads.",
      techStack: ["Blockchain", "Cryptography", "Decentralized Storage", "Smart Contracts"],
      highlights: [
        { text: "End-to-end encryption" },
        { text: "Tamper-proof data" },
        { text: "Patient-controlled access" }
      ]
    },
    {
      number: "03",
      name: "PrepareView",
      tagline: "AI interview coach in your pocket — for tech and HR rounds",
      badge: "MOBILE · EDTECH",
      description: "Simulates real interview environments for students — both technical and HR. The AI evaluates answers, identifies weak spots, and gives personalised feedback after each session.",
      techStack: ["Flutter", "AI Integration", "Cross-platform", "NLP"],
      highlights: [
        { text: "iOS & Android" },
        { text: "Real-scenario simulation" },
        { text: "AI-personalised feedback" }
      ]
    },
    {
      number: "04",
      name: "TrustPay",
      tagline: "Smart payment gateway with conditional spending controls",
      badge: "FINTECH · BACKEND",
      description: "A programmable payment layer that enforces category-level spending rules. Users can lock funds to specific merchant types — e.g. funds released only at educational bookstores — enforced at the transaction routing level.",
      techStack: ["Full Stack", "Backend Routing", "Payment APIs", "Business Logic"],
      highlights: [
        { text: "Conditional transactions" },
        { text: "Category-level controls" },
        { text: "Complex backend logic" }
      ]
    },
    {
      number: "05",
      name: "WebReel Studio",
      tagline: "Premium digital branding agency — built as a live product",
      badge: "UI/UX · BRANDING",
      description: "A fully operational digital service agency platform. Designed as a frontend growth engine — delivering brand assets, cinematic animations, and conversion-focused systems for real clients.",
      techStack: ["Frontend Architecture", "Brand Strategy", "Animation", "UI/UX"],
      highlights: [
        { text: "Cinematic animations" },
        { text: "Conversion systems" },
        { text: "Live client product" }
      ]
    }
  ];

  const acrossProjectsData = [
    { skill: "Python & ML", project: "Valter AI" },
    { skill: "Flutter", project: "PrepareView" },
    { skill: "Blockchain", project: "DHRW" },
    { skill: "Full Stack", project: "TrustPay" },
    { skill: "UI/UX Design", project: "WebReel Studio" }
  ];

  return (
    <section id="work" className="bg-white text-black font-sans w-full py-20 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-[80px]">
          <p className="text-[14px] uppercase text-black tracking-[0.2em] mb-[16px] font-black border-4 border-black inline-block px-4 py-2 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            [ FEATURED WORK ]
          </p>
          <div className="mb-8 mt-6">
            <h2 className="text-[56px] md:text-[80px] font-black text-black uppercase leading-[1.0] tracking-tighter mb-2">
              Real Problems.
            </h2>
            <h2 className="text-[56px] md:text-[80px] font-black text-black uppercase leading-[1.0] tracking-tighter text-transparent" style={{ WebkitTextStroke: "2px #000000" }}>
              Real Code.
            </h2>
          </div>
          <p className="text-[18px] md:text-[22px] text-black max-w-[640px] leading-[1.6] font-bold border-l-8 border-black pl-6">
            I don't just build toy apps. I build scalable, intentional products—from AI finance engines to blockchain medical records. Here is the proof.
          </p>
        </div>

        {/* Filter Row */}
        <div className="flex flex-wrap items-center gap-3 mb-[60px]">
          {filters.map((filter, idx) => {
            const isActive = idx === 0; // "All Projects" active by default
            return (
              <button
                key={idx}
                className={`rounded-full px-4 py-1.5 text-[12px] font-bold transition-colors ${
                  isActive
                    ? "bg-black text-white border border-black shadow-sm"
                    : "bg-transparent border border-gray-300 text-black hover:border-black"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Project Cards */}
        <div className="flex flex-col gap-8 mb-[80px]">
          {projectsData.map((project, idx) => (
            <ProjectCard
              key={idx}
              index={idx}
              number={project.number}
              name={project.name}
              tagline={project.tagline}
              badge={project.badge}
              description={project.description}
              techStack={project.techStack}
              highlights={project.highlights}
              link={project.link}
            />
          ))}
        </div>

        {/* Bottom Section */}
        {/* Removed as per user request */}
      </div>
    </section>
  );
}
