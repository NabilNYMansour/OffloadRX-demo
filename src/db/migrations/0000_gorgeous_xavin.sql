CREATE TABLE `email` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `medicine` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`composition` text NOT NULL,
	`imgUrl` text NOT NULL,
	`price` real,
	`for_sale` integer NOT NULL,
	`city` text NOT NULL,
	`street` text NOT NULL,
	`postal` text NOT NULL,
	`phone_number` text NOT NULL,
	`email` text NOT NULL,
	`date_posted` integer NOT NULL,
	`expiry` integer NOT NULL,
	`lot_number` text NOT NULL,
	`description` text NOT NULL,
	`slug` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `message` (
	`id` integer PRIMARY KEY NOT NULL,
	`email_id` integer NOT NULL,
	`subject` text NOT NULL,
	`message` text NOT NULL,
	FOREIGN KEY (`email_id`) REFERENCES `email`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `email_email_unique` ON `email` (`email`);