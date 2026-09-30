import { useState } from 'react';
import {
  X,
  CreditCard,
  Smartphone,
  Banknote,
  CheckCircle2,
  Lock,
  ShieldCheck,
  ArrowRight,
  Receipt,
  AlertCircle
} from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  workerName?: string;
  workerRole?: string;
  onPaymentComplete: (transactionDetails: {
    transactionId: string;
    amount: number;
    method: string;
    date: string;
  }) => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  workerName = 'Razia Begum',
  workerRole = 'House Cleaning',
  onPaymentComplete,
}: CheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'jazzcash' | 'easypaisa' | 'card' | 'bank'>('jazzcash');
  const [mobileAccount, setMobileAccount] = useState('0300 1234567');
  const [cnicDigits, setCnicDigits] = useState('123456');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [accountHolder, setAccountHolder] = useState('Farhan Ahmed');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [txId, setTxId] = useState('');

  if (!isOpen) return null;

  const handlePayNow = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedTx = 'TXN-' + Math.floor(100000 + Math.random() * 900000);
      setTxId(generatedTx);
      setIsProcessing(false);
      setIsSuccess(true);

      onPaymentComplete({
        transactionId: generatedTx,
        amount: 5000,
        method: paymentMethod.toUpperCase(),
        date: new Date().toLocaleDateString('en-PK', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
      });
    }, 1200);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setIsProcessing(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 pb-5 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
              <Lock className="w-3.5 h-3.5" />
              <span>100% Encrypted Payment Checkout</span>
            </div>
            <h3 className="text-xl font-bold font-display text-white">
              Pay Placement Commission
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Finalize <strong>{workerName}</strong> ({workerRole}) with full 30-day replacement support.
            </p>
          </div>

          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors text-lg"
            aria-label="Close checkout"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 space-y-5">
          {isSuccess ? (
            /* Success Receipt View */
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <h4 className="text-2xl font-bold text-slate-900 font-display">
                  Payment of Rs. 5,000 Successful!
                </h4>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  {workerName} has been officially locked and confirmed for your household.
                </p>
              </div>

              {/* Receipt Details Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs space-y-2 text-left">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Transaction ID:</span>
                  <span className="font-mono font-bold text-slate-900">{txId}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Amount Paid:</span>
                  <span className="font-bold text-emerald-700">Rs. 5,000 (PKR)</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Selected Helper:</span>
                  <span className="font-semibold text-slate-900">{workerName}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-slate-500">Payment Gateway:</span>
                  <span className="font-semibold text-slate-900">{paymentMethod.toUpperCase()} (Online)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Replacement Cover:</span>
                  <span className="font-semibold text-blue-600">Active for 30 Days</span>
                </div>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-[11px] text-blue-900 text-left flex items-start gap-2">
                <Receipt className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <span>
                  Receipt and worker's verified NADRA CNIC dossier has been shared on your registered WhatsApp.
                </span>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl transition-colors shadow-sm"
              >
                Done & View Active Contract
              </button>
            </div>
          ) : (
            /* Checkout Form View */
            <form onSubmit={handlePayNow} className="space-y-4">
              
              {/* Order Summary Strip */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    MaidConnect Placement Fee
                  </div>
                  <div className="text-[11px] text-slate-500">
                    For hiring {workerName} · One-time only
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-extrabold text-blue-600 font-mono">
                    Rs. 5,000
                  </div>
                  <div className="text-[10px] text-emerald-600 font-medium">
                    0% Commission from Worker
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Pakistani Payment Method:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('jazzcash')}
                    className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                      paymentMethod === 'jazzcash'
                        ? 'border-rose-600 bg-rose-50 text-rose-900 ring-1 ring-rose-600 font-bold'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-xs'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-rose-600" />
                    <span className="text-[11px]">JazzCash</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('easypaisa')}
                    className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                      paymentMethod === 'easypaisa'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-600 font-bold'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-xs'
                    }`}
                  >
                    <Smartphone className="w-4 h-4 text-emerald-600" />
                    <span className="text-[11px]">Easypaisa</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                      paymentMethod === 'card'
                        ? 'border-blue-600 bg-blue-50 text-blue-900 ring-1 ring-blue-600 font-bold'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 text-xs'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-blue-600" />
                    <span className="text-[11px]">Debit/Credit</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Payment Details according to Method */}
              {(paymentMethod === 'jazzcash' || paymentMethod === 'easypaisa') && (
                <div className="space-y-3 p-4 bg-slate-50/80 rounded-2xl border border-slate-200">
                  <div className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-blue-600" />
                    <span>{paymentMethod === 'jazzcash' ? 'JazzCash' : 'Easypaisa'} Mobile Account Transfer</span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                      Account Mobile Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={mobileAccount}
                      onChange={(e) => setMobileAccount(e.target.value)}
                      placeholder="0300 1234567"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                      Account Holder CNIC (Last 6 Digits)
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={cnicDigits}
                      onChange={(e) => setCnicDigits(e.target.value)}
                      placeholder="e.g. 847291"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                    />
                  </div>

                  <div className="text-[11px] text-slate-500 pt-1">
                    An MPIN prompt will appear on your phone to approve the transaction of <strong>Rs. 5,000</strong>.
                  </div>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-3 p-4 bg-slate-50/80 rounded-2xl border border-slate-200">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4242 ···· ···· 4242 (Visa / Mastercard / PayPak)"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                        Expiry (MM/YY)
                      </label>
                      <input
                        type="text"
                        required
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="12/28"
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                        CVV / CVC
                      </label>
                      <input
                        type="password"
                        maxLength={4}
                        required
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        placeholder="123"
                        className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Processing Rs. 5,000 Payment...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm & Pay Rs. 5,000</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Protected by 30-Day Free Candidate Replacement Guarantee</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
