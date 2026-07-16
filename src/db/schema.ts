import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  passwordSalt: text('password_salt').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(strftime('%s', 'now'))`),
});

export const subscriptions = sqliteTable('subscriptions', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  stripeCustomerId: text('stripe_customer_id').notNull().unique(),
  stripeSubscriptionId: text('stripe_subscription_id').unique(),
  tier: text('tier', { enum: ['free', 'cusp-plus', 'enterprise'] }).notNull().default('free'),
  status: text('status', { enum: ['active', 'canceled', 'past_due', 'incomplete'] }).notNull(),
  currentPeriodEnd: integer('current_period_end', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(strftime('%s', 'now'))`),
});

export const usageLogs = sqliteTable('usage_logs', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id, { onDelete: 'set null' }),
  appId: text('app_id', { enum: ['aura-match', 'stack-trim', 'nomad-tax'] }).notNull(),
  endpoint: text('endpoint').notNull(),
  computeTimeMs: integer('compute_time_ms').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(strftime('%s', 'now'))`),
});

export const appStates = sqliteTable('app_states', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  appId: text('app_id', { enum: ['aura-match', 'stack-trim', 'nomad-tax'] }).notNull(),
  payload: text('payload', { mode: 'json' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull().default(sql`(strftime('%s', 'now'))`),
});
