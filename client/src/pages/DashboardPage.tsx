import { motion } from 'framer-motion';
import { MatchDashboard } from '@/components/MatchDashboard';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-12">
      <div className="mb-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="inline-block rounded-full bg-primary/20 px-3 py-1 mb-2 text-xs font-bold uppercase tracking-wider text-primary">
            Stage 4
          </div>
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
            Match My Vote
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-gray-400">
            Set your priorities below. We&apos;ll compare them against the official manifesto summaries
            and candidate positions to find your best match.
          </p>
        </motion.div>
        
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => navigate('/')}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
        >
          ← Back to Journey
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <MatchDashboard />
      </motion.div>
    </div>
  );
}
