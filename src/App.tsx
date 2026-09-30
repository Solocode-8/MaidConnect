/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RolesSection from './components/RolesSection';
import BrowseWorkers from './components/BrowseWorkers';
import DualAudience from './components/DualAudience';
import HowItWorks from './components/HowItWorks';
import WageCalculator from './components/WageCalculator';
import Testimonials from './components/Testimonials';
import FaqSection from './components/FaqSection';
import CtaBanner from './components/CtaBanner';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import WorkerRegisterModal from './components/WorkerRegisterModal';
import AuthModal from './components/AuthModal';
import UserProfileModal from './components/UserProfileModal';
import PaymentGuideModal from './components/PaymentGuideModal';
import CheckoutModal from './components/CheckoutModal';
import FeedbackModal, { FeedbackItem } from './components/FeedbackModal';
import { WorkerProfile, TESTIMONIALS } from './data/mockData';
import { UserAccount, UserRole, UserBooking } from './types/auth';
import { CheckCircle2, LogIn, UserPlus, MessageSquare } from 'lucide-react';

export default function App() {
  // Authentication state - clean up old fake demo accounts
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const saved = localStorage.getItem('maidconnect_user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          parsed.name === 'Razia Begum' ||
          parsed.name === 'Tariq Mehmood' ||
          parsed.name === 'Sarah & Hamza Malik' ||
          parsed.id?.startsWith('demo_')
        ) {
          localStorage.removeItem('maidconnect_user');
          return null;
        }
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  });

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authRole, setAuthRole] = useState<UserRole>('employer');
  const [authNotice, setAuthNotice] = useState<string>('');
  const [pendingBookingAction, setPendingBookingAction] = useState<(() => void) | null>(null);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPaymentGuideOpen, setIsPaymentGuideOpen] = useState(false);

  // Real user bookings list stored in localStorage
  const [userBookings, setUserBookings] = useState<UserBooking[]>(() => {
    try {
      const saved = localStorage.getItem('maidconnect_bookings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Filter bookings for the current active user
  const activeUserBookings = userBookings.filter(
    (b) => !currentUser || b.userId === currentUser.id || b.userId === 'guest'
  );

  // Reviews & Testimonials State
  const [testimonials, setTestimonials] = useState<FeedbackItem[]>(() => {
    try {
      const saved = localStorage.getItem('maidconnect_testimonials');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return TESTIMONIALS;
  });
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  // Commission Checkout State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutWorkerInfo, setCheckoutWorkerInfo] = useState({ name: 'Assigned Helper', role: 'House Cleaning' });
  const [hasPaidCommission, setHasPaidCommission] = useState(false);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 4000);
  };

  const handleAddFeedback = (newFeedback: FeedbackItem) => {
    setTestimonials((prev) => {
      const updated = [newFeedback, ...prev];
      try {
        localStorage.setItem('maidconnect_testimonials', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
    showToast(`Thank you, ${newFeedback.name}! Your review has been published.`);
  };

  // Sync user with localStorage
  const handleAuthSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('maidconnect_user', JSON.stringify(user));
    } catch {
      // Ignore local storage error
    }
    showToast(`Welcome, ${user.name}! You are logged in as a ${user.role === 'worker' ? 'Domestic Helper' : 'Household Employer'}.`);
    setAuthNotice('');
    setIsAuthOpen(false);

    // If user attempted a booking prior to authenticating, automatically resume it!
    if (pendingBookingAction) {
      const resume = pendingBookingAction;
      setPendingBookingAction(null);
      setTimeout(() => {
        resume();
      }, 300);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('maidconnect_user');
    } catch {
      // Ignore
    }
    showToast('You have been safely logged out.');
  };

  const handleOpenAuth = (mode: 'login' | 'signup' = 'login', role: UserRole = 'employer') => {
    setAuthMode(mode);
    setAuthRole(role);
    setIsAuthOpen(true);
  };

  // Booking & Worker Registration Modal state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isWorkerRegisterOpen, setIsWorkerRegisterOpen] = useState(false);
  const [selectedWorkerForBooking, setSelectedWorkerForBooking] = useState<WorkerProfile | null>(null);

  // Search & filter state passed from hero or roles
  const [activeCityFilter, setActiveCityFilter] = useState<string>('All Cities');
  const [activeRoleFilter, setActiveRoleFilter] = useState<string>('All Roles');

  // Wage calculator prefill state
  const [bookingPrefill, setBookingPrefill] = useState<{
    role?: string;
    city?: string;
    shift?: string;
    wage?: string;
  }>({});

  const handleHeroSearch = (city: string, role: string) => {
    setActiveCityFilter(city);
    setActiveRoleFilter(role);
  };

  const handleSelectRoleFromShowcase = (roleTitle: string) => {
    setActiveRoleFilter(roleTitle);
    const element = document.getElementById('find-help');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // ================= STRICT AUTH GATING FOR BOOKING =================
  const handleOpenBookingGeneral = (role?: string) => {
    if (!currentUser) {
      setAuthNotice('Please sign up or log in first to request verified domestic help.');
      setPendingBookingAction(() => () => {
        setSelectedWorkerForBooking(null);
        setBookingPrefill({ role: role || 'House Cleaning' });
        setIsBookingOpen(true);
      });
      handleOpenAuth('signup', 'employer');
      return;
    }

    setSelectedWorkerForBooking(null);
    setBookingPrefill({ role: role || 'House Cleaning' });
    setIsBookingOpen(true);
  };

  const handleOpenBookingForWorker = (worker: WorkerProfile) => {
    if (!currentUser) {
      setAuthNotice(`Please sign up or log in first to book an interview with ${worker.name}.`);
      setPendingBookingAction(() => () => {
        setSelectedWorkerForBooking(worker);
        setBookingPrefill({
          role: worker.role,
          city: worker.city,
          shift: worker.workType,
        });
        setIsBookingOpen(true);
      });
      handleOpenAuth('signup', 'employer');
      return;
    }

    setSelectedWorkerForBooking(worker);
    setBookingPrefill({
      role: worker.role,
      city: worker.city,
      shift: worker.workType,
    });
    setIsBookingOpen(true);
  };

  const handleOpenBookingWithEstimate = (city: string, role: string, workType: string, estimatedWage: string) => {
    if (!currentUser) {
      setAuthNotice('Please sign up or log in first to book domestic help with your calculated wage.');
      setPendingBookingAction(() => () => {
        setSelectedWorkerForBooking(null);
        setBookingPrefill({
          city,
          role,
          shift: workType,
          wage: estimatedWage,
        });
        setIsBookingOpen(true);
      });
      handleOpenAuth('signup', 'employer');
      return;
    }

    setSelectedWorkerForBooking(null);
    setBookingPrefill({
      city,
      role,
      shift: workType,
      wage: estimatedWage,
    });
    setIsBookingOpen(true);
  };

  const handleBookingConfirmed = (data: {
    workerName: string;
    workerRole: string;
    city: string;
    area?: string;
    shift: string;
    timeSlot: string;
    specialNotes?: string;
  }) => {
    const newBooking: UserBooking = {
      id: 'bk_' + Date.now(),
      userId: currentUser?.id || 'guest',
      workerName: data.workerName,
      workerRole: data.workerRole,
      city: data.city,
      area: data.area,
      shift: data.shift,
      timeSlot: data.timeSlot,
      specialNotes: data.specialNotes,
      status: 'Interview Requested',
      createdAt: new Date().toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' }),
      paidCommission: false,
    };

    setUserBookings((prev) => {
      const updated = [newBooking, ...prev];
      try {
        localStorage.setItem('maidconnect_bookings', JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });

    showToast(`Interview requested for ${data.workerName}! Our coordinator will contact you shortly.`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-slate-800 antialiased selection:bg-blue-600 selection:text-white relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 text-xs font-semibold flex items-center gap-2.5 animate-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-2 text-sm"
          >
            ×
          </button>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        onOpenBooking={() => handleOpenBookingGeneral()}
        onOpenWorkerRegister={() => handleOpenAuth('signup', 'worker')}
        user={currentUser}
        onOpenAuth={handleOpenAuth}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenPaymentGuide={() => setIsPaymentGuideOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onSearch={handleHeroSearch}
          onOpenBooking={() => handleOpenBookingGeneral()}
          onOpenWorkerRegister={() => handleOpenAuth('signup', 'worker')}
        />

        {/* Services & Roles Showcase */}
        <RolesSection
          onSelectRole={handleSelectRoleFromShowcase}
          onOpenBookingForRole={handleOpenBookingGeneral}
        />

        {/* Find Help / Browse Workers Directory */}
        <BrowseWorkers
          initialCity={activeCityFilter}
          initialRole={activeRoleFilter}
          onBookWorker={handleOpenBookingForWorker}
        />

        {/* Dual Audience Cards (Problem / Solution) */}
        <DualAudience
          onOpenBooking={() => handleOpenBookingGeneral()}
          onOpenWorkerRegister={() => handleOpenAuth('signup', 'worker')}
        />

        {/* 3-Step How It Works Workflow */}
        <HowItWorks onOpenBooking={() => handleOpenBookingGeneral()} />

        {/* Interactive Salary & Wage Guide */}
        <WageCalculator
          onOpenBookingWithEstimate={handleOpenBookingWithEstimate}
          onOpenPaymentGuide={() => setIsPaymentGuideOpen(true)}
        />

        {/* Testimonials & Proof with Reviews / Feedback option */}
        <Testimonials
          testimonials={testimonials}
          onOpenFeedbackModal={() => setIsFeedbackOpen(true)}
        />

        {/* FAQs & Contact Information */}
        <FaqSection />

        {/* High-Contrast CTA Banner */}
        <CtaBanner
          onOpenBooking={() => handleOpenBookingGeneral()}
          onOpenWorkerRegister={() => handleOpenAuth('signup', 'worker')}
        />
      </main>

      {/* Footer */}
      <Footer onOpenPaymentGuide={() => setIsPaymentGuideOpen(true)} />

      {/* Payment Guide Modal */}
      <PaymentGuideModal
        isOpen={isPaymentGuideOpen}
        onClose={() => setIsPaymentGuideOpen(false)}
        onOpenBooking={() => {
          setIsPaymentGuideOpen(false);
          handleOpenBookingGeneral();
        }}
        onOpenCheckout={() => {
          setIsPaymentGuideOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout / Placement Commission Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        workerName={checkoutWorkerInfo.name}
        workerRole={checkoutWorkerInfo.role}
        onPaymentComplete={(details) => {
          setHasPaidCommission(true);
          setUserBookings((prev) => {
            const updated = prev.map((b) => {
              if (b.workerName === checkoutWorkerInfo.name || prev.length === 1) {
                return {
                  ...b,
                  paidCommission: true,
                  status: 'Finalized' as const,
                  commissionTxId: details.transactionId,
                };
              }
              return b;
            });
            try {
              localStorage.setItem('maidconnect_bookings', JSON.stringify(updated));
            } catch {
              // ignore
            }
            return updated;
          });
          showToast(`Payment of Rs. 5,000 via ${details.method} Confirmed! Trx ID: ${details.transactionId}`);
        }}
      />

      {/* Authentication Modal (Log In / Sign Up / Forgot Password) */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => {
          setIsAuthOpen(false);
          setAuthNotice('');
          setPendingBookingAction(null);
        }}
        initialMode={authMode}
        initialRole={authRole}
        onAuthSuccess={handleAuthSuccess}
        authNotice={authNotice}
      />

      {/* User Profile & Account Dashboard Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={currentUser}
        bookings={activeUserBookings}
        onLogout={handleLogout}
        onOpenBooking={() => handleOpenBookingGeneral()}
        onOpenCheckout={(name, role) => {
          if (name) setCheckoutWorkerInfo({ name, role: role || 'House Cleaning' });
          setIsCheckoutOpen(true);
        }}
        onOpenFeedback={() => setIsFeedbackOpen(true)}
      />

      {/* Review & Feedback Modal */}
      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        currentUser={currentUser}
        onSubmitFeedback={handleAddFeedback}
      />

      {/* Booking / Interview Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        worker={selectedWorkerForBooking}
        defaultRole={bookingPrefill.role}
        defaultCity={bookingPrefill.city}
        defaultShift={bookingPrefill.shift}
        defaultWage={bookingPrefill.wage}
        currentUser={currentUser}
        onBookingConfirmed={handleBookingConfirmed}
        onOpenCheckout={(workerName, workerRole) => {
          if (workerName && workerRole) {
            setCheckoutWorkerInfo({ name: workerName, role: workerRole });
          }
          setIsCheckoutOpen(true);
        }}
      />

      {/* Worker Registration Modal */}
      <WorkerRegisterModal
        isOpen={isWorkerRegisterOpen}
        onClose={() => setIsWorkerRegisterOpen(false)}
      />

      {/* Floating WhatsApp Contact Button */}
      <a
        href="https://wa.me/923242447664?text=Hello%20MaidConnect%2C%20I%20would%20like%20to%20inquire%20about%20hiring%20verified%20domestic%20help."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-lg hover:shadow-emerald-500/25 flex items-center gap-2.5 transition-all group border border-emerald-500/40"
        aria-label="Contact on WhatsApp +92 324 2447664"
      >
        <MessageSquare className="w-5 h-5 fill-white text-emerald-600" />
        <span className="hidden sm:inline font-bold text-xs">WhatsApp Helpline</span>
      </a>
    </div>
  );
}
