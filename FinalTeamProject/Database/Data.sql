use QuanLyKhoHang;

insert into VatTu(MaVT, TenVT, DvTinh, PhanTram)
values
	('F001', N'Táo xanh', N'Kg', 10),
	('F002', N'Táo đỏ', N'Kg', 5),
	('F003', N'Bơ xanh', N'Kg', 8),
	('F004', N'Chuối vàng', N'Kg', 5),
	('F005', N'Rau cải', N'Bó', 3),
	('M001', N'Thịt gà', N'Thùng', 15),
	('M002', N'Thịt bò', N'Thùng', 5),
	('M003', N'Thịt heo', N'Kg', 10);
--select * from VatTu;

insert into NhaCungCap(MaNhaCC, TenNhaCC, DiaChi, DienThoai)
values
	('TDV', N'Thực phẩm Tích Đại Việt', N'82 Trần Tử Bình, Hòa Vang, Đà Nẵng', '0796637194'),
	('KFF', N'Phân phối Fruit Farm', N'356 Nguyễn Phúc Nguyên, Thanh Khê, Đà Nẵng', '0978738783'),
	('LMT', N'TNHH Lụa Mặt Trời', N'18 Trần Cựu, Cẩm Lệ, Đà Nẵng', '02366286707');
--select * from NhaCungCap;

INSERT INTO DonHang (SoDH, NgayDH, MaNhaCC)		--Đơn mình đặt hàng từ Nhà cung cấp
VALUES 
	('DH01', '2023-02-28', 'KFF'),
	('DH02', '2023-04-25', 'LMT'),
	('DH03', '2023-04-27', 'LMT'),
	('DH04', '2023-01-10', 'TDV'),
	('DH05', '2023-04-15', 'TDV');
--select * from DonHang

INSERT INTO CTDonHang (SoDH, MaVT, SLDat)
VALUES 
	('DH01', 'F001', 100),
	('DH01', 'F002', 200),
	('DH02', 'F003', 300),
	('DH02', 'F004', 400),
	('DH03', 'F005', 500),
	('DH03', 'F002', 150),
	('DH04', 'M001', 350),
	('DH04', 'M003', 250),
	('DH05', 'M002', 180),
	('DH05', 'M001', 400);
--select * from CTDonHang

INSERT INTO PhieuNhap (SoPN, NgayNhap, SoDH)
VALUES 
	('PN01', '2023-01-13', 'DH04'),		--gửi toàn bộ 350 m1 và 250 m3 xong DH04 <TDV>
	('PN02', '2023-03-01', 'DH01'),		--gửi toàn bộ 100 f1 và 200 f2 Xong DH01 <KFF>
	('PN03', '2023-04-28', 'DH02'),		--gửt 200 f3 và 200 f2 (còn 100f3 và 200f2) <LMT>
	('PN04', '2023-04-29', 'DH03'),		--gửt 250 f5 và 150 f2 (còn 250f5 và (200f2 + 100f3 từ DH02))<LMT>
	('PN05', '2023-04-29', 'DH05'),		--gửt 180 m2 và 200 m1 (còn 200m1) <TDV>
	('PN06', '2023-05-01', 'DH02'),		--gửi 200f2 và 100f3 xong DH02 <LMT>
	('PN07', '2023-05-10', 'DH05'),		--gửi 200m1 xong DH05 <TDV>
	('PN08', '2023-05-15', 'DH03');		--gửi 250 f5 xong DH03 <TDV>
--select * from PhieuNhap

INSERT INTO CTPhieuNhap (SoPN, MaVT, SLNhap, DGNhap)
VALUES
	('PN01', 'M001', 350, 300),		--Thit ga (thung) 300k
	('PN01', 'M003', 250, 200),		--Thit heo (kg) 200k
	('PN02', 'F001', 100, 40),		--Tao xanh (kg) 40k
	('PN02', 'F002', 200, 50),		--Tao do (kg) 50k
	('PN03', 'F003', 200, 70),		--Bơ xanh (kg) 70k
	('PN03', 'F002', 200, 50),		--Tao do (kg) 50k
	('PN04', 'F005', 250, 10),		--Rau cải (bó) 10k
	('PN04', 'F002', 150, 50),		--Tao do (kg) 50k
	
	('PN05', 'M001', 200, 300),		--Thit ga (thung) 300k
	('PN05', 'M002', 180, 400),		--Thit bo (thung) 400k
	('PN06', 'F002', 200, 50),		--Tao do (kg) 50k
	('PN06', 'F003', 100, 70),		--Bơ xanh (kg) 70k
	('PN07', 'M001', 200, 300),		--Thit ga (thung) 300k
	('PN08', 'F005', 250, 10);		--Rau cải (bó) 10k
--select * from CTPhieuNhap

INSERT INTO PhieuXuat (SoPX, NgayXuat, TenKH)
VALUES 
	('PX01', '2023-01-13', N'Khách hàng A'),		--mua 300m1 và 200m3
	('PX02', '2023-04-29', N'Khách hàng B'),		--mua 200m1 và 40m3 
	('PX03', '2023-04-29', N'Khách hàng C'),		--mua 400f2 và 200f5
	('PX04', '2023-05-10', N'Khách hàng D'),		--mua 250m1 và 55f1
	('PX05', '2023-05-13', N'Khách hàng A');		--mua 250f3 và 150m2
--select * from PhieuXuat
	
INSERT INTO CTPhieuXuat (SoPX, MaVT, SLXuat, DGXuat)
VALUES 
	('PX01', 'M001', 300, 350),		--Thit ga (thung) 300k ->350k
	('PX01', 'M002', 200, 450),		--Thit bo (thung) 400k ->450k
	('PX02', 'M001', 200, 370),		--Thit ga (thung) 300k ->370k tăng giá 20k
	('PX02', 'M003', 40, 240),		--Thit heo (kg) 200k ->240k
	('PX03', 'F002', 400, 60),		--Tao do (kg) 50k -> 60k
	('PX03', 'F005', 200, 15),		--Rau cải (bó) 10k -> 15k
	('PX04', 'M001', 250, 370),		--Thit ga (thung) 300k ->370k
	('PX04', 'F001', 55, 50),		--Tao xanh (kg) 40k ->50k
	('PX05', 'F003', 250, 80),		--Bơ xanh (kg) 70k -> 80k
	('PX05', 'M002', 150, 450);		--Thit bo (thung) 400k ->450k
--select * from CTPhieuXuat

INSERT INTO TonKho (NamThang, MaVT, SLDau, TongSLNhap, TongSLXuat, SLCuoi)
VALUES 
	('2023-01-13', 'M001', 0, 350, 300, 50),		--PN01 + PX01
	('2023-01-13', 'M003', 0, 250, 200, 50),		--PN01 + PX01
	('2023-03-01', 'F001', 0, 100, 0, 100),			--PN02
	('2023-03-01', 'F002', 0, 200, 0, 100),			--PN02
	('2023-04-28', 'F003', 0, 200, 0, 200),			--PN03
	('2023-04-28', 'F002', 100, 200, 0, 300),		--PN03
	('2023-04-29', 'F005', 0, 250, 200, 50),		--PN04 + PX03
	('2023-04-29', 'F002', 300, 150, 400, 50),		--PN04 + PX03
	('2023-04-29', 'M001', 50, 200, 200, 50),		--PN05 + PX02
	('2023-04-29', 'M003', 50, 0, 40, 10),			--PX02
	('2023-04-29', 'M002', 0, 180, 0, 180),			--PN05
	('2023-05-01', 'F002', 50, 200, 0, 250),		--PN06
	('2023-05-01', 'F003', 200, 100, 0, 300),		--PN06
	('2023-05-10', 'M001', 50, 200, 250, 0),		--PN07 + PX04
	('2023-05-10', 'F001', 100, 0, 55, 45),			--PX04
	('2023-05-13', 'F003', 300, 0, 250, 50),		--PX05
	('2023-05-13', 'M002', 180, 0, 150, 30),		--PX05
	('2023-05-15', 'F005', 50, 250, 0, 300);		--PN08
--select * from TonKho

----Lệnh sửa dữ liệu:
--UPDATE TonKho
--SET TongSLNhap = 250, TongSLXuat = 0
--WHERE NamThang = '2023-05-15' and MaVT = 'F005';