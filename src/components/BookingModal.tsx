import { useState, useEffect } from 'react';
import { X, CheckCircle2, ShieldCheck, Phone, MapPin, Calendar, Clock, ArrowRight, Sparkles, UserCheck } from 'lucide-react';
import { WorkerProfile, CITIES_LIST, ROLES_LIST, PREFERRED_TIME_SLOTS } from '../data/mockData';
import { UserAccount } from '../types/auth';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  worker?: WorkerProfile | null;
  defaultRole?: string;
  defaultCity?: string;
  defaultShift?: string;
  defaultWage?: string;
  currentUser?: UserAccount | null;
  onOpenCheckout?: (workerName?: string, workerRole?: string) => void;
  onBookingConfirmed?: (bookingData: {
    workerName: string;
    workerRole: string;
    city: string;
    area?: string;
    shift: string;
    timeSlot: string;
    specialNotes?: string;
  }) => void;
}

export default function BookingModal({
  isOpen,
  onClose,
  worker,
  defaultRole = 'House Cleaning',
  defaultCity = 'Karachi',
  defaultShift = 'Day Shift (8 hrs)',
  defaultWage,
  currentUser,
  onOpenCheckout,
  onBookingConfirmed,
}: BookingModalProps) {
  const [fullName, setFullName] = useState(currentUser?.name || '');
  const [phoneNumber, setPhoneNumber] = useState(currentUser?.phone || '');
  const [city, setCity] = useState(currentUser?.city || (defaultCity === 'All Cities' ? 'Karachi' : defaultCity));
  const [area, setArea] = useState(currentUser?.area || '');
  const [role, setRole] = useState(defaultRole === 'All Roles' ? 'House Cleaning' : defaultRole);
  const [shift, setShift] = useState(defaultShift);
  const [timeSlot, setTimeSlot] = useState<string>(PREFERRED_TIME_SLOTS[0]);
  const [urgency, setUrgency] = useState('Immediately (Within 3 days)');
  const [specialNotes, setSpecialNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (currentUser) {
        setFullName(currentUser.name);
        setPhoneNumber(currentUser.phone);
        if (currentUser.city) setCity(currentUser.city);
        if (currentUser.area) setArea(currentUser.area);
      }
      if (defaultRole && defaultRole !== 'All Roles') setRole(defaultRole);
      if (defaultCity && defaultCity !== 'All Cities') setCity(defaultCity);
      if (defaultShift) setShift(defaultShift);
      setIsSubmitted(false);
      setErrorMsg('');
    }
  }, [isOpen, currentUser, defaultRole, defaultCity, defaultShift]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phoneNumber.trim()) {
      setErrorMsg('Please enter your full name and a contact phone number.');
      return;
    }

    if (phoneNumber.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid Pakistani phone number (e.g., 0300 1234567).');
      return;
    }

    setErrorMsg('');
    setIsSubmitted(true);

    onBookingConfirmed?.({
      workerName: worker ? worker.name : `Domestic Help (${role})`,
      workerRole: role,
      city,
      area: area.trim() || undefined,
      shift,
      timeSlot,
      specialNotes: specialNotes.trim() || undefined,
    });
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
            <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>MaidConnect Verified Match</span>
            </div>
            <h3 className="text-xl font-bold font-display">
              {worker ? `Book Interview with ${worker.name}` : 'Request Verified Domestic Help'}
            </h3>
            <p className="text-xs text-slate-300">
              {worker ? `${worker.role} · ${worker.city} (${worker.area})` : 'Free candidate coordination with zero middleman markup.'}
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
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h4 className="text-2xl font-bold text-slate-900 font-display">
                  Request Confirmed (Rs. 0 Paid)
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto">
                  Thank you, <strong>{fullName}</strong>. Our city coordinator for <strong>{city}</strong> will contact you via WhatsApp/call within 2 to 4 hours.
                </p>
              </div>

              {/* Booking Summary */}
              <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-600 text-left border border-slate-200 space-y-1 mt-3">
                <div className="flex justify-between">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-semibold text-slate-900">{role} ({shift})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Schedule:</span>
                  <span className="font-semibold text-slate-900">{timeSlot}</span>
                </div>
                {worker && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Helper:</span>
                    <span className="font-semibold text-slate-900">{worker.name} (CNIC Verified)</span>
                  </div>
                )}
                <div className="flex justify-between pt-1 border-t border-slate-200">
                  <span className="text-slate-500">Today's Charge:</span>
                  <span className="font-bold text-emerald-700">Rs. 0 (Free Trial & Interview)</span>
                </div>
              </div>

              {/* 3-Step Clear Timeline */}
              <div className="bg-blue-50/60 border border-blue-100 rounded-2xl p-4 text-left space-y-2.5">
                <div className="text-[11px] font-bold text-blue-900 uppercase tracking-wider">
                  Payment & Hiring Timeline:
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
                    <div>
                      <strong className="text-slate-900 block">Candidate WhatsApp Interview (FREE)</strong>
                      <span className="text-slate-500 text-[11px]">Direct screening with original NADRA CNIC documents.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                    <div>
                      <strong className="text-slate-900 block">3-Day Home Trial (FREE)</strong>
                      <span className="text-slate-500 text-[11px]">Confirm work quality in your own home with no obligation.</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-slate-700 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
                    <div>
                      <strong className="text-slate-900 block">Finalize Helper (Rs. 5,000 Placement Fee)</strong>
                      <span className="text-slate-500 text-[11px]">Only pay via JazzCash, Easypaisa, or Card after you approve the worker. Includes 30-day replacement support.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleResetAndClose}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-colors"
                >
                  Done & Back to Website
                </button>
                {onOpenCheckout && (
                  <button
                    type="button"
                    onClick={() => {
                      handleResetAndClose();
                      onOpenCheckout(worker?.name || fullName, role);
                    }}
                    className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-colors border border-slate-200"
                  >
                    Preview Payment Portal
                  </button>
                )}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Logged in User Identification */}
              {currentUser && (
                <div className="p-3 bg-blue-50/80 border border-blue-200/90 rounded-2xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                      {currentUser.avatarInitials}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 leading-tight">
                        Booking as {currentUser.name}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {currentUser.phone} · {currentUser.city}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-200">
                    Verified Account
                  </span>
                </div>
              )}

              {/* Zero-advance reassurance banner */}
              <div className="p-3 bg-emerald-50/90 border border-emerald-200 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-emerald-950 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Payment Due Today: <strong>Rs. 0 (Free Interview)</strong></span>
                </div>
                <span className="text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200 uppercase tracking-wide">
                  Zero Advance
                </span>
              </div>

              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg font-medium">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Farhan Ahmed"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0300 1234567"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    City *
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
                    Area / Sector
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. DHA Phase 5, F-7, Gulberg"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {['DHA Phase 1-8', 'Clifton', 'Gulberg', 'Bahria Town'].map((a) => (
                      <button
                        key={a}
                        type="button"
                        onClick={() => setArea(a)}
                        className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-600 border border-slate-200"
                      >
                        +{a}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Role Needed
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
                    Shift Type
                  </label>
                  <select
                    value={shift}
                    onChange={(e) => setShift(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="Day Shift (8 hrs)">Day Shift (8 hours)</option>
                    <option value="Live-in">Live-in (24 hours)</option>
                    <option value="Part-time (4 hrs)">Part-time (4 hours)</option>
                    <option value="Hourly Visit (2-4 hrs)">Hourly Visit (2-4 hours)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Preferred Arrival / Time Slot
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {PREFERRED_TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTimeSlot(slot)}
                      className={`px-3 py-2 text-left rounded-xl text-xs font-medium border transition-all ${
                        timeSlot === slot
                          ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-bold shadow-2xs'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5 inline mr-1.5 text-blue-600" />
                      <span>{slot}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  How Soon Do You Need Help?
                </label>
                <select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Immediately (Within 3 days)">Immediately (Within 1-3 days)</option>
                  <option value="Within 1 Week">Within this week</option>
                  <option value="Next Month">Next month</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Specific Requirements or Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Vegetarian cooking preferred, elderly mobility care, family of 5..."
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                ></textarea>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <span>Confirm Free Request (Rs. 0 Today)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="text-[11px] text-slate-500 text-center flex items-center justify-center gap-1.5 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Interviews are 100% Free · Placement fee (Rs. 5,000) only payable after you finalize candidate</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
