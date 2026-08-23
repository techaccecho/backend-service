import { describe, expect, test } from 'vitest';
import { ArgRulesEngine, type StepDefinition } from './ArgRulesEngine.js';

describe('ArgRulesEngine (state-service)', () => {
  const mockManifest: StepDefinition[] = [
    {
      id: 'step_01_blog',
      order: 1,
      type: 'READ',
      title: 'Blog Post 1',
      isUnordered: false,
      prerequisites: [],
      prerequisiteMode: 'NONE',
    },
    {
      id: 'step_02_wordsearch',
      order: 2,
      type: 'PUZZLE',
      title: 'Wordsearch',
      isUnordered: false,
      prerequisites: ['step_01_blog'],
      prerequisiteMode: 'ALL',
    },
    {
      id: 'step_07_passcode',
      order: 7,
      type: 'PASSCODE',
      title: 'Passcode Block',
      isUnordered: false,
      prerequisites: ['step_02_wordsearch'],
      prerequisiteMode: 'ALL',
      lockoutPolicy: {
        maxAttempts: 6,
        resetPrerequisiteStepId: 'step_02_wordsearch',
      },
    },
  ];

  test('createInitialPlayerState initializes user state with step_01_blog UNLOCKED', () => {
    const state = ArgRulesEngine.createInitialPlayerState('user_123', 'Alice');
    expect(state.userId).toBe('user_123');
    expect(state.username).toBe('Alice');
    expect(state.completedStepIds).toEqual([]);
    expect(state.stepStates.step_01_blog?.status).toBe('UNLOCKED');
  });

  test('computeProjectionPayload returns Step 1 as UNLOCKED', () => {
    const state = ArgRulesEngine.createInitialPlayerState('user_123');
    const payload = ArgRulesEngine.computeProjectionPayload(
      state,
      mockManifest,
    );

    expect(payload.userId).toBe('user_123');
    expect(payload.activeStep?.id).toBe('step_01_blog');
    expect(payload.nextAvailableSteps).toHaveLength(1);
    expect(payload.nextAvailableSteps[0].id).toBe('step_01_blog');
  });

  test('completeStep unlocks Step 2 after Step 1 is completed', () => {
    const state = ArgRulesEngine.createInitialPlayerState('user_123');
    const result = ArgRulesEngine.completeStep(
      state,
      'step_01_blog',
      mockManifest,
    );

    expect(result.updatedState.completedStepIds).toContain('step_01_blog');
    expect(
      result.projectionPayload.nextAvailableSteps.some(
        (s) => s.id === 'step_02_wordsearch',
      ),
    ).toBe(true);
  });

  test('recordFailure triggers LOCKED_OUT on 6th attempt', () => {
    const state = ArgRulesEngine.createInitialPlayerState('user_123');
    ArgRulesEngine.completeStep(state, 'step_01_blog', mockManifest);
    ArgRulesEngine.completeStep(state, 'step_02_wordsearch', mockManifest);

    for (let i = 0; i < 5; i++) {
      ArgRulesEngine.recordFailure(state, 'step_07_passcode', mockManifest);
    }
    const finalResult = ArgRulesEngine.recordFailure(
      state,
      'step_07_passcode',
      mockManifest,
    );
    expect(finalResult.projectionPayload.activeStep?.status).toBe('LOCKED_OUT');
  });

  test('re-solving Step 2 Wordsearch clears Step 7 Passcode Lockout', () => {
    let state = ArgRulesEngine.createInitialPlayerState('user_123');
    ArgRulesEngine.completeStep(state, 'step_01_blog', mockManifest);
    ArgRulesEngine.completeStep(state, 'step_02_wordsearch', mockManifest);

    for (let i = 0; i < 6; i++) {
      state = ArgRulesEngine.recordFailure(
        state,
        'step_07_passcode',
        mockManifest,
      ).updatedState;
    }

    expect(state.stepStates.step_07_passcode.status).toBe('LOCKED_OUT');

    const resetResult = ArgRulesEngine.completeStep(
      state,
      'step_02_wordsearch',
      mockManifest,
    );
    expect(resetResult.updatedState.stepStates.step_07_passcode.status).toBe(
      'UNLOCKED',
    );
    expect(resetResult.updatedState.stepStates.step_07_passcode.attempts).toBe(
      0,
    );
  });
});
