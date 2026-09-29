import React from 'react';
import { UserProfile, StudentRegistration } from '../types';
import { EVENTS_DATA } from '../data/events';
import { ShieldCheck, Calendar, MapPin, User, CheckSquare, Sparkles, QrCode, AlertCircle, Info } from 'lucide-react';

interface DashboardProps {
  user: UserProfile;
  registeredEventsList: StudentRegistration[];
  onOpenLogin: () => void;
  onCancelRegistration: (id: string) => void;
}

export default function Dashboard({
  user,
  registeredEventsList,
  onOpenLogin,
  onCancelRegistration
}: DashboardProps) {
  // Find all event items registered by this student
  const myRegistrations = registeredEventsList.filter(
    reg => reg.registerNumber.toLowerCase() === (user.registerNumber || '').toLowerCase()
  );

  const getEventDetail = (eventId: string) => {
    return EVENTS_DATA.find(e => e.id === eventId);
  };

  return (
    <section id="dashboard" className="py-16 bg-white border-b border-slate-200 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold text-blue-600 tracking-widest block mb-2">
            ACADEMIC STUDENT HUB
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">
            My Personalized Dashboard
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Access your registered competition tracks, download your virtual gate-pass, and monitor your personalized event chronology.
          </p>
        </div>

        {user.isLoggedIn ? (
          /* Logged In Dashboard View */
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Profile Pass & QR Code */}
            <div className="lg:col-span-4 bg-slate-900 text-slate-100 p-6 rounded-2xl border border-slate-800 shadow-md space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{user.username}</h4>
                    <span className="text-[10px] text-slate-400 font-mono tracking-wider">{user.registerNumber || 'STUDENT'}</span>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Authenticated</span>
                </span>
              </div>

              {/* QR Gate Pass Section */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex flex-col items-center text-center space-y-3">
                <div className="p-3 bg-white rounded-lg inline-block shadow-sm">
                  <QrCode className="w-32 h-32 text-slate-950" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-200">Official QR Gate Pass</span>
                  <p className="text-[10px] text-slate-400 mt-1">
                    Present this QR code at the registration desk for instant entry.
                  </p>
                </div>
              </div>

              {/* Profile Details */}
              <div className="space-y-2.5 text-xs">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest block">Academic Scope</span>
                <div className="flex justify-between text-slate-300">
                  <span>Department:</span>
                  <span className="font-semibold text-slate-100 text-right max-w-[200px] truncate">{user.department || 'CSE'}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Registered Email:</span>
                  <span className="font-semibold text-slate-100">{user.email || 'student@excelcollege.edu'}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Verified Phone:</span>
                  <span className="font-mono text-slate-100">{user.phone || '9876543210'}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Registered Competitions */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Event Track Summary Cards */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-5">
                  <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <span>My Registered Events ({myRegistrations.length})</span>
                  </h4>
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-50 border border-blue-150 text-[10px] font-bold text-blue-700 rounded">
                    <Info className="w-3.5 h-3.5 text-blue-500" />
                    <span>Portal Feed Synchronized</span>
                  </div>
                </div>

                {myRegistrations.length === 0 ? (
                  <div className="text-center py-12 bg-white border border-slate-200/60 rounded-xl space-y-3">
                    <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
                    <p className="text-sm font-semibold text-slate-700">You haven't registered for any events yet.</p>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">
                      Scroll to the <span className="font-semibold text-slate-700">Events Section</span> or use the form below to lock your seats.
                    </p>
                    <div className="pt-2">
                      <a
                        href="#events"
                        className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors cursor-pointer inline-block"
                      >
                        Explore Events
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {myRegistrations.map((reg) => {
                      const detail = getEventDetail(reg.selectedEventId);
                      if (!detail) return null;

                      return (
                        <div
                          key={reg.id}
                          className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md">
                                {reg.id}
                              </span>
                              <h5 className="text-sm font-bold text-slate-900">{detail.name}</h5>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-2">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                <span className="font-medium text-slate-700">{detail.dateTime}</span>
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                <span className="truncate max-w-[180px]">{detail.venue}</span>
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2.5 self-stretch sm:self-auto justify-end">
                            <button
                              onClick={() => {
                                const el = document.getElementById('schedule');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                            >
                              Check Schedule
                            </button>
                            <button
                              onClick={() => onCancelRegistration(reg.id)}
                              className="px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
                              title="Cancel registration"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Student Symposium Checklist */}
              <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50/50">
                <h4 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-amber-500" />
                  <span>Important Student Checklist</span>
                </h4>
                
                <div className="grid sm:grid-cols-2 gap-4 text-xs text-slate-600">
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200/70 space-y-1">
                    <span className="font-bold text-slate-900 block">✓ Physical Credentials</span>
                    <span className="text-slate-500 block leading-normal">Remember to bring your original College ID Card and a copy of your admissions pass.</span>
                  </div>

                  <div className="bg-white p-3.5 rounded-xl border border-slate-200/70 space-y-1">
                    <span className="font-bold text-slate-900 block">✓ Pre-Session Reporting</span>
                    <span className="text-slate-500 block leading-normal">Reporting desks at the CS Block entrance open promptly at 08:30 AM. Collect your symposium file and food vouchers.</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        ) : (
          /* Logged Out / Educational View */
          <div className="max-w-3xl mx-auto bg-slate-50 border border-slate-250 rounded-2xl p-6 sm:p-8 text-center space-y-5">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto border border-blue-100">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900">
                Integrate Your Student Experience
              </h3>
              <p className="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
                Log in to our central student portal to unlock a personalized dashboard, monitor registered events, download your virtual access gate pass, and pre-populate registration forms.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenLogin}
                className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm hover:shadow transition-colors cursor-pointer"
              >
                Access Portal Login
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
