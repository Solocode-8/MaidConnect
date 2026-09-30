import { useState } from 'react';
import { Sparkles, Utensils, Baby, HeartPulse, Check, ArrowRight, Clock, ShieldCheck } from 'lucide-react';
import { SERVICE_ROLES, ServiceRole } from '../data/mockData';

interface RolesSectionProps {
  onSelectRole: (roleTitle: string) => void;
  onOpenBookingForRole: (roleTitle: string) => void;
}

export default function RolesSection({ onSelectRole, onOpenBookingForRole }: RolesSectionProps) {
  const [expandedRoleId, setExpandedRoleId] = useState<string | null>(null);

  const getRoleIcon = (id: string) => {
    switch (id) {
      case 'house-cleaning':
        return <Sparkles className="w-5 h-5 text-blue-600" />;
      case 'cooking-kitchen':
        return <Utensils className="w-5 h-5 text-amber-600" />;
      case 'babysitting':
        return <Baby className="w-5 h-5 text-emerald-600" />;
      case 'elderly-care':
        return <HeartPulse className="w-5 h-5 text-rose-600" />;
      case 'deep-cleaning-hourly':
        return <Clock className="w-5 h-5 text-indigo-600" />;
      default:
        return <Sparkles className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <section id="roles" className="py-10 sm:py-12 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Compact */}
        <div className="max-w-2xl mx-auto text-center space-y-1.5 mb-8">
          <div className="text-[11px] font-bold text-blue-600 tracking-wider uppercase">
            Specialized Domestic Support
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-display">
            Services & Roles We Connect
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
            Select a verified domestic service tailored to your home's schedule and budget.
          </p>
        </div>

        {/* Compact Roles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-start">
          {SERVICE_ROLES.map((role) => {
            const isExpanded = expandedRoleId === role.id;
            return (
              <div
                key={role.id}
                className="bg-white rounded-xl border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group hover:border-blue-300"
              >
                {/* Compact Image Banner */}
                <div className="relative h-28 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={role.image}
                    alt={`${role.title} services in Pakistan - MaidConnect`}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/hero_home_care.jpg';
                    }}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent"></div>
                  
                  <div className="absolute top-2 left-2">
                    <div className="w-7 h-7 rounded-lg bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-xs">
                      {getRoleIcon(role.id)}
                    </div>
                  </div>

                  <div className="absolute bottom-2 left-2.5 right-2.5">
                    <h3 className="text-sm font-bold text-white drop-shadow-xs line-clamp-1">
                      {role.title}
                    </h3>
                  </div>
                </div>

                {/* Compact Card Content */}
                <div className="p-3.5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <p className="text-[11px] text-blue-600 font-semibold line-clamp-1">
                      {role.tagline}
                    </p>
                    
                    {isExpanded ? (
                      <div className="space-y-2 pt-0.5 animate-fadeIn">
                        <p className="text-xs text-slate-700 leading-relaxed">
                          {role.description}
                        </p>
                        <div className="pt-2 border-t border-slate-100 space-y-1 text-[11px] text-slate-600">
                          <span className="font-semibold text-slate-800 block">Typical Responsibilities:</span>
                          <ul className="space-y-1">
                            {role.typicalTasks.map((task, i) => (
                              <li key={i} className="flex items-start gap-1">
                                <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                                <span>{task}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <button
                          type="button"
                          onClick={() => setExpandedRoleId(null)}
                          className="text-[11px] font-bold text-blue-700 hover:text-blue-900 hover:underline block pt-1"
                        >
                          Show less ▲
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p
                          onClick={() => setExpandedRoleId(role.id)}
                          className="text-xs text-slate-500 line-clamp-2 leading-relaxed cursor-pointer hover:text-slate-800 transition-colors"
                          title="Click to view full description"
                        >
                          {role.description}
                        </p>
                        <button
                          type="button"
                          onClick={() => setExpandedRoleId(role.id)}
                          className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 hover:underline mt-0.5 inline-block"
                        >
                          Read full details...
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2.5 border-t border-slate-100">
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => {
                          const targetRole =
                            role.id === 'cooking-kitchen' ? 'Cooking & Kitchen' :
                            role.id === 'babysitting' ? 'Babysitting' :
                            role.id === 'elderly-care' ? 'Elderly Care' :
                            role.id === 'deep-cleaning-hourly' ? 'Hourly & Deep Cleaning' :
                            'House Cleaning';
                          onSelectRole(targetRole);
                        }}
                        className="py-2 px-2 text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg text-center transition-colors truncate"
                      >
                        Browse Profiles
                      </button>
                      <button
                        onClick={() => onOpenBookingForRole(role.title)}
                        className="py-2 px-2 text-[11px] font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-center transition-colors flex items-center justify-center gap-1"
                      >
                        <span>Request</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
