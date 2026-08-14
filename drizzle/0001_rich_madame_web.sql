CREATE TABLE `contactMessages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fullName` varchar(120) NOT NULL,
	`contact` varchar(320) NOT NULL,
	`message` text NOT NULL,
	`language` varchar(5) NOT NULL DEFAULT 'en',
	`status` enum('new','read','replied') NOT NULL DEFAULT 'new',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contactMessages_id` PRIMARY KEY(`id`)
);
