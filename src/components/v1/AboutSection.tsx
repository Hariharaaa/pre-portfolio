"use client";
import React, { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { playClick, playHover } from "@/components/v1/sound";

const facts = ["Chennai Institute of Technology", "50+ Hackathons", "2 Internships", "JLPT N5", "CCNA Certified"];

const links = [
  { label: "GitHub", url: "https://github.com/Hariharaaa" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/harihara-srinivas-05798b333/" },
  { label: "Resume", url: "/resume.pdf" },
];

const journey = [
  {
    date: "2024",
    tag: "EDUCATION",
    title: "Started Computer Science",
    detail: "Began my BE in Computer Science Engineering at Chennai Institute of Technology, and started building from day one.",
  },
  {
    date: "NOV '25",
    tag: "INTERNSHIP",
    title: "AI Intern, Skilleareum",
    detail: "Worked on agentic AI and gamification in a decentralized ecosystem. Shipped two new features and lifted user engagement by 20%.",
  },
  {
    date: "2026",
    tag: "FREELANCE",
    title: "Founded WebReel Studio",
    detail: "Started my own digital studio, running client projects end to end: delivery, communication and quality.",
  },
  {
    date: "MAY '26",
    tag: "INTERNSHIP",
    title: "Web Dev Intern, Centaur Digital",
    detail: "Built web solutions with the Tamil Nadu Small Industries department and improved project efficiency by 40%.",
  },
  {
    date: "SEP '26",
    tag: "AWARD",
    title: "SEBI Jury Award",
    detail: "Won the Jury Award and ₹50,000 at the SEBI Securities Market TechSprint, part of Global Fintech Fest 2026.",
  },
  {
    date: "NOW",
    tag: "STATUS",
    title: "Open to Roles",
    detail: "Actively seeking 2027 software engineering graduate roles and freelance projects. Based in India.",
  },
];

const principles = [
  {
    number: "01",
    title: "Build it robust.",
    proof: "TrustPay",
    example: "Secure PIN checks, expiry handling, emergency transfers and a blockchain audit trail, built and debugged in 24 hours.",
  },
  {
    number: "02",
    title: "Make it scale.",
    proof: "Valter AI",
    example: "Real-time portfolio tracking and AI market analysis, built on Next.js and the Anthropic SDK.",
  },
  {
    number: "03",
    title: "Make it stand out.",
    proof: "WebReel Studio",
    example: "Cinematic animations and conversion-focused design, shipped for real clients.",
  },
];

function JourneyDetail({ idx }: { idx: number }) {
  const step = journey[idx];
  return (
    <>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="bg-black text-white text-[12px] font-black uppercase tracking-[0.15em] px-3 py-1">{step.date}</span>
        <span className="border-[3px] border-black text-[11px] font-black uppercase tracking-[0.15em] px-2 py-[2px]">{step.tag}</span>
      </div>
      <h4 className="text-[26px] md:text-[36px] font-black uppercase leading-[1.05] mb-4">{step.title}</h4>
      <p className="text-[16px] md:text-[18px] font-bold leading-[1.6] max-w-[640px]">{step.detail}</p>
    </>
  );
}

function Journey() {
  const [active, setActive] = useState(journey.length - 1);

  const go = (idx: number) => {
    if (idx < 0 || idx >= journey.length || idx === active) return;
    playClick();
    setActive(idx);
  };

  return (
    <div
      className="bg-white border-[6px] border-black shadow-[12px_12px_0_#000] p-[20px] md:p-[40px] mb-[60px]"
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(active + 1);
        if (e.key === "ArrowLeft") go(active - 1);
      }}
    >
      <div className="flex items-center justify-between gap-4 mb-8">
        <span className="inline-block border-4 border-black px-4 py-2 text-[14px] font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
          [ THE JOURNEY ]
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => go(active - 1)}
            disabled={active === 0}
            aria-label="Previous milestone"
            className="w-[44px] h-[44px] border-[3px] border-black font-black text-[18px] shadow-[3px_3px_0_#000] hover:bg-black hover:text-white active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-[background-color,color,translate,box-shadow] disabled:opacity-30 disabled:pointer-events-none"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => go(active + 1)}
            disabled={active === journey.length - 1}
            aria-label="Next milestone"
            className="w-[44px] h-[44px] border-[3px] border-black font-black text-[18px] shadow-[3px_3px_0_#000] hover:bg-black hover:text-white active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-[background-color,color,translate,box-shadow] disabled:opacity-30 disabled:pointer-events-none"
          >
            →
          </button>
        </div>
      </div>

      {/* Rail */}
      <div className="relative mb-10" role="tablist" aria-label="Journey milestones">
        <div className="absolute left-[calc(100%/12)] right-[calc(100%/12)] top-[13px] h-[6px] bg-[#e5e5e5]">
          <motion.div
            className="h-full bg-black origin-left"
            animate={{ scaleX: active / (journey.length - 1) }}
            transition={{ type: "spring", stiffness: 200, damping: 30 }}
          />
        </div>
        <div className="relative grid grid-cols-6">
          {journey.map((step, idx) => {
            const reached = idx <= active;
            const isActive = idx === active;
            return (
              <button
                key={step.date}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`${step.date}: ${step.title}`}
                onClick={() => go(idx)}
                onMouseEnter={playHover}
                className="group flex flex-col items-center gap-3 outline-none"
              >
                <motion.span
                  animate={{ scale: isActive ? 1.25 : 1, rotate: isActive ? 45 : 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className={`block w-[32px] h-[32px] border-[4px] border-black transition-colors duration-300 group-hover:bg-black group-focus-visible:ring-4 group-focus-visible:ring-black group-focus-visible:ring-offset-2 ${reached ? "bg-black" : "bg-white"}`}
                />
                <span className={`text-[10px] sm:text-[12px] md:text-[13px] font-black uppercase tracking-tight sm:tracking-[0.1em] whitespace-nowrap transition-opacity ${isActive ? "opacity-100" : "opacity-50 group-hover:opacity-100"}`}>
                  {step.date}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail: every milestone sits invisibly in the same cell so the box never changes size */}
      <div className="grid border-t-[4px] border-black pt-8">
        {journey.map((_, idx) => (
          <div key={idx} aria-hidden="true" className="invisible [grid-area:1/1]">
            <JourneyDetail idx={idx} />
          </div>
        ))}
        <div className="[grid-area:1/1]" role="tabpanel" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <JourneyDetail idx={active} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function PrincipleCard({ principle, idx }: { principle: (typeof principles)[number]; idx: number }) {
  const [flipped, setFlipped] = useState(false);
  const lastPointer = useRef<string>("");

  const flip = (next: boolean) => {
    if (next === flipped) return;
    if (next) playHover();
    setFlipped(next);
  };

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.12 }}
      // Hover flips only for a real mouse; on touch screens a tap toggles instead
      onPointerEnter={(e) => e.pointerType === "mouse" && flip(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && flip(false)}
      onPointerDown={(e) => {
        lastPointer.current = e.pointerType;
      }}
      onClick={() => {
        playClick();
        // A mouse already flipped it on hover, so a click keeps it showing; taps and keyboard toggle
        if (lastPointer.current === "mouse") setFlipped(true);
        else setFlipped((f) => !f);
        lastPointer.current = "";
      }}
      aria-pressed={flipped}
      aria-label={`${principle.title} ${flipped ? principle.example : "Show an example."}`}
      className="relative h-[260px] md:h-[300px] w-full text-left [perspective:1200px] outline-none focus-visible:ring-4 focus-visible:ring-black focus-visible:ring-offset-4"
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        className="relative w-full h-full [transform-style:preserve-3d]"
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-white border-[6px] border-black shadow-[10px_10px_0_#000] p-6 flex flex-col">
          <span className="text-[48px] md:text-[56px] font-black leading-none drop-shadow-[4px_4px_0_rgba(0,0,0,0.1)]">{principle.number}</span>
          <h4 className="mt-auto text-[28px] md:text-[32px] font-black uppercase leading-[1.05]">{principle.title}</h4>
          <span className="mt-4 text-[11px] font-black uppercase tracking-[0.2em] text-[#888888]">
            <span className="[@media(hover:hover)]:hidden">Tap</span>
            <span className="hidden [@media(hover:hover)]:inline">Hover</span> for proof ↻
          </span>
        </div>

        {/* Back */}
        <div className="absolute inset-0 backface-hidden [transform:rotateY(180deg)] bg-black text-white border-[6px] border-black shadow-[10px_10px_0_#888888] p-6 flex flex-col">
          <span className="self-start border-[3px] border-white text-[11px] font-black uppercase tracking-[0.15em] px-3 py-1 mb-4">
            Proof: {principle.proof}
          </span>
          <p className="text-[17px] md:text-[19px] font-bold leading-[1.5]">{principle.example}</p>
          <span className="mt-auto text-[11px] font-black uppercase tracking-[0.2em] text-[#888888]">{principle.title}</span>
        </div>
      </motion.div>
    </motion.button>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="w-full bg-white font-sans text-black py-24 px-5 md:px-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-[60px]">
          <p className="text-[14px] uppercase text-black tracking-[0.2em] mb-[16px] font-black border-4 border-black inline-block px-4 py-2 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            [ ABOUT ]
          </p>
          <div className="mb-8 mt-6">
            <h2 className="text-[36px] sm:text-[48px] md:text-[72px] font-black uppercase leading-[1.0] mb-2 tracking-tighter">
              I&apos;m Harihara Srinivas.
            </h2>
            <h3 className="text-[26px] sm:text-[32px] md:text-[48px] font-black uppercase leading-[1.05] tracking-tighter text-transparent" style={{ WebkitTextStroke: "2px #000000" }}>
              I build things that matter.
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <p className="text-[18px] md:text-[22px] font-bold leading-[1.6] border-l-8 border-black pl-6 mb-6">
                A Computer Science student who learns by shipping. I work where heavy backend logic meets design that people remember, across AI, blockchain and the web.
              </p>
              <div className="flex flex-wrap gap-3">
                {facts.map((fact, i) => (
                  <motion.span
                    key={fact}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 400, damping: 20, delay: i * 0.06 }}
                    whileHover={{ y: -4, rotate: i % 2 ? 2 : -2 }}
                    className="border-[3px] border-black bg-white px-3 py-1 text-[12px] md:text-[13px] font-black uppercase shadow-[3px_3px_0_#000] cursor-default"
                  >
                    {fact}
                  </motion.span>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-wrap gap-4 lg:justify-end">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className="bg-black text-white border-4 border-black px-5 py-3 font-black uppercase text-[14px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-200"
                >
                  [ {link.label} ]
                </a>
              ))}
            </div>
          </div>
        </div>

        <Journey />

        {/* How I Work */}
        <div>
          <p className="text-[14px] uppercase font-black tracking-[0.2em] mb-6">
            [ HOW I WORK ]
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {principles.map((principle, idx) => (
              <PrincipleCard key={principle.number} principle={principle} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
