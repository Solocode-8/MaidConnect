import { useState, useEffect } from 'react';
import {
  X,
  Mail,
  Lock,
  Phone,
  User,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowRight,
  Home,
  Briefcase,
  CheckCircle2,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';
import { UserAccount, UserRole, RegisteredUser } from '../types/auth';
import { CITIES_LIST, ROLES_LIST } from '../data/mockData';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  initialRole?: UserRole;
  onAuthSuccess: (user: UserAccount) => void;
  authNotice?: string;
}

export default function AuthModal({
  isOpen,
  onClose,
  initialMode = 'login',
  initialRole = 'employer',
  onAuthSuccess,
  authNotice,
}: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(initialMode);
  const [role, setRole] = useState<UserRole>(initialRole);
  const [showPassword, setShowPassword] = useState(false);

  // Form Fields
  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [city, setCity] = useState('Karachi');
  const [area, setArea] = useState('');
  const [cnic, setCnic] = useState('');
  const [primarySkill, setPrimarySkill] = useState('House Cleaning');
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Forgot password sub-state
  const [forgotStep, setForgotStep] = useState<'input' | 'otp' | 'done'>('input');
  const [resetContact, setResetContact] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // UI state
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setRole(initialRole);
      setErrorMsg('');
      setSuccessMsg('');
    }
  }, [isOpen, initialMode, initialRole]);

  if (!isOpen) return null;

  const handleResetModal = () => {
    setErrorMsg('');
    setSuccessMsg('');
    setLoading(false);
    onClose();
  };

  const getRegisteredUsers = (): RegisteredUser[] => {
    try {
      const saved = localStorage.getItem('maidconnect_registered_users');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const identifier = emailOrPhone.trim().toLowerCase();
    if (!identifier) {
      setErrorMsg('Please enter your phone number or email address.');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const registeredUsers = getRegisteredUsers();

      // Find user by phone (ignoring formatting) or email
      const cleanInputPhone = identifier.replace(/\D/g, '');
      const foundUser = registeredUsers.find((u) => {
        const uPhoneClean = u.phone.replace(/\D/g, '');
        const matchPhone = cleanInputPhone.length >= 10 && uPhoneClean === cleanInputPhone;
        const matchEmail = u.email && u.email.toLowerCase() === identifier;
        return matchPhone || matchEmail;
      });

      if (!foundUser) {
        setErrorMsg(
          `No account found for "${emailOrPhone}". Please click "Sign Up (Register)" above to create your account first.`
        );
        return;
      }

      if (foundUser.password !== password) {
        setErrorMsg('Incorrect password. Please double-check and try again.');
        return;
      }

      const { password: _, ...cleanUser } = foundUser;
      onAuthSuccess(cleanUser);
      handleResetModal();
    }, 400);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (!phone.trim() || cleanPhone.length < 10) {
      setErrorMsg('Please provide a valid Pakistani 11-digit mobile number (e.g. 0300 1234567).');
      return;
    }
    if (role === 'employer' && !email.trim()) {
      setErrorMsg('Please provide your active email address.');
      return;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify your password.');
      return;
    }
    if (role === 'worker' && !cnic.trim()) {
      setErrorMsg('CNIC number is required for worker identity verification.');
      return;
    }
    if (!agreeTerms) {
      setErrorMsg('You must agree to the Terms of Service & Privacy Policy.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const registeredUsers = getRegisteredUsers();

      // Check if user with same phone or email exists
      const existing = registeredUsers.find((u) => {
        const uPhoneClean = u.phone.replace(/\D/g, '');
        const matchPhone = uPhoneClean === cleanPhone;
        const matchEmail = email.trim() && u.email && u.email.toLowerCase() === email.trim().toLowerCase();
        return matchPhone || matchEmail;
      });

      if (existing) {
        setErrorMsg(
          `An account with this phone number or email is already registered. Please switch to "Log In".`
        );
        return;
      }

      const initials = name
        .trim()
        .split(' ')
        .filter(Boolean)
        .map((p) => p[0])
        .slice(0, 2)
        .join('')
        .toUpperCase() || 'MC';

      const newRegisteredUser: RegisteredUser = {
        id: 'usr_' + Date.now(),
        name: name.trim(),
        email: email.trim() || `${cleanPhone}@user.maidconnect.pk`,
        phone: phone.trim(),
        password,
        role,
        city,
        area: area.trim() || undefined,
        cnic: role === 'worker' ? cnic.trim() : undefined,
        primarySkill: role === 'worker' ? primarySkill : undefined,
        avatarInitials: initials,
        verified: true,
        memberSince: new Date().toLocaleDateString('en-PK', { month: 'long', year: 'numeric' }),
      };

      registeredUsers.push(newRegisteredUser);
      try {
        localStorage.setItem('maidconnect_registered_users', JSON.stringify(registeredUsers));
      } catch {
        // ignore
      }

      const { password: _, ...cleanUser } = newRegisteredUser;
      onAuthSuccess(cleanUser);
      handleResetModal();
    }, 450);
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetContact.trim()) {
      setErrorMsg('Please enter your registered phone number or email.');
      return;
    }

    const clean = resetContact.trim().toLowerCase().replace(/\D/g, '');
    const registeredUsers = getRegisteredUsers();
    const found = registeredUsers.find(
      (u) =>
        (clean.length >= 10 && u.phone.replace(/\D/g, '') === clean) ||
        (u.email && u.email.toLowerCase() === resetContact.trim().toLowerCase())
    );

    if (!found) {
      setErrorMsg(`No account found matching "${resetContact}". Please verify your details.`);
      return;
    }

    setErrorMsg('');
    setForgotStep('otp');
  };

  const handleOtpAndResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpCode.trim() || otpCode.length < 4) {
      setErrorMsg('Please enter the 4-digit verification code.');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setErrorMsg('New password must be at least 6 characters long.');
      return;
    }

    const clean = resetContact.trim().toLowerCase().replace(/\D/g, '');
    const registeredUsers = getRegisteredUsers();
    const index = registeredUsers.findIndex(
      (u) =>
        (clean.length >= 10 && u.phone.replace(/\D/g, '') === clean) ||
        (u.email && u.email.toLowerCase() === resetContact.trim().toLowerCase())
    );

    if (index !== -1) {
      registeredUsers[index].password = newPassword;
      try {
        localStorage.setItem('maidconnect_registered_users', JSON.stringify(registeredUsers));
      } catch {
        // ignore
      }
    }

    setForgotStep('done');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="bg-slate-900 text-white p-6 pb-5 flex items-start justify-between relative">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
                M
              </div>
              <span className="text-sm font-bold tracking-tight text-white font-display">
                Maid<span className="text-blue-400">Connect</span>
              </span>
            </div>
            <h3 className="text-xl font-bold font-display text-white">
              {mode === 'login' && 'Log In to MaidConnect'}
              {mode === 'signup' && 'Create Your Free Account'}
              {mode === 'forgot' && 'Reset Password'}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              {mode === 'login' && 'Log in using your registered phone number or email.'}
              {mode === 'signup' && 'Sign up to interview verified domestic workers or find employment.'}
              {mode === 'forgot' && 'Recover access to your account.'}
            </p>
          </div>

          <button
            onClick={handleResetModal}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Required Notice Banner (e.g. from trying to book) */}
        {authNotice && (
          <div className="bg-amber-50 border-b border-amber-200 px-6 py-3 text-xs text-amber-950 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-bold text-amber-900">Account Required</strong>
              <span>{authNotice}</span>
            </div>
          </div>
        )}

        {/* Mode Switch Tabs (Login vs Sign Up) */}
        {mode !== 'forgot' && (
          <div className="flex border-b border-slate-200 bg-slate-50">
            <button
              type="button"
              onClick={() => {
                setMode('login');
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`flex-1 py-3.5 text-xs font-bold tracking-wide uppercase transition-colors text-center border-b-2 ${
                mode === 'login'
                  ? 'border-blue-600 text-blue-600 bg-white shadow-2xs'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('signup');
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className={`flex-1 py-3.5 text-xs font-bold tracking-wide uppercase transition-colors text-center border-b-2 ${
                mode === 'signup'
                  ? 'border-blue-600 text-blue-600 bg-white shadow-2xs'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              Sign Up (Register)
            </button>
          </div>
        )}

        {/* Role Selector Segment (Employer vs Worker) */}
        {mode !== 'forgot' && (
          <div className="px-6 pt-5 pb-1">
            <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2">
              Select Your Role:
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('employer')}
                className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all ${
                  role === 'employer'
                    ? 'border-blue-600 bg-blue-50/70 text-blue-900 ring-1 ring-blue-600 shadow-2xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  role === 'employer' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  <Home className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold leading-tight">Household</div>
                  <div className="text-[10px] text-slate-500">I want to hire help</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRole('worker')}
                className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all ${
                  role === 'worker'
                    ? 'border-emerald-600 bg-emerald-50/70 text-emerald-900 ring-1 ring-emerald-600 shadow-2xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                  role === 'worker' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold leading-tight">Domestic Helper</div>
                  <div className="text-[10px] text-slate-500">I am looking for jobs</div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Body Container */}
        <div className="p-6 sm:p-7 space-y-4 max-h-[72vh] overflow-y-auto">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium flex items-center justify-between">
              <span>{errorMsg}</span>
              <button onClick={() => setErrorMsg('')} className="text-rose-500 hover:text-rose-800 ml-2">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl font-medium flex items-center justify-between">
              <span>{successMsg}</span>
              <button onClick={() => setSuccessMsg('')} className="text-emerald-600 hover:text-emerald-900 ml-2">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ================= LOGIN FORM ================= */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Registered Mobile Number or Email
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-3 text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="0300 1234567 or email@domain.com"
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('forgot');
                      setErrorMsg('');
                    }}
                    className="text-xs font-semibold text-blue-600 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute left-3.5 top-3 text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter your account password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 mt-2"
              >
                <span>{loading ? 'Logging In...' : 'Log In to My Account'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
                New to MaidConnect?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setErrorMsg('');
                  }}
                  className="font-bold text-blue-600 hover:underline"
                >
                  Create an Account (Sign Up)
                </button>
              </div>
            </form>
          )}

          {/* ================= SIGN UP FORM ================= */}
          {mode === 'signup' && (
            <form onSubmit={handleSignupSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Full Name *
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-3 text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Asad Qureshi"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Mobile / WhatsApp *
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-3 text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="0300 1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address {role === 'worker' ? '(Optional)' : '*'}
                  </label>
                  <div className="relative">
                    <div className="absolute left-3.5 top-3 text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required={role === 'employer'}
                      placeholder="name@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    Area / Neighborhood
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. DHA, Gulberg, Bahria"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* Worker Specific Verification Details */}
              {role === 'worker' && (
                <div className="p-3.5 bg-emerald-50/70 border border-emerald-200/80 rounded-2xl space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Worker Verification</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-xs font-semibold text-emerald-900 mb-1">
                        NADRA CNIC Number *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="42101-1234567-1"
                        value={cnic}
                        onChange={(e) => setCnic(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-emerald-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-emerald-900 mb-1">
                        Primary Domestic Role
                      </label>
                      <select
                        value={primarySkill}
                        onChange={(e) => setPrimarySkill(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-white border border-emerald-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      >
                        {ROLES_LIST.filter((r) => r !== 'All Roles').map((r) => (
                          <option key={r} value={r}>{r}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Create Password *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Min. 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Repeat password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="pt-1">
                <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-600">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 mt-0.5"
                  />
                  <span>
                    I agree to the MaidConnect <strong className="text-slate-800">Terms of Service</strong> & Privacy Policy.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 px-4 font-bold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 text-white mt-2 ${
                  role === 'worker'
                    ? 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800'
                    : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
                }`}
              >
                <span>{loading ? 'Creating Your Account...' : `Register as ${role === 'worker' ? 'Domestic Worker' : 'Household Employer'}`}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setErrorMsg('');
                  }}
                  className="font-bold text-blue-600 hover:underline"
                >
                  Log In Here
                </button>
              </div>
            </form>
          )}

          {/* ================= FORGOT PASSWORD ================= */}
          {mode === 'forgot' && (
            <div className="space-y-4 py-2">
              {forgotStep === 'input' && (
                <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                  <div className="text-xs text-slate-600 leading-relaxed">
                    Enter your registered phone number or email address to recover your password.
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Phone Number or Email
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="0300 1234567 or name@domain.com"
                      value={resetContact}
                      onChange={(e) => setResetContact(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Verification</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {forgotStep === 'otp' && (
                <form onSubmit={handleOtpAndResetSubmit} className="space-y-4">
                  <div className="p-3 bg-blue-50 border border-blue-200 text-xs text-blue-900 rounded-xl">
                    Verification code sent to <strong>{resetContact}</strong>. (For demonstration testing, enter <strong>1234</strong>).
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Enter 4-Digit Code
                    </label>
                    <input
                      type="text"
                      maxLength={4}
                      placeholder="1234"
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value)}
                      className="w-full text-center tracking-widest text-lg font-mono font-bold py-2.5 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      New Password (Min. 6 characters)
                    </label>
                    <input
                      type="password"
                      required
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl"
                  >
                    Reset & Save Password
                  </button>
                </form>
              )}

              {forgotStep === 'done' && (
                <div className="text-center py-4 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 font-display">
                    Password Successfully Updated!
                  </h4>
                  <p className="text-xs text-slate-600">
                    You can now log in using your newly configured password.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setForgotStep('input');
                    }}
                    className="w-full py-2.5 bg-blue-600 text-white font-semibold text-xs rounded-xl"
                  >
                    Back to Log In
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setForgotStep('input');
                  setErrorMsg('');
                }}
                className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Log In</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
