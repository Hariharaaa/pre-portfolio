"use client";
import React, { useCallback, useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { playClick, playHover } from "@/components/v1/sound";

import claude1 from "../../../public/gallery/claude-1.jpg";
import claude2 from "../../../public/gallery/claude-2.jpg";
import codex1 from "../../../public/gallery/codex-1.jpg";
import codex2 from "../../../public/gallery/codex-2.jpg";
import sebi1 from "../../../public/gallery/sebi-1.jpg";
import sebi2 from "../../../public/gallery/sebi-2.jpg";
import srm1 from "../../../public/gallery/srm-1.jpg";
import srm2 from "../../../public/gallery/srm-2.jpg";
import productive from "../../../public/gallery/productive.jpg";

interface Photo {
  src: StaticImageData;
  alt: string;
}

interface GalleryEvent {
  number: string;
  title: string;
  badge: string;
  description: string;
  aspect: string; // tailwind aspect class for this event's photos
  photos: Photo[];
}

const events: GalleryEvent[] = [
  {
    number: "01",
    title: "Superhuman Lab",
    badge: "CLAUDE COMMUNITY · BENGALURU",
    description: "A two-day Claude Community build sprint on assistive technology in Bengaluru. Our team wired sensors into a wearable that helps visually impaired people navigate unfamiliar spaces.",
    aspect: "aspect-[3/4]",
    photos: [
      { src: claude1, alt: "Superhuman Lab attendee badge next to an orange robot figure and a laptop" },
      { src: claude2, alt: "Sensor-wired cap prototype and laptop on a table at Superhuman Lab" },
    ],
  },
  {
    number: "02",
    title: "Codex Nightline",
    badge: "OPENAI CODEX · KOCHI METRO",
    description: "Travelled solo from Tamil Nadu to Kochi for the world's first AI build sprint inside a moving metro. 100 solo builders, one midnight train and two hours to build something real with AI.",
    aspect: "aspect-[4/3]",
    photos: [
      { src: codex1, alt: "Codex Nightline website on a laptop beside a participant badge and an energy drink" },
      { src: codex2, alt: "Builders coding on laptops inside a moving Kochi Metro coach" },
    ],
  },
  {
    number: "03",
    title: "SEBI Hackathon",
    badge: "SEBI · GLOBAL FINTECH FEST 2026",
    description: "Won the Jury Award and ₹50,000 with Team Vantage at the SEBI Securities Market TechSprint. Held on the main stage of Global Fintech Fest 2026.",
    aspect: "aspect-[4/3]",
    photos: [
      { src: sebi1, alt: "Team Vantage receiving the ₹50,000 SEBI Jury Award cheque on stage at Global Fintech Fest 2026" },
      { src: sebi2, alt: "Holding the Global Fintech Fest 2026 event booklet" },
    ],
  },
  {
    number: "04",
    title: "NXTGEN Hackathon",
    badge: "SRMIST · 24 HOURS",
    description: "A 24-hour hackathon at SRMIST where our team built TrustPay, a payment system with secure PIN checks, intent-based transactions, emergency transfers and a blockchain audit trail. Things broke, flows failed, and we kept rebuilding until it was ready to present.",
    aspect: "aspect-[3/4]",
    photos: [
      { src: srm1, alt: "NXTGEN Hackathon screen showing the 24:00:00 countdown above laptops at SRMIST" },
      { src: srm2, alt: "Teammates coding on laptops in the NXTGEN Hackathon hall at SRMIST" },
    ],
  },
];

const closer = {
  title: "Just Build.",
  badge: "ANY DAY · ANYWHERE",
  description: "No hackathon, no deadline, no prize. Whenever I need a reset, I open the laptop and build something new.",
  photo: { src: productive, alt: "Late-night setup with a laptop running a coding session in front of a monitor" } as Photo,
};

// Flat list so the lightbox can step through every photo in order
const allPhotos: { photo: Photo; caption: string }[] = [
  ...events.flatMap((e) => e.photos.map((photo) => ({ photo, caption: e.title }))),
  { photo: closer.photo, caption: closer.title },
];

// Where each event's photos begin in allPhotos
const eventStarts = events.map((_, i) => events.slice(0, i).reduce((n, e) => n + e.photos.length, 0));

function GalleryPhoto({ photo, aspect, tilt, onOpen, dark = false }: { photo: Photo; aspect: string; tilt: string; onOpen: () => void; dark?: boolean }) {
  const frame = dark
    ? "border-white shadow-[6px_6px_0_#888888] hover:shadow-[10px_10px_0_#888888]"
    : "border-black shadow-[6px_6px_0_#000] hover:shadow-[10px_10px_0_#000]";
  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={playHover}
      aria-label={`Open photo: ${photo.alt}`}
      className={`group/photo relative block w-full ${aspect} overflow-hidden border-[4px] bg-black ${frame} ${tilt} hover:rotate-0 hover:-translate-x-[3px] hover:-translate-y-[3px] transition-all duration-300 cursor-zoom-in outline-none focus-visible:ring-4 focus-visible:ring-black focus-visible:ring-offset-4`}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        placeholder="blur"
        fill
        sizes="(min-width: 768px) 30vw, 90vw"
        className="object-cover [@media(hover:hover)]:grayscale group-hover/photo:grayscale-0 group-hover/photo:scale-105 transition-all duration-500 ease-out"
      />
      <span className="absolute bottom-2 right-2 bg-white text-black border-[3px] border-black text-[10px] font-black uppercase tracking-[0.15em] px-2 py-1 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300">
        ⤢ View
      </span>
    </button>
  );
}

function Lightbox({ index, onClose, onStep }: { index: number; onClose: () => void; onStep: (dir: 1 | -1) => void }) {
  const { photo, caption } = allPhotos[index];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose, onStep]);

  const navButton = "border-[3px] border-white bg-black text-white font-black uppercase text-[12px] tracking-[0.15em] px-3 py-3 md:px-4 hover:bg-white hover:text-black transition-colors";

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${caption} photo`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] bg-black/90 flex flex-col items-center justify-center p-3 md:p-10"
    >
      <motion.div
        key={index}
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl h-[60vh] md:h-[70vh] border-[4px] md:border-[6px] border-white bg-black shadow-[12px_12px_0_#888888]"
      >
        <Image src={photo.src} alt={photo.alt} fill sizes="90vw" className="object-contain" />
      </motion.div>

      <div onClick={(e) => e.stopPropagation()} className="mt-5 md:mt-8 w-full max-w-5xl flex flex-wrap items-center justify-between gap-4 text-white">
        <p className="font-black uppercase tracking-[0.15em] text-[14px]">
          {caption} <span className="text-[#888888]">· {index + 1} / {allPhotos.length}</span>
        </p>
        <div className="flex gap-3">
          <button type="button" onClick={() => onStep(-1)} className={navButton} aria-label="Previous photo">← Prev</button>
          <button type="button" onClick={() => onStep(1)} className={navButton} aria-label="Next photo">Next →</button>
          <button type="button" onClick={onClose} className={navButton} aria-label="Close">✕ Close</button>
        </div>
      </div>
    </motion.div>
  );
}

export function GallerySection() {
  const [open, setOpen] = useState<number | null>(null);

  const openPhoto = (i: number) => {
    playClick();
    setOpen(i);
  };
  const close = useCallback(() => {
    playClick();
    setOpen(null);
  }, []);
  const step = useCallback((dir: 1 | -1) => {
    playClick();
    setOpen((i) => (i === null ? i : (i + dir + allPhotos.length) % allPhotos.length));
  }, []);

  return (
    <section id="gallery" className="bg-white text-black font-sans w-full py-20 px-5 md:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-[80px]">
          <p className="text-[14px] uppercase text-black tracking-[0.2em] mb-[16px] font-black border-4 border-black inline-block px-4 py-2 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            [ GALLERY ]
          </p>
          <div className="mb-8 mt-6">
            <h2 className="text-[40px] sm:text-[56px] md:text-[80px] font-black text-black uppercase leading-[1.0] tracking-tighter mb-2">
              Memories.
            </h2>
            <h2 className="text-[40px] sm:text-[56px] md:text-[80px] font-black text-black uppercase leading-[1.0] tracking-tighter text-transparent" style={{ WebkitTextStroke: "2px #000000" }}>
              Made Building.
            </h2>
          </div>
          <p className="text-[18px] md:text-[22px] text-black max-w-[640px] leading-[1.6] font-bold border-l-8 border-black pl-6">
            Hackathons, moving trains, big stages and late nights. The moments behind the projects.
          </p>
        </div>

        {/* Event Cards */}
        <div className="flex flex-col gap-16">
          {events.map((event, idx) => {
            const flipped = idx % 2 === 1;
            const start = eventStarts[idx];
            return (
              <motion.article
                key={event.number}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white border-[6px] border-black p-[20px] md:p-[40px] shadow-[12px_12px_0_#000] grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center"
              >
                {/* Photos */}
                <div className={`md:col-span-7 grid grid-cols-2 gap-3 md:gap-5 ${flipped ? "md:order-2" : ""}`}>
                  {event.photos.map((photo, i) => (
                    <GalleryPhoto
                      key={i}
                      photo={photo}
                      aspect={event.aspect}
                      tilt={i % 2 === 0 ? "-rotate-1" : "rotate-1"}
                      onOpen={() => openPhoto(start + i)}
                    />
                  ))}
                </div>

                {/* Text */}
                <div className={`md:col-span-5 flex flex-col ${flipped ? "md:order-1" : ""}`}>
                  <div className="flex items-start justify-between gap-4 mb-[24px]">
                    <span className="text-[48px] md:text-[64px] font-black text-black leading-none drop-shadow-[4px_4px_0_rgba(0,0,0,0.1)]">
                      {event.number}
                    </span>
                    <div className="border-[3px] border-black bg-white text-black text-[11px] md:text-[12px] uppercase font-black px-3 py-2 shadow-[4px_4px_0_#000] text-right">
                      {event.badge}
                    </div>
                  </div>
                  <h3 className="text-[28px] md:text-[36px] font-black text-black uppercase leading-[1.05] mb-[16px]">
                    {event.title}
                  </h3>
                  <div className="w-full h-[4px] bg-black mb-[20px]"></div>
                  <p className="text-[16px] text-black leading-[1.6] font-medium border-[3px] border-black p-4 shadow-[4px_4px_0_#000]">
                    {event.description}
                  </p>
                </div>
              </motion.article>
            );
          })}

          {/* Closing card: just build */}
          <motion.article
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-black text-white border-[6px] border-black p-[20px] md:p-[40px] shadow-[12px_12px_0_#888888] grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center"
          >
            <div className="md:col-span-4">
              <GalleryPhoto
                photo={closer.photo}
                aspect="aspect-[3/4]"
                tilt="rotate-1"
                dark
                onOpen={() => openPhoto(allPhotos.length - 1)}
              />
            </div>
            <div className="md:col-span-8 flex flex-col">
              <p className="text-[12px] md:text-[14px] uppercase tracking-[0.2em] font-black border-[3px] border-white self-start px-4 py-2 mb-6">
                [ {closer.badge} ]
              </p>
              <h3 className="text-[56px] md:text-[96px] font-black uppercase leading-[0.95] tracking-tighter mb-6">
                {closer.title}
              </h3>
              <p className="text-[18px] md:text-[22px] font-bold leading-[1.6] max-w-[560px] border-l-8 border-white pl-6">
                {closer.description}
              </p>
            </div>
          </motion.article>
        </div>
      </div>

      <AnimatePresence>
        {open !== null && <Lightbox key="lightbox" index={open} onClose={close} onStep={step} />}
      </AnimatePresence>
    </section>
  );
}
