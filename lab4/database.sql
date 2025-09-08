--1. Hãy viết lệnh SQL để tạo cấu trúc các bảng trên.
CREATE database LAB4
use LAB4

CREATE TABLE HANGHOA (
    MaHang VARCHAR(10) PRIMARY KEY,
    TenHang VARCHAR(255),
    DVT VARCHAR(50)
);

CREATE TABLE KHACHHANG (
    MaKH VARCHAR(10) PRIMARY KEY,
    HoKH VARCHAR(50),
    TenKH VARCHAR(50),
    DiaChi VARCHAR(255),
    SoDT VARCHAR(15)
);

CREATE TABLE HOADON (
    SoHD VARCHAR(10) PRIMARY KEY,
    NgayHD DATE,
    MaKH VARCHAR(10),
    FOREIGN KEY (MaKH) REFERENCES KHACHHANG(MaKH)
);

CREATE TABLE CHITIETHOADON (
    SoHD VARCHAR(10),
    MaHang VARCHAR(10),
    SoLuong INT,
    DonGia INT,
    PRIMARY KEY (SoHD, MaHang),
    FOREIGN KEY (SoHD) REFERENCES HOADON(SoHD),
    FOREIGN KEY (MaHang) REFERENCES HANGHOA(MaHang)
);
--HANGHOA
insert into HANGHOA values ('TL001',N'Thuốc lá Prince',N'Gói')
insert into HANGHOA values ('TL002',N'Thuốc lá White Horse',N'Gói')
insert into HANGHOA values ('B001',N'Bánh Chocolate',N'Hộp')
insert into HANGHOA values ('NM001',N'Nước mắm Nam Ngư',N'Chai')
--KHACHHANG
insert into KHACHHANG values ('KH001',N'Nguyễn Văn',N'Hải', N'16 Lê Lợi – ĐN',0935688515)
insert into KHACHHANG values ('KH002',N'Trần Anh',N'Khôi', N'8 Lê Duẩn – ĐN',0905619034)
insert into KHACHHANG values ('KH003',N'Lê Ngọc',N'Lan', N'2 Thanh Thủy- ĐN',0905943847)
insert into KHACHHANG values ('KH004',N'Ngô Minh',N'Tú', N'12 Hải Hồ - ĐN',0905881456)
--HOADON
insert into HOADON values ('001','2013-09-03','KH001')
insert into HOADON values ('002','2013-09-05','KH002')
insert into HOADON values ('003','2013-10-12','KH001')
--CHITIETHOADON
insert into CHITIETHOADON values ('001','TL001',10,7000)
insert into CHITIETHOADON values ('001','B001',5,45000)
insert into CHITIETHOADON values ('002','TL002',30,20000)
insert into CHITIETHOADON values ('002','B001',15,48000)
insert into CHITIETHOADON values ('003','NM001',2,25000)
