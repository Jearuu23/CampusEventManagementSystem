INSERT IGNORE INTO events
(
title,
description,
event_start_date,
event_start_time,
event_end_date,
event_end_time,
location,
department,
organizer_id,
max_participants,
current_participants,
status,
image_path
)
VALUES

-- 1
('Web Development Workshop', 'Hands-on workshop covering HTML, CSS, JavaScript, and PHP.', '2026-07-10 00:00:00', '09:00:00', '2026-07-10 00:00:00', '16:00:00', 'Computer Laboratory 1', 'College of Computing Studies', 2, 50, 4, 'approved', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3'),
-- 2
('Leadership Seminar', 'Leadership and team management seminar for student leaders.', '2026-07-15 00:00:00', '08:00:00', '2026-07-15 00:00:00', '12:00:00', 'Main Auditorium', 'Student Affairs Office', 3, 100, 3, 'approved', 'https://images.unsplash.com/photo-1511578314322-379afb476865'),
-- 3
('Career Fair 2026', 'Meet industry professionals and recruiters.', '2026-08-05 00:00:00', '09:00:00', '2026-08-05 00:00:00', '17:00:00', 'Gymnasium', 'Career Services', 3, 300, 4, 'approved', 'https://images.unsplash.com/photo-1560523159-4a9692d222ef'),
-- 4
('Hackathon Challenge', '24-hour coding competition.', '2026-08-20 00:00:00', '08:00:00', '2026-08-21 00:00:00', '08:00:00', 'Innovation Hub', 'College of Computing Studies', 2, 80, 0, 'pending', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d'),
-- 5
('Research Conference', 'Presentation of student and faculty research.', '2026-09-12 00:00:00', '09:00:00', '2026-09-12 00:00:00', '15:00:00', 'Conference Hall', 'Research Office', 9, 120, 0, 'rejected', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87'),
-- 6
('Sports Festival', 'Inter-department sports competition.', '2026-06-01 00:00:00', '08:00:00', '2026-06-03 00:00:00', '18:00:00', 'Sports Complex', 'Sports and Athletics', 7, 500, 3, 'completed', 'https://images.unsplash.com/photo-1517649763962-0c623066013b'),
-- 7
('Campus Art Exhibition', 'Display of student artwork from the fine arts department.', '2026-07-12 00:00:00', '10:00:00', '2026-07-14 00:00:00', '17:00:00', 'Art Gallery', 'Arts and Sciences', 6, 200, 5, 'approved', 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b'),
-- 8
('Start-Up Pitch Competition', 'Students pitch their business ideas to local investors.', '2026-08-10 00:00:00', '13:00:00', '2026-08-10 00:00:00', '18:00:00', 'Business Hub', 'College of Business', 5, 150, 4, 'approved', 'https://images.unsplash.com/photo-1559136555-9303baea8ebd'),
-- 9
('Mental Health Awareness Week', 'A series of talks and activities focused on well-being.', '2026-09-01 00:00:00', '09:00:00', '2026-09-05 00:00:00', '16:00:00', 'Campus Grounds', 'Student Affairs Office', 3, 500, 10, 'approved', 'https://images.unsplash.com/photo-1493836512294-502baa1986e2'),
-- 10
('Engineering Symposium', 'Latest trends in civil and mechanical engineering.', '2026-09-20 00:00:00', '08:30:00', '2026-09-21 00:00:00', '17:00:00', 'Engineering Building', 'College of Engineering', 4, 250, 3, 'approved', 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc'),
-- 11
('Alumni Networking Night', 'Connect with successful university alumni.', '2026-10-05 00:00:00', '18:00:00', '2026-10-05 00:00:00', '21:00:00', 'Grand Ballroom', 'Career Services', 3, 400, 2, 'approved', 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622'),
-- 12
('Creative Writing Workshop', 'Improve your storytelling and poetry skills.', '2026-07-25 00:00:00', '14:00:00', '2026-07-25 00:00:00', '16:30:00', 'Library Seminar Room', 'Arts and Sciences', 6, 30, 6, 'approved', 'https://images.unsplash.com/photo-1455390582262-044cdead2708'),
-- 13
('Data Science Bootcamp', 'Intensive weekend course on Python and machine learning.', '2026-08-15 00:00:00', '09:00:00', '2026-08-16 00:00:00', '17:00:00', 'Computer Laboratory 2', 'College of Computing Studies', 2, 40, 8, 'approved', 'https://images.unsplash.com/photo-1551288049-bebda4e38f71'),
-- 14
('Music and Arts Festival', 'Live band performances and outdoor food stalls.', '2026-11-10 00:00:00', '16:00:00', '2026-11-10 00:00:00', '23:00:00', 'University Field', 'Music Department', 8, 1000, 15, 'approved', 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea'),
-- 15
('Inter-College Debate', 'Annual debate championship among university colleges.', '2026-10-15 00:00:00', '10:00:00', '2026-10-15 00:00:00', '15:00:00', 'Main Auditorium', 'Student Affairs Office', 3, 300, 4, 'approved', 'https://images.unsplash.com/photo-1528605248644-14dd04022da1'),
-- 16
('Robotics Showcase', 'Demonstration of student-built robots and AI.', '2026-12-01 00:00:00', '09:00:00', '2026-12-01 00:00:00', '16:00:00', 'Innovation Hub', 'College of Engineering', 4, 100, 0, 'pending', 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e'),
-- 17
('Environmental Sustainability Panel', 'Discussion on climate action on campus.', '2026-07-30 00:00:00', '13:00:00', '2026-07-30 00:00:00', '15:00:00', 'Conference Room A', 'Research Office', 9, 80, 0, 'pending', 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1'),
-- 18
('Esports Tournament', 'Inter-university gaming competition.', '2026-09-25 00:00:00', '10:00:00', '2026-09-26 00:00:00', '20:00:00', 'Student Lounge', 'College of Computing Studies', 2, 200, 0, 'rejected', 'https://images.unsplash.com/photo-1542751371-adc38448a05e'),
-- 19
('Culinary Masterclass', 'Learn to cook international cuisines.', '2026-10-20 00:00:00', '14:00:00', '2026-10-20 00:00:00', '17:00:00', 'Home Economics Room', 'Arts and Sciences', 6, 25, 0, 'rejected', 'https://images.unsplash.com/photo-1556910103-1c02745aae4d'),
-- 20
('Summer Coding Camp', 'Introduction to programming for incoming freshmen.', '2026-06-15 00:00:00', '09:00:00', '2026-06-25 00:00:00', '12:00:00', 'Computer Laboratory 3', 'College of Computing Studies', 2, 60, 12, 'ongoing', 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4'),
-- 21
('Language Exchange Program', 'Weekly meetups to practice foreign languages.', '2026-06-01 00:00:00', '16:00:00', '2026-07-31 00:00:00', '18:00:00', 'Library Cafe', 'Arts and Sciences', 6, 50, 8, 'ongoing', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644'),
-- 22
('Math Olympiad Training', 'Preparation for the national mathematics competition.', '2026-06-10 00:00:00', '15:00:00', '2026-07-10 00:00:00', '17:00:00', 'Room 304', 'Arts and Sciences', 6, 20, 5, 'ongoing', 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb'),
-- 23
('Outdoor Movie Night', 'Screening of a classic film on the campus green.', '2026-08-12 00:00:00', '19:00:00', '2026-08-12 00:00:00', '22:00:00', 'University Field', 'Student Affairs Office', 3, 300, 3, 'cancelled', 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba'),
-- 24
('Photography Walk', 'Explore and capture the campus architecture.', '2026-07-18 00:00:00', '08:00:00', '2026-07-18 00:00:00', '11:00:00', 'Campus Grounds', 'Arts and Sciences', 6, 40, 2, 'cancelled', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32'),
-- 25
('Job Interview Masterclass', 'Preparation and mock interviews with HR experts.', '2026-05-20 00:00:00', '10:00:00', '2026-05-20 00:00:00', '15:00:00', 'Business Hub', 'Career Services', 3, 100, 20, 'completed', 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e');