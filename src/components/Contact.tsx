import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Landmark, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMsg, setFormMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formMsg.trim()) return;

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);
      setFormName('');
      setFormEmail('');
      setFormMsg('');
      setTimeout(() => setIsSuccess(false), 5000);
    }, 600);
  };

  return (
    <section id="contact" className="py-16 bg-white scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase font-bold text-blue-600 tracking-widest block mb-2">
            STAY IN TOUCH
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight sm:text-4xl">
            Contact Organizer Desks
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Reach out to our staff or student joint secretaries for event sponsorships, hostel accommodation inquiries, or custom questions.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-stretch">
          
          {/* Left Column: Direct Contact Details (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900 text-slate-100 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-md flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white">Central Helpdesk Details</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                For rapid support during the event day, contact the coordinator help desk stationed at the Computer Science Block entrance lobby.
              </p>

              {/* Channels List */}
              <div className="space-y-4 text-xs">
                
                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-slate-800 rounded-lg text-blue-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block uppercase tracking-wider text-[10px]">Email Queries</span>
                    <a href="mailto:ignite2026@excelcollege.edu" className="font-semibold text-slate-200 hover:text-white underline">
                      ignite2026@excelcollege.edu
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-slate-800 rounded-lg text-amber-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block uppercase tracking-wider text-[10px]">Helpline Numbers</span>
                    <p className="font-mono text-slate-200 font-semibold leading-normal">
                      +91 98765 43210 (Staff Lead) <br />
                      +91 98765 43215 (Student Convener)
                    </p>
                  </div>
                </div>

                {/* Campus Address */}
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-slate-800 rounded-lg text-rose-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block uppercase tracking-wider text-[10px]">Academic Location</span>
                    <p className="font-semibold text-slate-200 leading-relaxed">
                      Department of Computer Science & Engineering <br />
                      Excel College of Engineering & Technology, <br />
                      National Highway-47, Salem-Kochi Bypass Road, <br />
                      Tamil Nadu, India — 637303
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Static vector layout of campus map (Very clean design) */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
                <Landmark className="w-3 h-3 text-blue-500" />
                <span>Campus Registration Desk Map</span>
              </span>
              <div className="bg-slate-900 h-16 rounded border border-slate-800 flex items-center justify-center p-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:8px_8px] opacity-40" />
                <div className="text-[10px] font-mono text-center text-slate-400 relative z-10 leading-normal">
                  <span className="text-blue-400 font-bold">LOBBY DESK</span> ──▶ CS Block ──▶ AUDITORIUM
                  <span className="block text-[8px] text-slate-500 mt-1">MAIN REGISTRATION STARTS AT 08:30 AM</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Mini message board form (7 cols) */}
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                <span>Quick Inquiry Board</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Have a fast query or request? Submit your name, email, and inquiry below. Our joint student secretaries will respond via email within 2 hours.
              </p>

              {isSuccess && (
                <div className="bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold px-4 py-3 rounded-lg flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Your inquiry has been submitted successfully! We will mail you shortly.</span>
                </div>
              )}

              <form onSubmit={handleSendMessage} className="space-y-4 pt-2">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="contactName" className="block text-[10px] font-bold uppercase tracking-wider text-slate-700">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      id="contactName"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g. Anand Sharma"
                      required
                      className="block w-full px-3 py-2 bg-white border border-slate-250 focus:border-blue-500 text-xs rounded-lg outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="contactEmail" className="block text-[10px] font-bold uppercase tracking-wider text-slate-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="contactEmail"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="e.g. student@college.edu"
                      required
                      className="block w-full px-3 py-2 bg-white border border-slate-250 focus:border-blue-500 text-xs rounded-lg outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contactMsg" className="block text-[10px] font-bold uppercase tracking-wider text-slate-700">
                    Inquiry Message
                  </label>
                  <textarea
                    id="contactMsg"
                    rows={4}
                    value={formMsg}
                    onChange={(e) => setFormMsg(e.target.value)}
                    placeholder="Enter your query details here (e.g. accommodation details, team registration assistance)..."
                    required
                    className="block w-full px-3 py-2 bg-white border border-slate-250 focus:border-blue-500 text-xs rounded-lg outline-none transition-colors resize-none leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending || !formName.trim() || !formEmail.trim() || !formMsg.trim()}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 rounded-lg transition-colors cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSending ? 'Sending Inquiry...' : 'Send Offline Message'}</span>
                </button>
              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
