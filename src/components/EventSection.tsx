import React, { useState, useEffect, useRef } from 'react';
import { Calendar, MapPin, Users, Phone, X, Sparkles, ChevronRight } from 'lucide-react';
import { EventItem } from '../types';
import { EVENTS_DATA } from '../data/events';
import EventCard from './EventCard';
import gsap from 'gsap';

interface EventSectionProps {
  onSelectEvent: (eventId: string) => void;
}

export default function EventSection({ onSelectEvent }: EventSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'coding' | 'present'>('all');
  const [activeModalEvent, setActiveModalEvent] = useState<EventItem | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Filter categories
  const filteredEvents = EVENTS_DATA.filter(event => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'coding') {
      return event.id === 'coding' || event.id === 'debugging' || event.id === 'quiz';
    }
    if (selectedCategory === 'present') {
      return event.id === 'paper' || event.id === 'expo' || event.id === 'poster';
    }
    return true;
  });

  const handleOpenDetails = (event: EventItem) => {
    setActiveModalEvent(event);
  };

  const handleCloseDetails = () => {
    setActiveModalEvent(null);
  };

  useEffect(() => {
    if (gridRef.current) {
      // Smooth GSAP card reveal when filter toggles
      gsap.fromTo(gridRef.current.children, 
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, stagger: 0.06, duration: 0.45, ease: 'power2.out' }
      );
    }
  }, [selectedCategory]);

  return (
    <section id="events" ref={sectionRef} className="py-20 bg-slate-950 border-b border-slate-900 scroll-mt-10 relative">
      {/* Subtle abstract glow beneath the events grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase font-extrabold text-blue-500 tracking-widest block mb-2">
            CHALLENGES & EXPOS
          </span>
          <h2 className="text-3xl font-black text-white tracking-tight sm:text-4xl">
            Explore Symposium Channels
          </h2>
          <p className="mt-3.5 text-slate-400 text-sm sm:text-base leading-relaxed">
            Select from our 6 specialized tracks below. Challenge your algorithms, present original engineering papers, or display software builds to win exciting prize matrices.
          </p>
        </div>

        {/* Filter segment button controls (Dark themed) */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-slate-900 rounded-xl border border-slate-800">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4.5 py-2 text-xs font-bold rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All Channels
            </button>
            <button
              onClick={() => setSelectedCategory('coding')}
              className={`px-4.5 py-2 text-xs font-bold rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer ${
                selectedCategory === 'coding'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Coding, Debug & Quiz
            </button>
            <button
              onClick={() => setSelectedCategory('present')}
              className={`px-4.5 py-2 text-xs font-bold rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer ${
                selectedCategory === 'present'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Expos & Papers
            </button>
          </div>
        </div>

        {/* Events Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredEvents.map((event) => (
            <div key={event.id} className="h-full">
              <EventCard
                event={event}
                onSelectEvent={onSelectEvent}
                onOpenDetails={handleOpenDetails}
              />
            </div>
          ))}
        </div>
      </div>

      {/* High-Contrast Interactive Event Brief sheet modal */}
      {activeModalEvent && (
        <div className="fixed inset-0 z-55 overflow-y-auto" role="dialog" aria-modal="true">
          {/* Backdrop Scrim */}
          <div 
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity" 
            onClick={handleCloseDetails}
          />

          <div className="flex min-h-screen items-center justify-center p-4 text-center">
            <div className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-2xl border border-slate-100 flex flex-col max-h-[90vh]">
              
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-100 bg-slate-50">
                <div>
                  <span className="text-[10px] font-extrabold text-blue-600 uppercase tracking-widest block">
                    COMPETITIVE SESSION BRIEF
                  </span>
                  <h3 className="text-xl font-bold text-slate-950 mt-0.5">
                    {activeModalEvent.name}
                  </h3>
                </div>
                <button
                  onClick={handleCloseDetails}
                  className="rounded-xl p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  aria-label="Close details"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="p-6 overflow-y-auto space-y-6">
                {/* Description */}
                <div>
                  <h4 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider mb-2">Detailed Track Guidelines</h4>
                  <p className="text-slate-700 text-sm leading-relaxed [text-wrap:pretty]">
                    {activeModalEvent.longDesc}
                  </p>
                </div>

                {/* Session Params Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-slate-100 py-4.5">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-5 h-5 text-blue-600 shrink-0" />
                    <div>
                      <span className="text-slate-400 text-[9px] font-bold uppercase block">Timing Window</span>
                      <span className="text-slate-800 text-xs font-bold">{activeModalEvent.dateTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
                    <div>
                      <span className="text-slate-400 text-[9px] font-bold uppercase block">Venue Room</span>
                      <span className="text-slate-800 text-xs font-bold truncate block max-w-[150px]" title={activeModalEvent.venue}>
                        {activeModalEvent.venue}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Users className="w-5 h-5 text-emerald-500 shrink-0" />
                    <div>
                      <span className="text-slate-400 text-[9px] font-bold uppercase block">Team Size</span>
                      <span className="text-slate-800 text-xs font-bold">Max {activeModalEvent.maxParticipants} Participant(s)</span>
                    </div>
                  </div>
                </div>

                {/* Rules List */}
                <div>
                  <h4 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider mb-2.5 font-bold">Symposium Evaluation Rules</h4>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <span>Original University/College student ID cards must be presented upon entry.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <span>Report to the venue room 15 minutes before session locks. No grace intervals allowed.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <span>Evaluation scorecards are locked on-stage. Judge committee determinations are final.</span>
                    </li>
                  </ul>
                </div>

                {/* Coordinators Contact List */}
                <div>
                  <h4 className="text-xs uppercase font-extrabold text-slate-400 tracking-wider mb-2 font-bold">Session Chairs / Coordinators</h4>
                  <div className="grid sm:grid-cols-2 gap-3 mt-2">
                    {activeModalEvent.coordinators.map((coordinator, idx) => (
                      <div key={idx} className="flex items-center gap-2 px-3.5 py-3 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-700">
                        <Phone className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        <span className="font-bold">{coordinator}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-slate-50">
                <button
                  onClick={handleCloseDetails}
                  className="px-4.5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors cursor-pointer"
                >
                  Return
                </button>
                <button
                  onClick={() => {
                    onSelectEvent(activeModalEvent.id);
                    handleCloseDetails();
                  }}
                  className="px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-750 rounded-xl transition-colors shadow cursor-pointer"
                >
                  Register Seat
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}
