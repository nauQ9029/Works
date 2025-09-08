create database QuanLyKhoHang
use QuanLyKhoHang;

create table VatTu(
	MaVT char(4) primary key,
	TenVT nvarchar(100),
	DvTinh nvarchar(10),	--Đơn vị tính
	PhanTram int			--% chiết khấu
);

create table NhaCungCap(
	MaNhaCC char(3) primary key,
	TenNhaCC nvarchar(100),
	DiaChi nvarchar(200),
	DienThoai nvarchar(20)
);

create table DonHang(
	SoDH char(4) primary key,
	NgayDH datetime,
	MaNhaCC char(3) foreign key references NhaCungCap(MaNhaCC)
);

create table CTDonHang(
	SoDH char(4) foreign key references DonHang(SoDH),
	MaVT char(4) foreign key references VatTu(MaVT),
	SLDat int,
	constraint pk_CTDonHang primary key(SoDH, MaVT)
);

create table PhieuNhap(
	SoPN char(4) primary key,
	NgayNhap datetime,
	SoDH char(4) foreign key references DonHang(SoDH)
);

create table CTPhieuNhap(
	SoPN char(4) foreign key references PhieuNhap(SoPN),
	MaVT char(4) foreign key references VatTu(MaVT),
	SLNhap int,
	DGNhap money,
	constraint pk_CTPhieuNhap primary key(SoPN, MaVT)
);

create table PhieuXuat(
	SoPX char(4) primary key,
	NgayXuat datetime,
	TenKH nvarchar(100)
);

create table CTPhieuXuat(
	SoPX char(4) foreign key references PhieuXuat(SoPX),
	MaVT char(4) foreign key references VatTu(MaVT),
	SLXuat int,
	DGXuat money,
	constraint pk_CTPhieuXuat primary key(SoPX, MaVT)
);

create table TonKho(
	NamThang datetime,
	MaVT char(4) foreign key references VatTu(MaVT),
	SLDau int,
	TongSLNhap int,
	TongSLXuat int,
	SLCuoi int,
	constraint pk_TonKho primary key(NamThang, MaVT)
);

--Chỉnh sửa bảng
--ALTER TABLE table_name
--ALTER COLUMN column_name datatype

--Bật insert khi đã set identity
--set identity_insert table_name on

--nhap du lieu
--insert into tblDepartment(depName,mgrSSN,mgrAssDate)
--values(N'Phong phan mem trong nuoc','12345678910','10-01-2023');