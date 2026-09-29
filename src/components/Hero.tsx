import React, { useEffect, useRef } from 'react';
import { Calendar, MapPin, Sparkles, ArrowRight, Layers, ArrowDownCircle } from 'lucide-react';
import gsap from 'gsap';
import { UserProfile } from '../types';
import ThreeDPass from './ThreeDPass';

interface HeroProps {
  user: UserProfile;
  onScrollToSection: (sectionId: string) => void;
  onOpenLogin: () => void;
}

export default function Hero({ user, onScrollToSection, onOpenLogin }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP high-end entrance timeline
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });
    
    tl.fromTo(badgeRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0, delay: 0.15 })
      .fromTo(titleRef.current, { opacity: 0, y: 35 }, { opacity: 1, y: 0 }, '-=0.85')
      .fromTo(descRef.current, { opacity: 0, y: 25 }, { opacity: 1, y: 0 }, '-=0.85')
      .fromTo(metaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, '-=0.85')
      .fromTo(ctaRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, '-=0.85');
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative overflow-hidden bg-slate-950 text-slate-100 pt-16 pb-20 lg:pt-24 lg:pb-32 border-b border-slate-900"
    >
      {/* Subtle mathematical light grid for absolute technical depth */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(51,65,85,0.2)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      {/* Elegant layered background glowing shapes (No heavy neon, warm and corporate) */}
      <div className="absolute top-10 right-10 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute -bottom-20 left-10 w-[350px] h-[350px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Block */}
          <div className="lg:col-span-7 space-y-7 text-left">
            
            {/* Department Label */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2 px-3.5 py-1 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20 text-xs font-bold uppercase tracking-widest"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Department of Computer Science & Engineering</span>
            </div>

            {/* Changed Title: "College Event Landing Page" */}
            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-none [text-wrap:balance]"
            >
              Academic Symposium & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500">
                College Event Landing Page
              </span>
            </h1>

            {/* Premium, concise description */}
            <p
              ref={descRef}
              className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed"
            >
              Welcome to the central portal of Excel's premier engineering confluence. Experience a highly curated day of technical challenges, presentation tracks, and collaborative exhibitions. Connect with regional peers and claim prestigious awards.
            </p>

            {/* Horizontal parameters bar */}
            <div
              ref={metaRef}
              className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10 text-sm py-4 border-y border-slate-800/60 text-slate-300"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-blue-400 shrink-0">
                  <Calendar className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-slate-500 text-[9px] uppercase font-bold tracking-wider block">EVENT DATE</span>
                  <span className="font-bold text-white">Friday, October 16, 2026</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-amber-500 shrink-0">
                  <MapPin className="w-4.5 h-4.5" />
                </div>
                <div>
                  <span className="text-slate-500 text-[9px] uppercase font-bold tracking-wider block">CAMPUS VENUE</span>
                  <span className="font-bold text-white">CS Block Auditorium</span>
                </div>
              </div>
            </div>

            {/* Premium Action Buttons */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => onScrollToSection('register')}
                className="flex items-center justify-center gap-2 px-6 py-4 text-xs font-black uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 group cursor-pointer hover:scale-[1.03]"
              >
                <span>Register Admission</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onScrollToSection('events')}
                className="flex items-center justify-center gap-2 px-6 py-4 text-xs font-black uppercase tracking-wider text-slate-300 bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-xl transition-all cursor-pointer hover:scale-[1.03]"
              >
                <Layers className="w-4 h-4" />
                <span>Explore Events</span>
              </button>

              {!user.isLoggedIn && (
                <p className="text-xs text-slate-500 text-center sm:text-left sm:ml-2">
                  Have an account?{' '}
                  <button
                    onClick={onOpenLogin}
                    className="text-blue-400 font-bold underline hover:text-blue-300 cursor-pointer"
                  >
                    Portal Login
                  </button>
                </p>
              )}
            </div>

          </div>

          {/* Right Column: 3D perspective display */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/10 rounded-full filter blur-[80px] scale-95 translate-y-4 pointer-events-none" />
              
              <ThreeDPass user={user} />
              
              <div className="text-center mt-3">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest inline-flex items-center gap-2 bg-slate-900 border border-slate-850 px-3.5 py-1.5 rounded-full shadow-inner">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping" />
                  <span>Interactive 3D Digital Pass</span>
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
