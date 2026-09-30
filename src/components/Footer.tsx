import { MapPin, Phone, Mail, MessageSquare } from 'lucide-react';

interface FooterProps {
  onOpenPaymentGuide?: () => void;
}

export default function Footer({ onOpenPaymentGuide }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Col 1 & 2: Brand & About */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                M
              </div>
              <span className="text-xl font-bold tracking-tight text-white font-display">
                Maid<span className="text-blue-500">Connect</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              MaidConnect is Pakistan's domestic help connection platform connecting households with vetted maids, cooks, babysitters, and senior caretakers. Promoting dignity of labor, safety, and fair wages.
            </p>
            <div className="pt-2 text-xs text-slate-500">
              Operating nationwide across major residential areas.
            </div>
          </div>

          {/* Col 3: Services */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Domestic Services
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#roles" className="hover:text-white transition-colors">
                  House Cleaning & Maids
                </a>
              </li>
              <li>
                <a href="#roles" className="hover:text-white transition-colors">
                  Cooking & Kitchen Support
                </a>
              </li>
              <li>
                <a href="#roles" className="hover:text-white transition-colors">
                  Babysitting & Child Nannies
                </a>
              </li>
              <li>
                <a href="#roles" className="hover:text-white transition-colors">
                  Elderly Care & Caretaking
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-white transition-colors">
                  Fair Wage Estimator
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenPaymentGuide}
                  className="hover:text-white transition-colors text-left"
                >
                  Payment Procedures & Safety
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Major Coverage */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Coverage & Enclaves
            </div>
            <ul className="space-y-2 text-xs">
              <li>Defence & DHA Phases</li>
              <li>Bahria Town Communities</li>
              <li>Cantt & Officers Societies</li>
              <li>Private Residential Enclaves</li>
              <li>All Major Housing Societies</li>
            </ul>
          </div>

          {/* Col 5: Contact & Helpline */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Helpline & Support
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>UAN: (021) 111-002-23</span>
              </div>
              <a
                href="https://wa.me/923242447664"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-emerald-400 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>WhatsApp: +92 324 2447664</span>
              </a>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>support@maidconnect.pk</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 pt-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>Central Operations Desk, Pakistan</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 MaidConnect. All rights reserved. Registered domestic platform in Pakistan.
          </div>
          <div className="flex items-center gap-6">
            <a href="#faq" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#faq" className="hover:text-slate-400 transition-colors">
              Terms of Service
            </a>
            <a href="#faq" className="hover:text-slate-400 transition-colors">
              Worker Code of Conduct
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
