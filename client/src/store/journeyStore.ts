import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { JourneyState, JourneyStage, EligibilityResult, UserPriorities } from '@/types';

const DEFAULT_PRIORITIES: UserPriorities = {
  economy: 3,
  education: 3,
  healthcare: 3,
  environment: 3,
};

export const useJourneyStore = create<JourneyState>()(
  persist(
    (set) => ({
      stage: 1,
      eligibility: null,
      priorities: DEFAULT_PRIORITIES,

      completeStage: (s: JourneyStage) =>
        set((state) => ({
          stage: (Math.max(state.stage, s + 1) as JourneyStage),
        })),

      setEligibility: (r: EligibilityResult) => set({ eligibility: r }),

      setPriorities: (p: UserPriorities) => set({ priorities: p }),

      reset: () =>
        set({ stage: 1, eligibility: null, priorities: DEFAULT_PRIORITIES }),
    }),
    {
      name: 'civicpulse-journey', // EXACT localStorage key — do not change
      storage: createJSONStorage(() => localStorage),
      // Only persist data, never actions
      partialize: (state) => ({
        stage: state.stage,
        eligibility: state.eligibility,
        priorities: state.priorities,
      }),
    }
  )
);
