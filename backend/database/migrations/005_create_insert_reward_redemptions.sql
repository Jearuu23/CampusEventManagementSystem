CREATE TABLE IF NOT EXISTS `reward_redemptions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `event_id` int(11) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `reward_id` int(11) NOT NULL,
  `points_spent` int(11) NOT NULL,
  `status` enum('pending', 'fulfilled', 'cancelled') DEFAULT 'pending',
  `redeemed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`reward_id`) REFERENCES `rewards`(`id`) ON DELETE CASCADE,
  FOREIGN KEY (`event_id`) REFERENCES `events`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
