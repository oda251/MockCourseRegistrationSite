-- Create table for professor posts
CREATE TABLE professor_posts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

-- Create table for professors
CREATE TABLE professors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL, -- NN
    post_id INT NOT NULL REFERENCES professor_posts(id) -- FK to professor_posts, NN
);

-- Create table for students
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL, -- NN
    password VARCHAR NOT NULL, -- NN, hashed
    email VARCHAR(255) UNIQUE NOT NULL, -- UK, NN
    credits INT NOT NULL -- NN
);

-- Create table for classes
CREATE TABLE classes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL, -- NN
    day INT NOT NULL CHECK (day >= 0 AND day <= 6), -- 0 <= N <= 6, NN
    period INT NOT NULL CHECK (period >= 0 AND period <= 6), -- 0 <= N <= 6, NN
    semester INT NOT NULL CHECK (semester = 0 OR semester = 1), -- 0 or 1, NN
    summery VARCHAR,
    credits INT NOT NULL -- NN
);

-- Create table for student_class (class registration)
CREATE TABLE student_class (
    id SERIAL PRIMARY KEY,
    student_id INT NOT NULL REFERENCES students(id), -- FK to students, NN
    class_id INT NOT NULL REFERENCES classes(id) -- FK to classes, NN
);

-- Create table for professor_class (professor-class association)
CREATE TABLE professor_class (
    id SERIAL PRIMARY KEY,
    professor_id INT NOT NULL REFERENCES professors(id), -- FK to professors, NN
    class_id INT NOT NULL REFERENCES classes(id) -- FK to classes, NN
);
