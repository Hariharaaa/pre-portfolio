import React from "react";

interface AcrossProjectsCardProps {
  skill: string;
  project: string;
}

export const AcrossProjectsCard = ({ skill, project }: AcrossProjectsCardProps) => {
  return (
    <div className="bg-white border border-gray-300 rounded-[12px] flex flex-col items-center justify-center py-[24px] px-[16px] transition-colors hover:border-black shadow-sm">
      <div className="mb-[12px] text-black">
        {/* Square icon / folder representation */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
        </svg>
      </div>
      <h3 className="font-bold text-black text-[13px] mb-[4px]">{skill}</h3>
      <p className="text-[#555] text-[11px]">{project}</p>
    </div>
  );
};
