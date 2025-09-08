CREATE DATABASE Task_de180583;
GO

USE Task_de180583;
GO

-- Create Users table
CREATE TABLE Users (
    user_id INT PRIMARY KEY IDENTITY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    registration_date DATETIME DEFAULT GETDATE()
);

-- Create Tasks table
CREATE TABLE Tasks (
    task_id INT PRIMARY KEY IDENTITY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    created_date DATETIME DEFAULT GETDATE(),
    due_date DATETIME,
    status VARCHAR(20) DEFAULT 'pending'
);

-- Create TaskAssignments table
CREATE TABLE TaskAssignments (
    assignment_id INT PRIMARY KEY IDENTITY,
    task_id INT NOT NULL,
    user_id INT NOT NULL,
    assigned_date DATETIME DEFAULT GETDATE(),
    complete_date DATETIME,
    FOREIGN KEY (task_id) REFERENCES Tasks(task_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Insert sample data
INSERT INTO Users (username, email, password) VALUES
('john_doe', 'john@example.com', 'hashed_password_1'),
('jane_smith', 'jane@example.com', 'hashed_password_2');

INSERT INTO Tasks (title, description, due_date, status) VALUES
('Complete project documentation', 'Documentation for project XYZ', '2024-07-01', 'pending'),
('Update website', 'Add new features to the company website', '2024-07-15', 'in progress');

INSERT INTO TaskAssignments (task_id, user_id, assigned_date) VALUES
(1, 1, '2024-06-25'),
(2, 2, '2024-06-26');
