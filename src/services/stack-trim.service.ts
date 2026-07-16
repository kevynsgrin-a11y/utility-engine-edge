import type { StackTrimInput } from '../utils/validators';

interface OptimizationResult {
  originalMonthlyCost: number; optimizedMonthlyCost: number; monthlySavings: number;
  recommendations: Array<{ originalTool: string; recommendedTool: string; reasoning: string; actionableLink: string | null; }>;
}

export const optimizeSaaSStack = async (payload: StackTrimInput, affiliateKV: KVNamespace): Promise<OptimizationResult> => {
  let originalMonthlyCost = 0; let optimizedMonthlyCost = 0;
  const recommendations: OptimizationResult['recommendations'] = [];

  for (const tool of payload.tools) {
    originalMonthlyCost += tool.monthlySpendUsd;
    if (tool.category === 'crm' && tool.monthlySpendUsd > 100) {
      const hubspotLink = await affiliateKV.get('affiliate:crm:hubspot') || 'https://hubspot.com';
      const newCost = tool.seats * 15;
      optimizedMonthlyCost += newCost;
      recommendations.push({ originalTool: tool.toolName, recommendedTool: 'HubSpot Starter', reasoning: `Save $${tool.monthlySpendUsd - newCost}/mo.`, actionableLink: hubspotLink });
    } else if (tool.category === 'design' && tool.monthlySpendUsd > 50) {
      const figmaLink = await affiliateKV.get('affiliate:design:figma') || 'https://figma.com';
      optimizedMonthlyCost += 15;
      recommendations.push({ originalTool: tool.toolName, recommendedTool: 'Figma Professional', reasoning: 'Consolidate design to $15/mo.', actionableLink: figmaLink });
    } else {
      optimizedMonthlyCost += tool.monthlySpendUsd;
    }
  }
  return { originalMonthlyCost, optimizedMonthlyCost, monthlySavings: originalMonthlyCost - optimizedMonthlyCost, recommendations };
};
