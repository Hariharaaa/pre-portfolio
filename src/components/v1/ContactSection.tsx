"use client";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { playClick, playDing, playHover, playTick } from "@/components/v1/sound";

const EMAIL = "harihara0328@gmail.com";

const links = [
  { label: "LinkedIn", detail: "harihara-srinivas", url: "https://www.linkedin.com/in/harihara-srinivas-05798b333/" },
  { label: "GitHub", detail: "@Hariharaaa", url: "https://github.com/Hariharaaa" },
  { label: "Resume", detail: "View PDF", url: "/resume.pdf" },
];

const topics = ["Full-time role", "Internship", "Freelance project", "Hackathon team", "Just saying hi"];

// Live time in India, so visitors know when I'm likely to reply
function IndiaClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
    const tick = () => setTime(format.format(new Date()).toUpperCase());
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => {
      clearTimeout(first);
      clearInterval(id);
    };
  }, []);

  return <span className="tabular-nums">{time ?? "--:--:--"} IST</span>;
}

function EmailCard() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      playDing();
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <div className="sm:col-span-2 bg-black text-white border-[4px] border-black shadow-[8px_8px_0_#888888] flex flex-col sm:flex-row sm:items-stretch">
      <a
        href={`mailto:${EMAIL}`}
        onMouseEnter={playHover}
        onClick={playClick}
        className="group flex-1 p-5 md:p-6 hover:bg-white hover:text-black transition-colors duration-200"
      >
        <span className="flex items-center justify-between text-[12px] font-black uppercase tracking-[0.2em] mb-2">
          [ Email ]
          <span className="text-[20px] transition-transform duration-300 group-hover:rotate-45">↗</span>
        </span>
        <span className="block text-[17px] sm:text-[20px] lg:text-[18px] xl:text-[21px] font-black">
          {/* Wrap only at the @, never mid-word */}
          {EMAIL.split("@")[0]}<wbr />@{EMAIL.split("@")[1]}
        </span>
      </a>
      <button
        type="button"
        onClick={copy}
        onMouseEnter={playHover}
        aria-live="polite"
        className="relative overflow-hidden border-t-[4px] sm:border-t-0 sm:border-l-[4px] border-white px-6 py-4 min-w-[130px] text-[13px] font-black uppercase tracking-[0.15em] hover:bg-white hover:text-black transition-colors duration-200"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={copied ? "copied" : "copy"}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="block"
          >
            {copied ? "Copied ✓" : "⧉ Copy"}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
}

function Composer() {
  const [topic, setTopic] = useState(topics[0]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const lastTick = useRef(0);

  // Soft typewriter tick while typing, throttled so fast typing stays pleasant
  const typeTick = () => {
    const now = performance.now();
    if (now - lastTick.current > 45) {
      playTick();
      lastTick.current = now;
    }
  };

  const subject = `${topic}${name.trim() ? ` from ${name.trim()}` : ""}`;
  const body = `${message.trim() || "Hi Harihara,"}${name.trim() ? `\n\n${name.trim()}` : ""}`;
  const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  const ready = message.trim().length > 0;

  const field = "w-full bg-white border-[3px] border-black px-4 py-3 text-[16px] font-bold placeholder:text-[#999999] outline-none focus:shadow-[4px_4px_0_#000] focus:-translate-x-[2px] focus:-translate-y-[2px] transition-[translate,box-shadow] duration-150";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="h-full bg-white border-[6px] border-black shadow-[12px_12px_0_#000] flex flex-col"
    >
      {/* Window bar */}
      <div className="flex items-center justify-between gap-4 bg-black text-white px-5 py-3">
        <span className="text-[12px] md:text-[13px] font-black uppercase tracking-[0.2em]">[ Write to me ]</span>
        <span className="flex gap-2" aria-hidden="true">
          <span className="w-[12px] h-[12px] bg-white"></span>
          <span className="w-[12px] h-[12px] border-[2px] border-white"></span>
          <span className="w-[12px] h-[12px] border-[2px] border-white"></span>
        </span>
      </div>

      <div className="p-5 md:p-8 flex flex-col gap-6 flex-1">
        {/* Topic */}
        <div>
          <p className="text-[12px] font-black uppercase tracking-[0.2em] mb-3">01 · What&apos;s it about?</p>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Topic">
            {topics.map((t) => {
              const active = t === topic;
              return (
                <motion.button
                  key={t}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => {
                    playClick();
                    setTopic(t);
                  }}
                  onMouseEnter={playHover}
                  whileTap={{ scale: 0.94 }}
                  className={`border-[3px] border-black px-3 py-2 text-[12px] md:text-[13px] font-black uppercase transition-[background-color,color,box-shadow,translate] duration-200 ${active ? "bg-black text-white shadow-[3px_3px_0_#888888]" : "bg-white text-black shadow-[3px_3px_0_#000] hover:-translate-y-[2px]"}`}
                >
                  {t}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Name + Message (the message box grows to fill the card) */}
        <div className="flex flex-col gap-4 flex-1">
          <label className="block">
            <span className="block text-[12px] font-black uppercase tracking-[0.2em] mb-3">02 · Your name</span>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                typeTick();
              }}
              placeholder="Jane from Acme"
              maxLength={60}
              className={field}
            />
          </label>
          <label className="flex flex-col flex-1">
            <span className="flex items-center justify-between text-[12px] font-black uppercase tracking-[0.2em] mb-3">
              03 · Message
              <span className="tabular-nums text-[#888888]">{message.length}/500</span>
            </span>
            <textarea
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                typeTick();
              }}
              placeholder="Tell me what you're building..."
              rows={4}
              maxLength={500}
              className={`${field} resize-none flex-1 min-h-[120px]`}
            />
          </label>
        </div>

        {/* Live preview */}
        <div className="border-[3px] border-dashed border-black p-4 text-[13px] font-bold leading-[1.6] bg-[#f3f3f3]">
          <p className="truncate"><span className="font-black uppercase tracking-[0.1em]">To:</span> {EMAIL}</p>
          <p className="truncate"><span className="font-black uppercase tracking-[0.1em]">Subject:</span> {subject}</p>
        </div>

        {/* Send */}
        <a
          href={mailto}
          onMouseEnter={playHover}
          onClick={(e) => {
            if (!ready) {
              e.preventDefault();
              return;
            }
            playDing();
          }}
          aria-disabled={!ready}
          className={`group flex items-center justify-center gap-3 border-[4px] border-black px-6 py-4 text-[16px] md:text-[18px] font-black uppercase tracking-[0.05em] transition-all duration-200 ${ready ? "bg-black text-white shadow-[6px_6px_0_#888888] hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[9px_9px_0_#888888] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none" : "bg-white text-[#999999] border-[#cccccc] cursor-not-allowed"}`}
        >
          {ready ? "Open in email" : "Write a message first"}
          <span className={`text-[20px] transition-transform duration-300 ${ready ? "group-hover:rotate-45" : ""}`}>↗</span>
        </a>
      </div>
    </motion.div>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="w-full bg-white font-sans text-black pt-24 px-5 md:px-16 overflow-hidden flex flex-col border-t-4 border-black">
      <div className="max-w-7xl mx-auto w-full flex-grow mb-20 md:mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-stretch">
          {/* Left: the hook and direct links */}
          <div className="lg:col-span-5 flex flex-col">
            <p className="text-[14px] uppercase text-black tracking-[0.2em] mb-[16px] font-black border-4 border-black self-start px-4 py-2 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              [ CONTACT ]
            </p>
            <div className="mb-6 mt-6">
              <h2 className="text-[40px] sm:text-[56px] lg:text-[64px] font-black uppercase leading-[1.0] tracking-tighter mb-2">
                Let&apos;s Build
              </h2>
              <h2 className="text-[30px] sm:text-[44px] lg:text-[48px] font-black uppercase leading-[1.05] tracking-tighter text-transparent" style={{ WebkitTextStroke: "2px #000000" }}>
                Something Intentional.
              </h2>
            </div>
            <p className="text-[18px] md:text-[20px] font-bold leading-[1.6] border-l-8 border-black pl-6 mb-8">
              Open to 2028 software engineering graduate roles and freelance projects. Drop a line.
            </p>

            {/* Status + live clock */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-8 text-[12px] md:text-[13px] font-black uppercase tracking-[0.15em]">
              <span className="flex items-center gap-2">
                <span className="relative flex w-[12px] h-[12px]" aria-hidden="true">
                  <span className="absolute inset-0 bg-black animate-ping opacity-60"></span>
                  <span className="relative w-[12px] h-[12px] bg-black"></span>
                </span>
                Open to roles
              </span>
              <span className="text-[#888888]">India · <IndiaClock /></span>
            </div>

            {/* Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-auto">
              <EmailCard />
              {links.map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 + idx * 0.08 }}
                  className={`group bg-white border-[4px] border-black p-5 shadow-[6px_6px_0_#000] hover:bg-black hover:text-white hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[9px_9px_0_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-[background-color,color,translate,box-shadow] duration-200 ${idx === links.length - 1 ? "sm:col-span-2" : ""}`}
                >
                  <span className="flex items-center justify-between text-[12px] font-black uppercase tracking-[0.2em] mb-2">
                    [ {link.label} ]
                    <span className="text-[20px] transition-transform duration-300 group-hover:rotate-45">↗</span>
                  </span>
                  <span className="block text-[17px] md:text-[18px] font-black truncate">{link.detail}</span>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right: message composer */}
          <div className="lg:col-span-7">
            <Composer />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full border-t-4 border-black py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-black uppercase text-[14px] md:text-[16px]">
          © 2026 Harihara Srinivas.
        </span>
        <button
          type="button"
          onClick={() => {
            playClick();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onMouseEnter={playHover}
          className="group border-[3px] border-black px-4 py-2 font-black uppercase text-[13px] tracking-[0.15em] shadow-[3px_3px_0_#000] hover:bg-black hover:text-white active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-[background-color,color,translate,box-shadow]"
        >
          <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1">↑</span> Back to top
        </button>
        <span className="font-black uppercase text-[14px] md:text-[16px]">
          Built with precision.
        </span>
      </footer>
    </section>
  );
}
