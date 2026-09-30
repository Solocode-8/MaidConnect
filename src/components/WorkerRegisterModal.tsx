import { useState } from 'react';
import { X, CheckCircle2, ShieldCheck, HeartHandshake, ArrowRight, Phone } from 'lucide-react';
import { CITIES_LIST, ROLES_LIST } from '../data/mockData';

interface WorkerRegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WorkerRegisterModal({ isOpen, onClose }: WorkerRegisterModalProps) {
  const [workerName, setWorkerName] = useState('');
  const [cnic, setCnic] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Karachi');
  const [area, setArea] = useState('');
  const [role, setRole] = useState('House Cleaning');
  const [experience, setExperience] = useState('3-5 Years');
  const [preferredShift, setPreferredShift] = useState('Day Shift (8 hrs)');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workerName.trim() || !phone.trim() || !cnic.trim()) {
      setErrorMsg('Please enter your Name, CNIC number, and active mobile number.');
      return;
    }

    if (phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid Pakistani mobile number (e.g. 0300 1234567).');
      return;
    }

    setErrorMsg('');
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setErrorMsg('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              <HeartHandshake className="w-4 h-4" />
              <span>Direct Domestic Employment</span>
            </div>
            <h3 className="text-xl font-bold font-display">
              Join MaidConnect as a Domestic Helper
            </h3>
            <p className="text-xs text-slate-300">
              100% free registration. We never take any cuts or commission from your salary.
            </p>
          </div>
          <button
            onClick={handleResetAndClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-2xl font-bold text-slate-900 font-display">
                  Khushamdeed! Registration Received
                </h4>
                <p className="text-sm text-slate-600 max-w-sm mx-auto">
                  Thank you, <strong>{workerName}</strong>. Our team will call you on <strong>{phone}</strong> to verify your CNIC details and match you with respectable families in <strong>{city}</strong>.
                </p>
              </div>

              <div className="bg-emerald-50/70 p-4 rounded-xl text-xs text-emerald-900 text-left border border-emerald-200 space-y-1 mt-4">
                <div className="font-semibold text-emerald-800">Next Steps:</div>
                <div>1. Keep your original NADRA CNIC handy for verification.</div>
                <div>2. Mention any previous household experience or recommendation letters.</div>
                <div>3. You will receive interview notifications directly via SMS and WhatsApp.</div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleResetAndClose}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl"
                >
                  Close & Back to MaidConnect
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg font-medium">
                  {errorMsg}
                </div>
              )}

              <div className="p-3 bg-blue-50 border border-blue-200/80 rounded-xl text-xs text-blue-900 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Haq-e-Mehnat Guarantee:</strong> Zero agent fees, zero registration charges, and direct cash or bank payments from the employer.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Worker's Full Name (As per CNIC) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Parveen Bibi or Mohammad Ali"
                  value={workerName}
                  onChange={(e) => setWorkerName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    NADRA CNIC Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="42101-1234567-1"
                    value={cnic}
                    onChange={(e) => setCnic(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Active Mobile / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0300 1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    City of Residence *
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    {CITIES_LIST.filter((c) => c !== 'All Cities').map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Neighborhood / Area
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Korangi, Walton, Rawal Town"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Primary Domestic Skill
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    {ROLES_LIST.filter((r) => r !== 'All Roles').map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Experience
                  </label>
                  <select
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="1-2 Years">1-2 Years</option>
                    <option value="3-5 Years">3-5 Years</option>
                    <option value="5-10 Years">5-10 Years</option>
                    <option value="10+ Years">10+ Years</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Preferred Shift Type
                </label>
                <select
                  value={preferredShift}
                  onChange={(e) => setPreferredShift(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Day Shift (8 hrs)">Day Shift (8 hours)</option>
                  <option value="Live-in">Live-in (24 hours)</option>
                  <option value="Part-time (4 hrs)">Part-time (Morning / Evening)</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <span>Submit Worker Application</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-[11px] text-slate-400 text-center">
                Registration helpline available in Urdu, Punjabi & Sindhi.
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
