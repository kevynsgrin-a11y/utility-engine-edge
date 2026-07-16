import { Hono } from 'hono';
import { verify } from 'hono/jwt';
import { drizzle } from 'drizzle-orm/d1';
import { eq, desc } from 'drizzle-orm';
import { appStates } from '../db/schema';
import type { Bindings } from '../middlewares/auth-and-tier';

export const historyRouter = new Hono<{ Bindings: Bindings; Variables: { userId: string } }>();

historyRouter.use('*', async (c, next) => {
  const token = c.req.header('Authorization')?.split(' ')[1];
  if (!token) return c.json({ status: 'fail', message: 'Unauthorized' }, 401);
  try {
    const payload = await verify(token, c.env.JWT_SECRET, 'HS256');
    c.set('userId', payload.sub as string);
    await next();
  } catch { return c.json({ status: 'fail', message: 'Invalid token' }, 401); }
});

historyRouter.get('/:appId', async (c) => {
  const appId = c.req.param('appId');
  if (!['aura-match', 'stack-trim', 'nomad-tax'].includes(appId)) return c.json({ status: 'fail', message: 'Invalid App ID' }, 400);

  const db = drizzle(c.env.DB);
  const history = await db.select({ id: appStates.id, payload: appStates.payload, createdAt: appStates.createdAt })
    .from(appStates).where(eq(appStates.userId, c.get('userId'))).orderBy(desc(appStates.createdAt))
    .limit(parseInt(c.req.query('limit') || '20', 10)).offset(parseInt(c.req.query('offset') || '0', 10));

  return c.json({ status: 'success', data: { history } });
});
