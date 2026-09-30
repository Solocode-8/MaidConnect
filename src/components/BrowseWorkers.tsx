import { useState, useMemo, useEffect } from 'react';
import { Search, ShieldCheck, MapPin, Star, Clock, Calendar, CheckCircle2, ChevronRight, UserCheck, Sparkles, Navigation, X } from 'lucide-react';
import { WORKERS_DIRECTORY, WorkerProfile, CITIES_LIST, ROLES_LIST, POPULAR_AREAS } from '../data/mockData';

interface BrowseWorkersProps {
  initialCity?: string;
  initialRole?: string;
  onBookWorker: (worker: WorkerProfile) => void;
}

const normalizeRole = (r: string) => {
  const low = r.toLowerCase();
  if (low.includes('cook') || low.includes('chef') || low.includes('kitchen')) return 'Cooking & Kitchen';
  if (low.includes('baby') || low.includes('nanny') || low.includes('child')) return 'Babysitting';
  if (low.includes('elder') || low.includes('senior') || low.includes('caretak')) return 'Elderly Care';
  if (low.includes('deep') || low.includes('hourly')) return 'Hourly & Deep Cleaning';
  if (low.includes('clean') || low.includes('maid') || low.includes('housekeep')) return 'House Cleaning';
  return r;
};

export default function BrowseWorkers({ initialCity = 'All Cities', initialRole = 'All Roles', onBookWorker }: BrowseWorkersProps) {
  const [selectedCity, setSelectedCity] = useState<string>(initialCity);
  const [selectedRole, setSelectedRole] = useState<string>(initialRole);
  const [selectedWorkType, setSelectedWorkType] = useState<string>('All');
  const [selectedAreaTag, setSelectedAreaTag] = useState<string>('All Areas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedBios, setExpandedBios] = useState<Record<string, boolean>>({});

  const toggleBio = (id: string) => {
    setExpandedBios((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Keep state synced if props change from outside clicks
  useEffect(() => {
    if (initialCity) setSelectedCity(initialCity);
  }, [initialCity]);

  useEffect(() => {
    if (initialRole) setSelectedRole(initialRole);
  }, [initialRole]);

  const handleSelectAreaTag = (areaTag: string) => {
    setSelectedAreaTag(areaTag);
    if (areaTag === 'All Areas') {
      setSearchQuery('');
      return;
    }

    if (areaTag.includes('Defence') || areaTag.includes('DHA')) {
      setSearchQuery('DHA');
    } else if (areaTag.includes('Clifton')) {
      if (selectedCity !== 'All Cities' && selectedCity !== 'Karachi') {
        setSelectedCity('All Cities');
      }
      setSearchQuery('Clifton');
    } else if (areaTag.includes('Gulberg')) {
      if (selectedCity !== 'All Cities' && selectedCity !== 'Lahore') {
        setSelectedCity('All Cities');
      }
      setSearchQuery('Gulberg');
    } else if (areaTag.includes('Cantt')) {
      setSearchQuery('Cantt');
    } else if (areaTag.includes('Bahria')) {
      setSearchQuery('Bahria');
    }
  };

  const handleResetFilters = () => {
    setSelectedCity('All Cities');
    setSelectedRole('All Roles');
    setSelectedWorkType('All');
    setSelectedAreaTag('All Areas');
    setSearchQuery('');
  };

  const filteredWorkers = useMemo(() => {
    return WORKERS_DIRECTORY.filter((w) => {
      const matchCity = selectedCity === 'All Cities' || w.city === selectedCity;
      const matchRole =
        selectedRole === 'All Roles' ||
        w.role === selectedRole ||
        normalizeRole(w.role) === normalizeRole(selectedRole);
      const matchWorkType =
        selectedWorkType === 'All' || w.workType.toLowerCase().startsWith(selectedWorkType.toLowerCase());
      const query = searchQuery.trim().toLowerCase();
      const matchQuery =
        query === '' ||
        w.name.toLowerCase().includes(query) ||
        w.area.toLowerCase().includes(query) ||
        w.city.toLowerCase().includes(query) ||
        w.role.toLowerCase().includes(query) ||
        w.skills.some((s) => s.toLowerCase().includes(query));

      return matchCity && matchRole && matchWorkType && matchQuery;
    });
  }, [selectedCity, selectedRole, selectedWorkType, searchQuery]);

  const getWorkerGradient = (role: string) => {
    const low = role.toLowerCase();
    if (low.includes('clean') || low.includes('maid')) return 'from-blue-500 to-teal-500';
    if (low.includes('cook') || low.includes('chef')) return 'from-amber-500 to-orange-500';
    if (low.includes('baby') || low.includes('nanny')) return 'from-emerald-500 to-teal-600';
    if (low.includes('elder') || low.includes('caretak')) return 'from-purple-500 to-indigo-600';
    return 'from-blue-600 to-indigo-600';
  };

  return (
    <section id="find-help" className="py-20 bg-slate-50 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">
              Available Candidates
            </h2>
            <p className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Explore Domestic Workers
            </p>
            <p className="text-slate-600 text-sm mt-1 max-w-2xl">
              Browse pre-screened domestic helpers with verified NADRA CNICs and documented family references.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-white py-2 px-3.5 rounded-xl border border-slate-200 shadow-2xs self-start md:self-auto">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>{filteredWorkers.length} Verified Helpers Available</span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 mb-10 space-y-4">
          {/* Top Row: Search Input & City Dropdown */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-6 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by area (e.g. DHA, Gulberg), name or skill..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="filter-city-select" className="sr-only">City Filter</label>
              <select
                id="filter-city-select"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {CITIES_LIST.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="filter-role-select" className="sr-only">Role Filter</label>
              <select
                id="filter-role-select"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-3 py-2.5 text-sm bg-white border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                {ROLES_LIST.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Middle Row: Popular Area Quick Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="font-semibold text-slate-500 whitespace-nowrap mr-1 flex items-center gap-1">
              <Navigation className="w-3 h-3 text-blue-600" />
              Area:
            </span>
            {POPULAR_AREAS.map((area) => (
              <button
                key={area}
                onClick={() => handleSelectAreaTag(area)}
                className={`px-2.5 py-1 rounded-md text-xs whitespace-nowrap transition-colors ${
                  selectedAreaTag === area
                    ? 'bg-slate-900 text-white font-medium'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {area}
              </button>
            ))}
          </div>

          {/* Bottom Row: Work Type Segmented Controls (Button Group per skill rule) */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-200/80">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs font-semibold text-slate-500 mr-2">Shift Type:</span>
              {['All', 'Live-in', 'Day Shift', 'Part-time'].map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedWorkType(type)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    selectedWorkType === type
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  {type === 'All' ? 'All Shifts' : type}
                </button>
              ))}
            </div>

            {(selectedCity !== 'All Cities' || selectedRole !== 'All Roles' || selectedWorkType !== 'All' || searchQuery !== '' || selectedAreaTag !== 'All Areas') && (
              <button
                onClick={handleResetFilters}
                className="text-xs font-semibold text-blue-600 hover:underline"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>

        {/* Neighborhood Reliability Banner */}
        <div className="mb-8 p-3.5 bg-blue-50/60 border border-blue-100 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-blue-900">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span><strong>Active Neighborhood Dispatch:</strong> Helpers available for prompt trial coordination across all major residential sectors with verified ID records.</span>
          </div>
          <span className="text-[11px] font-semibold text-blue-700 bg-white px-2 py-0.5 rounded border border-blue-200 shrink-0">
            24–48h Dispatch
          </span>
        </div>

        {/* Worker Cards Grid */}
        {filteredWorkers.length === 0 ? (
          <div className="text-center py-16 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400 mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">No matching domestic helpers found</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mt-1 mb-4">
              Try adjusting your city, role, or shift filters to find available helpers in nearby areas.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold"
            >
              Clear All Filters & Show All Helpers
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkers.map((worker) => (
              <div
                key={worker.id}
                className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs hover:shadow-xl transition-all flex flex-col justify-between space-y-4 hover:-translate-y-1"
              >
                <div>
                  {/* Top row with gradient avatar & verified badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-full bg-gradient-to-tr ${getWorkerGradient(
                        worker.role
                      )} text-white font-bold flex items-center justify-center text-lg shadow-md shrink-0`}
                    >
                      {worker.name
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')
                        .toUpperCase()}
                    </div>
                    {worker.cnicVerified && (
                      <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2.5 py-1 rounded-full border border-emerald-100 inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Verified</span>
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-slate-900 text-lg">{worker.name}</h4>
                  <p className="text-xs font-semibold text-blue-600 mt-0.5">
                    {worker.role} Specialist
                  </p>

                  <div className="flex items-center space-x-2 text-xs text-slate-500 mt-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>
                      {worker.city} — {worker.area}
                    </span>
                    <span>•</span>
                    <span>{worker.experienceYears} Years Exp</span>
                  </div>

                  {/* Bio with interactive expand / view on click */}
                  <div className="mt-3">
                    <p
                      onClick={() => toggleBio(worker.id)}
                      className={`text-xs text-slate-600 leading-relaxed cursor-pointer transition-all ${
                        expandedBios[worker.id] ? '' : 'line-clamp-2 hover:text-slate-900'
                      }`}
                      title={expandedBios[worker.id] ? 'Click to collapse' : 'Click to view full bio'}
                    >
                      {worker.bio}
                    </p>
                    <button
                      type="button"
                      onClick={() => toggleBio(worker.id)}
                      className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 hover:underline mt-0.5 inline-block"
                    >
                      {expandedBios[worker.id] ? 'Show less ▲' : 'View full bio...'}
                    </button>
                  </div>

                  {/* Skills tags */}
                  <div className="pt-3 mt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {worker.skills.slice(0, 3).map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-[11px] font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Rating, Salary & Action */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[11px] text-slate-500 font-medium">
                      {worker.workType}
                    </div>
                    <div className="text-base font-extrabold text-slate-900 font-mono">
                      Rs. {worker.monthlyRatePKR.toLocaleString()}
                      <span className="text-xs font-normal text-slate-500"> /mo</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onBookWorker(worker)}
                    className="py-2 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs whitespace-nowrap"
                  >
                    <span>Book Interview</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
