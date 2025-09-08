use QuanLyKhoHang

-- Kiểm tra tổng số lượng nhập không âm
--DONE
create trigger KiemTraNhapHang
on CTPhieuNhap
after insert, update
as
begin
	if exists (	select 1 
				from inserted
				where SLNhap < 0 )
	begin
		raiserror('Số lượng nhập không được âm.', 16, 1)
		rollback transaction
		return
	end
end

--Trường hợp SLNhap âm
insert into CTPhieuNhap (SoPN, MaVT, SLNhap, DGNhap)
values ('PN08', 'M001', -50, 300);
	-- Output:	
--Số lượng nhập không được âm.
--The transaction ended in the trigger. The batch has been aborted.

--Trường hợp hợp lệ
insert into CTPhieuNhap (SoPN, MaVT, SLNhap, DGNhap)
values ('PN08', 'M003', 200, 300);

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
--DONE
-- Kiểm tra tổng số lượng xuất không âm và không vượt quá số hàng tồn kho
CREATE TRIGGER Trig_KiemTraSLXuatVaTonKho
ON CTPhieuXuat
FOR INSERT
AS
BEGIN
    DECLARE @MaVT char(4), @SLXuat int, @SLTonKho int;

    SELECT @MaVT = MaVT, @SLXuat = SLXuat
    FROM inserted;

    IF @SLXuat < 0
    BEGIN
        RAISERROR('Số lượng xuất không thể là số âm.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END;

    SELECT @SLTonKho = dbo.SoLuongTonKho(@MaVT, GETDATE());

    IF @SLXuat > @SLTonKho
    BEGIN
        RAISERROR('Số lượng xuất vượt quá số lượng tồn kho.', 16, 1);
        ROLLBACK TRANSACTION;
        RETURN;
    END;
END;

--Function tính số lượng tồn kho của một vật tư vào một thời điểm cụ thể:
CREATE FUNCTION dbo.SoLuongTonKho(@MaVT char(4), @ThoiDiem datetime)
RETURNS INT
AS
BEGIN
    DECLARE @SLCuoi INT;
    
    SELECT @SLCuoi = ISNULL(SLCuoi, 0)
    FROM TonKho
    WHERE MaVT = @MaVT AND NamThang = (
        SELECT MAX(NamThang) 
        FROM TonKho 
        WHERE MaVT = @MaVT AND NamThang <= @ThoiDiem
    );

    RETURN @SLCuoi;
END;

--Trường hợp SLXuat âm:
insert into CTPhieuXuat (SoPX, MaVT, SLXuat, DGXuat)
values ('PX01', 'F002', -500, 1000);
	--Output: 
--Số lượng xuất không được âm.
--The transaction ended in the trigger. The batch has been aborted.

--Trường hợp SLXuat lớn hơn hàng tồn trong kho
insert into CTPhieuXuat (SoPX, MaVT, SLXuat, DGXuat)
values ('PX05', 'F002', 500, 1000);
	--Output:
--Số lượng tồn không đủ để xuất hàng.
--The transaction ended in the trigger. The batch has been aborted.

--Trường hợp hợp lệ
insert into CTPhieuXuat (SoPX, MaVT, SLXuat, DGXuat)
values ('PX05', 'F002', 10, 1000);

print dbo.SoLuongTonKho('M001', '2024-03-17')

--------------------------------------------------------------------------------------------------------------------------------------------------------------------------