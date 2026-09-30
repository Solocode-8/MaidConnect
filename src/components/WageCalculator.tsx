import { useState, useMemo } from 'react';
import { Calculator, HelpCircle, CheckCircle2, ArrowRight, Info } from 'lucide-react';
import { CITIES_LIST, ROLES_LIST } from '../data/mockData';

interface WageCalculatorProps {
  onOpenBookingWithEstimate: (city: string, role: string, workType: string, estimatedWage: string) => void;
  onOpenPaymentGuide?: () => void;
}

export default function WageCalculator({ onOpenBookingWithEstimate, onOpenPaymentGuide }: WageCalculatorProps) {
  const [city, setCity] = useState<string>('Karachi');
  const [role, setRole] = useState<string>('House Cleaning');
  const [shift, setShift] = useState<'Live-in' | 'Day Shift (8 hrs)' | 'Part-time (4 hrs)'>('Day Shift (8 hrs)');
  const [houseSize, setHouseSize] = useState<'Standard (1-2 Bed / 120-250 sq yd)' | 'Large (3-5 Bed / 500-1000 sq yd)'>('Standard (1-2 Bed / 120-250 sq yd)');

  const calculation = useMemo(() => {
    let baseMin = 22000;
    let baseMax = 28000;

    // Role adjustment
    if (role === 'Cooking & Kitchen') {
      baseMin += 4000;
      baseMax += 6000;
    } else if (role === 'Babysitting') {
      baseMin += 6000;
      baseMax += 8000;
    } else if (role === 'Elderly Care') {
      baseMin += 8000;
      baseMax += 12000;
    } else if (role === 'Hourly & Deep Cleaning') {
      baseMin += 5000;
      baseMax += 7000;
    }

    // Shift adjustment
    if (shift === 'Live-in') {
      baseMin = Math.round(baseMin * 1.35);
      baseMax = Math.round(baseMax * 1.45);
    } else if (shift === 'Part-time (4 hrs)') {
      baseMin = Math.round(baseMin * 0.65);
      baseMax = Math.round(baseMax * 0.7);
    }

    // House size adjustment
    if (houseSize.startsWith('Large')) {
      baseMin += 4000;
      baseMax += 6000;
    }

    // City adjustment (Islamabad & Karachi defense slightly higher)
    if (city === 'Islamabad' || city === 'Karachi') {
      baseMin += 2500;
      baseMax += 3500;
    }

    return {
      min: Math.round(baseMin / 500) * 500,
      max: Math.round(baseMax / 500) * 500,
      dailyMin: Math.round(baseMin / 26),
      dailyMax: Math.round(baseMax / 26),
    };
  }, [city, role, shift, houseSize]);

  const formattedRange = `Rs. ${calculation.min.toLocaleString()} – Rs. ${calculation.max.toLocaleString()}`;

  return (
    <section id="calculator" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
          <div className="text-xs font-bold text-blue-600 tracking-wider uppercase">
            Fair Wage Transparency
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display text-balance">
            Domestic Salary & Wage Estimator
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Estimate standard, fair monthly salary packages across Pakistani metropolitan cities according to shift hours and responsibilities.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-slate-50 rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Inputs Column */}
            <div className="lg:col-span-7 space-y-5">
              <div>
                <label htmlFor="calc-city" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  City & Region
                </label>
                <select
                  id="calc-city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {CITIES_LIST.filter((c) => c !== 'All Cities').map((c) => (
                    <option key={c} value={c}>
                      {c} (Metropolitan Area)
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="calc-role" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Domestic Role Needed
                </label>
                <select
                  id="calc-role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  {ROLES_LIST.filter((r) => r !== 'All Roles').map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Working Arrangement
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Live-in', 'Day Shift (8 hrs)', 'Part-time (4 hrs)'] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setShift(s)}
                      className={`px-3 py-2 text-xs font-medium rounded-lg transition-colors border truncate ${
                        shift === s
                          ? 'bg-blue-600 text-white border-blue-600 shadow-2xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {s.split(' ')[0]} {s.includes('hrs') ? `(${s.split('(')[1]}` : ''}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="calc-size" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Home Scale / Property Size
                </label>
                <select
                  id="calc-size"
                  value={houseSize}
                  onChange={(e) => setHouseSize(e.target.value as any)}
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                >
                  <option value="Standard (1-2 Bed / 120-250 sq yd)">Standard (1-2 Bed / 120-250 sq yd or Apartment)</option>
                  <option value="Large (3-5 Bed / 500-1000 sq yd)">Large (3-5 Bed / 500-1000 sq yd House)</option>
                </select>
              </div>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-blue-600 uppercase tracking-wider">
                  <span>Market Fair Range</span>
                  <Calculator className="w-4 h-4 text-blue-600" />
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tracking-tight">
                    {formattedRange}
                  </div>
                  <div className="text-xs text-slate-500 mt-1 font-medium">
                    Estimated monthly salary in {city} for {role} ({shift})
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span>Approx. Daily Equivalent:</span>
                    <span className="font-mono font-semibold text-slate-800">
                      Rs. {calculation.dailyMin.toLocaleString()} – {calculation.dailyMax.toLocaleString()} / day
                    </span>
                  </div>
                  <div className="flex items-start gap-1.5 pt-1 text-[11px] text-slate-500">
                    <Info className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>
                      {shift === 'Live-in'
                        ? 'Includes private sleeping quarters and meal provisions as standard in Pakistan.'
                        : 'Excludes optional travel allowance (typical Rs. 2,000 - 4,000/mo depending on distance).'}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onOpenBookingWithEstimate(city, role, shift, formattedRange)}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
              >
                <span>Hire Helper at This Rate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {onOpenPaymentGuide && (
                <button
                  type="button"
                  onClick={onOpenPaymentGuide}
                  className="w-full text-center text-xs font-semibold text-blue-600 hover:underline pt-0.5"
                >
                  Learn how helper payments & 3-day trials proceed →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
