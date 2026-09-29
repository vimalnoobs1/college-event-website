import React from 'react';
import { Calendar, Clock, MapPin, Sparkles, ChevronRight } from 'lucide-react';

interface ScheduleItem {
  time: string;
  event: string;
  venue: string;
  type: 'general' | 'session' | 'food';
  desc: string;
}

const SCHEDULE_ITEMS: ScheduleItem[] = [
  {
    time: '08:30 AM - 09:30 AM',
    event: 'On-Spot Registrations & Kit Distribution',
    venue: 'CS Block Central Lobby',
    type: 'general',
    desc: 'Verify online tickets, collect physical credentials, and obtain symposium food coupons.',
  },
  {
    time: '09:30 AM - 10:15 AM',
    event: 'Grand Inauguration Ceremony & Keynote Address',
    venue: 'Main College Auditorium',
    type: 'general',
    desc: 'Inauguration address by our Chief Guest followed by technical keynote briefs.',
  },
  {
    time: '10:15 AM - 10:30 AM',
    event: 'Complimentary High Tea Break',
    venue: 'Department Central Lounge',
    type: 'food',
    desc: 'Unwind and network with regional developers over fresh biscuits and regional tea.',
  },
  {
    time: '10:30 AM - 12:30 PM',
    event: 'Competitive Sessions (Round 1)',
    venue: 'CS Lab 1 & Department Seminar Hall',
    type: 'session',
    desc: 'Active tracks: Technical Quiz rounds, Paper Presentations, and Poster exhibitions.',
  },
  {
    time: '12:30 PM - 01:30 PM',
    event: 'Symposium Special Buffet Lunch',
    venue: 'Campus Food Court',
    type: 'food',
    desc: 'Enjoy a rich complimentary catered buffet lunch included in your registration.',
  },
  {
    time: '01:30 PM - 03:30 PM',
    event: 'Competitive Sessions (Round 2)',
    venue: 'PG Computer Lab & Exhibition Hallways',
    type: 'session',
    desc: 'Active tracks: Coding Challenges, System logical debugging, and Prototype exhibitions.',
  },
  {
    time: '03:30 PM - 04:30 PM',
    event: 'Debugging Grand Finale & Award Ceremony',
    venue: 'Main College Auditorium',
    type: 'general',
    desc: 'Buzzer finale results, project excellence prize announcements, and medal distributions.',
  },
];

export default function Schedule() {
  return (
    <section id="schedule" className="py-20 bg-white border-b border-slate-200 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase font-extrabold text-blue-600 tracking-widest block mb-2">
            TIMELINE CHRONOLOGY
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">
            Symposium Day Schedule
          </h2>
          <p className="mt-3.5 text-slate-600 text-sm sm:text-base leading-relaxed">
            Please schedule your competition tracks accordingly. Session lockouts are strict, and registration desks close promptly after keynotes.
          </p>
        </div>

        {/* Elegant Timeline Structure */}
        <div className="max-w-3xl mx-auto relative pl-6 sm:pl-8 border-l border-slate-200 space-y-12 py-3">
          
          {SCHEDULE_ITEMS.map((item, idx) => {
            const isSession = item.type === 'session';
            const isFood = item.type === 'food';
            
            return (
              <div key={idx} className="relative group select-none">
                
                {/* Timeline node marker */}
                <span className={`absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 bg-white transition-all duration-300 group-hover:scale-125 ${
                  isSession 
                    ? 'border-blue-600 ring-4 ring-blue-500/10' 
                    : isFood 
                      ? 'border-amber-500 ring-4 ring-amber-500/10' 
                      : 'border-slate-950 ring-4 ring-slate-950/10'
                }`} />

                {/* Itinerary copy details */}
                <div className="space-y-2 text-left bg-slate-50 border border-slate-200/60 p-5 rounded-2xl hover:border-slate-350 hover:bg-slate-50/50 transition-all shadow-sm">
                  
                  {/* Top line with timing and type tag */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs sm:text-sm font-bold text-slate-950 tracking-tight flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1 rounded-lg">
                      <Clock className="w-3.5 h-3.5 text-slate-500" />
                      {item.time}
                    </span>

                    {/* Compact tag status (No pills) */}
                    <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest">
                      {isSession && <span className="text-blue-600">Competitive Session</span>}
                      {isFood && <span className="text-amber-600">Food Service</span>}
                      {item.type === 'general' && <span className="text-slate-500">General Session</span>}
                    </div>
                  </div>

                  {/* Activity Name */}
                  <h4 className="text-base sm:text-lg font-black text-slate-950 leading-snug pt-1">
                    {item.event}
                  </h4>

                  {/* Description brief */}
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-2xl">
                    {item.desc}
                  </p>

                  {/* Venue Marker */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 pt-2 border-t border-slate-200/40">
                    <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
                    <span className="font-semibold text-slate-750">{item.venue}</span>
                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
