create database Loginn
use Loginn

create table account(
username varchar(40),
password varchar(40)

);  
INSERT INTO account (username, password) VALUES ('Alice', 'password123');
INSERT INTO account (username, password) VALUES ('Bob', 'securepass');
INSERT INTO account (username, password) VALUES ('Charlie', 'mypassword');
INSERT INTO account (username, password) VALUES ('David', 'passw0rd');
INSERT INTO account (username, password) VALUES ('Eve', 'qwerty123');

select * from account where username ='Alice' and password = 'password123' 