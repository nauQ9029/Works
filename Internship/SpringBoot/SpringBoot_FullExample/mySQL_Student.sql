create database student_SpringBoot_MVCExample;

use student_SpringBoot_MVCExample;

select * from student;
DESC student;
ALTER TABLE student MODIFY id BIGINT AUTO_INCREMENT;


-- Reset Auto-Increment Counter
show table status like 'student';
ALTER TABLE student AUTO_INCREMENT = 19;
TRUNCATE TABLE student; -- Reset and delete all the data in the DB

