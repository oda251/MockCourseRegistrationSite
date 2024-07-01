-- Create table for professor posts
CREATE TABLE professor_posts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Create table for professors
CREATE TABLE professors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    post_id INT NOT NULL,
    CONSTRAINT fk_post_id FOREIGN KEY (post_id) REFERENCES professor_posts(id)
);

-- Create table for students
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR NOT NULL, -- hashed
    email VARCHAR(255) UNIQUE NOT NULL,
    credits INT NOT NULL
);

-- Create table for classes
CREATE TABLE classes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    professor_id INT NOT NULL,
    day INT NOT NULL CHECK (day >= 0 AND day <= 6),
    period INT NOT NULL CHECK (period >= 0 AND period <= 6),
    semester INT NOT NULL CHECK (semester = 0 OR semester = 1),
    summery VARCHAR,
    credits INT NOT NULL,
    CONSTRAINT fk_professor_id FOREIGN KEY (professor_id) REFERENCES professors(id)
);

-- Create table for class register
CREATE TABLE class_register (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL,
    class_id INT NOT NULL,
    CONSTRAINT fk_student_id FOREIGN KEY (student_id) REFERENCES students(id),
    CONSTRAINT fk_class_id FOREIGN KEY (class_id) REFERENCES classes(id)
);
