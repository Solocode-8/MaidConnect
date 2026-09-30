import { ShieldCheck, Banknote, CreditCard, Smartphone, CheckCircle2, ArrowRight, Lock, RefreshCw, FileText } from 'lucide-react';

interface PaymentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
  onOpenCheckout?: () => void;
}

export default function PaymentGuideModal({ isOpen, onClose, onOpenBooking, onOpenCheckout }: PaymentGuideModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 sm:p-7 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg transition-colors text-lg"
            aria-label="Close payment guide"
          >
            ✕
          </button>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Fair & Transparent Payment Framework</span>
          </div>
          <h3 className="text-2xl font-bold font-display text-white">
            How Payments Work on MaidConnect
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-lg">
            Interviews are 100% free with zero advance deposit. Once you interview and finalize your selected domestic helper, a flat one-time placement fee of <strong>Rs. 5,000</strong> is paid by the household.
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* 3-Stage Payment Timeline */}
          <div className="space-y-4">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Step-by-Step Payment Journey:
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-2">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-600 font-mono">Stage 1</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">FREE (Rs. 0)</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">Shortlist & Interview</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Browse profiles, talk to candidates, and conduct phone or in-person interviews with <strong>zero advance payment</strong>.
                  </p>
                </div>
                <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-200">
                  Interview multiple candidates before finalizing.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/60 border-2 border-blue-600/30 flex flex-col justify-between space-y-2 relative">
                <div className="absolute -top-2.5 right-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Customer Fee
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-600 font-mono">Stage 2</span>
                    <span className="text-xs font-extrabold text-blue-700 font-mono">Rs. 5,000</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">Finalize Helper (Placement Fee)</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Once you complete the interview and <strong>officially finalize</strong> your helper, a <strong>one-time Rs. 5,000 placement fee</strong> is paid by the customer.
                  </p>
                  {onOpenCheckout && (
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenCheckout();
                      }}
                      className="mt-2 py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 shadow-2xs"
                    >
                      <span>Pay Rs. 5,000 Placement Fee</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <div className="text-[11px] text-blue-700 font-medium pt-2 border-t border-blue-200/60">
                  Includes 30-Day Free Replacement Guarantee & CNIC dossier.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-2">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-blue-600 font-mono">Stage 3</span>
                    <span className="text-[10px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">Direct to Worker</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">Worker's Monthly Salary</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    The household pays the agreed monthly salary (e.g. Rs. 25,000–35,000) <strong>directly to the domestic worker</strong> between the 1st and 5th of each month.
                  </p>
                </div>
                <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-200">
                  100% of salary goes to helper (0% deduction from worker).
                </div>
              </div>
            </div>
          </div>

          {/* Supported Pakistani Payment Methods */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Accepted Payment Methods in Pakistan:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Banknote className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Cash in Hand</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Most common in Pakistan. A signed payment slip/register is recommended.</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Easypaisa / JazzCash</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Instant mobile transfer directly to the helper’s verified CNIC account.</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-200 bg-white flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Direct Bank Transfer</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">1-Link Raast or IBAN transfer from HBL, Meezan, Alfalah, etc.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Protection Guarantees */}
          <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wide">
              <Lock className="w-4 h-4 text-blue-600" />
              <span>MaidConnect Payment Protections</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-blue-950">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Zero Middleman Deduction:</strong> Workers keep 100% of their earned salary.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>No Salary Advance Risk:</strong> We advise households not to give large upfront loans before 6 months.</span>
              </div>
              <div className="flex items-start gap-2">
                <RefreshCw className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>30-Day Free Replacement:</strong> If worker leaves or is not suitable, we rematch for free.</span>
              </div>
              <div className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span><strong>Salary Receipt Template:</strong> Printable digital receipt provided for household records.</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="w-full sm:w-auto py-3 px-5 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition-colors border border-slate-200 text-center"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="w-full sm:w-auto py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
            >
              <span>Book a Verified Helper Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
