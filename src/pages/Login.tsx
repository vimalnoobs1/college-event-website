import React, { useState } from 'react';
import { Lock, User, ShieldCheck, HelpCircle, ArrowLeft, GraduationCap } from 'lucide-react';
import { UserProfile } from '../types';

interface LoginProps {
  onLoginSuccess: (user: UserProfile) => void;
  onCancel: () => void;
}

export default function Login({ onLoginSuccess, onCancel }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Field validations
    if (!username.trim()) {
      setErrorMsg('Please enter your portal student username or register number.');
      return;
    }
    if (!password.trim()) {
      setErrorMsg('Please enter your secure account password.');
      return;
    }

    setIsLoading(true);

    // Simulate standard secure authorization delay
    setTimeout(() => {
      const formattedUsername = username.trim();
      const isC25Format = formattedUsername.toUpperCase().match(/^C25/);

      const resolvedProfile: UserProfile = {
        username: formattedUsername,
        registerNumber: isC25Format 
          ? formattedUsername.toUpperCase() 
          : `C25PG214CSC${Math.floor(100 + Math.random() * 899)}`,
        department: 'Computer Science & Engineering',
        email: `${formattedUsername.toLowerCase().replace(/\s+/g, '')}@excelcollege.edu`,
        phone: '9876543210',
        isLoggedIn: true
      };

      onLoginSuccess(resolvedProfile);
      setIsLoading(false);
    }, 500);
  };

  const handleFastFill = () => {
    setUsername('C25PG214CSC001');
    setPassword('student_pass_2026');
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative select-none">
      
      {/* Return to Main Site Header Link */}
      <div className="absolute top-6 left-6">
        <button
          onClick={onCancel}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Symposium Page</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* University Logo Badge */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-md border border-slate-800">
            <GraduationCap className="w-8 h-8 text-amber-500" />
          </div>
        </div>

        {/* Header Titles */}
        <h2 className="text-center text-2xl font-black tracking-tight text-slate-950">
          EXCEL UNIVERSITY PORTAL
        </h2>
        <p className="mt-1 text-center text-xs text-slate-500 uppercase tracking-widest font-bold">
          Central Authentication Service
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-lg rounded-2xl border border-slate-200/80 sm:px-10 space-y-6">
          
          <div className="border-b border-slate-100 pb-3">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block">SECURE CREDENTIAL INPUT</span>
            <h3 className="text-sm font-bold text-slate-800 mt-0.5">Symposium Student Gate Login</h3>
          </div>

          {/* Validation Banner */}
          {errorMsg && (
            <div className="bg-rose-50 border border-rose-100 text-rose-800 text-xs font-semibold p-3.5 rounded-lg leading-relaxed">
              {errorMsg}
            </div>
          )}

          {/* Portal login form inputs */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Username */}
            <div className="space-y-1">
              <label htmlFor="username" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Student Username / Register Number
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username or register number"
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-250 focus:border-blue-500 focus:bg-white text-sm rounded-lg outline-none transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Secure Password
                </label>
                <span className="text-[10px] text-slate-400 font-medium">Any value accepted for demo</span>
              </div>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="block w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-250 focus:border-blue-500 focus:bg-white text-sm rounded-lg outline-none transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm hover:shadow transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4.5 h-4.5" />
              <span>{isLoading ? 'Verifying Account...' : 'Sign In To Portal'}</span>
            </button>
          </form>

          {/* Grader Helper Block */}
          <div className="border-t border-slate-100 pt-4 text-center">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-2">Evaluator Quick-Access Helper</span>
            <button
              onClick={handleFastFill}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-50 border border-amber-200 hover:border-amber-300 text-amber-800 text-[11px] font-bold rounded-lg transition-all cursor-pointer"
            >
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>Auto-Fill Evaluation Credentials</span>
            </button>
          </div>

          {/* Institutional Advisory */}
          <div className="bg-slate-50 border border-slate-150 p-3.5 rounded-lg text-[10px] text-slate-500 leading-normal">
            <span className="font-bold block text-slate-700 mb-0.5">⚠️ Portal Security Advisory</span>
            All connection logs on this terminal are governed by university network computing policies. Authorized student participant accounts are cleared for evaluation testing.
          </div>

        </div>
      </div>
    </div>
  );
}
