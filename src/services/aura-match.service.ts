import type { AuraMatchInput } from '../utils/validators';

type Tier = 'free' | 'cusp-plus' | 'enterprise';
interface BaseMatrix { compatibilityScore: number; coreVibe: string; dominantElements: { personA: string; personB: string }; }
interface DeepMatrix extends BaseMatrix { frictionPoints: string[]; karmicIntersections: string[]; communicationVector: string; historicalCycles: Array<{ year: number; intensity: number }>; }

export const generateSynastryMatrix = (payload: AuraMatchInput, tier: Tier): { tier: Tier; matrix: BaseMatrix | DeepMatrix } => {
  const scoreHash = (payload.personA.name.length + payload.personB.name.length) % 100;
  const compatibilityScore = scoreHash < 20 ? scoreHash + 50 : scoreHash;

  const baseMatrix: BaseMatrix = {
    compatibilityScore,
    coreVibe: compatibilityScore > 80 ? 'Highly kinetic and synergetic.' : 'Growth-oriented with necessary friction.',
    dominantElements: { personA: 'Fire', personB: 'Air' },
  };

  if (tier === 'free') return { tier, matrix: baseMatrix };

  return {
    tier,
    matrix: {
      ...baseMatrix,
      frictionPoints: ['Resource allocation and financial risk tolerance', 'Communication cadence during stress'],
      karmicIntersections: ['Saturn trine Venus: Long-term structural loyalty.', 'Pluto square Mars: Power dynamic fluctuations.'],
      communicationVector: 'Expansive and philosophical (Jupiter dominant).',
      historicalCycles: [{ year: 2024, intensity: 0.85 }, { year: 2025, intensity: 0.92 }, { year: 2026, intensity: 0.60 }],
    }
  };
};
