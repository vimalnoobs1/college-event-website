import React from 'react';
import { Database, Layout, Server, Cpu } from 'lucide-react';

export default function TechStack() {
  return (
    <section className="py-16 bg-slate-950 text-slate-300 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest block mb-1">
            PROJECT BLUEPRINT & SYSTEM ARCHITECTURE
          </span>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Technology Specifications & Database Schema Modeling
          </h3>
          <p className="text-slate-500 text-xs mt-1.5 leading-normal">
            A comprehensive look at our technology roadmap, highlighting the active client presentation and the planned relational database integration.
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          {/* Frontend Module */}
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800/80 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                <Layout className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-sm">Frontend Architecture</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Engineered with a modular component hierarchy. Delivers robust local state management, seamless responsive wrappers, and elegant GSAP timelines for visual feedback.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['React 19', 'TypeScript', 'Tailwind CSS', 'Vite', 'GSAP'].map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-slate-950 border border-slate-800 text-[10px] font-mono text-slate-300 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Database Module */}
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800/80 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
                <Database className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-sm">PostgreSQL Schema (Planned)</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              A PostgreSQL backend schema is fully mapped for Phase 2 to host relational indices for student accounts, event schedules, and live leaderboards.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {['Relational Database', 'SQL Schema Scoped', 'PostgreSQL Model'].map((tag) => (
                <span key={tag} className="px-2 py-0.5 bg-slate-950 border border-slate-800 text-[10px] font-mono text-amber-400 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Active Integration Scope */}
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800/80 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                <Server className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-sm">Active Presentation Scope</h4>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              This active project build is a high-fidelity **Frontend Client Prototype**. Authentication credentials, registrations, and gate-passes are simulated in client-side states.
            </p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <span className="px-2 py-0.5 bg-indigo-950/40 border border-indigo-900/60 text-[10px] font-mono text-indigo-300 rounded font-semibold">
                Client-Side State Storage (Active)
              </span>
            </div>
          </div>

        </div>

        {/* Technical Footer Footnote */}
        <div className="text-center mt-8 text-[11px] text-slate-500 max-w-xl mx-auto leading-relaxed">
          * Engineering Advisory: To preserve compliance with serverless presentation environments, direct PostgreSQL socket drivers are disabled. Relational database structures are detailed inside the academic project presentation.
        </div>
      </div>
    </section>
  );
}
