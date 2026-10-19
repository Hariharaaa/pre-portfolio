"use client";
import React, { useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationControls } from "framer-motion";
import { Odometer } from "@/components/v1/Odometer";
import { playClick, playHover, setMuted, useMuted } from "@/components/v1/sound";

interface Achievement {
  number: string;
  stat: string;
  value?: number;
  prefix?: string;
  suffix?: string;
  title: string;
  badge: string;
  description: string;
}

interface ConfettiPiece {
  x: number;
  y: number;
  rotate: number;
  size: number;
  filled: boolean;
}

const pressKeys = (fn: () => void) => (e: React.KeyboardEvent) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    fn();
  }
};

function TotalPrizeBanner() {
  const muted = useMuted();
  const [replay, setReplay] = useState(0);
  const [burst, setBurst] = useState<{ id: number; pieces: ConfettiPiece[] } | null>(null);
  const pop = useAnimationControls();

  const spinAgain = () => {
    playClick();
    setBurst(null);
    setReplay((n) => n + 1);
  };

  const celebrate = () => {
    pop.start({ scale: [1, 1.06, 0.98, 1], transition: { duration: 0.5, ease: "easeOut" } });
    setBurst({
      id: Date.now(),
      pieces: Array.from({ length: 18 }, () => ({
        x: (Math.random() - 0.5) * 520,
        y: -80 - Math.random() * 220,
        rotate: (Math.random() - 0.5) * 540,
        size: 8 + Math.random() * 14,
        filled: Math.random() > 0.4,
      })),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      role="button"
      tabIndex={0}
      aria-label="Total prize money won, ₹72,790. Press to spin the counter again."
      onClick={spinAgain}
      onKeyDown={pressKeys(spinAgain)}
      onMouseEnter={playHover}
      className="relative overflow-hidden cursor-pointer select-none bg-black text-white border-[6px] border-black p-[20px] md:p-[48px] shadow-[12px_12px_0_#888888] hover:shadow-[17px_17px_0_#888888] hover:-translate-x-[5px] hover:-translate-y-[5px] active:translate-x-[6px] active:translate-y-[6px] active:shadow-[4px_4px_0_#888888] transition-[translate,box-shadow] duration-200 mb-[60px] flex flex-col md:flex-row md:items-end justify-between gap-8 group outline-none focus-visible:ring-4 focus-visible:ring-black focus-visible:ring-offset-4"
    >
      {/* Sound toggle */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setMuted(!muted);
          if (muted) playClick();
        }}
        onKeyDown={(e) => e.stopPropagation()}
        aria-pressed={!muted}
        className="self-start md:absolute md:top-[24px] md:right-[24px] z-20 border-[3px] border-white bg-black text-white text-[11px] md:text-[12px] uppercase tracking-[0.15em] font-black px-3 py-2 hover:bg-white hover:text-black transition-colors"
      >
        {muted ? "[ SOUND OFF ]" : "[ SOUND ON ]"}
      </button>

      <div className="relative">
        <p className="text-[12px] md:text-[14px] uppercase tracking-[0.2em] font-black border-[3px] border-white inline-block px-4 py-2 mb-6">
          [ TOTAL PRIZE MONEY WON ]
        </p>
        <motion.div
          animate={pop}
          className="relative text-[52px] sm:text-[88px] md:text-[128px] font-black tracking-tighter origin-left"
        >
          <Odometer value={72790} prefix="₹" duration={5000} replayToken={replay} onComplete={celebrate} />

          {/* Confetti burst when the number lands */}
          <AnimatePresence>
            {burst && (
              <span key={burst.id} aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2">
                {burst.pieces.map((p, i) => (
                  <motion.span
                    key={i}
                    className={`absolute block border-[3px] border-white ${p.filled ? "bg-white" : "bg-black"}`}
                    style={{ width: p.size, height: p.size }}
                    initial={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 0.4 }}
                    animate={{ x: p.x, y: [0, p.y, p.y + 260], rotate: p.rotate, opacity: [1, 1, 0], scale: 1 }}
                    transition={{ duration: 1.4, ease: "easeOut", times: [0, 0.45, 1] }}
                  />
                ))}
              </span>
            )}
          </AnimatePresence>
        </motion.div>
        <p className="mt-4 text-[12px] md:text-[13px] uppercase tracking-[0.2em] font-black text-[#888888] group-hover:text-white transition-colors">
          ↻ Tap to spin again
        </p>
      </div>
      <p className="text-[16px] md:text-[18px] font-bold leading-[1.6] max-w-[320px] border-l-8 border-white pl-6">
        Earned across global awards and blockchain hackathons.
      </p>
    </motion.div>
  );
}

function AchievementCard({ achievement, idx }: { achievement: Achievement; idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [replay, setReplay] = useState(0);
  const spins = achievement.value !== undefined;

  const spinAgain = () => {
    playClick();
    if (spins) setReplay((n) => n + 1);
  };

  // Tilt toward the mouse, same feel as the About cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const rotateX = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -6;
    const rotateY = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 6;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    card.style.transition = "translate 0.3s, box-shadow 0.3s";
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    card.style.transition = "transform 0.5s ease-out, translate 0.3s, box-shadow 0.3s";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: (idx % 2) * 0.15 }}
    >
      <div
        ref={cardRef}
        role="button"
        tabIndex={0}
        aria-label={`${achievement.title}. ${spins ? "Press to spin the number again." : ""}`}
        onClick={spinAgain}
        onKeyDown={pressKeys(spinAgain)}
        onMouseEnter={playHover}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="h-full cursor-pointer select-none bg-white border-[6px] border-black p-[20px] md:p-[32px] shadow-[12px_12px_0_#000] hover:shadow-[17px_17px_0_#000] hover:-translate-x-[5px] hover:-translate-y-[5px] active:translate-x-[6px] active:translate-y-[6px] active:shadow-[4px_4px_0_#000] flex flex-col group outline-none focus-visible:ring-4 focus-visible:ring-black focus-visible:ring-offset-4"
        style={{ transition: "translate 0.3s, box-shadow 0.3s" }}
      >
        {/* Top Row */}
        <div className="flex items-start justify-between gap-4 mb-[24px]">
          <span className="text-[48px] md:text-[56px] font-black text-black leading-none drop-shadow-[4px_4px_0_rgba(0,0,0,0.1)]">
            {achievement.number}
          </span>
          <div className="border-[3px] border-black bg-white text-black text-[12px] uppercase font-black px-4 py-2 shadow-[4px_4px_0_#000] text-right group-hover:bg-black group-hover:text-white transition-colors duration-300">
            {achievement.badge}
          </div>
        </div>

        {/* Stat */}
        <div className="mb-[16px] flex items-center gap-4">
          <span className="inline-block bg-black text-white text-[40px] md:text-[52px] font-black leading-none px-4 py-3 tracking-tight group-hover:bg-white group-hover:text-black border-[3px] border-black transition-colors duration-300">
            {spins ? (
              <Odometer value={achievement.value!} prefix={achievement.prefix} suffix={achievement.suffix} replayToken={replay} />
            ) : (
              achievement.stat
            )}
          </span>
          {spins && (
            <span className="text-[11px] uppercase tracking-[0.2em] font-black text-black opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 [@media(hover:none)]:opacity-100 [@media(hover:none)]:translate-x-0 transition-all duration-300">
              ↻ Spin
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-[24px] md:text-[28px] font-black text-black uppercase leading-[1.1] mb-[16px]">
          {achievement.title}
        </h3>

        {/* Divider, fills in on hover */}
        <div className="relative w-full h-[4px] bg-[#e5e5e5] mb-[20px] overflow-hidden">
          <span className="absolute inset-0 bg-black origin-left scale-x-[0.35] group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
        </div>

        {/* Description */}
        <p className="text-[16px] text-black leading-[1.6] font-medium border-[3px] border-black p-4 shadow-[4px_4px_0_#000] mt-auto">
          {achievement.description}
        </p>
      </div>
    </motion.div>
  );
}

export function AchievementsSection() {
  const achievementsData: Achievement[] = [
    {
      number: "01",
      stat: "₹50,000",
      value: 50000,
      prefix: "₹",
      title: "SEBI Jury Award Winner",
      badge: "GLOBAL · FINTECH",
      description: "Won the global level SEBI Jury Award, recognised by the jury for building a standout solution in the securities and finance space.",
    },
    {
      number: "02",
      stat: "$240",
      value: 240,
      prefix: "$",
      title: "Midnight Blockchain Hackathon",
      badge: "WEB3 · HACKATHON",
      description: "Completed all six levels of the Midnight blockchain hackathon, clearing every challenge from start to finish.",
    },
    {
      number: "03",
      stat: "50+",
      value: 50,
      suffix: "+",
      title: "Hackathons Participated",
      badge: "BUILD · COMPETE",
      description: "Took part in more than 50 hackathons, shipping working prototypes under tight deadlines across AI, Web3, fintech and mobile.",
    },
    {
      number: "04",
      stat: "N5",
      title: "JLPT N5 Certified",
      badge: "LANGUAGE · JAPANESE",
      description: "Completed the Japanese Language Proficiency Test at the N5 level, building a foundation in reading, listening and grammar.",
    },
  ];

  return (
    <section id="achievements" className="bg-white text-black font-sans w-full py-20 px-5 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-[80px]">
          <p className="text-[14px] uppercase text-black tracking-[0.2em] mb-[16px] font-black border-4 border-black inline-block px-4 py-2 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            [ ACHIEVEMENTS ]
          </p>
          <div className="mb-8 mt-6">
            <h2 className="text-[40px] sm:text-[56px] md:text-[80px] font-black text-black uppercase leading-[1.0] tracking-tighter mb-2">
              Proven Wins.
            </h2>
            <h2 className="text-[40px] sm:text-[56px] md:text-[80px] font-black text-black uppercase leading-[1.0] tracking-tighter text-transparent" style={{ WebkitTextStroke: "2px #000000" }}>
              Real Results.
            </h2>
          </div>
          <p className="text-[18px] md:text-[22px] text-black max-w-[640px] leading-[1.6] font-bold border-l-8 border-black pl-6">
            Awards, hackathons and certifications earned along the way. The milestones behind the work.
          </p>
        </div>

        <TotalPrizeBanner />

        {/* Achievement Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {achievementsData.map((achievement, idx) => (
            <AchievementCard key={idx} achievement={achievement} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
