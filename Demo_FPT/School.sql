--Create database School
Go
Use School

Create table Student(
 Id int identity(100,1) primary key,
 Name nvarchar(100),
 Gender char(1) check(Gender in ('M','F','L')),
 Dob Date,
 username varchar(50),
 pass varchar(30))
 Go
 Insert into Student values(N'Nguyễn Văn Minh','M','2000-12-12','Minh','123')
 Insert into Student values(N'Lê Minh Hương','F','2000-10-12','Hoai','123')
 Insert into Student values(N'Phạm Minh Mậu','L','2000-12-11','Loc','123')
 Go

Create FUNCTION getDob(@Id int) 
 RETURNS Date
 as
       BEGIN
           declare @Dob Date
           select  @Dob = DOB from Student where Id = @Id
           return @Dob
       END
-- test function
	   SELECT dbo.getDob(100)  AS DayOfBirth