-- Create table for professor posts
CREATE TABLE professor_posts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create table for professors
CREATE TABLE professors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    post_id INT REFERENCES professor_posts(id)
);

-- Create table for students
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password_hash VARCHAR NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    credits INT DEFAULT 0
);

-- Create table for classes
CREATE TABLE classes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    professor_id INT REFERENCES professors(id),
    day INT CHECK (day >= 0 AND day <= 6),
    period INT CHECK (period >= 0 AND period <= 6),
    semester INT CHECK (semester = 0 OR semester = 1),
    summery VARCHAR,
    credits INT NOT NULL
);

-- Create table for class register
CREATE TABLE class_register (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(id),
    class_id INT REFERENCES classes(id)
);
