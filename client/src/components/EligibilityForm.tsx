import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useJourneyStore } from '@/store/journeyStore';
import { getEligibilityResult } from '@/lib/eligibility';
import { Button } from '@/components/ui/Button';

const eligibilitySchema = z.object({
  age: z
    .number({ invalid_type_error: 'Age is required' })
    .int()
    .min(1, 'Enter a valid age')
    .max(120, 'Enter a valid age'),
  hasId: z.enum(['yes', 'no'], { required_error: 'Please select an option' }),
});

type EligibilityFormData = z.infer<typeof eligibilitySchema>;

export function EligibilityForm() {
  const { setEligibility, completeStage, eligibility } = useJourneyStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<EligibilityFormData>({
    resolver: zodResolver(eligibilitySchema),
    mode: 'onChange',
  });

  const onSubmit = (data: EligibilityFormData) => {
    const result = getEligibilityResult(data.age, data.hasId);
    setEligibility(result);
    if (result.eligible) {
      completeStage(1);
      setTimeout(() => {
        document.getElementById('stage-2')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* Age Input */}
      <div className="space-y-2">
        <label htmlFor="age" className="block text-sm font-medium text-gray-300">
          Your Age
        </label>
        <input
          id="age"
          type="number"
          min="1"
          max="120"
          aria-label="Your age"
          placeholder="e.g. 25"
          className="input-field"
          {...register('age', { valueAsNumber: true })}
        />
        {errors.age && (
          <p className="text-xs text-red-400" role="alert">{errors.age.message}</p>
        )}
      </div>

      {/* Voter ID Radio */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-300">
          Do you have a Voter ID card (EPIC)?
        </p>
        <div className="flex gap-4">
          {(['yes', 'no'] as const).map((val) => (
            <label
              key={val}
              className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/20 px-4 py-3 text-sm font-medium text-gray-300 transition-all hover:border-primary/60 hover:text-white has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:text-white"
            >
              <input
                type="radio"
                value={val}
                className="sr-only"
                {...register('hasId')}
              />
              {val === 'yes' ? 'Yes, I have one' : "No, I don't"}
            </label>
          ))}
        </div>
        {errors.hasId && (
          <p className="text-xs text-red-400" role="alert">{errors.hasId.message}</p>
        )}
      </div>

      <Button type="submit" disabled={!isValid}>
        Check My Eligibility →
      </Button>

      {/* Result */}
      {eligibility && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-xl border p-4 text-sm ${
            eligibility.eligible
              ? 'border-green-500/30 bg-green-500/10 text-green-300'
              : 'border-red-500/30 bg-red-500/10 text-red-300'
          }`}
          role="status"
          aria-live="polite"
        >
          <span className="mr-2">{eligibility.eligible ? '✅' : '⚠️'}</span>
          {eligibility.message}
        </motion.div>
      )}
    </form>
  );
}
