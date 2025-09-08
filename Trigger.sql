use FUH_CompanyCode
-- Viết trigger tạo rằng buộc tuổi của nhân viên phải 18 <= tuổi <= 60, nếu người dùng nhập sai thì rollback tác vụ và thông báo lỗi

create trigger trg_tuoinv on tblEmployee
after insert, update
as
begin
	declare @tuoinv int
	select @tuoinv = year(getdate()) - year(empBirthdate)
	from inserted					-- lấy tuổi của NV vừa nhập vào
	if @tuoinv < 18 or @tuoinv > 60
	begin
		raiserror (N'Tuổi không hợp lệ (18 <= age <= 60', 10, 1);
		rollback transaction
	end
end

insert into tblEmployee(empSSN, empName, empBirthdate)
values('555555555', N'Lê Hoàng Trung Kiên','1900-01-15')	-- Tuổi không hợp lệ (18 <= age <= 60
															-- Msg 3609, Level 16, State 1, Line 18
															-- The transaction ended in the trigger. The batch has been aborted.

delete from tblEmployee
where empSSN = '555555555'
	

select * from tblEmployee

-- Viết trigger rằng buộc số lượng nhân viên của mỗi phòng ban không được lớn hơn 7 nhân viên
create trigger trg_SLVNP on tblEmployee
after insert
as
begin
	declare @depnum char(3)
	declare @sonv int
	select @depnum = depnum
	from inserted
	select @sonv = count(empSSN)
	from tblEmployee where depnum = @depnum
	if @sonv > 8
	begin
		raiserror(N'Số lượng nhân viên của mỗi phòng ban không lớn hơn 8', 10, 1)
		rollback transaction
	end
end

insert into tblEmployee(empSSN, empName, depNum)
values
	('123', N'Lê Hoàng Trung Kiên','1'),
	('321', N'Phạm Lê Hoàng Nam', '1'),
	('222', N'Phạm Lê Minh Quân', '1'),
	('333', N'Huỳnh Đình Thiên', '1');
--Số lượng nhân viên của mỗi phòng ban không lớn hơn 10
--Msg 3609, Level 16, State 1, Line 47
--The transaction ended in the trigger. The batch has been aborted.
	

select depNum, count(empSSN) as sonv
from tblEmployee
group by depnum

select * from tblEmployee