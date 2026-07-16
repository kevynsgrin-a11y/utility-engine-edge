import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/d1';
import { verify } from 'hono/jwt';
import { z } from 'zod';
import { calculateTaxArbitrage } from '../services/nomad-tax.service';
import { usageLogs, appStates } from '../db/schema';
import type { Bindings } from '../middlewares/auth-and-tier';

export const nomadTaxRouter = new Hono<{ Bindings: Bindings }>();

const TaxQuerySchema = z.object({
  sourceCountry: z.string().min(2).max(10),
  targetCountry: z.string().min(2).max(10),
  incomeUsd: z.number().nonnegative(),
  filingStatus: z.enum(['single', 'married']),
});

nomadTaxRouter.post('/calculate', async (c) => {
  const startTime = Date.now();
  const payload = TaxQuerySchema.parse(await c.req.json());
  const db = drizzle(c.env.DB);

  let userId: string | null = null;
  const authHeader = c.req.header('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const token = authHeader.split(' ')[1];
      const decoded = await verify(token, c.env.JWT_SECRET, 'HS256') as { sub: string };
      userId = decoded.sub;
    } catch {}
  }

  const result = await calculateTaxArbitrage(payload, c.env.SEO_CACHE_KV);
  const computeTimeMs = Date.now() - startTime;

  // Insert into usage logs
  await db.insert(usageLogs).values({
    id: crypto.randomUUID(),
    userId,
    appId: 'nomad-tax',
    endpoint: '/api/v1/nomad/calculate',
    computeTimeMs,
  });

  // Save history to appStates if authenticated
  if (userId) {
    await db.insert(appStates).values({
      id: crypto.randomUUID(),
      userId,
      appId: 'nomad-tax',
      payload: { input: payload, result: result.result } as any,
    });
  }

  return c.json({ status: 'success', data: result });
});
