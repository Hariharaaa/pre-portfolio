"use client";

import React, { useEffect } from "react";
import Image from "next/image";

const AntiGravityHero = () => {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>(".antigravity-item");
    
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      items.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const itemCenterX = rect.left + rect.width / 2;
        const itemCenterY = rect.top + rect.height / 2;

        const deltaX = itemCenterX - mouseX;
        const deltaY = itemCenterY - mouseY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        
        const repelRadius = 150;
        const maxPush = 30;

        if (distance < repelRadius) {
          const strength = (repelRadius - distance) / repelRadius;
          const pushX = (deltaX / distance) * maxPush * strength;
          const pushY = (deltaY / distance) * maxPush * strength;

          item.style.transform = `translate(${pushX}px, ${pushY}px)`;
        } else {
          item.style.transform = "translate(0px, 0px)";
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-white text-black font-sans selection:bg-black selection:text-white">
      {/* Top Navigation */}
      <nav className="absolute top-0 left-0 w-full flex items-center justify-between p-8 z-50">
        <div className="text-xl md:text-2xl font-black tracking-tighter">HARIHARA S.</div>
        <div className="hidden md:flex gap-8 text-sm font-bold tracking-widest uppercase">
          {["Work", "Services", "About", "Contact"].map((link) => (
            <a
              key={link}
              href="#"
              className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-black after:transition-all after:duration-300 hover:after:w-full"
            >
              {link}
            </a>
          ))}
        </div>
      </nav>

      {/* The Text Zone (Top 60vh) */}
      <div className="relative z-40 flex h-[60vh] w-full flex-col items-center justify-center pt-16 px-8 text-center">
        
        {/* Antigravity Container */}
        <div className="antigravity-item flex flex-col items-center transition-transform duration-300 ease-out will-change-transform">
          <div className="animate-float flex flex-col items-center">
            
            <div className="mb-4 text-xs md:text-sm font-black tracking-[0.3em] text-black/50 uppercase">
              Harihara Srinivas
            </div>

            <h1 className="mb-6 w-full max-w-[80%] text-3xl font-black leading-tight tracking-tighter md:text-5xl lg:text-6xl">
              ENGINEERING INTELLIGENT PLATFORMS AND DESIGNING DIGITAL EXPERIENCES THAT STAND OUT FROM THE CROWD.
            </h1>

            <p className="mb-8 w-full max-w-[600px] text-base font-medium leading-relaxed text-black/70 md:text-lg">
              Computer Science Engineering student building intelligent backend systems and scalable full-stack applications. Actively seeking 2027 software engineering graduate roles.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <button className="flex h-12 md:h-14 items-center justify-center bg-black px-8 text-xs md:text-sm font-bold tracking-widest text-white transition-colors hover:bg-black/80">
                SEE MY WORK
              </button>
              <button className="flex h-12 md:h-14 items-center justify-center border-2 border-black bg-transparent px-8 text-xs md:text-sm font-bold tracking-widest text-black transition-colors hover:bg-black/5">
                DOWNLOAD RESUME
              </button>
            </div>
            
          </div>
        </div>

      </div>

      {/* The Graphics Zone (Bottom 40vh) */}
      <div className="absolute bottom-0 left-0 h-[40vh] w-full overflow-hidden pointer-events-none">
        
        {/* Layer 1: The Crowd (CSS Panning Background) */}
        <div 
          className="animate-pan absolute bottom-0 left-0 h-full w-full opacity-60 z-0" 
          style={{
            backgroundImage: "url('/images/peeps/all-peeps.png')",
            backgroundSize: "auto 100%",
            backgroundPosition: "bottom left",
            backgroundRepeat: "repeat-x"
          }}
        />

        {/* Layer 2: The Static Man */}
        <div className="absolute bottom-0 left-1/2 z-10 h-[80%] -translate-x-1/2">
          <Image
            src="/images/hero.png"
            alt="Harihara Srinivas"
            width={300}
            height={600}
            className="h-full w-auto object-contain drop-shadow-xl"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default AntiGravityHero;
