CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    organization VARCHAR(200),
    role ENUM('admin', 'organizer', 'participant') NOT NULL DEFAULT 'participant',
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role)
);

INSERT IGNORE INTO users (
    first_name,
    last_name,
    email,
    password,
    organization,
    role,
    status
)
VALUES
('System', 'Admin', 'admin@example.com', '$2y$10$hdS6dN9uPcPKdF1gO2n.fOu2066YSd0fdVuMlxJBtr6cxALzVyn3S', 'Event Management System', 'admin', 'approved');