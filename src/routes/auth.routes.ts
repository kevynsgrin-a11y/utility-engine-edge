import { Hono } from 'hono';
import { z } from 'zod';
import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { sign } from 'hono/jwt';
import { users } from '../db/schema';
import { hashPassword, verifyPassword } from '../utils/crypto';
import type { Bindings } from '../middlewares/auth-and-tier';

export const authRouter = new Hono<{ Bindings: Bindings }>();
const AuthSchema = z.object({ email: z.string().email(), password: z.string().min(8) });

authRouter.post('/register', async (c) => {
  const { email, password } = AuthSchema.parse(await c.req.json());
  const db = drizzle(c.env.DB);
  if ((await db.select().from(users).where(eq(users.email, email)).limit(1)).length > 0) return c.json({ status: 'fail', message: 'Email registered' }, 409);

  const { hash, salt } = await hashPassword(password);
  const userId = crypto.randomUUID();
  await db.insert(users).values({ id: userId, email, passwordHash: hash, passwordSalt: salt });

  return c.json({ status: 'success', data: { token: await sign({ sub: userId, exp: Math.floor(Date.now() / 1000) + 86400 }, c.env.JWT_SECRET), userId } }, 201);
});

authRouter.post('/login', async (c) => {
  const { email, password } = AuthSchema.parse(await c.req.json());
  const db = drizzle(c.env.DB);
  const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

  if (!user || !(await verifyPassword(password, user.passwordHash, user.passwordSalt))) return c.json({ status: 'fail', message: 'Invalid credentials' }, 401);

  return c.json({ status: 'success', data: { token: await sign({ sub: user.id, exp: Math.floor(Date.now() / 1000) + 86400 }, c.env.JWT_SECRET), userId: user.id } });
});
