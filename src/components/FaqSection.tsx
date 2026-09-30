import { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, MessageSquare, Mail } from 'lucide-react';
import { FAQS } from '../data/mockData';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Heading & Direct Help Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="text-xs font-bold text-blue-600 tracking-wider uppercase">
                Questions & Answers
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display text-balance">
                Everything You Need to Know
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Clear answers regarding domestic staff verification, safety measures, trial periods, and fair wages across Pakistan.
              </p>
            </div>

            {/* Direct Support Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
              <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Need Immediate Help or Advice?
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Our Pakistani customer care team is available daily from 9:00 AM to 8:00 PM PKT.
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <a
                  href="https://wa.me/923242447664"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 p-2.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 transition-colors font-medium"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Helpline: +92 324 2447664</span>
                </a>

                <a
                  href="tel:+922111100223"
                  className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors font-medium"
                >
                  <Phone className="w-4 h-4 text-blue-600" />
                  <span>Direct UAN: (021) 111-002-23</span>
                </a>

                <a
                  href="mailto:support@maidconnect.pk"
                  className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors font-medium"
                >
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span>Email: support@maidconnect.pk</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Accordion */}
          <div className="lg:col-span-7 space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200/90 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-slate-900 hover:text-blue-600 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
