import React from 'react';
import { Award, GraduationCap } from 'lucide-react';

export default function ContributorBanner() {
  return (
    <div className="bg-slate-950 text-slate-200 border-b border-slate-900 text-[11px] py-3.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Academic Presentation Identifier */}
        <div className="flex items-center gap-2.5 text-slate-400 font-medium tracking-wide">
          <GraduationCap className="w-4 h-4 text-amber-500 shrink-0" />
          <span className="uppercase font-mono text-[10px] tracking-widest text-slate-400">
            DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING · LAB ASSIGNMENT PRESENTATION
          </span>
        </div>

        {/* Structured Contribution Attributions */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 md:justify-end">
          <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold flex items-center gap-1 shrink-0">
            <Award className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span>Project Contributors</span>
          </div>
          
          {/* Contributor 01 */}
          <div className="flex items-center gap-2 bg-slate-900 px-3.5 py-1 rounded-lg border border-slate-800 shadow-sm">
            <span className="font-bold text-slate-100 text-xs">K. Sathya</span>
            <span className="text-slate-700">|</span>
            <span className="text-[10px] text-slate-500">Reg No:</span>
            <span className="font-mono text-xs text-amber-400 font-bold tracking-wide">C25PG214CSC007</span>
          </div>
          
          {/* Contributor 02 */}
          <div className="flex items-center gap-2 bg-slate-900 px-3.5 py-1 rounded-lg border border-slate-800 shadow-sm">
            <span className="font-bold text-slate-100 text-xs">Rajeshwari</span>
            <span className="text-slate-700">|</span>
            <span className="text-[10px] text-slate-500">Reg No:</span>
            <span className="font-mono text-xs text-amber-400 font-bold tracking-wide">C25PG214CSC006</span>
          </div>
        </div>
      </div>
    </div>
  );
}
