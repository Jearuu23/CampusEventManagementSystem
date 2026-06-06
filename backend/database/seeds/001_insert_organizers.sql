INSERT IGNORE INTO organizers (
    first_name,
    last_name,
    email,
    password,
    organization,
    role
)
VALUES
('System', 'Admin', 'admin@example.com', '$2y$10$hdS6dN9uPcPKdF1gO2n.fOu2066YSd0fdVuMlxJBtr6cxALzVyn3S', 'Event Management System', 'admin'),
('John', 'Cruz', 'john.cruz@example.com', '$2y$10$hdS6dN9uPcPKdF1gO2n.fOu2066YSd0fdVuMlxJBtr6cxALzVyn3S', 'College of Computing Studies', 'organizer'),
('Maria', 'Santos', 'maria.santos@example.com', '$2y$10$hdS6dN9uPcPKdF1gO2n.fOu2066YSd0fdVuMlxJBtr6cxALzVyn3S', 'Student Affairs Office', 'organizer'),
('Alice', 'Guo', 'alice@example.com', '$2y$10$hdS6dN9uPcPKdF1gO2n.fOu2066YSd0fdVuMlxJBtr6cxALzVyn3S', 'College of Engineering', 'organizer'),
('David', 'Lim', 'david@example.com', '$2y$10$hdS6dN9uPcPKdF1gO2n.fOu2066YSd0fdVuMlxJBtr6cxALzVyn3S', 'College of Business', 'organizer'),
('Sarah', 'Lee', 'sarah@example.com', '$2y$10$hdS6dN9uPcPKdF1gO2n.fOu2066YSd0fdVuMlxJBtr6cxALzVyn3S', 'Arts and Sciences', 'organizer'),
('Michael', 'Tan', 'michael@example.com', '$2y$10$hdS6dN9uPcPKdF1gO2n.fOu2066YSd0fdVuMlxJBtr6cxALzVyn3S', 'Sports and Athletics', 'organizer'),
('Emily', 'Chen', 'emily@example.com', '$2y$10$hdS6dN9uPcPKdF1gO2n.fOu2066YSd0fdVuMlxJBtr6cxALzVyn3S', 'Music Department', 'organizer'),
('Robert', 'Sy', 'robert@example.com', '$2y$10$hdS6dN9uPcPKdF1gO2n.fOu2066YSd0fdVuMlxJBtr6cxALzVyn3S', 'Research Office', 'organizer');