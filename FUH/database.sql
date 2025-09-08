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
empSalary int,
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

INSERT INTO tblEmployee (empSSN, empName, empAddress, empSalary, empSex, empBirthdate, depNum, supervisorSSN, empStartDate)
VALUES 
	('30121050004', 'Mai Duy An', 'Long An', 30000, 'F', '1968-02-17', 1, '30121050037', '2000-01-01'),
	('30121050015', 'Huỳnh Mai Anh', 'TP. Hồ Chí Minh', 58000, 'F', '1963-05-04', 1, '30121050004', '2005-01-14'),
	('30121050027', 'Nguyễn Thúy Quỳnh Anh', 'Nam Định', 91000, 'F', '1977-04-10', 1, '30121050004', '2005-02-25'),
	('30121050035', 'Tống Thị Lan Anh', 'Vũng Tàu', 78000, 'F', '1978-10-28', 1, '30121050037', '2004-04-15'),
	('30121050037', 'Võ Việt Anh', 'Khánh Hòa', 110000, 'M', '1974-11-11', 1, NULL, '2000-05-23'),
	('30121050038', 'Vũ Thụy Hồng Anh', 'TP. Hồ Chí Minh', 104000, 'F', '1966-06-13', 2, '30121050142', '2000-05-24'),
	('30121050049', 'Trần Nguyễn Phương Bình', 'TP. Hồ Chí Minh', 83000, 'M', '1959-05-17', 2, '30121050038', '2005-05-12'),
	('30121050060', 'Trần Thiện Bảo', 'TP. Hồ Chí Minh', 75000, 'M', '1955-12-26', 2, '30121050038', '2008-10-20'),
	('30121050142', 'Nguyễn Hoàng Dũng', 'TP. Hồ Chí Minh', 114000, 'M', '1956-02-26', 2, NULL, '2006-12-15'),
	('30121050158', 'Lê Hoàng Linh Giang', 'Hue', 98000, 'F', '1957-07-16', 2, '30121050142', '2006-11-20'),
	('30121050180', 'Trần Ngọc Như Hằng', 'TP. Hồ Chí Minh', 59000, 'F', '1970-05-29', 5, NULL, '2007-01-15'),
	('30121050184', 'Nguyễn Thị Minh Hưng', 'Thanh Hóa', 92000, 'F', '1976-12-23', 5, NULL, '2007-03-18'),
	('30121050254', 'Bùi Thị Thu Hương', 'TP. Hà Nội', 117000, 'F', '1970-01-06', 3, '30121050254', '2008-06-24'),
	('30121050265', 'Phạm Thị Ngọc Hảo', 'Gia Lai', 35000, 'F', '1975-02-04', 3, '30121050295', '2008-08-10'),
	('30121050294', 'Trịnh Hạnh', 'TP. Đà Nẵng', 94000, 'F', '1977-02-12', 4, NULL, '2005-05-05'),
	('30121050295', 'Huỳnh Thị Như Hồng', 'TP. Can Tho', 110000, 'F', '1970-08-14', 4, '30121050254', '2008-12-17'),
	('30121050322', 'Đỗ Thị Thúy Hùng', 'Sông Bé', 76000, 'M', '1963-01-22', 3, '30121050295', '2002-11-11'),
	('30121050336', 'Trương Thanh Hiền', 'TP. Hải Phòng', 102000, 'F', '1963-05-16', 4, '30121050295', '2003-04-27'),
	('30121050341', 'Nguyễn Đặng Hiểu', 'TP. Hồ Chí Minh', 46000, 'F', '1970-08-30', 4, '30121050295', '2008-08-09'),
	('30121050418', 'Vũ Phạm Minh Hương', 'TP. Hà Nội', 30000, 'M', '1971-08-17', 5, '30121050184', '2009-07-25'),
	('30121050982', 'Hồ Việt Hoà', 'Đồng Nai', 95000, 'F', '1970-02-03', 3, '30121050254', '2005-11-24');


-- xem du lieu
SELECT * FROM tblDepartment;
SELECT * FROM tblLocation;
SELECT * FROM tblDepLocation;
SELECT * FROM tblEmployee;
