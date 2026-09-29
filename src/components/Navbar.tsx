import React, { useState } from 'react';
import { Menu, X, LogIn, LogOut, User, Sparkles } from 'lucide-react';
import { UserProfile } from '../types';

interface NavbarProps {
  user: UserProfile;
  onLogout: () => void;
  onOpenLogin: () => void;
  onScrollToSection: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({
  user,
  onLogout,
  onOpenLogin,
  onScrollToSection,
  activeSection
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About Event' },
    { id: 'events', label: 'Events' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'register', label: 'Register' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (sectionId: string) => {
    onScrollToSection(sectionId);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Zone - Premium "College Event Landing Page" brand wordmark */}
          <div className="flex-shrink-0">
            <button
              onClick={() => handleNavClick('hero')}
              className="text-lg font-black tracking-tight text-slate-950 focus:outline-none hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse shrink-0" />
              <span>College Event <span className="text-blue-600">Landing Page</span></span>
            </button>
          </div>

          {/* Navigation links */}
          <nav className="hidden md:flex items-center gap-7">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-[13px] font-semibold transition-colors relative py-1.5 whitespace-nowrap cursor-pointer ${
                  activeSection === item.id
                    ? 'text-blue-600'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Actions Zone */}
          <div className="hidden md:flex items-center gap-4">
            {user.isLoggedIn ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                >
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  <span className="max-w-[120px] truncate">{user.username}</span>
                </button>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-rose-600 hover:text-white border border-rose-200 hover:border-rose-600 hover:bg-rose-600 rounded-lg transition-all duration-200 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="flex items-center gap-2 px-4.5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm hover:shadow transition-all duration-250 whitespace-nowrap cursor-pointer hover:scale-[1.02]"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Portal Login</span>
              </button>
            )}
          </div>

          {/* Mobile hamburger trigger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition-colors cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer with premium micro-shadow */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white shadow-lg">
          <div className="px-4 pt-2.5 pb-5 space-y-1.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-blue-700 font-bold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-4 border-t border-slate-100">
              {user.isLoggedIn ? (
                <div className="space-y-2 px-4">
                  <div className="flex items-center gap-2 text-sm text-slate-850 font-bold py-1.5">
                    <User className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="truncate">{user.username} (Logged In)</span>
                  </div>
                  <button
                    onClick={() => handleNavClick('dashboard')}
                    className="block w-full text-center px-4 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 transition-colors cursor-pointer"
                  >
                    Go to Student Dashboard
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="px-4 pt-1">
                  <button
                    onClick={() => {
                      onOpenLogin();
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-colors cursor-pointer"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Portal Login</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
