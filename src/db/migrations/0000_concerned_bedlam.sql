CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`composition` text NOT NULL,
	`imgUrl` text NOT NULL,
	`price` real NOT NULL,
	`for_sale` integer NOT NULL,
	`city` text NOT NULL,
	`street` text NOT NULL,
	`zip` text NOT NULL,
	`phone_number` text NOT NULL,
	`email` text NOT NULL,
	`date_posted` integer NOT NULL,
	`expiry` integer NOT NULL,
	`lot_number` text NOT NULL,
	`description` text NOT NULL,
	`slug` text NOT NULL
);
