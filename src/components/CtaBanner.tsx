import { ShieldCheck, ArrowRight, HeartHandshake } from 'lucide-react';

interface CtaBannerProps {
  onOpenBooking: () => void;
  onOpenWorkerRegister: () => void;
}

export default function CtaBanner({ onOpenBooking, onOpenWorkerRegister }: CtaBannerProps) {
  return (
    <section className="py-16 md:py-24 bg-blue-600 text-white relative overflow-hidden">
      {/* Subtle geometric background accents */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-blue-500/30 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-blue-700/50 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/40 border border-blue-400/40 text-xs font-semibold text-blue-100">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Join 10,000+ Connected Households in Pakistan</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-balance">
            Ready to Bring Peace of Mind to Your Household?
          </h2>

          <p className="text-base sm:text-lg text-blue-100 leading-relaxed max-w-2xl mx-auto">
            Whether you need a daily house cleaner, a seasoned cook, or a compassionate caregiver, verified domestic help is just one click away across Pakistan.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenBooking}
              className="px-8 py-4 bg-white hover:bg-slate-50 text-blue-700 active:bg-slate-100 font-bold text-sm rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <span>Find Household Help</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenWorkerRegister}
              className="px-7 py-4 bg-blue-700 hover:bg-blue-800 text-white border border-blue-400/40 font-semibold text-sm rounded-xl transition-colors flex items-center gap-2"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>Register as Domestic Worker</span>
            </button>
          </div>

          <p className="text-xs text-blue-200 pt-2">
            Free candidate interviews · Flat Rs. 5,000 commission only after you finalize · 30-day replacement support
          </p>
        </div>
      </div>
    </section>
  );
}
