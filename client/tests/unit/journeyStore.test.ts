import { describe, test, expect, beforeEach } from 'vitest';
import { useJourneyStore } from '../../src/store/journeyStore';

describe('journeyStore', () => {
  beforeEach(() => {
    useJourneyStore.getState().reset();
    localStorage.clear();
  });

  test('initial state is correct', () => {
    const state = useJourneyStore.getState();
    expect(state.stage).toBe(1);
    expect(state.eligibility).toBeNull();
    expect(state.priorities).toEqual({ economy: 3, education: 3, healthcare: 3, environment: 3 });
  });

  test('completeStage advances stage but does not go backwards', () => {
    const store = useJourneyStore.getState();
    
    store.completeStage(1);
    expect(useJourneyStore.getState().stage).toBe(2);
    
    store.completeStage(3);
    expect(useJourneyStore.getState().stage).toBe(4);
    
    // Should not go backwards
    store.completeStage(1);
    expect(useJourneyStore.getState().stage).toBe(4);
  });

  test('setEligibility updates eligibility state', () => {
    const store = useJourneyStore.getState();
    const result = { eligible: true, message: 'Test message' };
    
    store.setEligibility(result);
    expect(useJourneyStore.getState().eligibility).toEqual(result);
  });

  test('setPriorities updates priorities', () => {
    const store = useJourneyStore.getState();
    const newPriorities = { economy: 5, education: 1, healthcare: 4, environment: 2 };
    
    store.setPriorities(newPriorities);
    expect(useJourneyStore.getState().priorities).toEqual(newPriorities);
  });

  test('AC3: Zustand store persists via localStorage key civicpulse-journey', () => {
    const store = useJourneyStore.getState();
    store.completeStage(2);
    store.setPriorities({ economy: 5, education: 5, healthcare: 5, environment: 5 });
    
    // Check localStorage manually to verify persist middleware is working
    const stored = localStorage.getItem('civicpulse-journey');
    expect(stored).toBeTruthy();
    
    const parsed = JSON.parse(stored!);
    expect(parsed.state.stage).toBe(3);
    expect(parsed.state.priorities.economy).toBe(5);
  });

  test('reset clears state to defaults', () => {
    const store = useJourneyStore.getState();
    store.completeStage(2);
    store.setPriorities({ economy: 5, education: 5, healthcare: 5, environment: 5 });
    
    useJourneyStore.getState().reset();
    
    const state = useJourneyStore.getState();
    expect(state.stage).toBe(1);
    expect(state.eligibility).toBeNull();
    expect(state.priorities).toEqual({ economy: 3, education: 3, healthcare: 3, environment: 3 });
  });
});
