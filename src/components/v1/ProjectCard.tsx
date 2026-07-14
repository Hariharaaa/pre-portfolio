import React from "react";

interface ProjectHighlight {
  text: string;
}

interface ProjectCardProps {
  index: number;
  number: string;
  name: string;
  tagline: string;
  badge: string;
  description: string;
  techStack: string[];
  highlights: ProjectHighlight[];
  link?: string;
}

export const ProjectCard = ({
  index,
  number,
  name,
  tagline,
  badge,
  description,
  techStack,
  highlights,
  link,
}: ProjectCardProps) => {
  return (
    <div 
      className="w-full font-sans mb-6 sticky"
      style={{ top: `calc(100px + ${index * 30}px)` }}
    >
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes glitch {
          0% { transform: translate(2px, 2px); }
          25% { transform: translate(-2px, -2px); }
          50% { transform: translate(-2px, 2px); }
          75% { transform: translate(2px, -2px); }
          100% { transform: translate(2px, 2px); }
        }
        .glitch-hover:hover {
          animation: glitch 0.3s infinite;
        }
        `
      }} />
      <div className="bg-white border-[6px] border-black p-[20px] md:p-[40px] shadow-[12px_12px_0_#000] hover:shadow-[17px_17px_0_#000] hover:-translate-x-[5px] hover:-translate-y-[5px] transition-all duration-300 flex flex-col group">
        
        {/* Top Row */}
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-[30px] gap-6">
          <div className="flex flex-col md:flex-row gap-[20px] md:gap-[40px]">
            <span className="text-[48px] md:text-[64px] font-black text-black leading-none drop-shadow-[4px_4px_0_rgba(0,0,0,0.1)]">
              {number}
            </span>
            <div className="flex flex-col items-start group/title">
              <h3 className="text-[28px] md:text-[32px] font-black text-black uppercase mb-[10px] relative overflow-hidden inline-block cursor-default">
                {name}
                <span className="absolute bottom-0 left-0 w-[90%] h-[4px] bg-black -translate-x-full group-hover/title:translate-x-0 transition-transform duration-300"></span>
              </h3>
              <p className="text-[16px] leading-[1.4] text-black font-bold max-w-[500px]">
                {tagline}
              </p>
            </div>
          </div>
          <div className="border-[3px] border-black bg-white text-black text-[12px] uppercase font-black px-4 py-2 shadow-[4px_4px_0_#000] self-start">
            {badge}
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[4px] bg-black my-[10px]"></div>

        {/* Body */}
        <div className="flex flex-col md:flex-row py-[30px] gap-8 md:gap-16">
          <div className="flex-1">
            <p className="text-[12px] uppercase text-black font-black mb-4 border-b-[3px] border-black inline-block pb-1">
              WHAT IT DOES
            </p>
            <p className="text-[16px] text-black leading-[1.6] font-medium border-[3px] border-black p-4 shadow-[4px_4px_0_#000]">
              {description}
            </p>
          </div>
          
          <div className="flex-1 flex flex-col">
            <p className="text-[12px] uppercase text-black font-black mb-4 border-b-[3px] border-black inline-block pb-1 self-start">
              TECH STACK
            </p>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="bg-white border-[3px] border-black text-black px-[12px] py-[6px] text-[14px] font-black shadow-[4px_4px_0_#000] hover:bg-black hover:text-white transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Brutalist Button (from Uiverse CSS) */}
            <div className="mt-auto pt-8">
              {link ? (
                <a href={link} target="_blank" rel="noopener noreferrer" className="inline-block w-full md:w-1/2">
                  <button className="relative overflow-hidden border-[3px] border-black bg-black text-white px-[20px] py-[12px] text-[18px] font-black uppercase cursor-pointer w-full group/btn transition-transform duration-300 active:scale-95 glitch-hover">
                    <span className="relative z-10 group-hover/btn:opacity-0 transition-opacity duration-300">View Project</span>
                    <div className="absolute top-0 left-0 w-full h-[105%] bg-white text-black flex items-center justify-center translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 font-black">
                      SURE?
                    </div>
                  </button>
                </a>
              ) : (
                <button className="relative overflow-hidden border-[3px] border-black bg-black text-white px-[20px] py-[12px] text-[18px] font-black uppercase cursor-pointer w-full md:w-1/2 group/btn transition-transform duration-300 active:scale-95 glitch-hover">
                  <span className="relative z-10 group-hover/btn:opacity-0 transition-opacity duration-300">View Project</span>
                  <div className="absolute top-0 left-0 w-full h-[105%] bg-white text-black flex items-center justify-center translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 font-black">
                    SURE?
                  </div>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Highlight Strip */}
        <div className="border-[4px] border-black bg-black text-white p-[20px] flex flex-wrap gap-x-8 gap-y-4 mt-[10px]">
          {highlights.map((highlight, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <div className="w-[12px] h-[12px] bg-white border-[2px] border-black"></div>
              <span className="text-[14px] font-bold text-white uppercase">{highlight.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
