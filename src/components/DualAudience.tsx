import { Home, Briefcase, CheckCircle2, ArrowRight, HeartHandshake } from 'lucide-react';

interface DualAudienceProps {
  onOpenBooking: () => void;
  onOpenWorkerRegister: () => void;
}

export default function DualAudience({ onOpenBooking, onOpenWorkerRegister }: DualAudienceProps) {
  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="text-xs font-bold text-blue-600 tracking-wider uppercase">
            A Better Way for Everyone
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display text-balance">
            Designed for Households and Domestic Workers
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            We are transforming domestic hiring across Pakistan by replacing uncertain street networks with transparent, safe, and dignified relationships.
          </p>
        </div>

        {/* Side-by-Side Dual Audience Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Card 1: For Households */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm flex flex-col justify-between space-y-8 relative overflow-hidden">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Home className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  For Families & Homes
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900 font-display">
                  Safe, Verified & Reliable Household Staff
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Stop worrying about unannounced disappearances, unverified strangers, or lack of accountability. MaidConnect brings formal verification to your doorstep.
                </p>
              </div>

              {/* Household Value Points */}
              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm font-semibold text-slate-900 block">
                      NADRA & Identity Verified Profiles
                    </strong>
                    <span className="text-xs text-slate-600">
                      Physical CNIC verification, address confirmations, and prior employer references before matching.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm font-semibold text-slate-900 block">
                      Free Replacement Guarantee
                    </strong>
                    <span className="text-xs text-slate-600">
                      Trial period with up to 2 prompt, hassle-free candidate replacements if expectations don't align.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm font-semibold text-slate-900 block">
                      Pay Rs. 5,000 Only After Finalizing Worker
                    </strong>
                    <span className="text-xs text-slate-600">
                      Interviews are 100% free with no advance. Household only pays the flat Rs. 5,000 connection fee once you finalize your candidate.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <button
                onClick={onOpenBooking}
                className="w-full py-3.5 px-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 group"
              >
                <span>Find Help for Your Home</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Card 2: For Job Seekers / Workers */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm flex flex-col justify-between space-y-8 relative overflow-hidden">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Briefcase className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  For Domestic Workers
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900 font-display">
                  Dignity, Fair Wages & Direct Employment
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Say goodbye to fraudulent brokers who take cuts from your salary every month. Connect directly with respectful Pakistani families who value your work.
                </p>
              </div>

              {/* Worker Value Points */}
              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm font-semibold text-slate-900 block">
                      Zero Commission Deductions (100% Salary is Yours)
                    </strong>
                    <span className="text-xs text-slate-600">
                      We never cut your monthly earnings. What you agree with the family is completely yours.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm font-semibold text-slate-900 block">
                      Respectful Work Environments
                    </strong>
                    <span className="text-xs text-slate-600">
                      We screen households to ensure safe, dignified conditions, fair working hours, and regular rest.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-sm font-semibold text-slate-900 block">
                      Simple Onboarding via Phone or WhatsApp
                    </strong>
                    <span className="text-xs text-slate-600">
                      No complicated paperwork. Register with your CNIC in Urdu or regional language via our direct helpline.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <button
                onClick={onOpenWorkerRegister}
                className="w-full py-3.5 px-6 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-semibold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 group"
              >
                <span>Register as a Domestic Worker</span>
                <HeartHandshake className="w-4 h-4 transition-transform group-hover:scale-110" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
