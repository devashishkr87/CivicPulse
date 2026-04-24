import { useEffect, useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Skeleton } from '@/components/ui/Skeleton';
import { showToast } from '@/components/ui/Toast';
import { postExplain } from '@/services/api';
import type { ExplainResponse } from '@/types';

interface ExplainModalProps {
  topic: string;
  open: boolean;
  onClose: () => void;
}

export function ExplainModal({ topic, open, onClose }: ExplainModalProps) {
  const [data, setData] = useState<ExplainResponse | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !topic) return;
    setData(null);
    setLoading(true);

    postExplain(topic)
      .then((res) => setData(res))
      .catch(() => showToast('Failed to load explanation. Please try again.'))
      .finally(() => setLoading(false));
  }, [open, topic]);

  return (
    <Modal open={open} onClose={onClose} title={topic}>
      {loading ? (
        <div className="space-y-3 py-2">
          <Skeleton lines={3} />
          <Skeleton lines={2} />
        </div>
      ) : data ? (
        <div className="space-y-4">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-primary">
              Explanation
            </p>
            <p className="text-sm leading-relaxed text-gray-300" data-testid="explanation">
              {data.explanation}
            </p>
          </div>
          {data.example && (
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-4">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-amber-400">
                Real-world Example
              </p>
              <p className="text-sm leading-relaxed text-amber-200" data-testid="example">
                {data.example}
              </p>
            </div>
          )}
        </div>
      ) : null}
    </Modal>
  );
}
