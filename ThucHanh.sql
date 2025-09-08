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
depName nvarchar(50),
empSSN varchar(11) foreign key references tblEmployee(empSSN),
depSex varchar(2),
depBirthdate date check((year(getdate())) - year(depBirthdate) >= 18),
depRelationship nvarchar(11),
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
proNum int,
workHours int, 
constraint pk_Works primary key(empSSN,proNum),
FOREIGN KEY (empSSN) REFERENCES tblEmployee (empSSN),
FOREIGN KEY (proNum) REFERENCES tblProject (proNum)
)

--Chỉnh sửa bảng
--ALTER TABLE table_name
--ALTER COLUMN column_name datatype

--Bật insert khi đã set identity
--set identity_insert table_name on

--nhap du lieu
--insert into tblDepartment(depName,mgrSSN,mgrAssDate)
--values(N'Phong phan mem trong nuoc','12345678910','10-01-2023');

use FUH_CompanyCode

INSERT INTO tblDepartment (depName, mgrSSN, mgrAssDate)
VALUES
	(N'Phòng Phần mềm trong nước', 30121050037, '2003-01-10'),
	(N'Phòng Phần mềm nước ngoài', 30121050142, '2005-01-06'),
	(N'Phòng Giải pháp mạng truyền thông', 30121050254, '2000-01-01'),
	(N'Phòng Dịch vụ chăm sóc khách hàng', 30121050295, '2008-01-07'),
	(N'Phòng Nghiên cứu và phát triển', 30121050184, '2006-01-12');

--SELECT * FROM tblDepartment;

Insert into tblLocation(locName)
Values
	(N'TP Hà Nội'),
	(N'TP Hải Phòng'),
	(N'TP Đà Nẵng'),
	(N'TP Huế'),
	(N'TP Hồ Chí Minh'),
	(N'TP Cần Thơ');


insert into tblDepLocation(depNum, locNum)
Values
	(1, 1),
	(1, 2),
	(1, 3),
	(1, 5),
	(2, 1),
	(2, 2),
	(2, 4),
	(3, 1),
	(3, 4),
	(4, 1),
	(4, 3),
	(4, 5),
	(5, 1),
	(5, 2),
	(5, 4);


INSERT INTO tblEmployee(empSSN, empName, empAddress, empSalary, empSex, empBirthdate,
						depNum, supervisorSSN, empStartDate)
Values
	(30121050004, N'Mai Duy An', N'Long An', 30000, 'F', '1968-02-17', 1, 30121050037, '2000-01-01'),
	(30121050015, N'Huỳnh Mai Anh', N'TP Hồ Chí Minh', 58000, 'F', '1963-05-04', 1, 30121050004, '2005-01-14'),
	(30121050027, N'Nguyễn Thúy Quỳnh Anh', N'Nam Định', 91000, 'F', '1977-04-10', 1, 30121050004, '2005-02-25'),
	(30121050035, N'Tổng Thị Lan Anh', N'Vũng Tàu', 78000, 'F', '1978-10-28', 1, 30121050037, '2004-04-15'),
	(30121050037, N'Võ Việt Anh', N'Khánh Hòa', 110000, 'M', '1974-11-11', 1, NULL, '2000-05-23'),
	(30121050038, N'Vũ Thụy Hồng Anh', N'TP Hồ Chí Minh', 104000, 'F', '1966-06-13', 2, 30121050142, '2000-05-24'),
	(30121050049, N'Trần Nguyễn Phương Bình', N'TP Hồ Chí Minh', 83000, 'M', '1959-05-17', 2, 30121050038, '2005-05-12'),
	(30121050060, N'Trần Thiện Bảo', N'TP Hồ Chí Minh', 75000, 'M', '1955-12-26', 2, 30121050038, '2008-10-20'),
	(30121050142, N'Nguyễn Hoàng Dũng', N'TP Hồ Chí Minh', 114000, 'M', '1956-02-26', 2, NULL, '2006-12-15'),
	(30121050158, N'Lê Hoàng Lĩnh Giang', N'Huế', 98000, 'F', '1957-07-16', 2, 30121050142, '2006-11-20'),
	(30121050180, N'Trần Ngọc Như Hằng', N'TP Hồ Chí Minh', 59000, 'F', '1970-05-29', 5, 30121050184, '2007-01-15'),
	(30121050184, N'Nguyễn Thị Minh Hưng', N'Thanh Hóa', 92000, 'F', '1976-12-23', 5, NULL, '2007-03-18'),
	(30121050254, N'Bùi Thị Thu Hương', N'TP Hà Nội', 117000, 'F', '1970-01-06', 3, NULL, '2008-06-24'),
	(30121050265, N'Phạm Thị Ngọc Hảo', N'Gia Lai', 35000, 'F', '1975-02-04', 3, 30121050254, '2008-08-10'),
	(30121050294, N'Trịnh Hạnh', N'TP Đà Nẵng', 94000, 'F', '1977-02-12', 4, 30121050295, '2005-05-05'),
	(30121050295, N'Huỳnh Thị Như Hồng', N'Cần Thơ', 110000, 'F', '1970-08-14', 4, NULL, '2008-12-17'),
	(30121050322, N'Đỗ Thị Thúy Hùng', N'Sông Bé', 76000, 'M', '1963-01-22', 3, 30121050254, '2002-11-11'),
	(30121050336, N'Trương Thanh Hiền', N'TP Hải Phòng', 102000, 'F', '1963-05-16', 4, 30121050295, '2003-04-27'),
	(30121050341, N'Nguyễn Đặng Hiếu', N'TP Hồ Chí Minh', 46000, 'F', '1970-08-30', 4, 30121050295, '2008-08-09'),
	(30121050418, N'Vũ Phạm Minh Hương', N'TP Hà Nội', 30000, 'F', '1971-08-17', 5, 30121050184, '2009-07-25'),
	(30121050982, N'Hồ Việt Hoa', N'Đồng Nai', 95000, 'M', '1970-02-03', 3, 30121050254, '2005-11-24');
	
--use FUH_CompanyCode

INSERT INTO tblProject(proName, locNum, depNum)
Values
	('ProjectA', 1, 3),
	('ProjectB', 1, 2),
	('ProjectC', 3, 2),
	('ProjectD', 2, 1),
	('ProjectE', 5, 4);


INSERT INTO tblWorksOn (empSSN, proNum, workHours)
VALUES
	(30121050027, 1, 7),
	(30121050027, 2, 5),
	(30121050027, 4, 18),
	(30121050035, 4, 15),
	(30121050037, 1, 10),
	(30121050037, 2, 10),
	(30121050037, 4, 15),
	(30121050037, 5, 5),
	(30121050038, 2, 33),
	(30121050038, 3, 12),
	(30121050049, 2, 24),
	(30121050049, 3, 6),
	(30121050060, 2, 21),
	(30121050060, 3, 27),
	(30121050142, 2, 9),
	(30121050142, 3, 12),
	(30121050158, 2, 21),
	(30121050158, 3, 12),
	(30121050254, 1, 24),
	(30121050265, 1, 40),
	(30121050294, 3, 5),
	(30121050294, 5, 15),
	(30121050295, 5, 15),
	(30121050322, 1, 30);


INSERT INTO tblDependent (depName, empSSN, depSex, depBirthdate, depRelationship)
VALUES
	(N'Bùi Phương Ngọc', 30121050180, 'M', '1967-03-30', N'Chồng'),
	(N'Đoàn Minh Đạo', 30121050038, 'M', '1962-10-04', N'Chồng'),
	(N'Hà Mỹ Duyên', 30121050037, 'F', '1980-06-15', N'Vợ'),
	(N'Hồ Đức Trung Hữu', 30121050158, 'M', '1960-04-16', N'Chồng'),
	(N'Huỳnh Thị Ngọc Điệp', 30121050049, 'F', '1970-06-13', N'Vợ'),
	(N'Nguyễn Thạc Hải', 30121050254, 'M', '1970-09-17', N'Chồng'),
	(N'Nguyễn Thị Minh Hà', 30121050184, 'F', '1980-03-06', N'Em'),
	(N'Nguyễn Thị Minh Hằng', 30121050060, 'F', '1965-01-04', N'Vợ'),
	(N'Nguyễn Thị Thu Hằng', 30121050142, 'F', '1969-03-30', N'Vợ'),
	(N'Nguyễn Thị Thùy Dung', 30121050027, 'F', '1953-10-01', N'Mẹ'),
	(N'Phạm Nguyên Dũng', 30121050015, 'M', '1965-04-16', N'Chồng'),
	(N'Phan Thành Đăng', 30121050035, 'M', '1970-02-24', N'Chồng'),
	(N'Vương Thị Kim Cúc', 30121050004, 'F', '1978-03-20', N'Em');


--Lệnh sửa dữ liệu
/*
update tblDepartment
set depName = N'Phòng Nghiên cứu và phát triển'
where depNum = 5;
SELECT * FROM tblDepartment;
*/
-- xem du lieu
use FUH_CompanyCode
SELECT * FROM tblDepartment;
SELECT * FROM tblDepLocation;
SELECT * FROM tblDependent;
SELECT * FROM tblProject;
SELECT * FROM tblWorksOn;
SELECT * FROM tblEmployee;
SELECT * FROM tblDepLocation;
SELECT * FROM tblLocation;
