Create database DB_FE_DBI202
Go
Use DB_FE_DBI202
Go

CREATE TABLE CUSTOMER
	(
	CustomerID varchar(5)  PRIMARY KEY,
	CustomerName nvarchar(30) NOT NULL,
	CusAddress nvarchar(50),
	Cuctel varchar(10) ,
	Email varchar(30)
	)
--Create table for Warehouse 
(--note: identity for WarehouseID char(5) column is primary key)
create table WAREHOUSE 
	(
	WarehouseID char(5) primary key,
	PhoneNo varchar(10) ,
	Address nvarchar(50)
	)

--Code for insert value to Warehouse table
insert WAREHOUSE (WarehouseID, PhoneNo, Address)
values	('K01', '1234567890', '121 Phan Dang Luu'),
		('K02', '0987654321', '82 Mai ThCc Loan'),
		('K03', '1357924680', '26 Nam Ky Khoi Nghia'),
		('K04', '2468013579', '69 Vo Chi Cong'),
		('K05', '9753108642', '727 Le Đinh Ly');

CREATE TABLE MATERIAL
	(
	MaterialID varchar(5) PRIMARY KEY,
	MaterialName nvarchar(30) NOT NULL,
	Unit nvarchar(20),
	PurchasePrice   int CHECK (PurchasePrice>0),
	InventoryNumber int CHECK (InventoryNumber>=0),
	WarehouseID char(5) references Warehouse(WarehouseID)
	)
CREATE TABLE INVOICE
	(
	InvoiceID varchar(10) PRIMARY KEY,
	InvoiceDate datetime CHECK(InvoiceDate<=getdate()),
	CustomerID varchar(5) FOREIGN KEY REFERENCES Customer(CustomerID),
	DeliveryAddress nvarchar(50)
	)
CREATE TABLE DETAILINVOICE 
	(
	InvoiceID varchar(10) FOREIGN KEY REFERENCES INVOICE(InvoiceID),
	MaterialID varchar(5) FOREIGN KEY REFERENCES MATERIAL(MaterialID),
	PRIMARY KEY (InvoiceID,MaterialID ),
	Quanlity int,
	Promotion int,
	SellingPrice int
	)



INSERT MATERIAL
VALUES( 'VT01','XI MANG','BAO',50000,5000, 'K01')
INSERT MATERIAL
VALUES( 'VT02',	'CAT'	,'KHOI',	45000,	50000, 'K02')
INSERT MATERIAL
VALUES( 'VT03',	'GACH ONG',	'VIEN',	120,	800000, 'K03')
INSERT MATERIAL
VALUES( 'VT04',	'GACH THE',	'VIEN',	110,	800000, 'K03')
INSERT MATERIAL
VALUES( 'VT05',	'DA LON',	'KHOI',	25000,	100000, 'K04')
INSERT MATERIAL
VALUES( 'VT06',	'DA NHO',	'KHOI',	33000,	100000, 'K04')

INSERT CUSTOMER
VALUES( 'KH01',	'NGUYEN THI BE',	'TAN BINH',	8457895,	'bnt@yahoo.com')
INSERT CUSTOMER
VALUES( 'KH02',	'LE HOANG NAM',	'BINH CHANH',	9878987,	'namlehoang @abc.com.vn')
INSERT CUSTOMER
VALUES( 'KH03',	'TRAN THI CHIEU',	'TAN BINH',	8457895,null	)
INSERT CUSTOMER
VALUES( 'KH04',	'MAI THI QUE ANH',	'BINH CHANH	',null,null)
INSERT CUSTOMER
VALUES( 'KH05',	'LE VAN SANG',	'QUAN 10',	null	,'sanglv@hcm.vnn.vn')
INSERT CUSTOMER
VALUES( 'KH06',	'TRAN HOANG KHAI',	'TAN BINH',	8457897	,null)

INSERT INVOICE
VALUES( 'HD001','2022-05-12',	'KH01',N'Đà Nẵng')
INSERT INVOICE
VALUES( 'HD002','2022-05-25',	'KH02',N'Đà Nẵng')
INSERT INVOICE
VALUES( 'HD003','2022-05-25','KH01',N'Hội An')
INSERT INVOICE
VALUES( 'HD004','2022-05-25','KH04',N'Huế')
INSERT INVOICE
VALUES( 'HD005','2022-05-26','KH04',N'Đà Nẵng')
INSERT INVOICE
VALUES( 'HD006','2022-05-02','KH03',N'Huế')
INSERT INVOICE
VALUES( 'HD007','2022-06-22','KH04',N'Huế')
INSERT INVOICE
VALUES( 'HD008','2022-06-25','KH03',N'Đà Nẵng')
INSERT INVOICE
VALUES( 'HD009','2022-08-15','KH04',N'Huế')
INSERT INVOICE
VALUES( 'HD010','2022-08-30','KH01',N'Hội An')

INSERT DetailInvoice(InvoiceID,MaterialID,Quanlity, SellingPrice)
VALUES('HD001','VT01',5,52000)
INSERT DetailInvoice(InvoiceID,MaterialID,Quanlity, SellingPrice)
VALUES( 'HD001','VT05',	10,	30000)
INSERT DetailInvoice(InvoiceID,MaterialID,Quanlity, SellingPrice)
VALUES( 'HD002','VT03',	10000,	150)
INSERT DetailInvoice(InvoiceID,MaterialID,Quanlity, SellingPrice)
VALUES( 'HD003','VT02',	20,	55000)
INSERT DetailInvoice(InvoiceID,MaterialID,Quanlity, SellingPrice)
VALUES( 'HD004','VT03',	50000,	150)
INSERT DetailInvoice(InvoiceID,MaterialID,Quanlity, SellingPrice)
VALUES( 'HD004',	'VT04',	20000,	120)
INSERT DetailInvoice(InvoiceID,MaterialID,Quanlity, SellingPrice)
VALUES( 'HD005',	'VT05',	10,	30000)
INSERT DetailInvoice(InvoiceID,MaterialID,Quanlity, SellingPrice)
VALUES( 'HD006',	'VT04',	10000,	120)
INSERT DetailInvoice(InvoiceID,MaterialID,Quanlity, SellingPrice)
VALUES( 'HD007',	'VT04',	20000,	125)
INSERT DetailInvoice(InvoiceID,MaterialID,Quanlity, SellingPrice)
VALUES( 'HD008',	'VT01',	100,	55000)
INSERT DetailInvoice(InvoiceID,MaterialID,Quanlity, SellingPrice)
VALUES( 'HD009',	'VT02',	25,	48000)
INSERT DetailInvoice(InvoiceID,MaterialID,Quanlity, SellingPrice)
VALUES( 'HD010',	'VT01',	25,	57000)

select * from MATERIAL
select * from WAREHOUSE
select * from CUSTOMER
select * from INVOICE
select * from DETAILINVOICE

--Code for answer

-- 3. Write a procedure to search for invoices by customer name, displaying information including: InvoiceID, Invoicedate, delivery address, total amount of each invoice.
--The total amount of an invoice is calculated by the total of quantity * selling price of all the items. Handling any error is required.
create procedure TimHoaDonTheoTenKH (@CustomerName nvarchar(30))
as
begin
	if exists (select 1 from CUSTOMER where CustomerName = @CustomerName)
		begin
			select	i.InVoiceID,
					i.InVoicedate,
					i.DeliveryAddress,
					sum(di.Quanlity * di.SellingPrice) as totalAmount
			from INVOICE i
			inner join CUSTOMER c on i.CustomerID = c.CustomerID
			inner join DETAILINVOICE di on i.InvoiceID = di.InvoiceID
			where c.CustomerName = @CustomerName
			group by i.InvoiceID, i.InvoiceDate, i.DeliveryAddress
			order by i.InvoiceDate
		end
	else
	begin
		print'Khong tim thay khach hang.';
	end
end

exec TimHoaDonTheoTenKH 'LE HOANG NAM';


-- 4. Write a trigger when inserted a record in DetailInvoice table, ensure that the quantity of Material  must be greater than or equal to the sale quantity.
--In addition, update the quantity of the Material – substract by the sale quantity.

create trigger KiemTraSLVatTuSauKhiThem
on DetailInVoice
after insert
as	
begin
	declare @MaterialID varchar(5),
			@SaleQuantity int;

	select @MaterialID = MaterialID, @SaleQuantity = Quanlity
	from inserted

	if exists (	select 1 
				from MATERIAL 
				where MaterialID = @MaterialID and InventoryNumber >= @SaleQuantity )
	begin
		update MATERIAL
		set InventoryNumber = InventoryNumber - @SaleQuantity
		where MaterialID = @MaterialID
	end
	else	
	begin
		raiserror('So luong cua vat tu phai lon hon hoac bang (>=) so luong ban duoc.', 16, 1);
		rollback transaction
	end
end