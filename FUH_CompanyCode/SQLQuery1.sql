use FUH_CompanyCode

/*lenh tao bang*/
create table tblDepartment(
depNum int identity(1,1) primary key,
depName nvarchar(50) not null,
mgrSSN varchar(11),
mgrAssDate date
)

create table tblEmployee(
empSSN varchar(11) primary key,
empName nvarchar(30) not null,
empAddress nvarchar(60),
empSex varchar(2),
empBirthdate date check((year(getdate())) - year(empBirthdate) >= 18),
--rang buoc tuoi >= 18
depNum int foreign key references tblDepartment(depNum),
supervisorSSN varchar(11),
empStartDate date
)

create table tblLocation(
locNum int identity primary key,
locName nvarchar(50)
)

create table tblDepLocation(
depNum int foreign key references tblDepartment(depNum),
locNum int foreign key references tblLocation(locNum),
constraint pk_depLoc primary key(depNum,locNum)
)

create table tblDependent(
depSex varchar(2),
depBirthdate date check((year(getdate())) - year(depBirthdate) >= 18),
depRelationship varchar(11),
depName nvarchar(50),
empSSN varchar(11) foreign key references tblEmployee(empSSN),
constraint pk_dependent primary key(depName,empSSN)
)

create table tblProject(
proNum int identity(1,1) primary key,
proName nvarchar(50) not null ,
locNum int foreign key references tblLocation(locNum),
depNum int foreign key references tblDepartment(depNum)
)

create table tblWorksOn(
empSSN varchar(11),
proNum int identity(1,1) foreign key references tblProject(proNum),
workHours int, 
constraint pk_Works primary key(empSSN,proNum)
)
--nhap du lieu
insert into tblDepartment(depName,mgrSSN,mgrAssDate)
values
	(N'Phòng Phần mềm trong nước', '30121050037', '2003-01-10 00:00:00.000'),
	(N'Phòng Phần mềm nước ngoài', '30121050142', '2005-01-06 00:00:00.000'),
	(N'Phòng Giải pháp mạng truyền thông', '30121050254', '2000-01-01 00:00:00.000'),
	(N'Phòng Dịch vụ chăm sóc khách hàng', '30121050295', '2008-01-07 00:00:00.000'),
	(N'Phòng Nghiên cứu và phát triển', '30121050184', '2006-01-12 00:00:00.000');

insert into tblLocation(locName)
values
	(N'TP Hà Nội'),
	(N'TP Hải Phòng'),
	(N'TP Đà Nẵng'),
	(N'TP Huế'),
	(N'TP Hồ Chí Minh'),
	(N'TP Cần Thơ');

insert into tblDepLocation(depNum, locNum)
values
	('1', '1'),
	('1', '2'),
	('1', '3'),
	('1', '5'),
	('2', '1'),
	('2', '2'),
	('2', '4'),
	('3', '1'),
	('3', '4'),
	('4', '1'),
	('4', '3'),
	('4', '5'),
	('5', '1'),
	('5', '2'),
	('5', '4');

INSERT INTO tblEmployee(empSSN, empName, empAddress, empSex, empBirthdate, depNum, supervisorSSN, empStartDate, empSalary)
values
	(N'30121050004', 'Mai Duy Anh', 'Long An', '30000', 'F', '1968-02-17 00:00:00', '1', '30121050037', '2000-01-01 00:00:00'),


-- xem du lieu
SELECT * FROM tblDepartment;
SELECT * FROM tblLocation;
SELECT * FROM tblDepLocation;
SELECT * FROM tblEmployee;

-- xoa du lieu
-- DELETE FROM tblDepartment

--USE FUH_CompanyCode

--SELECT * FROM tblEmployee
--WHERE empSalary > 2100000

