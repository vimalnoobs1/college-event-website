import React from 'react';
import { Award, Target, HelpCircle, Users, Bookmark } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-slate-50 border-b border-slate-200 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Column 1: Typography Brand Statement (5 cols) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-xs uppercase font-extrabold text-blue-600 tracking-widest block">
              ACADEMIC MISSION
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Philosophy & <br />Academic Core
            </h2>
            <div className="h-1 w-12 bg-blue-600 rounded-full" />
            
            <p className="text-slate-800 font-bold text-sm sm:text-base leading-relaxed">
              This college event landing page introduces a unified academic platform designed by the Department of Computer Science & Engineering.
            </p>
            
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Our central objective is to build a collaborative, high-standard environment where student programmers and presentation candidates can challenge their technical wits. From logical debugging sessions to large-scale project exhibitions, the symposium is engineered to evaluate core computer science fundamentals.
            </p>

            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-white px-4 py-3 rounded-xl border border-slate-200 shadow-sm inline-block">
              <Bookmark className="w-4 h-4 text-amber-500" />
              <span>Free Admissions & Student Vouchers Provided</span>
            </div>
          </div>

          {/* Column 2: Layered Pillar Grid (7 cols) */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            
            {/* Pillar 1 */}
            <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 space-y-3 flex flex-col justify-between">
              <div>
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl inline-block border border-blue-100">
                  <Target className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-950 text-sm mt-3">Targeted Innovation</h4>
                <p className="text-xs text-slate-500 leading-relaxed mt-1">
                  Promotes original research, technical presentation standards, and academic paper submissions judged by respected professors.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md hover:border-amber-300 hover:-translate-y-1 transition-all duration-300 space-y-3 flex flex-col justify-between">
              <div>
                <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl inline-block border border-amber-100">
                  <Award className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-slate-950 text-sm mt-3">Practical Assessment</h4>
                <p className="text-xs text-slate-500 leading-relaxed mt-1">
                  Evaluates algorithm writing speeds, system logic debugging, and rapid-fire buzzer quiz responses under high pressure.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 space-y-3 flex flex-col justify-between text-slate-300">
              <div>
                <div className="p-2.5 bg-slate-800 text-blue-400 rounded-xl inline-block border border-slate-700">
                  <Users className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-sm mt-3">Inter-College Exchange</h4>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">
                  Connects aspiring engineering candidates across regional universities to foster collaborative team projects and research circles.
                </p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 space-y-3 flex flex-col justify-between text-slate-300">
              <div>
                <div className="p-2.5 bg-slate-800 text-amber-400 rounded-xl inline-block border border-slate-700">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-sm mt-3">Transparent Judgement</h4>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">
                  Guarantees impartial assessments under explicit academic evaluation rubrics governed by regional industry experts.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
