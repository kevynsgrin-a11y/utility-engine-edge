import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/d1';
import { eq, and } from 'drizzle-orm';
import { verify } from 'hono/jwt';
import { AuraMatchInputSchema } from '../utils/validators';
import { generateSynastryMatrix } from '../services/aura-match.service';
import { usageLogs, appStates, subscriptions } from '../db/schema';
import type { Bindings } from '../middlewares/auth-and-tier';

export const auraMatchRouter = new Hono<{ Bindings: Bindings }>();

auraMatchRouter.post('/match', async (c) => {
  const startTime = Date.now();
  const payload = AuraMatchInputSchema.parse(await c.req.json());
  const db = drizzle(c.env.DB);
  
  let userId: string | null = null;
  let tier: 'free' | 'cusp-plus' | 'enterprise' = 'free';
  
  const authHeader = c.req.header('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const token = authHeader.split(' ')[1];
      const decoded = await verify(token, c.env.JWT_SECRET, 'HS256') as { sub: string };
      userId = decoded.sub;
      
      const [sub] = await db.select({ tier: subscriptions.tier })
        .from(subscriptions)
        .where(and(eq(subscriptions.userId, userId), eq(subscriptions.status, 'active')))
        .limit(1);
      
      if (sub) {
        tier = sub.tier;
      }
    } catch {
      // Treat as guest
    }
  }

  const result = generateSynastryMatrix(payload, tier);
  const computeTimeMs = Date.now() - startTime;

  // Insert into usage logs
  await db.insert(usageLogs).values({
    id: crypto.randomUUID(),
    userId,
    appId: 'aura-match',
    endpoint: '/api/v1/aura/match',
    computeTimeMs,
  });

  // Save history to appStates if authenticated
  if (userId) {
    await db.insert(appStates).values({
      id: crypto.randomUUID(),
      userId,
      appId: 'aura-match',
      payload: { input: payload, result } as any,
    });
  }

  return c.json({ status: 'success', data: result });
});
