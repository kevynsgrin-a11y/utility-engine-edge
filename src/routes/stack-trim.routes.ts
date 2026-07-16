import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/d1';
import { verify } from 'hono/jwt';
import { StackTrimInputSchema } from '../utils/validators';
import { optimizeSaaSStack } from '../services/stack-trim.service';
import { usageLogs, appStates } from '../db/schema';
import type { Bindings } from '../middlewares/auth-and-tier';

export const stackTrimRouter = new Hono<{ Bindings: Bindings }>();

stackTrimRouter.post('/optimize', async (c) => {
  const startTime = Date.now();
  const payload = StackTrimInputSchema.parse(await c.req.json());
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

  const result = await optimizeSaaSStack(payload, c.env.AFFILIATE_KV);
  const computeTimeMs = Date.now() - startTime;

  // Insert into usage logs
  await db.insert(usageLogs).values({
    id: crypto.randomUUID(),
    userId,
    appId: 'stack-trim',
    endpoint: '/api/v1/stack/optimize',
    computeTimeMs,
  });

  // Save history to appStates if authenticated
  if (userId) {
    await db.insert(appStates).values({
      id: crypto.randomUUID(),
      userId,
      appId: 'stack-trim',
      payload: { input: payload, result } as any,
    });
  }

  return c.json({ status: 'success', data: result });
});
