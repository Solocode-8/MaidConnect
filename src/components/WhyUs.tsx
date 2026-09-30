import { ShieldCheck, Zap, Users, HandCoins, FileCheck, RefreshCw } from 'lucide-react';

export default function WhyUs() {
  const features = [
    {
      title: 'Uncompromised Trust & NADRA Verification',
      category: 'Trust & Safety',
      description: 'Every domestic worker registered on MaidConnect presents an authentic NADRA CNIC, permanent home address verification, and verified employment references before profile activation.',
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
    },
    {
      title: 'Seamless Convenience via WhatsApp & Phone',
      category: 'Speed & Ease',
      description: 'No complicated portals or multi-week delays. View verified candidates, coordinate voice or video screening, and set up home trial sessions quickly through our active support desk.',
      icon: <Zap className="w-6 h-6 text-amber-600" />,
    },
    {
      title: 'Unmatched Choice Across Pakistan',
      category: 'Broad Directory',
      description: 'Over 4,500 active domestic profiles nationwide. Find specialists for baby nursing, elder medical care, traditional desi cooking, or thorough housekeeping.',
      icon: <Users className="w-6 h-6 text-emerald-600" />,
    },
    {
      title: 'Direct Connection with Zero Commission Cuts',
      category: 'Fair Economics',
      description: 'Traditional agencies take up to 40% of the helper’s wages every month. With MaidConnect, workers keep 100% of their salary, fostering higher loyalty, honesty, and mutual respect.',
      icon: <HandCoins className="w-6 h-6 text-indigo-600" />,
    },
    {
      title: 'Police Clearance & Record Facilitation',
      category: 'Legal Peace of Mind',
      description: 'We assist employers in generating and filing standard domestic worker character certificates and police verification records with local police stations.',
      icon: <FileCheck className="w-6 h-6 text-teal-600" />,
    },
    {
      title: '30-Day Replacement Guarantee',
      category: 'Reliability',
      description: 'If a helper’s schedule shifts, or if family expectations don’t match within the first month, our coordination team offers up to two prompt candidate replacements without hassle.',
      icon: <RefreshCw className="w-6 h-6 text-sky-600" />,
    },
  ];

  return (
    <section id="why-us" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-16">
          <div className="text-xs font-bold text-blue-600 tracking-wider uppercase">
            The MaidConnect Difference
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display text-balance">
            Why Pakistani Households Choose MaidConnect
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Built from the ground up to solve the security, reliability, and ethical challenges of informal domestic hiring in Pakistan.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                  {feature.icon}
                </div>

                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">
                    {feature.category}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 font-display">
                    {feature.title}
                  </h3>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>MaidConnect Standard</span>
                <span className="font-mono text-slate-500">PK Verified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
