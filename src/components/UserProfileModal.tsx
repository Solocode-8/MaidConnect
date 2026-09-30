import { useState } from 'react';
import {
  X,
  User,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  Calendar,
  LogOut,
  Clock,
  CheckCircle2,
  FileText,
  Briefcase,
  Home,
  AlertCircle
} from 'lucide-react';
import { UserAccount, UserBooking } from '../types/auth';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserAccount | null;
  bookings: UserBooking[];
  onLogout: () => void;
  onOpenBooking: () => void;
  onOpenCheckout?: (workerName?: string, workerRole?: string) => void;
  onOpenFeedback?: () => void;
}

export default function UserProfileModal({
  isOpen,
  onClose,
  user,
  bookings,
  onLogout,
  onOpenBooking,
  onOpenCheckout,
  onOpenFeedback,
}: UserProfileModalProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'activity'>('profile');

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Strip with User Banner */}
        <div className="bg-slate-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg"
            aria-label="Close user profile"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600 border-2 border-white/20 flex items-center justify-center text-white font-bold text-xl font-display shadow-md">
              {user.avatarInitials}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold font-display text-white">
                  {user.name}
                </h3>
                {user.verified && (
                  <span title="NADRA / Platform Verified" className="text-blue-400 inline-flex items-center">
                    <ShieldCheck className="w-4 h-4" />
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300 mt-0.5">
                <span className={`px-2 py-0.5 rounded-md font-semibold text-[11px] ${
                  user.role === 'worker' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-blue-500/20 text-blue-300'
                }`}>
                  {user.role === 'worker' ? 'Domestic Helper Profile' : 'Household Employer'}
                </span>
                <span aria-hidden="true">·</span>
                <span>{user.city}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
              activeTab === 'profile'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            My Details & Status
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
              activeTab === 'activity'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {user.role === 'worker' ? 'My Worker Status' : `My Bookings (${bookings.length})`}
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-7 space-y-5">
          {activeTab === 'profile' ? (
            <div className="space-y-4">
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/90 space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Account ID:</span>
                  <span className="font-mono font-semibold text-slate-800">{user.id}</span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Phone / WhatsApp:</span>
                  <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-blue-600" />
                    {user.phone}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Email Address:</span>
                  <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    {user.email}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Location:</span>
                  <span className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {user.city} {user.area ? `(${user.area})` : ''}
                  </span>
                </div>

                {user.role === 'worker' && user.cnic && (
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="text-slate-500 font-medium">NADRA CNIC:</span>
                    <span className="font-mono font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                      {user.cnic}
                    </span>
                  </div>
                )}

                {user.role === 'worker' && user.primarySkill && (
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <span className="text-slate-500 font-medium">Primary Skill:</span>
                    <span className="font-semibold text-slate-800">
                      {user.primarySkill}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 font-medium">Member Since:</span>
                  <span className="text-slate-700">{user.memberSince}</span>
                </div>
              </div>

              {user.role === 'employer' ? (
                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-start gap-3">
                  <Home className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-blue-900 block font-semibold mb-0.5">
                      Verified Employer Account
                    </strong>
                    <span className="text-blue-700">
                      You can schedule interviews and take 3-day home trials with domestic helpers across Pakistan with Rs. 0 advance.
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <strong className="text-emerald-900 block font-semibold mb-0.5">
                      Worker Account Registered
                    </strong>
                    <span className="text-emerald-700">
                      Your profile is active in {user.city}. You will receive candidate interview coordination calls directly on your phone/WhatsApp.
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Activity / Bookings Tab */
            <div className="space-y-3">
              {user.role === 'employer' ? (
                bookings.length === 0 ? (
                  <div className="text-center py-10 px-4 space-y-3 border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                    <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                      <Calendar className="w-6 h-6" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-800">No Bookings Yet</h4>
                      <p className="text-xs text-slate-500 max-w-xs mx-auto">
                        You have not requested any domestic helpers yet. Browse our verified candidates to request your first interview.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        onClose();
                        const el = document.getElementById('find-help');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-xs"
                    >
                      Browse Verified Helpers
                    </button>
                  </div>
                ) : (
                  bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="p-4 rounded-2xl border border-slate-200 bg-slate-50/80 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 font-display">
                          {booking.workerName}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            booking.paidCommission
                              ? 'text-purple-700 bg-purple-100'
                              : 'text-blue-700 bg-blue-100'
                          }`}
                        >
                          {booking.paidCommission ? 'Hired & Active' : booking.status}
                        </span>
                      </div>
                      <div className="text-xs text-slate-600 space-y-0.5">
                        <div>
                          <strong>Role:</strong> {booking.workerRole} ({booking.shift})
                        </div>
                        <div>
                          <strong>Timing & City:</strong> {booking.timeSlot} · {booking.city} {booking.area ? `(${booking.area})` : ''}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          Requested on: {booking.createdAt}
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-500 flex items-center justify-between pt-2 border-t border-slate-200/80">
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-blue-600" />
                          <span>
                            {booking.paidCommission
                              ? '30-Day Guarantee Active'
                              : 'Free Interview Pending'}
                          </span>
                        </div>

                        {booking.paidCommission ? (
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-emerald-600 flex items-center gap-1 text-[11px]">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              Commission Paid
                            </span>
                            {onOpenFeedback && (
                              <button
                                type="button"
                                onClick={() => {
                                  onClose();
                                  onOpenFeedback();
                                }}
                                className="py-1 px-2.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-lg text-xs font-semibold"
                              >
                                ★ Review
                              </button>
                            )}
                          </div>
                        ) : (
                          onOpenCheckout && (
                            <button
                              type="button"
                              onClick={() => {
                                onClose();
                                onOpenCheckout(booking.workerName, booking.workerRole);
                              }}
                              className="py-1.5 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-2xs flex items-center gap-1"
                            >
                              <span>Finalize & Pay Rs. 5,000</span>
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  ))
                )
              ) : (
                /* Worker Activity */
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-950">
                        Worker Profile Live
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-white px-2 py-0.5 rounded border border-emerald-200">
                        Active in {user.city}
                      </span>
                    </div>
                    <p className="text-xs text-emerald-800 leading-relaxed">
                      Your profile is active in the MaidConnect helper network. When families in your area search for a {user.primarySkill || 'domestic helper'}, our team coordinates candidate placement directly via your phone.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Bottom Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-3">
            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="py-2.5 px-4 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>

            {user.role === 'employer' && (
              <button
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="py-2.5 px-5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-2xs"
              >
                Book Another Helper
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
