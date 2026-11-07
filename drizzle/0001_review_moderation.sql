ALTER TABLE `reviews` ADD `email` text;
ALTER TABLE `reviews` ADD `status` text NOT NULL DEFAULT 'pending';
CREATE INDEX `reviews_status_idx` ON `reviews` (`status`);
