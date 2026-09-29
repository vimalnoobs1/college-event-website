import React, { useState, useEffect } from 'react';
import { UserProfile, StudentRegistration } from './types';
import ContributorBanner from './components/ContributorBanner';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import EventSection from './components/EventSection';
import Schedule from './components/Schedule';
import RegistrationForm from './components/RegistrationForm';
import Dashboard from './components/Dashboard';
import TechStack from './components/TechStack';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Login from './pages/Login';

// Local storage keys for state persistence
const USER_STORAGE_KEY = 'ignite_symposium_user';
const REGISTRATIONS_STORAGE_KEY = 'ignite_symposium_registrations';

export default function App() {
  // Page mode state: 'home' is the landing page, 'login' is the college portal screen
  const [viewMode, setViewMode] = useState<'home' | 'login'>('home');

  // User state
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading user state:', e);
    }
    return { username: '', isLoggedIn: false };
  });

  // Client-side registered events list
  const [registeredEventsList, setRegisteredEventsList] = useState<StudentRegistration[]>(() => {
    try {
      const stored = localStorage.getItem(REGISTRATIONS_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Error loading registrations:', e);
    }
    return [];
  });

  // Pre-selected event tracking for easy form navigation
  const [preSelectedEventId, setPreSelectedEventId] = useState('');

  // Active navigation section highlight
  const [activeSection, setActiveSection] = useState('hero');

  // Persist user state changes
  useEffect(() => {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  }, [user]);

  // Persist registrations
  useEffect(() => {
    localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(registeredEventsList));
  }, [registeredEventsList]);

  // Active section viewport tracker using IntersectionObserver
  useEffect(() => {
    if (viewMode !== 'home') return;

    const sections = ['hero', 'about', 'events', 'schedule', 'register', 'contact', 'dashboard'];
    const observers = sections.map((sectionId) => {
      const el = document.getElementById(sectionId);
      if (!el) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(sectionId);
            }
          });
        },
        { rootMargin: '-30% 0px -40% 0px' } // Trigger active highlights comfortably during scroll
      );

      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, [viewMode]);

  // Smooth scroll handler
  const handleScrollToSection = (sectionId: string) => {
    // If the user was on the login screen, return them to home first, then scroll
    if (viewMode !== 'home') {
      setViewMode('home');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Auth Action Handlers
  const handleLoginSuccess = (profile: UserProfile) => {
    setUser(profile);
    setViewMode('home');
    // Scroll automatically to dashboard to present their custom welcome portal
    setTimeout(() => {
      const dashboardElement = document.getElementById('dashboard');
      if (dashboardElement) {
        dashboardElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 250);
  };

  const handleLogout = () => {
    setUser({ username: '', isLoggedIn: false });
    // Keep active registrations list in general, but logged out user won't view personalized cards
  };

  // Registration handlers
  const handleRegisterSuccess = (newReg: StudentRegistration) => {
    setRegisteredEventsList((prev) => [newReg, ...prev]);
  };

  const handleCancelRegistration = (registrationId: string) => {
    if (confirm('Are you sure you want to cancel this registration?')) {
      setRegisteredEventsList((prev) => prev.filter((r) => r.id !== registrationId));
    }
  };

  const handleSelectEventToRegister = (eventId: string) => {
    setPreSelectedEventId(eventId);
    handleScrollToSection('register');
  };

  // Conditional Rendering Router
  if (viewMode === 'login') {
    return (
      <Login
        onLoginSuccess={handleLoginSuccess}
        onCancel={() => setViewMode('home')}
      />
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Academic project attribution header (extremely prominent top-zone banner) */}
      <ContributorBanner />

      {/* 2. Responsive single-line Top Bar contract navigation */}
      <Navbar
        user={user}
        onLogout={handleLogout}
        onOpenLogin={() => setViewMode('login')}
        onScrollToSection={handleScrollToSection}
        activeSection={activeSection}
      />

      {/* Main Single Page Section flow */}
      <main className="flex-grow">
        {/* 3. High impact visual Hero Section */}
        <Hero
          user={user}
          onScrollToSection={handleScrollToSection}
          onOpenLogin={() => setViewMode('login')}
        />

        {/* 4. Dynamic personalized student dashboard (Unlocked when logged in) */}
        <Dashboard
          user={user}
          registeredEventsList={registeredEventsList}
          onOpenLogin={() => setViewMode('login')}
          onCancelRegistration={handleCancelRegistration}
        />

        {/* 5. Purpose of the event (simple english About Section) */}
        <About />

        {/* 6. Comprehensive event categories grid with rules/coordinators modal */}
        <EventSection onSelectEvent={handleSelectEventToRegister} />

        {/* 7. Timeline scheduling timetable */}
        <Schedule />

        {/* 8. Fully functional validation registration form */}
        <RegistrationForm
          user={user}
          preSelectedEventId={preSelectedEventId}
          onRegisterSuccess={handleRegisterSuccess}
          registeredEventsList={registeredEventsList}
        />

        {/* 9. Schematic layout of system constraints and mock DB status */}
        <TechStack />

        {/* 10. Venue location address and help message desk */}
        <Contact />
      </main>

      {/* 11. Minimal quiet site footer */}
      <Footer onScrollToSection={handleScrollToSection} />
    </div>
  );
}
