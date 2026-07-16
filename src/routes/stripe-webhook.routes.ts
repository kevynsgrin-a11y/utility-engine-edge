import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/d1';
import { eq } from 'drizzle-orm';
import { subscriptions } from '../db/schema';
import type { Bindings } from '../middlewares/auth-and-tier';

export const stripeWebhookRouter = new Hono<{ Bindings: Bindings }>();

stripeWebhookRouter.post('/webhook', async (c) => {
  const bodyText = await c.req.text();
  const db = drizzle(c.env.DB);

  let event: any;
  try {
    event = JSON.parse(bodyText);
  } catch (err) {
    return c.json({ status: 'fail', message: 'Invalid payload' }, 400);
  }

  const data = event.data?.object;
  if (!data) return c.json({ status: 'fail', message: 'No event data' }, 400);

  switch (event.type) {
    case 'checkout.session.completed': {
      const userId = data.client_reference_id || data.metadata?.userId;
      const stripeCustomerId = data.customer;
      const stripeSubscriptionId = data.subscription;
      
      if (userId && stripeSubscriptionId) {
        const subId = crypto.randomUUID();
        const tier = data.metadata?.tier || 'cusp-plus';
        
        await db.insert(subscriptions).values({
          id: subId,
          userId,
          stripeCustomerId,
          stripeSubscriptionId,
          tier: tier as any,
          status: 'active',
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        }).onConflictDoUpdate({
          target: subscriptions.stripeSubscriptionId,
          set: {
            status: 'active',
            tier: tier as any,
            updatedAt: new Date(),
          }
        });
      }
      break;
    }
    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const stripeSubscriptionId = data.id;
      const status = data.status === 'active' ? 'active' : 'canceled';
      const tier = data.metadata?.tier || 'cusp-plus';
      const currentPeriodEnd = new Date(data.current_period_end * 1000);

      await db.update(subscriptions)
        .set({
          status: status as any,
          tier: tier as any,
          currentPeriodEnd,
          updatedAt: new Date(),
        })
        .where(eq(subscriptions.stripeSubscriptionId, stripeSubscriptionId));
      break;
    }
    case 'customer.subscription.deleted': {
      const stripeSubscriptionId = data.id;
      await db.update(subscriptions)
        .set({
          status: 'canceled',
          updatedAt: new Date(),
        })
        .where(eq(subscriptions.stripeSubscriptionId, stripeSubscriptionId));
      break;
    }
  }

  return c.json({ received: true });
});
