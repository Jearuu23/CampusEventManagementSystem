-- Seed data for event_registrations
-- Assumes event_id maps to the following event statuses:
-- Events 1-6: Pending (0-2 participants)
-- Events 7-10: Approved (4-10 participants)
-- Events 11-13: Rejected (0-2 participants)
-- Event 14: Ongoing (4-10 participants)
-- Events 15-21: Completed (4-10 participants)
-- Events 22-23: Cancelled (4-10 participants)
-- Available Participant IDs: 16 - 55

INSERT IGNORE INTO event_registrations (event_id, participant_id, status, points) VALUES
-- Pending Events (Events 1-6) - Less than 4 participants
(1, 49, 'registered', 0),
(1, 50, 'registered', 0),
(2, 51, 'registered', 0),

-- Approved Events (Events 7-10) - 4 to 10 participants each, registered status
(7, 16, 'registered', 0),
(7, 17, 'registered', 0),
(7, 18, 'registered', 0),
(7, 19, 'registered', 0),
(7, 20, 'registered', 0),

(8, 21, 'registered', 0),
(8, 22, 'registered', 0),
(8, 23, 'registered', 0),
(8, 24, 'registered', 0),
(8, 25, 'registered', 0),
(8, 26, 'registered', 0),

(9, 27, 'registered', 0),
(9, 28, 'registered', 0),
(9, 29, 'registered', 0),
(9, 30, 'registered', 0),

(10, 31, 'registered', 0),
(10, 32, 'registered', 0),
(10, 33, 'registered', 0),
(10, 34, 'registered', 0),
(10, 35, 'registered', 0),
(10, 36, 'registered', 0),
(10, 37, 'registered', 0),

-- Rejected Events (Events 11-13) - Less than 4 participants
(11, 52, 'cancelled', 0),
(11, 53, 'cancelled', 0),

-- Ongoing Event (Event 14) - Mix of attended and registered
(14, 38, 'attended', 10),
(14, 39, 'attended', 10),
(14, 40, 'attended', 10),
(14, 41, 'registered', 0),
(14, 42, 'registered', 0),
(14, 43, 'registered', 0),

-- Completed Events (Events 15-21) - Mostly attended, some cancelled, awards points
(15, 44, 'attended', 15),
(15, 45, 'attended', 15),
(15, 46, 'attended', 15),
(15, 47, 'cancelled', 0),
(15, 48, 'attended', 15),

(16, 49, 'attended', 20),
(16, 50, 'attended', 20),
(16, 51, 'attended', 20),
(16, 52, 'attended', 20),
(16, 53, 'cancelled', 0),
(16, 54, 'attended', 20),

(17, 55, 'attended', 10),
(17, 16, 'attended', 10),
(17, 17, 'attended', 10),
(17, 18, 'attended', 10),
(17, 19, 'cancelled', 0),

(18, 20, 'attended', 15), (18, 21, 'attended', 15), (18, 22, 'attended', 15), (18, 23, 'attended', 15), (18, 24, 'attended', 15),
(19, 25, 'attended', 10), (19, 26, 'attended', 10), (19, 27, 'attended', 10), (19, 28, 'cancelled', 0), (19, 29, 'attended', 10), (19, 30, 'attended', 10),
(20, 31, 'attended', 20), (20, 32, 'attended', 20), (20, 33, 'cancelled', 0), (20, 34, 'attended', 20), (20, 35, 'attended', 20),
(21, 36, 'attended', 10), (21, 37, 'attended', 10), (21, 38, 'attended', 10), (21, 39, 'attended', 10), (21, 40, 'cancelled', 0),

-- Cancelled Events (Events 22-23) - All registrations set to cancelled
(22, 41, 'cancelled', 0), (22, 42, 'cancelled', 0), (22, 43, 'cancelled', 0), (22, 44, 'cancelled', 0),
(23, 45, 'cancelled', 0), (23, 46, 'cancelled', 0), (23, 47, 'cancelled', 0), (23, 48, 'cancelled', 0);