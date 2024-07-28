CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`composition` text NOT NULL,
	`imgUrl` text NOT NULL,
	`city` text NOT NULL,
	`street` text NOT NULL,
	`zip` text NOT NULL,
	`price` real NOT NULL,
	`expiry` text NOT NULL,
	`lot_number` text NOT NULL,
	`date_posted` text NOT NULL,
	`description` text NOT NULL,
	`slug` text NOT NULL
);
