import React from "react";

interface SkillLinkCardProps {
  primarySkill: string;
  project: string;
}

export const SkillLinkCard = ({ primarySkill, project }: SkillLinkCardProps) => {
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 flex flex-col items-center justify-center text-center transition-colors hover:bg-[#222]">
      <div className="mb-3">
        <svg
          className="w-8 h-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="square"
            strokeLinejoin="miter"
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
          />
        </svg>
      </div>
      <h4 className="text-white font-bold text-sm mb-1">{primarySkill}</h4>
      <p className="text-[#888888] text-xs font-semibold tracking-wide">{project}</p>
    </div>
  );
};
