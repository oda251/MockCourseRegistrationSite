-- Insert test data into professor_posts
INSERT INTO professor_posts (name) VALUES 
('えび'),
('かに'),
('やどかり');

-- Insert test data into professors
INSERT INTO professors (name, post_id) VALUES 
('たろう', 1),
('じろう', 1),
('はなこ', 2),
('ふとし', 2),
('うめ', 3);

-- Insert test data into students
-- Original: password1, Hashed: $2b$10$Cxm9SEvh0rN5nLo5b3pG0.hV4Gz1upZ5fPQpw5OAtdVb1nkC/mLT6
-- Original: password2, Hashed: $2b$10$DInKhOtzHAE1jh1J/jtSXeFNQmmydj8P4OyXfeEtjILxIPMI.iaKK
-- Original: password3, Hashed: $2b$10$9xrivkrgF.w/CVenw8cUdOXl4./W7WOiQN/eorbvt/1NTbLjjiKWG
-- Original: password4, Hashed: $2b$10$73UG8y04GCPzdQp6NIqK4uM3nun9omWmVbQluyutanxup0kFU1fpu
-- Original: password5, Hashed: $2b$10$nl7qDchrk6C84au/xSCrMOFuRZUHjtLezrw1LlP0b6O9n8a7vMFK2
INSERT INTO students (name, password, email, credits) VALUES 
('Student 1', '$2b$10$Cxm9SEvh0rN5nLo5b3pG0.hV4Gz1upZ5fPQpw5OAtdVb1nkC/mLT6', 'student1@example.com', 0),
('Student 2', '$2b$10$DInKhOtzHAE1jh1J/jtSXeFNQmmydj8P4OyXfeEtjILxIPMI.iaKK', 'student2@example.com', 2),
('Student 3', '$2b$10$9xrivkrgF.w/CVenw8cUdOXl4./W7WOiQN/eorbvt/1NTbLjjiKWG', 'student3@example.com', 8),
('Student 4', '$2b$10$73UG8y04GCPzdQp6NIqK4uM3nun9omWmVbQluyutanxup0kFU1fpu', 'student4@example.com', 10),
('Student 5', '$2b$10$nl7qDchrk6C84au/xSCrMOFuRZUHjtLezrw1LlP0b6O9n8a7vMFK2', 'student5@example.com', 12);

-- Insert test data into classes
INSERT INTO classes (name, day, period, semester, summery, credits) VALUES 
('Class 1', 1, 1, 0, 'Summary 1', 2),
('Class 2', 2, 2, 0, 'Summary 2', 2),
('Class 3', 3, 3, 1, 'Summary 3', 1),
('Class 4', 4, 4, 1, 'Summary 4', 1),
('Class 5', 5, 5, 0, 'Summary 5', 2);

-- Insert test data into student_class
INSERT INTO student_class (student_id, class_id) VALUES 
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(2, 2),
(3, 3),
(3, 5),
(4, 4),
(5, 5);

-- Insert test data into professor_class
INSERT INTO professor_class (professor_id, class_id) VALUES 
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);
