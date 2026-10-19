"use client";
import React, { useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { playClick, playHover, playTick } from "@/components/v1/sound";

const AUTO_ADVANCE_SECONDS = 4;

const skillsData = [
  {
    domainName: "AI & Machine Learning",
    badgeText: "AI · ML",
    skills: ["Python", "ML Algorithms", "Data Modeling", "AI Integration"],
    provenIn: "Valter AI",
  },
  {
    domainName: "Blockchain & Web3",
    badgeText: "WEB3 · DECENTRALIZED",
    skills: ["Blockchain Architecture", "Cryptography", "Smart Contracts", "Decentralized Storage"],
    provenIn: "DHRW",
  },
  {
    domainName: "Mobile Development",
    badgeText: "MOBILE · CROSS-PLATFORM",
    skills: ["Flutter", "Cross-platform", "NLP", "UI Components"],
    provenIn: "PrepareView",
  },
  {
    domainName: "Full Stack & Backend",
    badgeText: "BACKEND · API",
    skills: ["Full Stack Dev", "Backend Routing", "Payment APIs", "REST APIs"],
    provenIn: "TrustPay",
  },
  {
    domainName: "UI/UX & Frontend",
    badgeText: "FRONTEND · DESIGN",
    skills: ["Frontend Architecture", "Brand Strategy", "Animation", "Figma"],
    provenIn: "WebReel Studio",
  },
  {
    domainName: "Freelance & Consulting",
    badgeText: "INDEPENDENT · CLIENTS",
    skills: ["Client Communication", "Project Management", "Agile Delivery", "Technical Scoping"],
    provenIn: "Client work",
  },
];

const allSkills = skillsData.flatMap((d) => d.skills);

// One domain's panel content. Rendered once visibly (animated) and once per domain invisibly to size the panel.
function PanelContent({ idx, animated }: { idx: number; animated: boolean }) {
  const domain = skillsData[idx];
  return (
    <>
      <div className="flex items-start justify-between gap-4 mb-[24px]">
        <span className="text-[56px] md:text-[80px] font-black text-black leading-none drop-shadow-[4px_4px_0_rgba(0,0,0,0.1)]">
          {String(idx + 1).padStart(2, "0")}
        </span>
        <div className="border-[3px] border-black bg-white text-black text-[11px] md:text-[12px] uppercase font-black px-3 py-2 shadow-[4px_4px_0_#000] text-right">
          {domain.badgeText}
        </div>
      </div>

      <h3 className="text-[28px] md:text-[40px] font-black uppercase leading-[1.05] mb-[16px]">
        {domain.domainName}
      </h3>
      <div className="w-full h-[4px] bg-black mb-[24px]"></div>

      <motion.div
        className="flex flex-wrap gap-3 mb-[24px]"
        initial={animated ? "hidden" : false}
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } }}
      >
        {domain.skills.map((skill) => (
          <motion.span
            key={skill}
            variants={{
              hidden: { opacity: 0, y: 16, rotate: -4 },
              show: { opacity: 1, y: 0, rotate: 0, transition: { type: "spring", stiffness: 500, damping: 24 } },
            }}
            onAnimationStart={(def) => {
              if (animated && def === "show") playTick();
            }}
            whileHover={{ y: -4, rotate: -2 }}
            className="bg-white border-[3px] border-black text-black px-[12px] py-[6px] text-[14px] md:text-[16px] font-black uppercase shadow-[4px_4px_0_#000] hover:bg-black hover:text-white transition-colors cursor-default"
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>

      <p className="mt-auto text-[12px] uppercase font-black tracking-[0.15em] border-t-[3px] border-black pt-4">
        Proven in <span className="bg-black text-white px-2 py-1 ml-1">{domain.provenIn}</span>
      </p>
    </>
  );
}

export function SkillsSection() {
  const boardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(boardRef, { amount: 0.4 });
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true); // cycles domains until the visitor picks one
  const [paused, setPaused] = useState(false);

  const select = (idx: number) => {
    playClick();
    setAuto(false);
    setActive(idx);
  };

  const cycling = auto && inView && !paused;

  return (
    <section id="skills" className="bg-white text-black font-sans w-full py-20 px-5 md:px-16">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes skills-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .skills-marquee {
          animation: skills-marquee 40s linear infinite;
        }
        .skills-marquee-wrap:hover .skills-marquee {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .skills-marquee { animation: none; }
        }
        `
      }} />

      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-[48px] md:mb-[64px]">
          <p className="text-[14px] uppercase text-black tracking-[0.2em] mb-[16px] font-black border-4 border-black inline-block px-4 py-2 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            [ SKILLS ]
          </p>
          <div className="mb-8 mt-6">
            <h2 className="text-[40px] sm:text-[56px] md:text-[80px] font-black text-black uppercase leading-[1.0] tracking-tighter mb-2">
              What I Bring.
            </h2>
            <h2 className="text-[40px] sm:text-[56px] md:text-[80px] font-black text-black uppercase leading-[1.0] tracking-tighter text-transparent" style={{ WebkitTextStroke: "2px #000000" }}>
              To The Table.
            </h2>
          </div>
          <p className="text-[18px] md:text-[22px] text-black max-w-[640px] leading-[1.6] font-bold border-l-8 border-black pl-6">
            The languages, tools and domains I&apos;ve worked with, proven across real projects.
          </p>
        </div>

        {/* Skills Ticker */}
        <div className="skills-marquee-wrap relative -mx-5 md:mx-0 mb-[48px] md:mb-[64px] bg-black text-white border-y-[6px] md:border-[6px] border-black md:shadow-[12px_12px_0_#888888] overflow-hidden py-4">
          <div className="skills-marquee flex w-max">
            {[0, 1].map((copy) => (
              <div key={copy} aria-hidden={copy === 1} className="flex shrink-0">
                {allSkills.map((skill, i) => (
                  <span key={i} className="flex items-center gap-6 pr-6 text-[16px] md:text-[20px] font-black uppercase tracking-tight whitespace-nowrap">
                    {skill}
                    <span className="inline-block w-[10px] h-[10px] bg-white rotate-45" aria-hidden="true"></span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Skill Board */}
        <div
          ref={boardRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-start md:items-stretch"
        >
          {/* Domain List */}
          <div role="tablist" aria-label="Skill domains" className="md:col-span-5 flex flex-col border-[6px] border-black shadow-[12px_12px_0_#000] bg-white">
            {skillsData.map((d, idx) => {
              const isActive = idx === active;
              return (
                <button
                  key={d.domainName}
                  type="button"
                  role="tab"
                  id={`skill-tab-${idx}`}
                  aria-selected={isActive}
                  aria-controls="skill-panel"
                  onClick={() => select(idx)}
                  onMouseEnter={playHover}
                  className={`relative flex md:flex-1 items-center gap-4 text-left px-4 md:px-6 py-4 border-b-[3px] border-black last:border-b-0 overflow-hidden group transition-colors duration-300 ${isActive ? "text-white" : "text-black hover:bg-[#f3f3f3]"}`}
                >
                  {/* Sliding black fill behind the active row */}
                  {isActive && (
                    <motion.span
                      layoutId="skill-active-fill"
                      className="absolute inset-0 bg-black"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  )}
                  <span className="relative z-10 text-[13px] font-black tabular-nums opacity-60">{String(idx + 1).padStart(2, "0")}</span>
                  <span className="relative z-10 flex-1 text-[16px] md:text-[18px] font-black uppercase leading-tight">{d.domainName}</span>
                  <span className={`relative z-10 text-[18px] font-black transition-transform duration-300 ${isActive ? "translate-x-0" : "-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"}`}>→</span>

                  {/* Auto-advance progress */}
                  {isActive && auto && (
                    <motion.span
                      key={`progress-${active}`}
                      className="absolute left-0 bottom-0 z-10 h-[4px] w-full bg-white origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: cycling ? 1 : 0 }}
                      transition={{ duration: cycling ? AUTO_ADVANCE_SECONDS : 0.2, ease: "linear" }}
                      onAnimationComplete={() => {
                        if (cycling) setActive((a) => (a + 1) % skillsData.length);
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Domain Panel */}
          <div
            id="skill-panel"
            role="tabpanel"
            aria-labelledby={`skill-tab-${active}`}
            className="md:col-span-7 bg-white border-[6px] border-black p-[20px] md:p-[40px] shadow-[12px_12px_0_#000] flex flex-col overflow-hidden"
          >
            {/* Every domain is laid out invisibly in the same grid cell, so the panel is always as tall as the
                tallest domain and keeps the same size whichever one is showing */}
            <div className="grid flex-1">
              {skillsData.map((_, idx) => (
                <div key={idx} aria-hidden="true" className="invisible [grid-area:1/1] flex flex-col">
                  <PanelContent idx={idx} animated={false} />
                </div>
              ))}
              <div className="[grid-area:1/1] flex flex-col">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="flex flex-col flex-1"
                  >
                    <PanelContent idx={active} animated />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
