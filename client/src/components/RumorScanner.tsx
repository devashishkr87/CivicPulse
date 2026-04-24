import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { postVerify } from '@/services/api';
import { showToast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';
import type { VerifyResponse } from '@/types';

const rumorSchema = z.object({
  claim: z.string().min(10, 'Please enter at least 10 characters before checking.'),
});
type RumorFormData = z.infer<typeof rumorSchema>;

const verdictStyles: Record<VerifyResponse['verdict'], string> = {
  'Likely True':  'border-green-500/30 bg-green-500/10 text-green-300',
  'Likely False': 'border-red-500/30 bg-red-500/10 text-red-300',
  'Unverified':   'border-yellow-500/30 bg-yellow-500/10 text-yellow-300',
};

const confidenceBadge: Record<VerifyResponse['confidence'], string> = {
  High:   'bg-green-500/20 text-green-300',
  Medium: 'bg-yellow-500/20 text-yellow-300',
  Low:    'bg-gray-500/20 text-gray-400',
};

export function RumorScanner() {
  const [result, setResult] = useState<VerifyResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RumorFormData>({ resolver: zodResolver(rumorSchema), mode: 'onSubmit' });

  const onSubmit = async (data: RumorFormData) => {
    setLoading(true);
    setResult(null);
    try {
      const res = await postVerify(data.claim);
      setResult(res);
    } catch {
      showToast('Failed to verify claim. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3" noValidate>
        <textarea
          rows={3}
          placeholder="Paste a claim or rumour you've seen online or heard about…"
          className="input-field resize-none"
          aria-label="Claim to verify"
          {...register('claim')}
        />
        {errors.claim && (
          <p className="text-xs text-red-400" role="alert" data-testid="rumor-error">
            {errors.claim.message}
          </p>
        )}
        <Button type="submit" disabled={loading}>
          {loading ? 'Checking…' : 'Check This →'}
        </Button>
      </form>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`rounded-xl border p-4 space-y-2 ${verdictStyles[result.verdict]}`}
            role="status"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-sm">{result.verdict}</span>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${confidenceBadge[result.confidence]}`}>
                {result.confidence} confidence
              </span>
            </div>
            <p className="text-xs leading-relaxed opacity-90">{result.explanation}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
