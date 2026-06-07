INSERT IGNORE INTO organizers (
    first_name,
    last_name,
    email,
    password,
    organization,
    role,
    status
)
VALUES
('System', 'Admin', 'admin@example.com', '$2y$10$hdS6dN9uPcPKdF1gO2n.fOu2066YSd0fdVuMlxJBtr6cxALzVyn3S', 'Event Management System', 'admin', 'approved'),
('John', 'Cruz', 'john.cruz@example.com', '$2y$10$hdS6dN9uPcPKdF1gO2n.fOu2066YSd0fdVuMlxJBtr6cxALzVyn3S', 'College of Computing Studies', 'organizer', 'approved'),
('Maria', 'Santos', 'maria.santos@example.com', '$2y$10$hdS6dN9uPcPKdF1gO2n.fOu2066YSd0fdVuMlxJBtr6cxALzVyn3S', 'Student Affairs Office', 'organizer', 'approved'),
('Alice', 'Guo', 'alice@example.com', '$2y$10$hdS6dN9uPcPKdF1gO2n.fOu2066YSd0fdVuMlxJBtr6cxALzVyn3S', 'College of Engineering', 'organizer', 'approved'),
('David', 'Lim', 'david@example.com', '$2y$10$hdS6dN9uPcPKdF1gO2n.fOu2066YSd0fdVuMlxJBtr6cxALzVyn3S', 'College of Business', 'organizer', 'approved'),
('Sarah', 'Lee', 'sarah@example.com', '$2y$10$hdS6dN9uPcPKdF1gO2n.fOu2066YSd0fdVuMlxJBtr6cxALzVyn3S', 'Arts and Sciences', 'organizer', 'approved'),
('Michael', 'Tan', 'michael@example.com', '$2y$10$hdS6dN9uPcPKdF1gO2n.fOu2066YSd0fdVuMlxJBtr6cxALzVyn3S', 'Sports and Athletics', 'organizer', 'approved'),
('Emily', 'Chen', 'emily@example.com', '$2y$10$hdS6dN9uPcPKdF1gO2n.fOu2066YSd0fdVuMlxJBtr6cxALzVyn3S', 'Music Department', 'organizer', 'approved'),
('Robert', 'Sy', 'robert@example.com', '$2y$10$hdS6dN9uPcPKdF1gO2n.fOu2066YSd0fdVuMlxJBtr6cxALzVyn3S', 'Research Office', 'organizer', 'approved');