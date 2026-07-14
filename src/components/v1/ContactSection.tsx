"use client";
import React, { useEffect, useRef } from "react";

export function ContactSection() {
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
      
      const rotateX = ((y - centerY) / centerY) * -5; // Max rotation ~5 degrees
      const rotateY = ((x - centerX) / centerX) * 5;

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
    <section id="contact" ref={sectionRef} className="w-full bg-[#FFFFFF] font-sans text-[#000000] pt-24 px-8 md:px-16 overflow-hidden flex flex-col border-t-4 border-[#000000]">
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
        .delay-2 { animation-delay: -1.5s; }
        .delay-3 { animation-delay: -3s; }
        `
      }} />

      <div className="max-w-7xl mx-auto w-full flex-grow mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Column (The Hook) */}
          <div className="flex flex-col justify-center">
            <h2 className="text-[48px] md:text-[64px] font-black uppercase leading-[1.1] mb-6 tracking-tighter">
              LET'S BUILD SOMETHING INTENTIONAL.
            </h2>
            <p className="text-[18px] md:text-[20px] font-bold leading-[1.6] mb-12">
              Currently open for 2027 software engineering graduate roles and freelance digital growth projects. Drop a line.
            </p>
            
            <div className="flex flex-col gap-6">
              {[
                { label: "Email", url: "mailto:hello@example.com", delay: "delay-1" },
                { label: "LinkedIn", url: "https://www.linkedin.com/in/harihara-srinivas-05798b333/", delay: "delay-2" },
                { label: "GitHub", url: "https://github.com/Hariharaaa", delay: "delay-3" }
              ].map((link, idx) => (
                <a 
                  key={idx} 
                  href={link.url}
                  className={`bento-card float-anim ${link.delay} bg-[#FFFFFF] text-[#000000] border-4 border-[#000000] px-8 py-6 font-black uppercase text-[20px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-200 block text-center w-full`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  [ {link.label} ]
                </a>
              ))}
            </div>
          </div>

          {/* Right Column (The Form) */}
          <div className="flex flex-col justify-center">
            <form className="bento-card float-anim delay-1 bg-[#FFFFFF] border-4 border-[#000000] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12 flex flex-col gap-8 w-full" style={{ transformStyle: "preserve-3d" }}>
              <div className="flex flex-col gap-2">
                <label className="font-black uppercase text-[14px]">Name</label>
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="border-4 border-[#000000] border-b-8 p-4 bg-[#FFFFFF] text-lg focus:outline-none focus:translate-y-[2px] focus:border-b-6 transition-all font-bold placeholder-[#000000] placeholder-opacity-30 w-full"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-black uppercase text-[14px]">Email</label>
                <input 
                  type="email" 
                  placeholder="john@example.com"
                  className="border-4 border-[#000000] border-b-8 p-4 bg-[#FFFFFF] text-lg focus:outline-none focus:translate-y-[2px] focus:border-b-6 transition-all font-bold placeholder-[#000000] placeholder-opacity-30 w-full"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-black uppercase text-[14px]">Message</label>
                <textarea 
                  placeholder="What's on your mind?"
                  rows={4}
                  className="border-4 border-[#000000] border-b-8 p-4 bg-[#FFFFFF] text-lg focus:outline-none focus:translate-y-[2px] focus:border-b-6 transition-all font-bold placeholder-[#000000] placeholder-opacity-30 w-full resize-none"
                  required
                ></textarea>
              </div>

              <button 
                type="submit"
                className="mt-4 bg-[#000000] text-[#FFFFFF] border-4 border-[#000000] px-8 py-5 font-black uppercase text-[20px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFFFFF] hover:text-[#000000] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 w-full"
              >
                [ SEND MESSAGE ]
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Footer */}
      <footer className="w-full border-t-4 border-[#000000] pt-8 pb-8 flex flex-col md:flex-row items-center justify-between mt-auto">
        <span className="font-black uppercase text-[14px] md:text-[16px] mb-4 md:mb-0">
          © 2026 Harihara Srinivas.
        </span>
        <span className="font-black uppercase text-[14px] md:text-[16px]">
          Built with precision.
        </span>
      </footer>

    </section>
  );
}
