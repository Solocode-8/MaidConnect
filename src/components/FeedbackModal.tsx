import { useState } from 'react';
import { X, Star, Heart, CheckCircle2, MessageSquare, ShieldCheck, Sparkles, Send } from 'lucide-react';
import { UserAccount } from '../types/auth';
import { CITIES_LIST, ROLES_LIST } from '../data/mockData';

export interface FeedbackItem {
  id?: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  rating?: number;
  date?: string;
  helperName?: string;
  recommended?: boolean;
}

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount | null;
  onSubmitFeedback: (feedback: FeedbackItem) => void;
}

export default function FeedbackModal({
  isOpen,
  onClose,
  currentUser,
  onSubmitFeedback,
}: FeedbackModalProps) {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [name, setName] = useState(currentUser?.name || '');
  const [city, setCity] = useState(currentUser?.city || 'Karachi');
  const [area, setArea] = useState(currentUser?.area || '');
  const [role, setRole] = useState('House Cleaning');
  const [helperName, setHelperName] = useState('');
  const [feedbackText, setFeedbackText] = useState('');
  const [recommended, setRecommended] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!feedbackText.trim() || feedbackText.trim().length < 15) {
      setErrorMsg('Please share a few sentences about your experience (minimum 15 characters).');
      return;
    }

    const locationStr = area.trim() ? `${area.trim()}, ${city}` : city;
    const roleStr = helperName.trim()
      ? `${role} (Hired ${helperName.trim()})`
      : `${role} Client`;

    const newFeedback: FeedbackItem = {
      id: 'fb_' + Date.now(),
      name: name.trim(),
      role: roleStr,
      location: locationStr,
      quote: feedbackText.trim(),
      rating: rating,
      date: 'Just now',
      helperName: helperName.trim() || undefined,
      recommended,
    };

    onSubmitFeedback(newFeedback);
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setErrorMsg('');
    setFeedbackText('');
    setHelperName('');
    onClose();
  };

  const ratingLabels: Record<number, string> = {
    1: '1 Star - Unsatisfactory',
    2: '2 Stars - Needs Improvement',
    3: '3 Stars - Average Service',
    4: '4 Stars - Good & Reliable',
    5: '5 Stars - Outstanding Experience',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-6 pb-5 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Household Review & Feedback</span>
            </div>
            <h3 className="text-xl font-bold font-display text-white">
              Share Your MaidConnect Experience
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Share your genuine review to help other Pakistani families hire trusted domestic help with confidence.
            </p>
          </div>

          <button
            onClick={handleResetAndClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors text-lg"
            aria-label="Close feedback modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7">
          {isSubmitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <h4 className="text-2xl font-bold text-slate-900 font-display">
                  Thank You, Review Published!
                </h4>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  Your feedback has been successfully added to our verified reviews and is now visible on the website.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-left text-xs space-y-2">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-slate-800 ml-1">
                    {ratingLabels[rating]}
                  </span>
                </div>
                <p className="text-slate-700 italic">"{feedbackText}"</p>
                <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-200">
                  By <strong>{name}</strong> · {city}
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleResetAndClose}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-colors shadow-sm"
                >
                  Done & View on Testimonials
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                  {errorMsg}
                </div>
              )}

              {/* Star Rating Selector */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center space-y-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  How was your experience? (Overall Rating) *
                </label>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((starVal) => {
                    const activeVal = hoverRating !== null ? hoverRating : rating;
                    return (
                      <button
                        key={starVal}
                        type="button"
                        onClick={() => setRating(starVal)}
                        onMouseEnter={() => setHoverRating(starVal)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="p-1 focus:outline-none transition-transform hover:scale-110"
                        aria-label={`${starVal} Star`}
                      >
                        <Star
                          className={`w-7 h-7 ${
                            starVal <= activeVal
                              ? 'fill-amber-400 text-amber-400 drop-shadow-xs'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    );
                  })}
                </div>
                <div className="text-xs font-semibold text-amber-700">
                  {ratingLabels[hoverRating || rating]}
                </div>
              </div>

              {/* Name & Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Salman or Fatima Khan"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

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
              </div>

              {/* Area & Domestic Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Area / Neighborhood
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. DHA Phase 6, Gulberg"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Service / Role Used
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
              </div>

              {/* Helper Name (Optional) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Helper / Maid's Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Razia Begum or Chef Asif"
                  value={helperName}
                  onChange={(e) => setHelperName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Feedback text */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Review & Comments *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Tell us about the worker's punctuality, cleaning/cooking quality, trustworthiness, and your overall experience..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                ></textarea>
              </div>

              {/* Recommendation checkbox */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                  <input
                    type="checkbox"
                    checked={recommended}
                    onChange={(e) => setRecommended(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                  />
                  <span>Yes, I recommend MaidConnect to other Pakistani families.</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit My Review</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Household Review System</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
