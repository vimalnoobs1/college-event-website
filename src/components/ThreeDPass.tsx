import React, { useRef, useState, useEffect } from 'react';
import { Calendar, MapPin, Sparkles, User, Ticket } from 'lucide-react';
import gsap from 'gsap';
import { UserProfile } from '../types';

interface ThreeDPassProps {
  user: UserProfile;
}

export default function ThreeDPass({ user }: ThreeDPassProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Relative coordinates between -0.5 and 0.5
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setCoords({ x, y });

    // GSAP smooth tilt update
    gsap.to(cardRef.current, {
      rotateY: x * 35, // max 35 degrees tilt
      rotateX: -y * 35,
      scale: 1.05,
      duration: 0.25,
      ease: 'power2.out'
    });

    // GSAP shimmer shine position update
    if (shimmerRef.current) {
      const shineX = (e.clientX - rect.left) / rect.width * 100;
      const shineY = (e.clientY - rect.top) / rect.height * 100;
      gsap.to(shimmerRef.current, {
        background: `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 60%)`,
        duration: 0.1
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!cardRef.current) return;

    // Reset card position smoothly
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.6,
      ease: 'elastic.out(1, 0.6)'
    });

    if (shimmerRef.current) {
      gsap.to(shimmerRef.current, {
        background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)',
        duration: 0.5
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="w-full max-w-[380px] h-[480px] cursor-grab active:cursor-grabbing flex items-center justify-center select-none"
      style={{ perspective: '1000px' }}
    >
      <div
        ref={cardRef}
        className="w-full h-full bg-slate-900 border border-slate-800 text-slate-100 rounded-2xl relative overflow-hidden flex flex-col justify-between p-6 transition-shadow shadow-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Shimmer overlay for dynamic lighting */}
        <div
          ref={shimmerRef}
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%)',
            mixBlendMode: 'overlay'
          }}
        />

        {/* Dynamic ambient card glow background */}
        <div className="absolute -top-10 -right-10 w-44 h-44 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Card Header */}
        <div className="flex justify-between items-start" style={{ transform: 'translateZ(30px)' }}>
          <div>
            <span className="text-[9px] font-mono tracking-widest text-amber-500 uppercase font-bold">
              EXCEL ACADEMIC INFRASTRUCTURE
            </span>
            <h4 className="text-xl font-black text-white tracking-tight leading-none mt-1">
              COLLEGE <span className="text-blue-500">EVENT</span>
            </h4>
            <p className="text-[9px] text-slate-400 font-bold mt-1 uppercase tracking-widest">
              OFFICIAL ENTRY PERMIT
            </p>
          </div>
          <div className="bg-slate-850 p-2.5 rounded-xl border border-slate-750 shrink-0">
            <Ticket className="w-5 h-5 text-amber-400" />
          </div>
        </div>

        {/* Card Body - Event Pass Badge */}
        <div className="my-auto py-4 flex flex-col items-center text-center" style={{ transform: 'translateZ(45px)' }}>
          <div className="relative mb-3">
            <div className="w-16 h-16 rounded-full bg-slate-850 border border-slate-700 flex items-center justify-center relative z-10 overflow-hidden">
              <User className="w-8 h-8 text-blue-400" />
            </div>
            <div className="absolute inset-0 bg-blue-500/15 rounded-full filter blur-md scale-125 animate-pulse" />
          </div>

          <h5 className="text-base font-bold text-slate-100">
            {user.isLoggedIn ? user.username : 'GUEST PARTICIPANT'}
          </h5>
          <p className="text-[11px] text-slate-400 mt-1 uppercase tracking-wider">
            {user.isLoggedIn ? (user.registerNumber || 'Student Participant') : 'EXCEL GUEST ACCESS'}
          </p>

          <div className="mt-4 flex items-center gap-1.5 px-3 py-1 bg-slate-950/80 rounded-full border border-slate-800 text-[10px] text-slate-400">
            <Sparkles className="w-3 h-3 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span>{user.isLoggedIn ? 'Verified Student Participant' : 'Symposium General Admission'}</span>
          </div>
        </div>

        {/* Card Footer - Date / Venue & Barcode */}
        <div className="border-t border-slate-800/80 pt-4" style={{ transform: 'translateZ(25px)' }}>
          <div className="grid grid-cols-2 gap-3 text-left mb-4">
            <div>
              <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold block">
                DATE & TIME
              </span>
              <div className="flex items-center gap-1 mt-0.5 text-xs text-slate-300 font-medium">
                <Calendar className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Oct 16, 2026</span>
              </div>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold block">
                CAMPUS VENUE
              </span>
              <div className="flex items-center gap-1 mt-0.5 text-xs text-slate-300 font-medium">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="truncate">CS Block Auditorium</span>
              </div>
            </div>
          </div>

          {/* Realistic Barcode */}
          <div className="bg-white/5 border border-white/5 rounded px-2.5 py-1.5 flex flex-col items-center">
            <div className="w-full h-7 flex items-center justify-between gap-[1px] px-1 opacity-80">
              {[1, 3, 1, 2, 4, 1, 3, 2, 1, 3, 1, 4, 2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3].map((val, idx) => (
                <div
                  key={idx}
                  className="bg-slate-300 h-full shrink-0"
                  style={{ width: `${val * 1.5}px` }}
                />
              ))}
            </div>
            <span className="text-[9px] font-mono tracking-[4px] text-slate-500 mt-1 uppercase">
              {user.isLoggedIn ? user.registerNumber || 'IGNITE2026' : 'IGNITEGUEST'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
