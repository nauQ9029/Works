use QLHV
-- 1. Function
-- a. Viết hàm thực hiện đưa vào năm sinh trả về tuổi ứng với năm sinh đó.

create function fn_tuoi1(@namsinh int)
returns int
as
begin
	return year(getdate()) - @namsinh
end

print dbo.fn_tuoi1(1996)

-- Hiển thị DSSV lớp K11 gồm mã SV, họ tên, tuổi

select mahv, ho, ten, dbo.fn_tuoi1(year(ngsinh)) as 'Tuổi'
from HVIEN
where malop = 'k11'

-- b. Viết hàm thực hiện đưa vào một mã lớp trả về số sinh viên của lớp đó.

create function fn.SoSV1(@malop char(3))
returns int
as
begin
	declare @sosv int		-- khai báo biến
	select count(mahv)		-- gán giá trị cho biến
	from HOCVIEN 
	where malop = @malop
	return @sosv			-- kết quả trả về của hàm
end
print dbo.fn_sosv1('k11')

-- Hiển thị tổng số sinh viên của từng lớp
select l.malop, tenlop, dbo.fn_sosv1(malop) as SoSV
from lop inner join HOCVIEN h on l.MALOP = h.MALOP
group by l.malop, tenlop

-- c. Với 1 mã sinh viên và 1 mã khoa, hãy kiểm tra sinh viên có thuộc khoa này không? (Trả về đúng hoặc sai).

create function fn_ktra((@mahv char(5), @makhoa varchar(4))
returns nvarchar(10)
as
begin
	declare @khoasv varchar(4)
	declare @kq nvarchar(10)
	select @khoasv = k.makhoa
	from khoa k inner join lop l on k.MAKHOA = l.MAKHOA
	inner join hocvien h on h.malop = l.MALOP
	where mahv = @mahv
	if @khoasv = @makhoa
		set @kq = N'Đúng'
	else
		set @kq = N'Sai'
	return @kq
end

print dbo.fn_ktra1('k1101', 'KHMT')

-- d. Tính điểm thi sau cùng của 1 sinh viên trong 1 môn học cụ thể.
create function fn_diem1(@mahv char(5), @mamh varchar(10))
returns numeric(4,2)
as
begin
    declare @diem numeric(4,2)
    select @diem = kq.diem
    from KETQUATHI kq
    where mahv = @mahv and mamh = @mamh and lanthi = (select max(lanthi) 
            from KETQUATHI k1 where k1.mahv = kq.mahv and k1.MAMH = kq.MAMH)
    return @diem
end

print dbo.fn_diem1('K1101', 'CTRR')

-- e. Tính điểm trung bình của 1 sinh viên (chú ý: điểm trung bình được tính dựa trên lần thi sau cùng, sử dụng câu 1d đã viết.

create function fn_diemTB1(@mahv char(5))
returns numeric(4,2)
as
begin
	declare @diemTB numeric(4,2)
	select @diemTB = avg(dbo.fn_diem1(@mahv,mamh))
	from KETQUATHI k2
	where mahv = @mahv and lanthi >= all(select lanthi from KETQUATHI k1
									where k1.mamh = k2.mamh and k1.mahv = k2.mahv)
	return @diemTB
end

print dbo.fn_diemTB1('K1101')
select mahv, dbo.fn_diemtb1(Mahv)
from KETQUATHI
group by mahv

-- f. Nhập vào 1 sinh viên và 1 môn học, trả về các điểm thi của sinh viên này trong các lần thi của môn học đó.
create function dbo.sinhVienDiemMH (@MaHV char(5),@MaMH varchar(10))
returns table
as
return (	select LANTHI, DIEM
			from KETQUATHI
			where MAHV = @MaHV and MAMH = @MaMH )

select * from dbo.sinhVienDiemMH('K1102', 'CSDL')

-- g. Nhập vào 1 sinh viên, trả về danh sách các môn học mà sinh viên này phải học.
create  function dbo.sinhVienMH (@MaHV char(5))
returns table
as
return (	select MONHOC.MAMH, MONHOC.TENMH
			from MONHOC
			inner join GIANGDAY on MONHOC.MAMH = GIANGDAY.MAMH
			inner  join LOP on GIANGDAY.MALOP = LOP.MALOP
			inner join HOCVIEN  on LOP.MALOP = HOCVIEN.MALOP
			where HOCVIEN.MAHV = @MaHV )

select * from dbo.sinhVienMH('K1101')

-- ---------------------------------------------------------------------------------------------------------------------------------------------------

-- 2. Stored Procedure
-- a. In ra danh sách các sinh viên của 1 lớp học
create procedure sp_InListSinhVien(@MaLop char(3))
as
begin
	select * from HOCVIEN
	where MALOP = @MaLop;
end

execute sp_InListSinhVien'K11';

-- b. Nhập vào 2 sinh viên, 1 môn học, tìm xem sinh viên nào có điểm thi môn học đó lần đầu tiên cao hơn.
create  procedure sp_SoSanhDiem2SinhVien(@MaHV1  char(5), @MaHV2 char(5), @MaMH varchar(40))
as
begin
	declare @SVDiemCaoHon nvarchar(50);

	declare @Diem1 int, @Diem2 int;

	select top 1 @Diem1 = DIEM
	from KETQUATHI
	where MAHV = @MaHV1 and MAMH = @MaMH
	order by NGTHI;

	select top 1 @Diem2 = DIEM
	from KETQUATHI
	where MAHV = @MaHV2 and MAMH = @MaMH
	order by NGTHI;

	-- So sanh
	if @Diem1 <  @Diem2
		set @SVDiemCaoHon = @MaHV2;
	else if @Diem1 > @Diem2
		set @SVDiemCaoHon = @MaHV1;

	-- In ra thong bao SV nao diem cao hon
	if @SVDiemCaoHon is null
		print 'Hai sinh vien co diem thi mon hoc bang nhau o lan thi dau tien.';
	else
		print 'Sinh vien ' + @SVDiemCaoHon + ' co diem thi mon hoc cao hon o lan thi dau tien.';
end

drop proc sp_SoSanhDiem2SinhVien

execute sp_SoSanhDiem2SinhVien @MaHV1 = 'K1101', @MaHV2 = 'K1102', @MaMH = 'CTDLGT';
-- MONHOC CTDLGT
-- K1101 9.00 LANTHI1		K1102 4.50 LANTHI1

-- -> Sinh vien K1101 co diem thi mon hoc cao hon o lan thi dau tien.

--c. Nhập vào 1 môn học và 1 mã sinh viên. Kiểm tra xem sinh viên này có đậu môn này trong lần thi đầu tiên không?
--Nếu đậu thì xuất ra là “Đậu”, không thì xuất ra “Không đậu”
create procedure sp_KiemTraPassMon1stTry(@MaHV char(5),  @MaMH varchar(10))
as
begin
	declare @TinhTrang varchar(10);
	select  @TinhTrang = case
				when exists (select 1 from KETQUATHI
							 where MAHV = @MaHV and MAMH = @MaMH  and LANTHI = 1 and DIEM >= 5) then 'Passed'
							 else 'Unpassed'
						end;
	select @TinhTrang as KQUA;
end

exec sp_KiemTraPassMon1stTry @MaHV = 'K1101', @MaMH = 'CTDLGT';

-- d. Nhập vào 1 khoa, in danh sách các sinh viên (MaSV, họ tên, ngày sinh) thuộc khoa này.
create procedure sp_InListSVKhoa (@MaKhoa varchar(4))
as
begin
	select HV.MAHV, HV.HO + ' ' +  HV.TEN as HoTen, HV.NGSINH
	from HOCVIEN HV
	join LOP L on HV.MALOP = L.MALOP
	join KHOA  K  on L.TRGLOP = K.MAKHOA
	where K.MAKHOA  = @MaKhoa;
end

-- e. Nhập vào 1 sinh viên và 1 môn học, in điểm thi của sinh viên này của các lần thi môn học đó.
create procedure sp_InDiemThi1SV (@MaHV char(5), @MaMH varchar(10))
as
begin
	select LANTHI,  NGTHI, DIEM
	from KETQUATHI
	where MAHV = @MaHV
	and MAMH = @MaMH;
end;

exec sp_InDiemThi1SV @MaHV = 'K1101', @MaMH = 'CSDL';

-- f. Nhập vào 1 môn học, in danh sách các sinh viên đậu môn này trong lần thi đầu tiên.
create  procedure sp_ListSVPassedMon1stTry (@MaMH varchar(10))
as
begin
	select MAHV, DIEM
	from KETQUATHI
	where MAMH = @MaMH
	and LANTHI = 1 and DIEM >= 5;
end;

exec sp_ListSVPassedMon1stTry @MaMH = 'CSDL';

-- g. In điểm các môn học của sinh viên có mã SV được nhập vào. (Chú ý: điểm của các môn học là điểm thi của lần thi sau cung)
-- -Chỉ in môn đã có điểm
-- -Các môn chưa có điểm thì ghi điểm là Null
-- -Các môn chưa có điểm thi ghi điểm là “Chưa có điểm”.
create procedure sp_InDiemMaSV(@MaHV char(5))
as
begin
	select MAMH, case 
					when DIEM is null  then 'Chua co diem!'
					else cast(DIEM as varchar(10))
				end as DIEM
	from KETQUATHI
	where MAHV = @MaHV;
end;

execute sp_InDiemMaSV @MaHV = 'K1101';

-- h.Tạo thêm 1 table XepLoai(MaHV,DiemTB, KetQua, HocLuc) Đưa dữ liệu vào bảng xếp loại ( sử dung câu 1c đã viết ở trên)
--Qui định: Kết quả của SV là “Đạt” nếu Điểm TB (chỉ tính các môn đã có điểm) của SV đó >=5 và không quá 2 môn dưới 4 điểm, ngược lại thì kết quả là không đạt.
--Đối với những sinh viên có kết quả là “Đạt” thì học lực được xếp loại như sau:
-- -Điểm TB>= 8 thì học lực “Giỏi”
-- -7 <= Điểm TB <8 thì học lực “Khá”
-- -Còn lại là “Trung bình”
create table XepLoai (
    MaHV char(5) primary key,
    DiemTB decimal(4, 2),
    KetQua varchar(20),
    HocLuc varchar(20)
);

insert into XepLoai (MaHV, DiemTB, KetQua, HocLuc)
exec sp_DuaDuLieu;

create procedure sp_DuaDuLieu
as
begin
	insert into XepLoai(MaHV, DiemTB, KetQua, HocLuc)
	select MAHV, AVG(DIEM) as DiemTB,
		case
			when AVG(DIEM) >=  5 and count(case when DIEM < 4 then 1 end) = 0 then 'Dat'
			else 'Khong dat'
		end as KetQua,
		case
			when AVG(DIEM) >=  8  then 'Gioi'
			when AVG(DIEM) >= 7 then  'Kha'
			else  'Trung binh'
		end as HocLuc
	from KETQUATHI
	where DIEM is not null
	group by MAHV;
end;

-- i.Với các sinh viên có tham gia đầy đủ các môn học của khoa, hãy in ra điểm trung bình cho các sinh viên này. 
--(Chú ý điểm TB được tính dựa trên điểm thi lần sau cùng; sử dụng câu 1e đã viết ở trên).
create  procedure sp_DiemTBSVThamGiaDayDu(@MaKhoa  varchar(4))
as
begin
	select HV.MAHV, HV.HO +  ' ' + HV.TEN as HoTen, AVG(KQ.DIEM) as DIemTB
	from HOCVIEN HV
	join KETQUATHI KQ on  HV.MAHV = KQ.MAHV
	join LOP L on HV.MALOP = L.MALOP
	join KHOA K  on L.TRGLOP = K.MAKHOA
	where  K.MAKHOA =  @MaKhoa
	group by HV.MAHV, HV.HO, HV.TEN;
end;

exec sp_DiemTBSVThamGiaDayDu @MaKhoa = 'MTT';


-- ---------------------------------------------------------------------------------------------------------------------------------------------------------------------

-- 3.

-- a. Viết câu lệnh SQL để tạo Tạo bảng SOLUONGSV gồm 3 cột mã lớp, tên lớp, số sinh viên của từng lớp từ bảng SINHVIEN.
CREATE TABLE SOLUONGSV (
    MALOP CHAR(3),
    TENLOP VARCHAR(40),
    SOSV INT,
    CONSTRAINT PK_SOLUONGSV PRIMARY KEY (MALOP)
);

select * from SOLUONGSV

-- b. Viết Trigger để thực hiện yêu cầu: Sau khi chèn một sinh viên vào bảng SINHVIEN thì tiến hành cập nhật tự động lại số lượng sinh viên của lớp đó.
CREATE TRIGGER After_Insert_HOCVIEN
ON HOCVIEN
AFTER INSERT
AS
BEGIN
    UPDATE SOLUONGSV
    SET SOSV = (SELECT COUNT(*) FROM SINHVIEN WHERE SINHVIEN.MALOP = SOLUONGSV.MALOP)
    FROM SOLUONGSV
    INNER JOIN inserted ON SOLUONGSV.MALOP = inserted.MALOP;
END;

-- c. Viết Trigger để thực hiện yêu cầu: Sau khi chèn, cập nhật, xóa thông tin của một SINHVIEN trong bảng Sinh viên thì tiến hành 
--cập nhật tự động lại số lượng sinh viên của lớp đó.
CREATE TRIGGER After_Modify_Delete_SINHVIEN
ON HOCVIEN
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    UPDATE SOLUONGSV
    SET SOSV = (SELECT COUNT(*) FROM SINHVIEN WHERE SINHVIEN.MALOP = SOLUONGSV.MALOP)
    FROM SOLUONGSV
    INNER JOIN inserted ON SOLUONGSV.MALOP = inserted.MALOP
    INNER JOIN deleted ON SOLUONGSV.MALOP = deleted.MALOP;
END;

-- d. Viết Trigger tạo ràng buộc là số sinh viên của một lớp phải <4.
CREATE TRIGGER Check_SoSV_Lop
ON SOLUONGSV
AFTER INSERT, UPDATE
AS
BEGIN
    IF (SELECT COUNT(*) FROM inserted WHERE SOSV >= 4) > 0
    BEGIN
        RAISERROR ('So sinh vien cua mot lop phai nho hon 4', 16, 1)
        ROLLBACK TRANSACTION;
    END;
END;

-- e. Viết Trigger tạo ràng buộc cho bảng SINHVIEN là tuổi của SINHVIEN phải >=17 tuổi.
CREATE TRIGGER Check_Tuoi_Min
ON HOCVIEN
AFTER INSERT, UPDATE
AS
BEGIN
    IF (SELECT COUNT(*) FROM inserted WHERE DATEDIFF(year, NGSINH, GETDATE()) < 17) > 0
    BEGIN
        RAISERROR ('Tuoi cua sinh vien phai lon hon hoac bang 17', 16, 1)
        ROLLBACK TRANSACTION;
    END;
END;

-- f. Viết Trigger tạo ràng buộc cho bảng SINHVIEN là tuổi của SINHVIEN phải <=45 đối với nữ và <=50 đối với nam.
CREATE TRIGGER Check_Tuoi_Max
ON HOCVIEN
AFTER INSERT, UPDATE
AS
BEGIN
    IF (SELECT COUNT(*) FROM inserted WHERE (GIOITINH = 'Nu' AND DATEDIFF(year, NGSINH, GETDATE()) > 45) 
		OR (GIOITINH = 'Nam' AND DATEDIFF(year, NGSINH, GETDATE()) > 50)) > 0
    BEGIN
        RAISERROR ('Tuoi cua sinh vien phai nho hon 45 voi nu va 50 voi nam', 16, 1)
        ROLLBACK TRANSACTION;
    END;
END;

-- g. Tạo Trigger có tên là Nomodify không cho phép người dùng xóa hay sửa đổi các đối tượng View trong CSDL. Thực hiện Disable Trigger này.
CREATE TRIGGER Nomodify
ON DATABASE
FOR DROP_VIEW, ALTER_VIEW
AS
BEGIN
    PRINT 'Khong cho phep xoa hay sua doi View';
    ROLLBACK;
END;

-- Disable trigger
DISABLE TRIGGER Nomodify ON DATABASE;
