"use client";
import React from "react";

interface SkillCardProps {
  index: number;
  domainName: string;
  badgeText: string;
  skills: string[];
}

export const SkillCard = ({ index, domainName, badgeText, skills }: SkillCardProps) => {
  return (
    <div className="w-full h-full p-4 [perspective:1000px] font-sans">
      <style dangerouslySetInnerHTML={{
        __html: `
        .uiverse-card-${index} {
          background: linear-gradient(135deg, #0000 18.75%, #f3f3f3 0 31.25%, #0000 0),
            repeating-linear-gradient(45deg, #f3f3f3 -6.25% 6.25%, #141414 0 18.75%);
          background-size: 60px 60px;
          background-position: 0 0, 0 0;
          background-color: #141414;
          transition: all 0.5s ease-in-out;
        }
        .uiverse-card-${index}:hover {
          background-position: -100px 100px, -100px 100px;
          transform: rotate3d(0.5, 1, 0, 30deg);
        }
        `
      }} />
      <div 
        className={`uiverse-card-${index} pt-[50px] border-[3px] border-[#141414] [transform-style:preserve-3d] w-full h-full shadow-[0px_30px_30px_-10px_rgba(142,142,142,0.3)] relative flex flex-col`}
      >
        {/* Date Box (Used for Index and Badge) */}
        <div className="absolute top-[30px] right-[30px] h-[60px] w-[60px] bg-[#141414] border border-white p-[10px] [transform:translate3d(0px,0px,80px)] shadow-[0px_17px_10px_-10px_rgba(100,100,111,0.2)] flex flex-col justify-center items-center z-10">
          <span className="block text-center text-white text-[9px] font-bold">
            NO.
          </span>
          <span className="block text-center text-[20px] font-black text-white">
            {String(index).padStart(2, '0')}
          </span>
        </div>

        {/* Content Box */}
        <div className="bg-white flex-grow flex flex-col transition-all duration-500 ease-in-out pt-[60px] pb-[25px] px-[25px] [transform-style:preserve-3d]">
          <h3 className="inline-block text-[#141414] text-[25px] font-black transition-all duration-500 ease-in-out [transform:translate3d(0px,0px,50px)] hover:[transform:translate3d(0px,0px,60px)] mb-2">
            {domainName}
          </h3>
          
          <div className="mt-2 text-[#141414] text-[10px] font-black uppercase tracking-widest transition-all duration-500 ease-in-out [transform:translate3d(0px,0px,40px)] mb-4">
            {badgeText}
          </div>

          <div className="mt-auto pt-[10px] text-[12px] font-bold text-[#141414] transition-all duration-500 ease-in-out [transform:translate3d(0px,0px,30px)] hover:[transform:translate3d(0px,0px,60px)]">
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-[#141414] text-white px-2 py-1 rounded-sm text-[10px] uppercase tracking-wide"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
