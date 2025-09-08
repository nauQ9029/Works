use DB_PE_DBI202
Go
use DB_PE_DBI202

create table Student(
StudentID int identity (1,1) primary key,
FirstName nvarchar(30) not null,
LastName nvarchar(30) not null,
Gender nvarchar(10) check (Gender in (N'Nam',N'N?')),
DOB date
)
Go
create table Subject(
SubjectID varchar(7) primary key,
SubjectName nvarchar(30) not null,
credit smallint
)
Go
Create table Course(
CourseID int primary key identity(1,1),
CourseName nvarchar(10) not null,
Semester varchar(10),
NumberOfStudents smallint, 
SubjectID varchar(7) Foreign key references Subject(SubjectID)
)

Go
--Code for insert values to all table
insert into Student(FirstName,LastName,DOB,Gender)
values(N'Lê',N'Nh?t Huy','2000-02-20', N'Nam'),
(N'Nguy?n',N'Thu Th?y','2002-10-21', N'N?'),
(N'Tr?n Th?',N'Thanh Nhàn','2004-10-22', N'N?'),
(N'Lê Nguy?n',N'Hoài Nhân','2003-02-02', N'Nam'),
(N'Tr?n Thanh',N'Th?y','2004-01-01', N'N?')


insert into Subject(SubjectID, SubjectName, credit)
values('PRN211', N'L?p trình C#',3),
('DBI202', N'C? s? d? li?u',3),
('SWE201c',N'K? thu?t ph?n m?m',2),
('PRF192',N'L?p trình c? b?n C',2),
('SWT302',N'Ki?m th? ph?n m?m',2)

insert into Course(CourseName,Semester,NumberOfStudents,SubjectID)
values(N'SE17A01','FA23',0,'PRF192'),
(N'SE1604','FA23',0,'SWE201c'),
(N'SE18C06','SU23',0,'DBI202'),
(N'SE1605','FA23',0,'DBI202'),
(N'SE18B01','SU23',30,'PRN211'),
(N'SE17B02','SU23',30,'SWT302')

select * from Course
select * from Subject
select * from Student

--

-- 2. Write sql statement to create the table (- name the table: Enrolment-) from the entity that was adding into ERD at question 1.
-- Apply as much as possible constraints for each column of the table.

create table Enrollment(
	StudentID int foreign key references Student(StudentID),
	CourseID int foreign key references Course(CourseID),
	Grade float check (Grade between 0 and 10),
	Attendance smallint check (Attendance between 0 and 20),
	primary key (StudentID, CourseID)
)
select * from Enrollment
drop table Enrolment

-- Write sql code to insert at least 3 records into the table
insert into Enrollment(StudentID, CourseID, Attendance, Grade)
values
	(1, 1, 4, 3.6),
	(2, 2, 2, 5.6),
	(3, 5, 0, 7.6);

-- 3. Create a store procedure to enroll a student into a course. 
-- Do not allow duplicate enrollment: raise error if a student enrolls two times in the same course.

create procedure EnrollStudent @studentID int, @courseID int
as
begin
	if (@studentID is null) or (@courseID is null)
		raiserror('Wrong agruments', 10, 1)
	insert into Enrollment(StudentID, CourseID, Attendance)
		values(@studentID, @courseID, 0)
	if @@ROWCOUNT <> 1
	begin
		raiserror('Something wrong, enrollment failed.', 10, 1)
		rollback transaction
	end
end

-- 4. Create a function that calculate the total of credits of a student that enrolled in a semester.
create function totalCredits(@studentID int, @sem varchar(10))
returns smallint
as
begin
	declare @totalCredits smallint
	select @totalCredits = sum(sb.credit)
	from Subject sb inner join Course c
	on sb.SubjectID = c.SubjectID
	inner join Enrollment en on c.CourseID = en.CourseID
	where en.StudentID = @studentID and c.Semester = @sem
	
	return @totalCredits
end

-- 5. Create a trigger to update number of student of a course (increase by 1) whenever a student enrolls into a course.
create trigger updateNoOfStudent
on Enrollment
for insert
as
begin
	declare @courseID int
	select @courseID = courseID from inserted
	update Course set NumberOfStudents = NumberOfStudents + 1
	where CourseID = @courseID
	
	if @@rowcount <> 1
	begin
		raiserror('Something wrong, enrollment failed.',10, 1)
		rollback transaction
	end
end