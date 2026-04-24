import { motion } from 'framer-motion';
import { useJourneyStore } from '@/store/journeyStore';
import { EligibilityForm } from '@/components/EligibilityForm';
import { EducationHub } from '@/components/EducationHub';
import { VotingBooth } from '@/components/VotingBooth';
import { RumorScanner } from '@/components/RumorScanner';
import { MatchDashboard } from '@/components/MatchDashboard';
import { Button } from '@/components/ui/Button';

export default function JourneyPage() {
  const { stage, completeStage } = useJourneyStore();

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <div className="mx-auto max-w-4xl px-4 pb-32">
      {/* Header */}
      <header className="py-12 text-center md:py-20">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-white to-gray-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl lg:text-6xl"
        >
          CivicPulse
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-4 max-w-2xl text-lg text-gray-400"
        >
          Your guided journey from zero political knowledge to becoming an informed, confident voter.
        </motion.p>
      </header>

      <div className="space-y-32">
        {/* Stage 1: Eligibility */}
        <motion.section
          id="stage-1"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="relative rounded-3xl border border-white/5 bg-white/[0.02] p-6 shadow-2xl backdrop-blur-xl sm:p-10"
        >
          <div className="absolute -top-4 left-6 sm:left-10 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
            Stage 1
          </div>
          <h2 className="mb-8 text-2xl font-bold text-white">Check Your Eligibility</h2>
          <EligibilityForm />
        </motion.section>

        {/* Stage 2: Education Hub */}
        {stage >= 2 && (
          <motion.section
            id="stage-2"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="relative rounded-3xl border border-white/5 bg-white/[0.02] p-6 shadow-2xl backdrop-blur-xl sm:p-10"
          >
            <div className="absolute -top-4 left-6 sm:left-10 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
              Stage 2
            </div>
            <h2 className="mb-2 text-2xl font-bold text-white">Education Hub</h2>
            <p className="mb-8 text-sm text-gray-400">
              Click on any topic to learn more. You must explore at least one topic to proceed.
            </p>
            <EducationHub />
          </motion.section>
        )}

        {/* Stage 3: Match My Vote (Swapped) */}
        {stage >= 3 && (
          <motion.section
            id="stage-3"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="relative rounded-3xl border border-white/5 bg-white/[0.02] p-6 shadow-2xl backdrop-blur-xl sm:p-10"
          >
            <div className="absolute -top-4 left-6 sm:left-10 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
              Stage 3
            </div>
            <h2 className="mb-2 text-2xl font-bold text-white">Match My Vote</h2>
            <p className="mb-8 text-sm text-gray-400">
              Set your priorities to find candidates that align with your views.
            </p>
            <MatchDashboard />
            <div className="mt-12 flex justify-center border-t border-white/5 pt-8">
              <Button onClick={() => { completeStage(3); setTimeout(() => document.getElementById('stage-4')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>
                Continue to Voting Booth ↓
              </Button>
            </div>
          </motion.section>
        )}

        {/* Stage 4: Virtual Voting Booth (Swapped) */}
        {stage >= 4 && (
          <motion.section
            id="stage-4"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="relative rounded-3xl border border-white/5 bg-white/[0.02] p-6 shadow-2xl backdrop-blur-xl sm:p-10"
          >
            <div className="absolute -top-4 left-6 sm:left-10 rounded-full bg-primary px-4 py-1 text-xs font-bold uppercase tracking-wider text-white">
              Stage 4
            </div>
            <h2 className="mb-2 text-2xl font-bold text-white">Virtual Voting Booth</h2>
            <p className="mb-8 text-sm text-gray-400">
              Experience the voting process. Select a candidate and confirm your choice to see the VVPAT receipt.
            </p>
            <VotingBooth />
          </motion.section>
        )}
      </div>

      {/* Global tools available on Journey page */}
      <motion.section
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-32 rounded-2xl border border-dashed border-white/10 p-6 sm:p-8"
      >
        <h3 className="mb-2 text-xl font-bold text-white">Verify a Claim</h3>
        <p className="mb-6 text-sm text-gray-400">
          Not sure if something you read is true? Use our AI Rumour Scanner.
        </p>
        <RumorScanner />
      </motion.section>
    </div>
  );
}
