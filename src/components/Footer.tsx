import React from 'react';
import { Award, GraduationCap } from 'lucide-react';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Footer({ onScrollToSection }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 py-14 text-xs select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Upper Zone */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 pb-8 border-b border-slate-900">
          
          {/* Column 1: Info */}
          <div className="space-y-4 max-w-sm">
            <h4 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0" />
              <span>College Event <span className="text-blue-500">Landing Page</span></span>
            </h4>
            <p className="text-slate-500 leading-relaxed text-xs">
              This system represents a premium, high-fidelity college event platform engineered by the Department of Computer Science & Engineering at Excel College of Engineering & Technology.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <span className="font-extrabold uppercase tracking-widest text-[9px] text-slate-500 block">Sitemap Coordinates</span>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2.5 font-bold">
              {[
                { id: 'hero', label: 'Home Page' },
                { id: 'about', label: 'About Event' },
                { id: 'events', label: 'Challenge Tracks' },
                { id: 'schedule', label: 'Chronology Timelines' },
                { id: 'register', label: 'Secure Seat' },
                { id: 'contact', label: 'Contact Helpdesks' }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => onScrollToSection(link.id)}
                  className="text-slate-400 hover:text-white text-left transition-colors cursor-pointer text-xs"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Column 3: Academic Attribution */}
          <div className="space-y-3 max-w-xs">
            <span className="font-extrabold uppercase tracking-widest text-[9px] text-slate-500 block flex items-center gap-1">
              <GraduationCap className="w-4 h-4 text-amber-500" />
              <span>Project Team Assignment</span>
            </span>
            <div className="space-y-2.5 text-slate-400 font-bold text-xs leading-normal">
              <div className="flex justify-between gap-4 bg-slate-900 px-3.5 py-1.5 rounded-lg border border-slate-850">
                <span>01 — K. Sathya</span>
                <span className="font-mono text-amber-500 text-[11px]">C25PG214CSC007</span>
              </div>
              <div className="flex justify-between gap-4 bg-slate-900 px-3.5 py-1.5 rounded-lg border border-slate-850">
                <span>02 — Rajeshwari</span>
                <span className="font-mono text-amber-500 text-[11px]">C25PG214CSC006</span>
              </div>
            </div>
          </div>

        </div>

        {/* Lower Zone */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-slate-600 text-[11px] leading-relaxed font-semibold">
          <div className="space-y-1">
            <span>© {currentYear} Department of CSE, Excel College of Eng. & Tech. All rights reserved.</span>
            <p className="text-slate-700">Developed in compliance with advanced client presentation guidelines as a fully validated scholastic prototype.</p>
          </div>

          <div className="flex items-center gap-1 text-slate-750 shrink-0">
            <Award className="w-3.5 h-3.5 text-slate-850" />
            <span>Frontend Presentation build</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
