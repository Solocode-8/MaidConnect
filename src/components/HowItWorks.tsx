import { Search, UserCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onOpenBooking: () => void;
}

export default function HowItWorks({ onOpenBooking }: HowItWorksProps) {
  const steps = [
    {
      number: '01',
      title: 'Search & Filter',
      subtitle: 'Specify your city, role, and schedule',
      description: 'Select your domestic requirement—housemaid, cook, nanny, or elder caregiver. Filter by preferred neighborhood (DHA, Gulberg, Bahria, etc.) and choose full-time live-in, 8-hour day shift, or part-time visits.',
      icon: <Search className="w-6 h-6 text-blue-600" />,
      detail: 'View pre-verified credentials, experience years, and real client reviews.',
    },
    {
      number: '02',
      title: 'Connect & Interview',
      subtitle: 'Direct phone or in-person evaluation',
      description: 'Speak directly with shortlisted candidates without paying middleman commissions. Review original NADRA CNIC documents, discuss meal preferences or cleaning routines, and establish clear house guidelines.',
      icon: <UserCheck className="w-6 h-6 text-blue-600" />,
      detail: 'Coordinate a 3-day paid trial period to ensure complete mutual comfort.',
    },
    {
      number: '03',
      title: 'Finalize & Hire',
      subtitle: 'Rs. 5,000 one-time fee only after you confirm',
      description: 'After interviewing and deciding to permanently hire your selected candidate, the household pays a one-time Rs. 5,000 placement fee. This covers verified CNIC records and a 30-day free replacement guarantee. Monthly salary is paid directly to the worker.',
      icon: <CheckCircle2 className="w-6 h-6 text-blue-600" />,
      detail: 'Interviews are free. Rs. 5,000 is only paid when you finalize your chosen helper.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="text-xs font-bold text-blue-600 tracking-wider uppercase">
            Simple 3-Step Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display text-balance">
            How MaidConnect Works
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Hiring trusted domestic help in Pakistan is now as straightforward as finding verified professionals online.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-slate-50/70 rounded-2xl p-8 border border-slate-200 flex flex-col justify-between relative hover:border-blue-200 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="text-3xl font-extrabold text-slate-300 font-mono">
                    {step.number}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-900 font-display">
                    {step.title}
                  </h3>
                  <p className="text-xs font-semibold text-blue-600">
                    {step.subtitle}
                  </p>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200/60 text-xs text-slate-500 font-medium">
                {step.detail}
              </div>
            </div>
          ))}
        </div>

        {/* Workflow Action */}
        <div className="mt-14 text-center">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl shadow-sm transition-all"
          >
            <span>Start Your Search Today</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
