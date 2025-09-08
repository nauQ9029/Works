use QLHV

--SELECT * FROM Lop
--SELECT * FROM HOCVIEN
--SELECT * FROM KETQUATHI

--1. In ra danh sách (mã học viên, họ tên, ngày sinh, mã lớp) lớp trưởng của các lớp.

SELECT H.MAHV, H.HO, H.TEN, H.NGSINH, H.MALOP
FROM HOCVIEN H, Lop L
WHERE L.TRGLOP = H.MAHV 

--2. In ra bảng điểm khi thi (mã học viên, họ tên , lần thi, điểm số) môn CTRR của lớp “K12”, sắp xếp theo tên, họ học viên.

SELECT k.MAHV, h.HO, h.TEN, k.LANTHI, k.DIEM
FROM HOCVIEN h, KETQUATHI k
where H.MALOP = 'K12' and k.MAMH = 'CTRR' and h.MAHV = k.MAHV

--3. In ra danh sách những học viên (mã học viên, họ tên) và những môn học mà học viên đó thi lần thứ nhất đã đạt.

SELECT k.MAHV, h.HO, h.TEN, k.MAMH
FROM HOCVIEN h, KETQUATHI k
WHERE k.LANTHI = 1 and k.KQUA = 'Dat' and h.MAHV = k.MAHV

--4. In ra danh sách học viên (mã học viên, họ tên) của lớp “K11” thi môn CTRR không đạt (ở lần thi 1).

SELECT k.MAHV, h.HO, h.TEN, k.MAMH, k.LANTHI, k.KQUA
FROM KETQUATHI k, HOCVIEN h
WHERE k.LANTHI = 1 and k.KQUA = 'Khong Dat' and k.MAMH = 'CTRR' and h.MAHV = k.MAHV and h.MALOP = 'K11'

--5. Danh sách học viên (mã học viên, họ tên) của lớp “K” thi môn CTRR không đạt (ở tất cả các lần thi).
--Đề không đề cập rõ lớp nên mình sẽ làm trường hợp tất cả các lớp

SELECT k.MAHV, h.HO, h.TEN
FROM KETQUATHI k, HOCVIEN h
WHERE k.MAHV = h.MAHV and k.MAMH = 'CTRR'
EXPECT
SELECT k.MAHV, h.HO, h.TEN
FROM KETQUATHI k, HOCVIEN h
WHERE k.MAHV = h.MAHV and k.KQUA = 'Dat'

--Cách 2:

SELECT k.MAHV, h.HO, h.TEN
FROM KETQUATHI k
inner join HOCVIEN h
ON k.MAHV = h.MAHV
WHERE k.MAMH = 'CTRR' and k.KQUA = 'Khong Dat'
GROUP BY k.MAHV, h.HO, h.TEN
HAVING COUNT(CASE WHEN k.KQUA = 'Khong Dat' THEN 1 END) = 3;

--6. Tìm tên những môn học mà giáo viên có tên “Tran Tam Thanh” dạy trong học kỳ 1 năm 2006.

--SELECT * FROM GIANGDAY
--SELECT * FROM GIAOVIEN
--SELECT * FROM MONHOC

SELECT m.TENMH
FROM GIANGDAY gd inner join GIAOVIEN gv ON gd.MAGV = gv.MAGV
	inner join MONHOC m ON gd.MAMH = m.MAMH
WHERE gd.HOCKY = 1 and gd.NAM = 2006 and gv.HOTEN = 'Tran Tam Thanh'
GROUP BY m.TENMH, gv.HOTEN		--thêm dk ten gv để group để loại bỏ th nhiều người dạy cùng 1 môn bị nhóm chung

--7. Tìm những môn học (mã môn học, tên môn học) mà giáo viên chủ nhiệm lớp “K11” dạy trong học kỳ 1 năm 2006.

SELECT gd.MAGV, m.MAMH, m.TENMH, l.MALOP
FROM LOP l inner join GIANGDAY gd ON l.MAGVCN = gd.MAGV inner join MONHOC m ON gd.MAMH = m.MAMH
WHERE l.MALOP = 'K11' and gd.HOCKY = 1  and gd.NAM = 2006

--8. Tìm họ tên lớp trưởng của các lớp mà giáo viên có tên “Nguyen To Lan” dạy môn “Co So Du Lieu”.

SELECT L.TRGLOP, L.MALOP, h.HO, h.TEN
FROM GIANGDAY gd inner join GIAOVIEN gv ON gd.MAGV = gv.MAGV 
	inner join MONHOC m ON m.MAMH = gd.MAMH 
	inner join LOP l ON gd.MALOP = l.MALOP
	inner join HOCVIEN h ON h.MAHV = l.TRGLOP
WHERE gv.HOTEN = 'Nguyen To Lan' and  m.TENMH = 'Co So Du Lieu'

--9. In ra danh sách những môn học (mã môn học, tên môn học) phải học liền trước môn “Co So Du Lieu”.

--SELECT * FROM MONHOC
--SELECT * FROM DIEUKIEN

SELECT dk1.MAMH_TRUOC, mb.TENMH
FROM DIEUKIEN dk1 inner join MONHOC mb ON dk1.MAMH_TRUOC = mb.MAMH		--tên của môn trc
	inner join MONHOC ma ON dk1.MAMH = ma.MAMH							--tên của môn sau
WHERE ma.TENMH = 'Co So Du Lieu'

--10. Môn “Cau Truc Roi Rac” là môn bắt buộc phải học liền trước những môn học (mã môn học, tên môn học) nào.
SELECT dk1.MAMH, ma.TENMH
FROM DIEUKIEN dk1 inner join MONHOC mb ON dk1.MAMH_TRUOC = mb.MAMH		--tên của môn trc
	inner join MONHOC ma ON dk1.MAMH = ma.MAMH							--tên của môn sau
WHERE mb.TENMH = 'Cau Truc Roi Rac'

--SELECT * FROM DIEUKIEN

--11. Tìm họ tên giáo viên dạy môn CTRR cho cả hai lớp “K11” và “K12” trong cùng học kỳ 1 năm 2006.
SELECT gv.HOTEN
FROM GIANGDAY gd inner join LOP l ON gd.MALOP = l.MALOP
	inner join GIAOVIEN gv ON gd.MAGV = gv.MAGV
WHERE (l.MALOP = 'K11' or l.MALOP = 'K12') and gd.MAMH = 'CTRR'

--12. Tìm những học viên (mã học viên, họ tên) thi không đạt môn CSDL ở lần thi thứ 1 nhưng chưa thi lại môn này.
--SELECT * FROM KETQUATHI

SELECT k.MAHV, h.HO, h.TEN
FROM HOCVIEN h inner join KETQUATHI k ON k.MAHV = h.MAHV
WHERE k.MAMH = 'CSDL'
GROUP BY k.MAHV, h.HO, h.TEN
HAVING COUNT(CASE WHEN k.KQUA = 'Khong Dat' THEN 1 END) < 2		--loại bỏ th thi lại nhiều lần ko đạt
		and COUNT(CASE WHEN k.KQUA = 'Dat' THEN 1 END) <> 1;	--loại bỏ th đã đạt

--13. Tìm giáo viên (mã giáo viên, họ tên) không được phân công giảng dạy bất kỳ môn học nào.

SELECT gv.MAGV, gv.HOTEN
FROM GIAOVIEN gv left join GIANGDAY gd ON gd.MAGV = gv.MAGV
WHERE gd.MAMH is null;

--14. Tìm giáo viên (mã giáo viên, họ tên) không được phân công giảng dạy bất kỳ môn học nào thuộc khoa giáo viên đó phụ trách.
--SELECT * FROM KHOA
--SELECT * FROM MONHOC
--sSELECT * FROM GIANGDAY
--SELECT * FROM GIAOVIEN

SELECT gv.MAGV, gv.HOTEN
FROM (GIAOVIEN gv left join GIANGDAY gd ON gd.MAGV = gv.MAGV)
	left join MONHOC m ON m.MAMH = gd.MAMH
GROUP BY gv.MAGV, gv.HOTEN
HAVING Count(CASE WHEN gv.MAKHOA = m.MAKHOA THEN 1 END) = 0;   --lọc bỏ gv có dạy môn đúng khoa phụ trách

--15. Tìm họ tên các học viên thuộc lớp “K11” thi một môn bất kỳ quá 3 lần vẫn “Khong dat” hoặc thi lần thứ 2 môn CTRR được 5 điểm.

SELECT h.HO, h.TEN
FROM HOCVIEN h inner join KETQUATHI k ON k.MAHV = h.MAHV
WHERE (k.LANTHI = 3 and k.KQUA = 'Khong Dat')
		or (k.LANTHI = 2 and k.MAMH = 'CTRR' and k.DIEM = 5)
GROUP BY h.HO, h.TEN		--gộp lại những tên bị lặp

--16. Tìm họ tên giáo viên dạy môn CTRR cho ít nhất hai lớp trong cùng một học kỳ của một năm học.

SELECT gv.HOTEN
FROM GIANGDAY gd inner join GIAOVIEN gv on gv.MAGV = gd.MAGV
WHERE gd.MAMH = 'CTRR'
GROUP BY gd.HOCKY, gd.NAM, gv.HOTEN		--nhóm từng kì theo từng năm của mỗi gv
HAVING Count(gd.MAGV) > 1

--**17. Danh sách học viên và điểm thi môn CSDL (chỉ lấy điểm của lần thi sau cùng).

SELECT 
  HV.HO, hv.TEN,
  HV.MaHV,
  KQ.DIEM,
  kq.LANTHI
FROM HocVien HV
inner join KetQuaThi KQ ON HV.MaHV = KQ.MaHV
inner join (
  SELECT MaHV, MAX(LanThi) AS LanThiMax, MAMH
  FROM KetQuaThi
  GROUP BY MaHV, MAMH
) AS ThiCuoiCung ON KQ.MaHV = ThiCuoiCung.MaHV AND KQ.LanThi = ThiCuoiCung.LanThiMax and ThiCuoiCung.MAMH = kq.MAMH
WHERE KQ.MAMH = 'CSDL';

--18. Danh sách học viên và điểm thi môn “Co So Du Lieu” (chỉ lấy điểm cao nhất của các lần thi).

SELECT HV.HO, hv.TEN, HV.MaHV, KQ.DIEM, kq.LANTHI
FROM HocVien HV inner join KetQuaThi KQ ON HV.MaHV = KQ.MaHV
inner join (
  SELECT MaHV, MAX(DIEM) AS DiemMax, MAMH
  FROM KetQuaThi
  GROUP BY MaHV, MAMH
) AS ThiCuoiCung ON KQ.MaHV = ThiCuoiCung.MaHV and KQ.DIEM = ThiCuoiCung.DiemMax and ThiCuoiCung.MAMH = kq.MAMH
inner join MONHOC m on kq.MAMH = m.MAMH
WHERE m.TENMH = 'Co So Du Lieu';

--19. Khoa nào (mã khoa, tên khoa) được thành lập sớm nhất.
--SELECT * FROM KHOA
--sSELECT * FROM GIANGDAY

SELECT k.TENKHOA
FROM KHOA k
WHERE NGTLAP = (
  SELECT MIN(NGTLAP)
  FROM KHOA
)

--20. Có bao nhiêu giáo viên có học hàm là “GS” hoặc “PGS”.
--SELECT * FROM Giaovien

SELECT count(gv.MAGV) AS 'So luong GS va PGS'
FROM GIAOVIEN gv
WHERE gv.HOCHAM = 'GS' or gv.HOCHAM = 'PGS'

--21. Thống kê có bao nhiêu giáo viên có học vị là “CN”, “KS”, “Ths”, “TS”, “PTS” trong mỗi khoa.
--SELECT * FROM Khoa

SELECT
    MAKHOA,
    COUNT(CASE WHEN HocVi = 'CN' THEN 1 END) AS SoLuongCN,
    COUNT(CASE WHEN HocVi = 'KS' THEN 1 END) AS SoLuongKS,
    COUNT(CASE WHEN HocVi = 'ThS' THEN 1 END) AS SoLuongThS,
    COUNT(CASE WHEN HocVi = 'TS' THEN 1 END) AS SoLuongTS,
    COUNT(CASE WHEN HocVi = 'PTS' THEN 1 END) AS SoLuongPTS
FROM
    GiaoVien
GROUP BY
    MAKHOA

--22. Mỗi môn học thống kê số lượng học viên theo kết quả (đạt và không đạt).
--select * from ketquathi

SELECT
	kq.MAMH,
	count(CASE WHEN kq.KQUA = 'Dat' THEN 1 END) AS SoLuongHVDat
	--lấy số hs thi trừ đạt là ra ko đạt

FROM KETQUATHI kq
GROUP BY
    kq.MAMH
