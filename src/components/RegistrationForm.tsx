import React, { useState, useEffect } from 'react';
import { UserProfile, StudentRegistration } from '../types';
import { EVENTS_DATA } from '../data/events';
import { Mail, Phone, Hash, BookOpen, Send, CheckCircle2, Award, Sparkles, ShieldCheck, ChevronRight } from 'lucide-react';

interface RegistrationFormProps {
  user: UserProfile;
  preSelectedEventId: string;
  onRegisterSuccess: (registration: StudentRegistration) => void;
  registeredEventsList: StudentRegistration[];
}

export default function RegistrationForm({
  user,
  preSelectedEventId,
  onRegisterSuccess,
  registeredEventsList
}: RegistrationFormProps) {
  const [studentName, setStudentName] = useState('');
  const [registerNumber, setRegisterNumber] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedEventId, setSelectedEventId] = useState('');

  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successRegistration, setSuccessRegistration] = useState<StudentRegistration | null>(null);

  // Sync inputs if user is logged in
  useEffect(() => {
    if (user.isLoggedIn) {
      setStudentName(user.username);
      if (user.registerNumber) setRegisterNumber(user.registerNumber);
      if (user.department) setDepartment(user.department);
      if (user.email) setEmail(user.email);
      if (user.phone) setPhone(user.phone);
    } else {
      setStudentName('');
      setRegisterNumber('');
      setEmail('');
      setPhone('');
    }
  }, [user]);

  // Sync pre-selected event
  useEffect(() => {
    if (preSelectedEventId) {
      setSelectedEventId(preSelectedEventId);
    }
  }, [preSelectedEventId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    // Validations
    if (!studentName.trim()) {
      setValidationError('Please enter your full student name.');
      return;
    }
    if (!registerNumber.trim()) {
      setValidationError('Please enter your original college register number.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setValidationError('Please enter a valid personal or academic email address.');
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      setValidationError('Please enter a valid 10-digit mobile phone number.');
      return;
    }
    if (!selectedEventId) {
      setValidationError('Please select an event track to secure your seat.');
      return;
    }

    // Check duplicate registrations for this specific event
    const isAlreadyRegistered = registeredEventsList.some(
      reg => reg.registerNumber.toLowerCase() === registerNumber.toLowerCase() && reg.selectedEventId === selectedEventId
    );

    if (isAlreadyRegistered) {
      const eventName = EVENTS_DATA.find(e => e.id === selectedEventId)?.name || 'this event';
      setValidationError(`You are already registered for the ${eventName}. Double registrations are blocked.`);
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      const newRegistration: StudentRegistration = {
        id: `REG-${Math.floor(100000 + Math.random() * 900000)}`,
        studentName,
        registerNumber: registerNumber.toUpperCase(),
        department,
        email,
        phone,
        selectedEventId,
        registeredAt: new Date().toLocaleString()
      };

      onRegisterSuccess(newRegistration);
      setSuccessRegistration(newRegistration);
      setIsSubmitting(false);
      
      if (!user.isLoggedIn) {
        setStudentName('');
        setRegisterNumber('');
        setEmail('');
        setPhone('');
      }
      setSelectedEventId('');
    }, 600);
  };

  const getEventName = (id: string) => {
    return EVENTS_DATA.find(e => e.id === id)?.name || id;
  };

  return (
    <section id="register" className="py-20 bg-slate-50 border-b border-slate-200 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-12 gap-12 items-stretch max-w-5xl mx-auto">
          
          {/* Left Column: Direct Admissions Brief (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900 text-slate-100 p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-lg flex flex-col justify-between space-y-8 select-none">
            <div className="space-y-6">
              <span className="text-xs uppercase font-extrabold text-blue-400 tracking-widest block">
                GATEWAY ADMISSIONS
              </span>
              <h3 className="text-2xl font-black text-white tracking-tight">
                Secure Your Seat For The Event
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Admissions are free. Use this secure client-side form to secure registrations for individual challenges. An official QR entry pass is instantly generated upon successful submission.
              </p>

              {/* Steps Brief List */}
              <div className="space-y-3 pt-2 text-xs text-slate-300 font-semibold">
                <div className="flex items-start gap-2.5">
                  <ChevronRight className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>Fill in correct, original college register numbers.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <ChevronRight className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>Select any of the 6 competitive tracks.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <ChevronRight className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>Double registrations under identical register numbers are automatically blocked.</span>
                </div>
              </div>
            </div>

            {/* Micro badge indicator */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400 shrink-0">
                <ShieldCheck className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-white block">Admissions Status: Active</span>
                <span className="text-[9px] text-slate-500 block leading-normal">Session registration queues are open until October 15, 2026.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Input Form Card (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {successRegistration ? (
              /* Success State Ticket */
              <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-6 sm:p-8 text-center space-y-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600" />
                
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-100">
                  <CheckCircle2 className="w-8 h-8 animate-bounce" />
                </div>

                <div>
                  <span className="text-[9px] font-extrabold text-emerald-700 uppercase tracking-widest bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full">
                    ADMISSION LOCKED
                  </span>
                  <h3 className="text-xl font-bold text-slate-950 mt-3">
                    Event Registration Complete!
                  </h3>
                  <p className="text-slate-500 text-xs mt-1">
                    Your session coordinates have been successfully logged to your portal profile.
                  </p>
                </div>

                {/* Printout Details Table */}
                <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-5 text-left text-xs space-y-3 font-medium">
                  <div className="flex justify-between border-b border-slate-200/40 pb-2">
                    <span className="text-slate-400">REGISTRATION ID</span>
                    <span className="font-mono text-slate-900 font-bold">{successRegistration.id}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/40 pb-2">
                    <span className="text-slate-400">PARTICIPANT NAME</span>
                    <span className="text-slate-800">{successRegistration.studentName}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/40 pb-2">
                    <span className="text-slate-400">REGISTER NUMBER</span>
                    <span className="font-mono text-slate-800">{successRegistration.registerNumber}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/40 pb-2">
                    <span className="text-slate-400">DEPARTMENT CODE</span>
                    <span className="text-slate-800">{successRegistration.department}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/40 pb-2">
                    <span className="text-slate-450">CHOSEN TRACK</span>
                    <span className="text-blue-700 font-bold">{getEventName(successRegistration.selectedEventId)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">SUBMISSION TIMELOG</span>
                    <span className="text-slate-500 font-mono">{successRegistration.registeredAt}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-1 justify-center">
                  <button
                    onClick={() => setSuccessRegistration(null)}
                    className="px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors cursor-pointer"
                  >
                    Register Another Track
                  </button>
                  <button
                    onClick={() => {
                      setSuccessRegistration(null);
                      const dashboardEl = document.getElementById('dashboard');
                      if (dashboardEl) dashboardEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="px-5 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    Check Student Portal
                  </button>
                </div>
              </div>
            ) : (
              /* Registration Input Form */
              <form
                onSubmit={handleSubmit}
                className="bg-white border border-slate-200 rounded-2xl shadow-lg p-6 sm:p-8 space-y-5"
              >
                {user.isLoggedIn && (
                  <div className="bg-blue-50 border border-blue-100 text-blue-800 rounded-xl p-3.5 text-xs flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-blue-500 shrink-0 mt-0.5 animate-pulse" />
                    <div>
                      <span className="font-bold block text-blue-900">Portal Link Active — {user.username}</span>
                      <span className="opacity-95 block mt-0.5">Your profile parameters have been automatically pre-populated to quicken the registration speed.</span>
                    </div>
                  </div>
                )}

                {/* Validation Warnings */}
                {validationError && (
                  <div className="bg-rose-50 border border-rose-100 text-rose-800 text-xs font-bold px-4 py-3 rounded-lg leading-normal">
                    {validationError}
                  </div>
                )}

                {/* Form Field Name */}
                <div className="space-y-1.5">
                  <label htmlFor="studentName" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Full Student Name
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-450">
                      <Hash className="w-4 h-4 text-slate-400" />
                    </span>
                    <input
                      type="text"
                      id="studentName"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Enter your first and last name"
                      className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-250 focus:border-blue-500 focus:bg-white text-xs sm:text-sm rounded-lg outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Reg No & Department */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="registerNumber" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Register Number
                    </label>
                    <input
                      type="text"
                      id="registerNumber"
                      value={registerNumber}
                      onChange={(e) => setRegisterNumber(e.target.value)}
                      placeholder="e.g. C25PG214CSC001"
                      className="block w-full px-3 py-2.5 bg-slate-50 border border-slate-250 focus:border-blue-500 focus:bg-white text-xs sm:text-sm rounded-lg outline-none transition-colors uppercase font-mono tracking-wide"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="department" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Department Track
                    </label>
                    <select
                      id="department"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="block w-full px-3 py-2.5 bg-slate-50 border border-slate-250 focus:border-blue-500 focus:bg-white text-xs sm:text-sm rounded-lg outline-none transition-colors"
                    >
                      <option value="Computer Science & Engineering">Computer Science (CSE)</option>
                      <option value="Information Technology">Information Tech (IT)</option>
                      <option value="Electronics & Communication">Electronics (ECE)</option>
                      <option value="Electrical & Electronics">Electrical (EEE)</option>
                      <option value="Mechanical Engineering">Mechanical (MECH)</option>
                      <option value="Civil Engineering">Civil (CIVIL)</option>
                    </select>
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Email Address
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4 text-slate-400" />
                      </span>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. student@college.edu"
                        className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-250 focus:border-blue-500 focus:bg-white text-xs sm:text-sm rounded-lg outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Phone Number
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4 text-slate-400" />
                      </span>
                      <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. 9876543210"
                        className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-250 focus:border-blue-500 focus:bg-white text-xs sm:text-sm rounded-lg outline-none transition-colors font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Select Event */}
                <div className="space-y-1.5">
                  <label htmlFor="selectedEventId" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Select Symposium Challenge Track
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                      <BookOpen className="w-4 h-4 text-slate-400" />
                    </span>
                    <select
                      id="selectedEventId"
                      value={selectedEventId}
                      onChange={(e) => setSelectedEventId(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-250 focus:border-blue-500 focus:bg-white text-xs sm:text-sm rounded-lg outline-none transition-colors"
                    >
                      <option value="">-- Choose from 6 Competition Tracks --</option>
                      {EVENTS_DATA.map((evt) => (
                        <option key={evt.id} value={evt.id}>
                          {evt.name} ({evt.time})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-black uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-750 rounded-xl shadow-sm hover:shadow transition-all duration-200 disabled:bg-blue-400 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Registering Admission Slot...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Free Registration</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
