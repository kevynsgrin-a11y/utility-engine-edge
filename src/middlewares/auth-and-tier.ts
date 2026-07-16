import { Context, Next } from 'hono';
import { verify } from 'hono/jwt';
import { drizzle } from 'drizzle-orm/d1';
import { eq, and } from 'drizzle-orm';
import { subscriptions } from '../db/schema';

export type Bindings = {
  DB: D1Database;
  JWT_SECRET: string;
  AFFILIATE_KV: KVNamespace;
  SEO_CACHE_KV: KVNamespace;
  STRIPE_WEBHOOK_SECRET: string;
  ENVIRONMENT: string;
};
type JwtPayload = { sub: string; exp: number; };

const jsendError = (c: Context, status: 401 | 403, message: string) => c.json({ status: 'fail', message }, status);

export const requireTier = (requiredTier: 'cusp-plus' | 'enterprise') => {
  return async (c: Context<{ Bindings: Bindings; Variables: { userId: string } }>, next: Next) => {
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) return jsendError(c, 401, 'Missing token.');

    try {
      const payload = await verify(authHeader.split(' ')[1], c.env.JWT_SECRET, 'HS256') as JwtPayload;
      const db = drizzle(c.env.DB);
      const [sub] = await db.select({ tier: subscriptions.tier, status: subscriptions.status })
        .from(subscriptions)
        .where(and(eq(subscriptions.userId, payload.sub), eq(subscriptions.status, 'active'))).limit(1);

      if (!sub) return jsendError(c, 403, 'Subscription required.');
      if (requiredTier === 'enterprise' && sub.tier !== 'enterprise') return c.json({ status: 'fail', message: 'Enterprise tier required.' }, 403);
      if (requiredTier === 'cusp-plus' && !['cusp-plus', 'enterprise'].includes(sub.tier)) return c.json({ status: 'fail', message: 'Cusp+ tier required.' }, 403);

      c.set('userId', payload.sub);
      await next();
    } catch {
      return jsendError(c, 401, 'Invalid token.');
    }
  };
};
