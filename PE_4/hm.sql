use PE_4

create table BanDoc (
	MaBD varchar(5) primary key,
	TenBD nvarchar(40) not null,
	SoDangMuon int,
	TrangThai varchar(10),
	MaSach varchar(5) foreign key references Sach(MaSach)	
)

create table Sach (
	MaSach varchar(5) primary key,
	TenSach nvarchar(40) not null,
	SoLanMuon int,
	SoHienCon int,
)

create table NhanVien (
	MaNV varchar(5) primary key,
	TenNV nvarchar(50) not null,
	Email nvarchar(50) not null,
)

create table BinhLuan (
	IDBinhLuan varchar(5) primary key,
	TieuDe nvarchar(255) not null,
	NoiDung text not null,
	NgayGio datetime,
	MaBD varchar(5) foreign key references BanDoc(MaBD),
	MaNV varchar(5) foreign key references NhanVien(MaNV)
)

insert BanDoc (MaBD, TenBD, SoDangMuon, TrangThai, MaSach)
values	('KH01', 'Pham Le Minh Quan', 5, 'Active', 1),
		('KH02', 'Huynh Dinh Thien', 6, 'Active', 4),
		('KH03', 'Pham Le Hoang Nam', 3, 'Inactive', null),
		('KH04', 'Le Hoang Trung Kien', 6, 'Inactive', 6);

insert Sach (MaSach, TenSach, SoLanMuon, SoHienCon)
values	('S01', 'Hanh tinh cua nhung ke it noi', 15, 10),
		('S02', 'Khong so cham chi so dung', 56, 103),
		('S03', 'Your name', 87, 105),
		('S04', 'Chainsaw man', 50, 0),
		('S05', 'Asper girl', 30, 25);

insert NhanVien(MaNV, TenNV, Email)
values	('NV01', 'Pham Khanh Nhan', 'kleqing4@gmail.com'),
		('NV02', 'Bui Le Viet Anh', 'anhbuino@gmail.com'),
		('NV03', 'Dinh Nguyen Khanh Luan', 'luanabc@gmail.com'),
		('NV04', 'Nguyen Ngoc Trung', 'trungchop@gmail.com');

insert BinhLuan(IDBinhLuan, TieuDe, NoiDung, NgayGio, MaBD, MaNV)
values ('BL01', 'Tot', 'Sach hay, chat luong sach tot.', '2024-03-04', 'KH01', 'NV01'),
       ('BL02', 'Tot', 'Sach mang nhieu y nghia cho nguoi doc.', '2024-03-14', 'KH02', 'NV01'),
       ('BL03', 'Trung binh', 'Sach hay, nhung chat luong sach khong duoc tot.', '2024-03-10', 'KH04', 'NV02');

select * from BanDoc
select * from BinhLuan
select * from NhanVien
select * from Sach