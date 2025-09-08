--2. Hãy viết lệnh SQL để liệt kê danh sách các hóa đơn có tổng  thành tiền từ 5 triệu đồng trở lên, biết thành tiền = số lượng * đơn giá. Yêu cầu hiển thị các thông tin: SoHD, NgayHD, Họ tên KH, Tổng thành tiền.
SELECT HD.SoHD, HD.NgayHD, CONCAT(KH.HoKH, ' ', KH.TenKH) AS HoTenKH, 
    SUM(CTHD.SoLuong * CTHD.DonGia) AS TongThanhTien
FROM HOADON HD
JOIN KHACHHANG KH ON HD.MaKH = KH.MaKH
JOIN CHITIETHOADON CTHD ON HD.SoHD = CTHD.SoHD
GROUP BY HD.SoHD, HD.NgayHD, KH.HoKH, KH.TenKH
HAVING SUM(CTHD.SoLuong * CTHD.DonGia) >= 5000000

--3. Hãy tạo View có tên BangTongHop để lập bảng tính tiền theo yêu cầu dưới đây. View gồm có các trường sau: SoHD, MaHang, SoLuong, DonGia, ThanhTien, Thue, Thực Trả,  Trong đó:
		--Thành tiền = số lượng * đơn giá
		--Thuế được tính như sau:
			--Nếu mặt hàng là thuốc lá tính thuế 30% thành tiền
			--Các mặt hàng còn lại nếu số lượng > 20 tính thuế 10% thành tiền.
			--Nếu số lượng >10 và <20 tính thuế 5% thành tiền.
			--Còn lại được miễn thuế
		--Thực trả = thành tiền + Thuế
CREATE VIEW BangTongHop AS
SELECT 
    CTHD.SoHD,
    CTHD.MaHang,
    CTHD.SoLuong,
    CTHD.DonGia,
    CTHD.SoLuong * CTHD.DonGia AS ThanhTien,
    CASE 
        WHEN HANG.DVT = 'Gói' AND CTHD.SoLuong > 0 THEN 0.3 * CTHD.SoLuong * CTHD.DonGia -- Thuốc lá: 30% thuế
        WHEN CTHD.SoLuong > 20 THEN 0.1 * CTHD.SoLuong * CTHD.DonGia -- Số lượng > 20: 10% thuế
        WHEN CTHD.SoLuong > 10 THEN 0.05 * CTHD.SoLuong * CTHD.DonGia -- 10 < Số lượng <= 20: 5% thuế
        ELSE 0
    END AS Thue,
    CTHD.SoLuong * CTHD.DonGia + 
    CASE 
        WHEN HANG.DVT = 'Gói' AND CTHD.SoLuong > 0 THEN 0.3 * CTHD.SoLuong * CTHD.DonGia -- Thuốc lá: 30% thuế
        WHEN CTHD.SoLuong > 20 THEN 0.1 * CTHD.SoLuong * CTHD.DonGia -- Số lượng > 20: 10% thuế
        WHEN CTHD.SoLuong > 10 THEN 0.05 * CTHD.SoLuong * CTHD.DonGia -- 10 < Số lượng <= 20: 5% thuế
        ELSE 0
    END AS ThucTra
FROM CHITIETHOADON CTHD
JOIN HANGHOA HANG ON CTHD.MaHang = HANG.MaHang

SELECT * FROM BangTongHop

-- 4. Hãy viết lệnh SQL liệt kê ra khách hàng mua có  số lượng lớn nhất của mỗi  mặt hàng gồm các cột sau: Mã khách hàng, họ tên khách hàng và số lượng.
SELECT 
    CTHD.MaHang,
    KH.MaKH,
    CONCAT(KH.HoKH, ' ', KH.TenKH) AS HoTenKH,
    MAX(CTHD.SoLuong) AS SoLuong
FROM CHITIETHOADON CTHD, KHACHHANG KH ,HOADON HD
where CTHD.SoHD = HD.SoHD and HD.MaKH = KH.MaKH
GROUP BY CTHD.MaHang, KH.MaKH, KH.HoKH, KH.TenKH

--5. Hiển thị danh sách khách hàng mua hàng vào vào tháng 9 năm 2013 và có tổng số tiền của hóa đơn lớn hơn hoặc bằng 500000.
SELECT 
    KH.MaKH,
    CONCAT(KH.HoKH, ' ', KH.TenKH) AS HoTenKH,
    SUM(CTHD.SoLuong * CTHD.DonGia) AS TongSoTien
FROM KHACHHANG KH
JOIN HOADON HD ON KH.MaKH = HD.MaKH
JOIN CHITIETHOADON CTHD ON HD.SoHD = CTHD.SoHD
WHERE MONTH(HD.NgayHD) = 9 AND YEAR(HD.NgayHD) = 2013
GROUP BY KH.MaKH, KH.HoKH, KH.TenKH
HAVING SUM(CTHD.SoLuong * CTHD.DonGia) >= 500000

--6. Hiển thị danh sách các mặt hàng bán được nhiều nhất từ ngày 01/09/2013 đến 31/10/2013
WITH RankedProducts AS (
    SELECT 
        HD.NgayHD,
        CTHD.MaHang,
        HANG.TenHang,
        SUM(CTHD.SoLuong) AS SoLuongBan,
        ROW_NUMBER() OVER (PARTITION BY HD.NgayHD ORDER BY SUM(CTHD.SoLuong) DESC) AS RowNum
    FROM CHITIETHOADON CTHD
    JOIN HOADON HD ON CTHD.SoHD = HD.SoHD
    JOIN HANGHOA HANG ON CTHD.MaHang = HANG.MaHang
    WHERE HD.NgayHD BETWEEN '2013-09-01' AND '2013-10-31'
    GROUP BY HD.NgayHD, CTHD.MaHang, HANG.TenHang
)
SELECT NgayHD, MaHang, TenHang, SoLuongBan
FROM RankedProducts
WHERE RowNum = 1

--7. **Hãy viết lệnh SQL thực hiện các thao tác sau:
		--Thêm một bản ghi mới vào bảng CHITIETHOADON; dữ liệu phù hợp nhưng không được nhập giá trị null.
		--Thay đổi đơn giá của các mặt hàng là thuốc lá tăng lên 10%.
		--Xóa các khách hàng chưa mua bất kì mặt hàng nào.
INSERT INTO CHITIETHOADON (SoHD, MaHang, SoLuong, DonGia) VALUES ('004', 'B001', 10, 50000)

UPDATE CHITIETHOADON SET DonGia = DonGia * 1.1 WHERE MaHang LIKE 'TL%'

DELETE FROM KHACHHANG WHERE MaKH NOT IN (SELECT DISTINCT MaKH FROM CHITIETHOADON)