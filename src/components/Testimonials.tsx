import { Star, MessageSquarePlus, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';
import { FeedbackItem } from './FeedbackModal';

interface TestimonialsProps {
  testimonials: FeedbackItem[];
  onOpenFeedbackModal: () => void;
}

export default function Testimonials({ testimonials, onOpenFeedbackModal }: TestimonialsProps) {
  return (
    <section id="reviews" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Direct "Write a Review" Call to Action */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs font-bold text-blue-600 tracking-wider uppercase">
              Proven Household Satisfaction & Reviews
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display text-balance">
              Trusted by Pakistani Families Across the Country
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              Read firsthand feedback from Pakistani households nationwide who hired verified domestic help through MaidConnect.
            </p>
          </div>

          {/* Prominent Button to Give Feedback */}
          <div className="shrink-0 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              onClick={onOpenFeedbackModal}
              className="py-3 px-5 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-2 hover:shadow"
            >
              <MessageSquarePlus className="w-4 h-4 text-amber-400" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((item, idx) => {
            const starCount = item.rating || 5;
            return (
              <div
                key={item.id || idx}
                className="bg-slate-50 rounded-2xl p-7 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between space-y-6 relative"
              >
                <div className="space-y-4">
                  {/* Rating Stars & Verified Tag */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < starCount
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      ))}
                      <span className="text-xs font-bold text-slate-700 ml-1 font-mono">
                        {starCount}.0
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      <span>Verified Hire</span>
                    </span>
                  </div>

                  {/* Feedback Quote */}
                  <p className="text-sm text-slate-700 leading-relaxed italic">
                    "{item.quote}"
                  </p>
                </div>

                {/* Author Information */}
                <div className="pt-4 border-t border-slate-200/70 flex items-start justify-between gap-3">
                  <div>
                    <div className="font-bold text-sm text-slate-900 font-display">
                      {item.name}
                    </div>
                    <div className="text-xs text-blue-600 font-medium">
                      {item.role}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {item.location} {item.date ? `· ${item.date}` : ''}
                    </div>
                  </div>

                  <div className="w-9 h-9 rounded-full bg-blue-100/60 text-blue-700 font-bold text-xs flex items-center justify-center font-display shrink-0">
                    {item.name
                      .split(' ')
                      .map((p) => p[0])
                      .slice(0, 2)
                      .join('')
                      .toUpperCase() || 'MC'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Callout below grid */}
        <div className="mt-8 p-4 bg-blue-50/70 border border-blue-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
              <Heart className="w-4 h-4 fill-white" />
            </div>
            <div>
              <span className="font-bold block">Did you hire domestic help with MaidConnect?</span>
              <span className="text-blue-800 text-[11px]">Your honest feedback helps Pakistani workers build their professional reputation and helps other families hire safely.</span>
            </div>
          </div>
          <button
            onClick={onOpenFeedbackModal}
            className="whitespace-nowrap px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-2xs transition-colors shrink-0"
          >
            Leave Your Feedback →
          </button>
        </div>

        {/* Quantified proof metrics adjacency (per Section 1.H) */}
        <div className="mt-14 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-slate-100 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
              4,500+
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">
              Active Verified Helpers
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
              100%
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">
              NADRA CNIC Check
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
              98.4%
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">
              Household Satisfaction
            </div>
          </div>

          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
              48 hrs
            </div>
            <div className="text-xs text-slate-500 font-medium mt-1">
              Avg. Match & Interview
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
