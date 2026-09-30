import { useState } from 'react';
import { Menu, X, ShieldCheck, User, LogIn, UserPlus, ChevronDown, Home } from 'lucide-react';
import { UserAccount, UserRole } from '../types/auth';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenWorkerRegister: () => void;
  user: UserAccount | null;
  onOpenAuth: (mode?: 'login' | 'signup', role?: UserRole) => void;
  onOpenProfile: () => void;
  onOpenPaymentGuide: () => void;
}

export default function Navbar({
  onOpenBooking,
  onOpenWorkerRegister,
  user,
  onOpenAuth,
  onOpenProfile,
  onOpenPaymentGuide,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Zone 1: Brand Logo */}
          <a href="#" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20 transition-transform group-hover:scale-105">
              <Home className="w-5 h-5" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-slate-900 font-display">
              Maid<span className="text-blue-600">Connect</span>
            </span>
          </a>

          {/* Zone 2: Streamlined Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-600">
            <a href="#" className="text-slate-900 hover:text-blue-600 font-bold transition-colors">
              Home
            </a>
            <a href="#roles" className="hover:text-blue-600 transition-colors">
              Services & Roles
            </a>
            <a href="#find-help" className="hover:text-blue-600 transition-colors">
              Browse Helpers
            </a>
            <a href="#how-it-works" className="hover:text-blue-600 transition-colors">
              How It Works
            </a>
            <a href="#calculator" className="hover:text-blue-600 transition-colors">
              Wage Guide
            </a>
            <button
              onClick={onOpenPaymentGuide}
              className="text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200/80 px-3 py-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Pricing (Rs. 0 to start)</span>
            </button>
          </nav>

          {/* Zone 3: Authentication & Primary CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {user ? (
              /* Logged In User State */
              <div className="flex items-center gap-3">
                <button
                  onClick={onOpenProfile}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                    {user.avatarInitials}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 leading-none flex items-center gap-1">
                      <span className="max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                      {user.verified && <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium capitalize mt-0.5">
                      {user.role === 'worker' ? 'Helper' : 'Employer'}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                <button
                  onClick={onOpenBooking}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5 whitespace-nowrap"
                >
                  Book a Service
                </button>
              </div>
            ) : (
              /* Guest State: Log In & Get Started Buttons */
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-blue-600 transition-colors flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Log In</span>
                </button>

                <button
                  onClick={onOpenBooking}
                  className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-0.5 whitespace-nowrap"
                >
                  Get Started
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu & Quick Auth Toggle Button */}
          <div className="flex sm:hidden items-center gap-2">
            {user ? (
              <button
                onClick={onOpenProfile}
                className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center"
              >
                {user.avatarInitials}
              </button>
            ) : (
              <button
                onClick={() => onOpenAuth('login')}
                className="px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 rounded-lg"
              >
                Log In
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-4 shadow-xl">
          {/* User Status Bar in Mobile */}
          {user ? (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                  {user.avatarInitials}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{user.name}</div>
                  <div className="text-xs text-slate-500 capitalize">{user.role} · {user.city}</div>
                </div>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenProfile();
                }}
                className="text-xs font-semibold text-blue-600 px-2.5 py-1 bg-white border border-slate-200 rounded-md"
              >
                Profile
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('login');
                }}
                className="py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl text-center flex items-center justify-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5 text-slate-600" />
                <span>Log In</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('signup');
                }}
                className="py-2.5 px-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl text-center flex items-center justify-center gap-1.5"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Sign Up</span>
              </button>
            </div>
          )}

          <div className="flex flex-col space-y-1 text-sm font-medium text-slate-700">
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-blue-600 font-semibold text-slate-900"
            >
              Home
            </a>
            <a
              href="#roles"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-blue-600"
            >
              Services & Roles
            </a>
            <a
              href="#find-help"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-blue-600"
            >
              Find Help (Worker Directory)
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-blue-600"
            >
              How It Works
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-blue-600"
            >
              Salary & Wage Guide
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPaymentGuide();
              }}
              className="w-full text-left px-3 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-sm flex items-center justify-between"
            >
              <span>Pricing & Fee Policy</span>
              <span className="text-[10px] uppercase font-bold bg-white text-blue-700 px-2 py-0.5 rounded border border-blue-200">Rs. 0 to start</span>
            </button>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg hover:bg-slate-50 hover:text-blue-600 text-xs text-slate-500"
            >
              Frequently Asked Questions (FAQ)
            </a>
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl text-center"
            >
              Book a Service
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWorkerRegister();
              }}
              className="w-full py-2.5 px-4 border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold text-sm rounded-xl text-center"
            >
              Register as Domestic Worker
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
