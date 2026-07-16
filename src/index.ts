import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { secureHeaders } from 'hono/secure-headers';
import { HTTPException } from 'hono/http-exception';
import { ZodError } from 'zod';

import { authRouter } from './routes/auth.routes';
import { historyRouter } from './routes/history.routes';
import { auraMatchRouter } from './routes/aura-match.routes';
import { stackTrimRouter } from './routes/stack-trim.routes';
import { nomadTaxRouter } from './routes/nomad-tax.routes';
import { stripeWebhookRouter } from './routes/stripe-webhook.routes';
import type { Bindings } from './middlewares/auth-and-tier';

type Variables = { userId: string; };

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

app.use('*', secureHeaders());
app.use('*', cors({
  origin: ['https://auramatch.io', 'https://stacktrim.app', 'https://nomadtaxmath.com'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['X-RateLimit-Remaining'],
  maxAge: 86400,
}));

app.get('/api/health', (c) => c.json({ status: 'success', data: { edge_status: 'operational', timestamp: Date.now() } }));

// Mount Domains
app.route('/api/v1/auth', authRouter);
app.route('/api/v1/history', historyRouter);
app.route('/api/v1/aura', auraMatchRouter);
app.route('/api/v1/stack', stackTrimRouter);
app.route('/api/v1/nomad', nomadTaxRouter);
app.route('/api/v1/stripe', stripeWebhookRouter);

app.onError((err, c) => {
  if (err instanceof HTTPException) return c.json({ status: err.status >= 500 ? 'error' : 'fail', message: err.message }, err.status);
  if (err instanceof ZodError) return c.json({ status: 'fail', message: 'Payload validation failed', data: err.issues.map(i => ({ path: i.path.join('.'), message: i.message })) }, 400);
  
  console.error(`[Unhandled Edge Exception]`, err);
  return c.json({ status: 'error', message: 'Internal Server Error.' }, 500);
});

export default { fetch: app.fetch };
