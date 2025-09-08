create database Rooms_de180583;

use Rooms_de180583;

CREATE TABLE Customers (
    id INT PRIMARY KEY IDENTITY(1,1),
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL
);

CREATE TABLE Rooms (
    id INT PRIMARY KEY IDENTITY(1,1),
    room_number VARCHAR(50) NOT NULL,
    capacity INT NOT NULL,
    floor INT NOT NULL
);

CREATE TABLE Bookings (
    id INT PRIMARY KEY IDENTITY(1,1),
    room_id INT,
    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    purpose VARCHAR(255) NOT NULL,
    FOREIGN KEY (room_id) REFERENCES Rooms(id),
    customer_id INT,
    FOREIGN KEY (customer_id) REFERENCES Customers(id)
);

INSERT INTO Customers (username, password, email) VALUES ('user1', 'pass1', 'user1@example.com');
INSERT INTO Customers (username, password, email) VALUES ('user2', 'pass2', 'user2@example.com');

INSERT INTO Rooms (room_number, capacity, floor) VALUES ('101', 30, 1);
INSERT INTO Rooms (room_number, capacity, floor) VALUES ('102', 25, 1);

INSERT INTO Bookings (room_id, booking_date, start_time, end_time, purpose, customer_id) 
VALUES (1, '2023-06-01', '09:00:00', '11:00:00', 'Math Class', 1);
INSERT INTO Bookings (room_id, booking_date, start_time, end_time, purpose, customer_id) 
VALUES (2, '2023-06-02', '10:00:00', '12:00:00', 'Science Class', 2);

select * from Customers;
select * from Rooms;
select * from Bookings;