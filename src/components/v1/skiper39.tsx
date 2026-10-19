"use client";

import { gsap } from "gsap";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface CrowdCanvasProps {
  src: string;
  rows?: number;
  cols?: number;
}

const CrowdCanvas = ({ src, rows = 15, cols = 7 }: CrowdCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const config = {
      src,
      rows,
      cols,
    };

    // UTILS
    const randomRange = (min: number, max: number) => min + Math.random() * (max - min);
    const randomIndex = (array: any[]) => randomRange(0, array.length) | 0;
    const removeFromArray = (array: any[], i: number) => array.splice(i, 1)[0];
    const removeItemFromArray = (array: any[], item: any) => removeFromArray(array, array.indexOf(item));
    const removeRandomFromArray = (array: any[]) => removeFromArray(array, randomIndex(array));
    const getRandomFromArray = (array: any[]) => array[randomIndex(array) | 0];

    // TWEEN FACTORIES
    const resetPeep = ({ stage, peep }: { stage: any; peep: any }) => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      const offsetY = 100 - 250 * gsap.parseEase("power2.in")(Math.random());
      const startY = stage.height - peep.height + offsetY;
      let startX: number;
      let endX: number;

      if (direction === 1) {
        startX = -peep.width;
        endX = stage.width;
        peep.scaleX = 1;
      } else {
        startX = stage.width + peep.width;
        endX = 0;
        peep.scaleX = -1;
      }

      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;

      return {
        startX,
        startY,
        endX,
      };
    };

    const normalWalk = ({ peep, props }: { peep: any; props: any }) => {
      const { startX, startY, endX } = props;
      const xDuration = 10;
      const yDuration = 0.25;

      const tl = gsap.timeline();
      tl.timeScale(randomRange(0.5, 1.5));
      tl.to(
        peep,
        { duration: xDuration, x: endX, ease: "none" },
        0
      );
      tl.to(
        peep,
        { duration: yDuration, repeat: xDuration / yDuration, yoyo: true, y: startY - 10 },
        0
      );

      return tl;
    };

    const walks = [normalWalk];

    // TYPES
    type Peep = {
      image: HTMLImageElement;
      rect: number[];
      width: number;
      height: number;
      drawArgs: any[];
      x: number;
      y: number;
      anchorY: number;
      scaleX: number;
      walk: any;
      setRect: (rect: number[]) => void;
      render: (ctx: CanvasRenderingContext2D) => void;
    };

    // FACTORY FUNCTIONS
    const createPeep = ({ image, rect, width, height }: { image: HTMLImageElement; rect: number[], width?: number, height?: number }): Peep => {
      const peep: Peep = {
        image,
        rect: [],
        width: 0,
        height: 0,
        drawArgs: [],
        x: 0,
        y: 0,
        anchorY: 0,
        scaleX: 1,
        walk: null,
        setRect: (rect: number[]) => {
          peep.rect = rect;
          peep.width = width || rect[2];
          peep.height = height || rect[3];
          peep.drawArgs = [peep.image, ...rect, 0, 0, peep.width, peep.height];
        },
        render: (ctx: CanvasRenderingContext2D) => {
          ctx.save();
          ctx.translate(peep.x, peep.y);
          ctx.scale(peep.scaleX, 1);
          ctx.drawImage(
            peep.image,
            peep.rect[0],
            peep.rect[1],
            peep.rect[2],
            peep.rect[3],
            0,
            0,
            peep.width,
            peep.height
          );
          ctx.restore();
        },
      };

      peep.setRect(rect);
      return peep;
    };

    // MAIN
    const stage = { width: 0, height: 0 };
    const allPeeps: Peep[] = [];
    const availablePeeps: Peep[] = [];
    const crowd: Peep[] = [];

    const createPeeps = (img: HTMLImageElement) => {
      const { rows, cols } = config;
      const { naturalWidth: width, naturalHeight: height } = img;
      const total = rows * cols;
      const rectWidth = width / rows;
      const rectHeight = height / cols;

      for (let i = 0; i < total; i++) {
        allPeeps.push(
          createPeep({
            image: img,
            rect: [
              (i % rows) * rectWidth,
              ((i / rows) | 0) * rectHeight,
              rectWidth,
              rectHeight,
            ],
          })
        );
      }
    };

    const initCrowd = () => {
      while (availablePeeps.length) {
        addPeepToCrowd().walk.progress(Math.random());
      }
    };

    const addPeepToCrowd = () => {
      const peep = removeRandomFromArray(availablePeeps);
      const walk = getRandomFromArray(walks)({
        peep,
        props: resetPeep({ peep, stage }),
      }).eventCallback("onComplete", () => {
        removePeepFromCrowd(peep);
        addPeepToCrowd();
      });

      peep.walk = walk;
      crowd.push(peep);
      crowd.sort((a, b) => a.anchorY - b.anchorY);

      return peep;
    };

    const removePeepFromCrowd = (peep: Peep) => {
      removeItemFromArray(crowd, peep);
      availablePeeps.push(peep);
    };

    const render = () => {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(devicePixelRatio, devicePixelRatio);

      crowd.forEach((peep) => {
        peep.render(ctx);
      });

      ctx.restore();
    };

    const resize = () => {
      if (!canvas) return;
      stage.width = canvas.clientWidth;
      stage.height = canvas.clientHeight;
      canvas.width = stage.width * devicePixelRatio;
      canvas.height = stage.height * devicePixelRatio;

      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill();
      });

      crowd.length = 0;
      availablePeeps.length = 0;
      availablePeeps.push(...allPeeps);

      initCrowd();
    };

    const loadImages = async () => {
      const peepsPromise = new Promise<HTMLImageElement>((resolve) => {
        const img = new window.Image();
        img.onload = () => resolve(img);
        img.src = config.src;
      });

      const images = await Promise.all([peepsPromise]);
      const peepsImg = images[0];

      createPeeps(peepsImg);
      resize();
      gsap.ticker.add(render);
    };

    loadImages();

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(render);
      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill();
      });
    };
  }, [src, rows, cols]);

  return <canvas ref={canvasRef} className="absolute bottom-0 h-[90vh] w-full" />;
};

const navLinks = [
  { href: "#work", label: "WORK" },
  { href: "#skills", label: "SKILLS" },
  { href: "#about", label: "ABOUT" },
  { href: "#contact", label: "CONTACT" },
];

const Skiper39 = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative h-svh w-full overflow-hidden bg-white text-black">
      {/* Top Navigation */}
      <nav className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-5 md:px-16 py-6 border-b border-gray-200">
        <div className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tighter text-black">
          HARIHARA SRINIVAS
        </div>
        <div className="hidden md:flex items-center gap-10 text-sm font-semibold tracking-wide text-gray-800">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-black transition-colors">{link.label}</a>
          ))}
        </div>

        {/* Phone menu */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          className="md:hidden border-[3px] border-black bg-white text-black text-[12px] font-black uppercase tracking-[0.15em] px-3 py-2 shadow-[3px_3px_0_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-[translate,box-shadow]"
        >
          {menuOpen ? "✕ Close" : "☰ Menu"}
        </button>
      </nav>

      {menuOpen && (
        <div id="mobile-menu" className="md:hidden absolute top-[76px] left-0 w-full z-50 bg-white border-y-4 border-black shadow-[0_8px_0_#000] flex flex-col">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-5 py-4 text-[22px] font-black tracking-tighter border-b-2 border-black last:border-b-0 active:bg-black active:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* "WHY ME?" Text with hover roll effect */}
      <div className="absolute top-[25%] left-1/2 z-20 -translate-x-1/2 text-black cursor-pointer text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase">
        <div className="group overflow-hidden h-[1.1em] leading-[1.1em]">
          <div className="transition-transform duration-[600ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-1/2">
            <div className="h-[1.1em] flex items-center justify-center">WHY ME?</div>
            <div 
              className="h-[1.1em] flex items-center justify-center text-black font-black" 
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              TRY ME!
            </div>
          </div>
        </div>
        <div 
          className="absolute -bottom-8 md:-bottom-12 left-1/2 -translate-x-1/2 text-black text-lg md:text-xl font-bold tracking-tighter uppercase whitespace-nowrap pointer-events-none" 
        >
          SCROLL DECIDE
        </div>
      </div>

      <div className="absolute bottom-0 h-full w-screen z-0">
        
        {/* Layer 1: Background (The Man) */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 z-0 h-[45vh] -translate-x-1/2">
          <Image
            src="/images/hero.png"
            alt="Harihara Srinivas"
            width={1387}
            height={768}
            className="h-full w-auto object-contain"
            priority
            unoptimized={true}
          />
        </div>

        {/* Layer 2: Foreground (The Walking Crowd Canvas) */}
        <div className="absolute bottom-0 left-0 h-full w-full z-10 pointer-events-none">
          <CrowdCanvas src="/images/peeps/all-peeps.png" rows={15} cols={7} />
        </div>

      </div>

    </div>
  );
};

export { CrowdCanvas, Skiper39 };
