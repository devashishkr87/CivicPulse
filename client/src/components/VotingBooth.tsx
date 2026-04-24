import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useJourneyStore } from '@/store/journeyStore';
import { getCandidates } from '@/services/api';
import { showToast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CardSkeleton } from '@/components/ui/Skeleton';
import { formatAssets } from '@/lib/formatAssets';
import type { Candidate } from '@/types';

function getInitials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0] ?? '')
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function Avatar({ name, image }: { name: string; image: string }) {
  if (image) {
    return <img src={image} alt={name} className="h-12 w-12 rounded-full object-cover" />;
  }
  const colors = ['bg-blue-600', 'bg-violet-600', 'bg-emerald-600', 'bg-rose-600'];
  const color = colors[name.charCodeAt(0) % colors.length] ?? 'bg-blue-600';
  return (
    <div
      className={`flex h-12 w-12 items-center justify-center rounded-full ${color} text-sm font-bold text-white`}
    >
      {getInitials(name)}
    </div>
  );
}

type BoothState = 'idle' | 'selected' | 'confirmed';

export function VotingBooth() {
  const navigate = useNavigate();
  const { completeStage } = useJourneyStore();

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [boothState, setBoothState] = useState<BoothState>('idle');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [confirmedAt, setConfirmedAt] = useState<string | null>(null);

  useEffect(() => {
    getCandidates('Maharashtra', 'Mumbai North')
      .then((data) => setCandidates(data.slice(0, 4)))
      .catch(() => showToast('Failed to load candidates.'))
      .finally(() => setLoading(false));
  }, []);

  const selected = candidates.find((c) => c._id === selectedId) ?? null;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const vvpatTransition = prefersReduced
    ? { duration: 0 }
    : { duration: 0.6, ease: 'easeOut' };

  const handleConfirm = () => {
    setBoothState('confirmed');
    setConfirmedAt(new Date().toISOString());
  };

  const handleProceed = () => {
    completeStage(4);
    showToast('Congratulations! You have completed your Informed Citizen Journey.');
  };

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {[1, 2, 3, 4].map((i) => <CardSkeleton key={i} />)}
      </div>
    );
  }

  if (boothState === 'confirmed' && selected && confirmedAt) {
    return (
      <div className="flex flex-col items-center gap-6">
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={vvpatTransition}
          className="w-full max-w-sm rounded-2xl border border-dashed border-green-500/40 bg-green-500/5 p-6 font-mono text-sm"
          role="region"
          aria-label="VVPAT receipt"
          data-testid="vvpat-receipt"
        >
          <p className="mb-4 text-center text-xs font-bold uppercase tracking-widest text-green-400">
            ✓ Vote Recorded — VVPAT Slip
          </p>
          <div className="space-y-1 text-gray-300">
            <p><span className="text-gray-500">Candidate:</span> {selected.name}</p>
            <p><span className="text-gray-500">Party:</span> {selected.party}</p>
            <p><span className="text-gray-500">Constituency:</span> {selected.constituency}</p>
            <p className="break-all"><span className="text-gray-500">Timestamp:</span> {confirmedAt}</p>
          </div>
        </motion.div>

        <Button
          onClick={handleProceed}
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleProceed(); }}
          data-testid="proceed-btn"
        >
          Complete Journey ✓
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {candidates.map((c) => {
        const isSelected = c._id === selectedId;
        return (
          <div
            key={c._id}
            className={`card flex flex-col gap-3 transition-all duration-200 ${
              isSelected ? 'border-primary bg-primary/5' : 'hover:border-white/20'
            }`}
            style={isSelected ? { borderLeftWidth: '3px', borderLeftColor: '#1A56DB' } : {}}
          >
            <div className="flex items-center gap-4">
              <Avatar name={c.name} image={c.profile_image} />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-white truncate">{c.name}</p>
                <p className="text-xs text-gray-400">{c.party}</p>
              </div>
              {boothState === 'idle' || (boothState === 'selected' && !isSelected) ? (
                <Button
                  variant={isSelected ? 'primary' : 'ghost'}
                  className="shrink-0 text-xs"
                  onClick={() => { setSelectedId(c._id); setBoothState('selected'); }}
                >
                  Vote
                </Button>
              ) : null}
            </div>
            
            {/* Extended Info for Informed Choice */}
            <div className="flex flex-wrap gap-2 pt-1 border-t border-white/5">
              <span className="text-[10px] text-gray-500 uppercase font-bold">Informed Choice:</span>
              <Badge color="gray" className="text-[10px]">{c.education}</Badge>
              <Badge color={c.criminal_cases > 0 ? 'red' : 'green'} className="text-[10px]">
                Cases: {c.criminal_cases}
              </Badge>
              <Badge color="gray" className="text-[10px]">Assets: {formatAssets(c.assets)}</Badge>
            </div>
          </div>
        );
      })}

      <AnimatePresence>
        {boothState === 'selected' && selectedId && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex gap-3 pt-2"
          >
            <Button onClick={handleConfirm} data-testid="confirm-btn">
              Confirm Vote ✓
            </Button>
            <Button
              variant="ghost"
              onClick={() => { setSelectedId(null); setBoothState('idle'); }}
            >
              Change Selection
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirm Vote disabled state when idle */}
      {boothState === 'idle' && (
        <Button disabled data-testid="confirm-btn-disabled">
          Confirm Vote ✓
        </Button>
      )}
    </div>
  );
}
