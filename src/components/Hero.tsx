import { useState } from 'react';
import { Search, Shield, MapPin, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { CITIES_LIST, ROLES_LIST } from '../data/mockData';
import heroImg from '../assets/images/hero_home_care_1790605792316.jpg';

interface HeroProps {
  onSearch: (city: string, role: string) => void;
  onOpenBooking: () => void;
  onOpenWorkerRegister: () => void;
}

export default function Hero({ onSearch, onOpenBooking, onOpenWorkerRegister }: HeroProps) {
  const [selectedCity, setSelectedCity] = useState<string>('All Cities');
  const [selectedRole, setSelectedRole] = useState<string>('All Roles');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(selectedCity, selectedRole);
    const element = document.getElementById('find-help');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative pt-8 pb-16 md:pt-14 md:pb-24 bg-white overflow-hidden border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Description, Dual CTAs & Quick Search */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 tracking-wide uppercase">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                <span>Pakistan's Trusted Domestic Help Network</span>
                <span aria-hidden="true">·</span>
                <span>Nationwide Coverage</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] font-display text-balance">
                Reliable Domestic Help & Verified Maids in Pakistan
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed">
                Connect directly with verified domestic helpers across Pakistan. From trustworthy housemaids and skilled cooks to attentive babysitters and compassionate senior caregivers.
              </p>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={onOpenBooking}
                className="px-7 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2"
              >
                <span>Book a Service</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenWorkerRegister}
                className="px-6 py-3.5 border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm rounded-lg transition-colors"
              >
                Join as a Worker
              </button>
            </div>

            {/* Interactive Hero Search Card */}
            <div className="p-5 sm:p-6 bg-slate-50/90 rounded-2xl border border-slate-200 shadow-sm max-w-2xl">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                Quick Match: Find Helpers Near You
              </div>
              <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-5">
                  <label htmlFor="hero-city" className="sr-only">City</label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
                    <select
                      id="hero-city"
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      {CITIES_LIST.map((c) => (
                        <option key={c} value={c}>
                          {c === 'All Cities' ? 'All Pakistani Cities' : c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="hero-role" className="sr-only">Role</label>
                  <select
                    id="hero-role"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    {ROLES_LIST.map((r) => (
                      <option key={r} value={r}>
                        {r === 'All Roles' ? 'Any Domestic Role' : r}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-medium text-sm rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Search className="w-4 h-4" />
                    <span>Search</span>
                  </button>
                </div>
              </form>

              <div className="mt-4 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-500 pt-2 border-t border-slate-200/80">
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <Shield className="w-3.5 h-3.5 text-blue-600" />
                  NADRA CNIC Checked
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>Zero Middleman Cuts</span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span>Direct Family Interviews</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Hero Asset & Trust Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-100 group">
              <img
                src={heroImg || '/hero_home_care.jpg'}
                alt="Bright modern Pakistani home living space representing comfort and reliable domestic assistance - MaidConnect"
                fetchPriority="high"
                loading="eager"
                decoding="async"
                width={600}
                height={460}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/hero_home_care.jpg';
                }}
                className="w-full h-80 sm:h-96 lg:h-[460px] object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent"></div>

              {/* Highlight Overlay Card */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold text-blue-600 tracking-wide uppercase">
                      Safety & Verification First
                    </div>
                    <div className="text-sm font-bold text-slate-900 mt-0.5">
                      4,500+ Verified Domestic Profiles
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                      Every maid, cook, and caregiver is ID-verified with address validation before connecting.
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0 text-blue-600">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Top Badge */}
            <div className="hidden sm:flex absolute -top-4 -right-4 bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-semibold shadow-md items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Active Matches Across Major Residential Sectors
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
