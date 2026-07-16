CREATE TABLE `app_states` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`app_id` text NOT NULL,
	`payload` text NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`stripe_customer_id` text NOT NULL,
	`stripe_subscription_id` text,
	`tier` text DEFAULT 'free' NOT NULL,
	`status` text NOT NULL,
	`current_period_end` integer,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `usage_logs` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`app_id` text NOT NULL,
	`endpoint` text NOT NULL,
	`compute_time_ms` integer NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`password_hash` text NOT NULL,
	`password_salt` text NOT NULL,
	`created_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL,
	`updated_at` integer DEFAULT (strftime('%s', 'now')) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `subscriptions_stripe_customer_id_unique` ON `subscriptions` (`stripe_customer_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `subscriptions_stripe_subscription_id_unique` ON `subscriptions` (`stripe_subscription_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);