import { useState } from 'react';
import { motion } from 'framer-motion';
import { useJourneyStore } from '@/store/journeyStore';
import { KnowledgeCard } from '@/components/KnowledgeCard';
import { ExplainModal } from '@/components/ExplainModal';
import { Button } from '@/components/ui/Button';

const EDUCATION_CARDS = [
  {
    id: 'mcc',
    title: 'Model Code of Conduct',
    description:
      'A set of guidelines issued by the Election Commission of India to ensure free and fair elections. It restricts ruling parties from using government resources for election campaigns and comes into effect when election dates are announced.',
    topic: 'Model Code of Conduct',
  },
  {
    id: 'adl',
    title: 'Anti-Defection Law',
    description:
      'Prevents elected members of Parliament or State Legislatures from switching political parties after winning a seat. A member who defects without valid grounds can lose their legislative seat under the Tenth Schedule of the Constitution.',
    topic: 'Anti-Defection Law',
  },
  {
    id: 'evm',
    title: 'EVM & VVPAT',
    description:
      "Electronic Voting Machines record votes digitally, eliminating paper ballot fraud. VVPAT (Voter Verifiable Paper Audit Trail) prints a physical slip after each vote so the voter can verify their choice was recorded correctly before the slip drops into a sealed box.",
    topic: 'EVM and VVPAT',
  },
] as const;

export function EducationHub() {
  const { stage, completeStage } = useJourneyStore();
  const [openTopic, setOpenTopic] = useState<string | null>(null);

  const handleCardClick = (topic: string) => {
    setOpenTopic(topic);
    if (stage < 3) {
      completeStage(2);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {EDUCATION_CARDS.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <KnowledgeCard
              title={card.title}
              description={card.description}
              onLearnMore={() => handleCardClick(card.topic)}
            />
          </motion.div>
        ))}
      </div>

      {/* Continue button — visible once stage ≥ 3 */}
      {stage >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="sticky bottom-4 flex justify-center"
        >
          <Button
            onClick={() =>
              document.getElementById('stage-3')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Continue to Match My Vote ↓
          </Button>
        </motion.div>
      )}

      <ExplainModal
        topic={openTopic ?? ''}
        open={openTopic !== null}
        onClose={() => setOpenTopic(null)}
      />
    </div>
  );
}
