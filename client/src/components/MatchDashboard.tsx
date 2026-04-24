import { useEffect, useState } from 'react';
import { useJourneyStore } from '@/store/journeyStore';
import { useDebounce } from '@/hooks/useDebounce';
import { postMatch } from '@/services/api';
import { showToast } from '@/components/ui/Toast';
import { CardSkeleton } from '@/components/ui/Skeleton';
import { CandidateCard } from '@/components/CandidateCard';
import { STATE_CONSTITUENCY_MAP } from '@/lib/constants';
import type { CandidateWithScore, UserPriorities } from '@/types';

const STATES = Object.keys(STATE_CONSTITUENCY_MAP);

const PRIORITY_KEYS = [
  { key: 'economy', label: 'Economy' },
  { key: 'education', label: 'Education' },
  { key: 'healthcare', label: 'Healthcare' },
  { key: 'environment', label: 'Environment' },
] as const;

export function MatchDashboard() {
  const { priorities, setPriorities } = useJourneyStore();

  const [selectedState, setSelectedState] = useState(STATES[0] ?? 'Maharashtra');
  const [selectedConstituency, setSelectedConstituency] = useState('');
  const [localPriorities, setLocalPriorities] = useState<UserPriorities>(priorities);
  const [results, setResults] = useState<CandidateWithScore[]>([]);
  const [loading, setLoading] = useState(false);

  // Initialize constituency from first state
  useEffect(() => {
    const constituencies = STATE_CONSTITUENCY_MAP[selectedState] ?? [];
    setSelectedConstituency(constituencies[0] ?? '');
  }, [selectedState]);

  const debouncedPriorities = useDebounce(localPriorities, 300);

  // Fetch on state/constituency change (immediate) or priority change (debounced)
  useEffect(() => {
    if (!selectedState || !selectedConstituency) return;
    setLoading(true);
    postMatch({
      state: selectedState,
      constituency: selectedConstituency,
      priorities: debouncedPriorities,
    })
      .then((data) => setResults(data))
      .catch(() => showToast('Failed to load match results.'))
      .finally(() => setLoading(false));
  }, [selectedState, selectedConstituency, debouncedPriorities]);

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    const constituencies = STATE_CONSTITUENCY_MAP[state] ?? [];
    setSelectedConstituency(constituencies[0] ?? '');
  };

  const handlePriorityChange = (key: keyof UserPriorities, val: number) => {
    const next = { ...localPriorities, [key]: val };
    setLocalPriorities(next);
    setPriorities(next);
  };

  const constituencies = STATE_CONSTITUENCY_MAP[selectedState] ?? [];

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="card space-y-6">
        {/* State + Constituency selects */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <label htmlFor="state-select" className="text-xs font-medium text-gray-400">
              State
            </label>
            <select
              id="state-select"
              value={selectedState}
              onChange={(e) => handleStateChange(e.target.value)}
              className="input-field"
              data-testid="state-select"
            >
              {STATES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label htmlFor="constituency-select" className="text-xs font-medium text-gray-400">
              Constituency
            </label>
            <select
              id="constituency-select"
              value={selectedConstituency}
              onChange={(e) => setSelectedConstituency(e.target.value)}
              className="input-field"
              data-testid="constituency-select"
            >
              {constituencies.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Priority sliders */}
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Your Priorities
          </p>
          {PRIORITY_KEYS.map(({ key, label }) => (
            <div key={key} className="space-y-1">
              <div className="flex justify-between text-xs">
                <label htmlFor={`slider-${key}`} className="text-gray-300 font-medium">
                  {label}
                </label>
                <span className="font-bold text-primary">
                  {localPriorities[key]}/5
                </span>
              </div>
              <input
                id={`slider-${key}`}
                type="range"
                min="1"
                max="5"
                step="1"
                value={localPriorities[key]}
                onChange={(e) => handlePriorityChange(key, Number(e.target.value))}
                className="w-full"
                data-testid={`slider-${key}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Results */}
      {loading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => <CardSkeleton key={i} />)}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {results.map((c) => (
            <CandidateCard key={c._id} candidate={c} />
          ))}
        </div>
      )}
    </div>
  );
}
