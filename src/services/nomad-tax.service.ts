export interface TaxQueryPayload { sourceCountry: string; targetCountry: string; incomeUsd: number; filingStatus: 'single' | 'married'; }
export interface ArbitrageResult { sourceTaxLiability: number; targetTaxLiability: number; netSavings: number; effectiveTaxRateSource: number; effectiveTaxRateTarget: number; costOfLivingIndexDelta: number; }
export interface CachedSEOData { slug: string; data: ArbitrageResult; lastCalculated: number; }

export const calculateTaxArbitrage = async (payload: TaxQueryPayload, seoCacheKV: KVNamespace): Promise<{ result: ArbitrageResult; isCached: boolean }> => {
  const cacheKey = `tax:${payload.sourceCountry}:${payload.targetCountry}:${payload.incomeUsd}:${payload.filingStatus}`;
  const cachedResponse = await seoCacheKV.get<CachedSEOData>(cacheKey, 'json');
  if (cachedResponse) return { result: cachedResponse.data, isCached: true };

  const sourceBaseRate = payload.sourceCountry.toLowerCase() === 'us' ? 0.24 : 0.40;
  const targetBaseRate = payload.targetCountry.toLowerCase() === 'pt' ? 0.20 : 0.15;
  const sourceTaxLiability = payload.incomeUsd * sourceBaseRate;
  const targetTaxLiability = payload.incomeUsd * targetBaseRate;

  const result: ArbitrageResult = {
    sourceTaxLiability,
    targetTaxLiability,
    netSavings: sourceTaxLiability - targetTaxLiability,
    effectiveTaxRateSource: sourceBaseRate * 100,
    effectiveTaxRateTarget: targetBaseRate * 100,
    costOfLivingIndexDelta: -32.5
  };

  // Cache the result in KV for SEO caching (e.g. 1 day expiration)
  const cacheData: CachedSEOData = {
    slug: cacheKey,
    data: result,
    lastCalculated: Date.now(),
  };
  await seoCacheKV.put(cacheKey, JSON.stringify(cacheData), { expirationTtl: 86400 });

  return {
    result,
    isCached: false
  };
};
