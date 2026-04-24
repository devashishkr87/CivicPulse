import { useState } from 'react';
import { motion } from 'framer-motion';
import { formatAssets } from '@/lib/formatAssets';
import { Badge } from '@/components/ui/Badge';
import type { CandidateWithScore } from '@/types';

interface CandidateCardProps {
  candidate: CandidateWithScore;
}

const FOOTER_TEXT =
  "This score is calculated based on your stated priorities and the candidate's declared policy positions.";

function getInitials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0] ?? '')
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function CandidateCard({ candidate: c }: CandidateCardProps) {
  const [breakdownOpen, setBreakdownOpen] = useState(false);

  const scoreColor =
    c.matchScore >= 70 ? 'text-green-400' : c.matchScore >= 50 ? 'text-yellow-400' : 'text-red-400';

  return (
    <div className="card space-y-4 transition-all duration-200 hover:border-primary/30">
      {/* Header */}
      <div className="flex items-start gap-4">
        {c.profile_image ? (
          <img
            src={c.profile_image}
            alt={c.name}
            className="h-14 w-14 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/20 text-base font-bold text-primary">
            {getInitials(c.name)}
          </div>
        )}
        <div className="min-w-0 flex-1 space-y-1">
          <p className="font-bold text-white">{c.name}</p>
          <p className="text-sm text-gray-400">{c.party}</p>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="text-gray-500">{c.education}</span>
            <Badge color={c.criminal_cases > 0 ? 'red' : 'green'}>
              Criminal cases: {c.criminal_cases}
            </Badge>
            <Badge color="gray">Assets: {formatAssets(c.assets)}</Badge>
          </div>
        </div>
      </div>

      {/* Manifesto */}
      <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          AI Manifesto Summary
        </p>
        <ul className="space-y-1 text-xs text-gray-300">
          <li><span className="text-primary font-medium">Economy:</span> {c.manifesto.economy}</li>
          <li><span className="text-primary font-medium">Education:</span> {c.manifesto.education}</li>
          <li><span className="text-primary font-medium">Healthcare:</span> {c.manifesto.healthcare}</li>
        </ul>
      </div>

      {/* Match Score */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-400">Match Score</span>
          <button
            onClick={() => setBreakdownOpen((o) => !o)}
            className="flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-bold transition-colors hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-expanded={breakdownOpen}
            aria-label="Toggle score breakdown"
          >
            <span className={scoreColor} data-testid="match-score">
              {c.matchScore}%
            </span>
            <svg
              className={`h-4 w-4 text-gray-500 transition-transform ${breakdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${c.matchScore}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>

        {/* Breakdown */}
        {breakdownOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden rounded-xl border border-white/10 bg-white/5 p-3"
          >
            <table className="w-full text-xs">
              <tbody className="divide-y divide-white/5">
                {(
                  [
                    ['Economy', c.breakdown.economy, c.positions.economy],
                    ['Education', c.breakdown.education, c.positions.education],
                    ['Healthcare', c.breakdown.healthcare, c.positions.healthcare],
                    ['Environment', c.breakdown.environment, c.positions.environment],
                  ] as [string, number, number][]
                ).map(([label, score, pos]) => (
                  <tr key={label}>
                    <td className="py-1 text-gray-500">{label}</td>
                    <td className="py-1 text-right text-gray-300">
                      × {pos} = <span className="font-semibold text-white">{score}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </div>

      {/* Footer text — exact string tested by e2e */}
      <p className="text-xs text-gray-600" data-testid="footer-text">
        {FOOTER_TEXT}
      </p>
    </div>
  );
}
