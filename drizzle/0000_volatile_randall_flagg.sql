CREATE TABLE `orderRequests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fullName` varchar(120) NOT NULL,
	`phone` varchar(40) NOT NULL,
	`email` varchar(320),
	`service` enum('reupholstery','living_room','car_interior','furniture_redesign','carpeting','other') NOT NULL,
	`brief` text NOT NULL,
	`style` varchar(80),
	`material` varchar(80),
	`referenceKey` varchar(512),
	`referenceUrl` text,
	`conceptUrl` text,
	`preferredContact` varchar(40) NOT NULL DEFAULT 'phone',
	`language` varchar(5) NOT NULL DEFAULT 'en',
	`status` enum('received','reviewing','quoted','accepted','completed') NOT NULL DEFAULT 'received',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `orderRequests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`openId` varchar(64) NOT NULL,
	`name` text,
	`email` varchar(320),
	`loginMethod` varchar(64),
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_openId_unique` UNIQUE(`openId`)
);
