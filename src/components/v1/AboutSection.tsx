"use client";
import React, { useEffect, useRef } from "react";

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".bento-card");
    if (!cards) return;

    const handleMouseMove = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const card = mouseEvent.currentTarget as HTMLElement;
      const rect = card.getBoundingClientRect();
      const x = mouseEvent.clientX - rect.left; // x position within the element.
      const y = mouseEvent.clientY - rect.top;  // y position within the element.
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -8; // Max rotation 8 degrees
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.transition = "none";
    };

    const handleMouseLeave = (e: Event) => {
      const card = e.currentTarget as HTMLElement;
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
      card.style.transition = "transform 0.5s ease-out";
    };

    cards.forEach(card => {
      card.addEventListener("mousemove", handleMouseMove);
      card.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      cards.forEach(card => {
        card.removeEventListener("mousemove", handleMouseMove);
        card.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="w-full bg-[#FFFFFF] font-sans text-[#000000] py-24 px-8 md:px-16 overflow-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes float {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-6px); }
        }
        .float-anim {
          animation: float 4s ease-in-out infinite alternate;
        }
        .delay-1 { animation-delay: 0s; }
        .delay-2 { animation-delay: -1s; }
        .delay-3 { animation-delay: -2s; }

        .hazard-stripe {
          background: repeating-linear-gradient(
            -45deg,
            #000000,
            #000000 10px,
            #FFFFFF 10px,
            #FFFFFF 20px
          );
          height: 20px;
          width: 100%;
          border-bottom: 4px solid #000000;
        }
        `
      }} />

      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-[48px] md:text-[72px] font-black uppercase leading-tight mb-2 tracking-tighter">
            I'm Harihara Srinivas.
          </h2>
          {/* Outlined text effect using text-shadow / webkit-text-stroke */}
          <h3 className="text-[32px] md:text-[48px] font-black uppercase leading-tight tracking-tighter text-transparent" style={{ WebkitTextStroke: "2px #000000" }}>
            I build things that matter.
          </h3>
        </div>

        {/* Bento Grid Structure */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Left Column - The Bio Card (Span 7) */}
          <div className="md:col-span-7">
            <div className="bento-card float-anim delay-1 bg-[#FFFFFF] border-4 border-[#000000] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none h-full p-8 md:p-10 flex flex-col justify-between" style={{ transformStyle: "preserve-3d" }}>
              <div>
                <span className="inline-block border-4 border-[#000000] px-4 py-2 text-[14px] font-black uppercase mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-[#FFFFFF]">
                  [ THE STORY ]
                </span>
                
                <p className="text-[18px] md:text-[22px] font-bold leading-[1.6] mb-12">
                  I'm a Computer Science Engineering student bridging the gap between heavy backend logic and high-converting digital design. Whether I'm training AI models for Valter AI or designing brand systems through WebReel Studio, my approach is the same: build it robust, make it scale, and ensure it stands out.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 mt-auto">
                {[
                  { label: "GitHub", url: "https://github.com/Hariharaaa" },
                  { label: "LinkedIn", url: "https://www.linkedin.com/in/harihara-srinivas-05798b333/" },
                  { label: "Resume", url: "#" }
                ].map((btn, idx) => (
                  <a 
                    key={idx} 
                    href={btn.url}
                    target={btn.url.startsWith("http") ? "_blank" : undefined}
                    rel={btn.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="bg-[#000000] text-[#FFFFFF] border-4 border-[#000000] px-6 py-3 font-black uppercase text-[14px] hover:bg-[#FFFFFF] hover:text-[#000000] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none duration-200 inline-block"
                  >
                    [ {btn.label} ]
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - The Details Column (Span 5) */}
          <div className="md:col-span-5 flex flex-col gap-10">
            
            {/* Top Card (Education) */}
            <div className="bento-card float-anim delay-2 bg-[#FFFFFF] border-4 border-[#000000] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none flex-1 flex flex-col relative" style={{ transformStyle: "preserve-3d" }}>
              <div className="hazard-stripe w-full"></div>
              <div className="p-8 md:p-10 flex flex-col flex-1 justify-center">
                <span className="inline-block border-4 border-[#000000] px-4 py-2 text-[14px] font-black uppercase mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-[#FFFFFF] self-start">
                  [ ACADEMICS ]
                </span>
                <h4 className="text-[24px] font-black uppercase mb-2">Bachelor of Engineering</h4>
                <p className="text-[18px] font-bold">Computer Science Engineering</p>
              </div>
            </div>

            {/* Bottom Card (Location & Status) */}
            <div className="bento-card float-anim delay-3 bg-[#000000] text-[#FFFFFF] border-4 border-[#000000] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none flex-1 p-8 md:p-10 flex flex-col justify-center relative" style={{ transformStyle: "preserve-3d" }}>
              <span className="inline-block border-4 border-[#FFFFFF] px-4 py-2 text-[14px] font-black uppercase mb-6 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] bg-[#000000] self-start">
                [ STATUS ]
              </span>
              <h4 className="text-[24px] font-black uppercase mb-2">Based in India.</h4>
              <p className="text-[18px] font-bold">Actively seeking 2027 Software Engineering Graduate Roles.</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
