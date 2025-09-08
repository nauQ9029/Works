CREATE DATABASE FreshFoodStore;
USE FreshFoodStore;
GO

-- Bảng Users (chứa thông tin chung cho mọi loại người dùng)
CREATE TABLE Users (
    userId INT PRIMARY KEY IDENTITY(1,1),
    fullName NVARCHAR(100),
    address NVARCHAR(200),
    phone VARCHAR(15),
    email NVARCHAR(255) UNIQUE,
    password NVARCHAR(100) NOT NULL,
	passGoogle NVARCHAR(100) NULL,
	avatar NVARCHAR(255),
    createdAt DATETIME DEFAULT GETDATE(),
	[status] VARCHAR(15)			--Trạng thái block or normal
);

-- Bảng Customers (thông tin cụ thể của khách hàng)
CREATE TABLE Customers (
    customerId INT PRIMARY KEY IDENTITY(1,1),
    userId INT UNIQUE FOREIGN KEY REFERENCES Users(userId) ON DELETE CASCADE, -- Kế thừa từ Users
);

-- Bảng Shippers (thông tin cụ thể của người giao hàng)
CREATE TABLE Shippers (
    shipperId INT PRIMARY KEY IDENTITY(1,1),
    userId INT UNIQUE FOREIGN KEY REFERENCES Users(userId) ON DELETE CASCADE, -- Kế thừa từ Users
);

-- Bảng Staff (thông tin cụ thể của nhân viên)
CREATE TABLE Staffs (
    staffId INT PRIMARY KEY IDENTITY(1,1),
    userId INT UNIQUE FOREIGN KEY REFERENCES Users(userId) ON DELETE CASCADE, -- Kế thừa từ Users
);

-- Bảng Managers (thông tin cụ thể của quản lý)
CREATE TABLE Managers (
    managerId INT PRIMARY KEY IDENTITY(1,1),
    userId INT UNIQUE FOREIGN KEY REFERENCES Users(userId) ON DELETE CASCADE, -- Kế thừa từ Users
);

-- Bảng Suppliers (Nhà cung cấp)
CREATE TABLE Suppliers (
    supplierId INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(100) NOT NULL,
    address NVARCHAR(200),
    phone VARCHAR(15),
    email NVARCHAR(255),
    moreInfo NVARCHAR(255),
    createdAt DATETIME DEFAULT GETDATE(),
);

-- Bảng Category (Danh mục sản phẩm)
CREATE TABLE Category (
    categoryId INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(100) NOT NULL,
);

-- Bảng Products (Sản phẩm)
CREATE TABLE Products (
    productId INT PRIMARY KEY IDENTITY(1,1),
    name NVARCHAR(100) NOT NULL,
    unitMeasure NVARCHAR(50) NOT NULL,
    supplierId INT FOREIGN KEY REFERENCES Suppliers(supplierId) ON DELETE SET NULL ON UPDATE CASCADE,
    categoryId INT FOREIGN KEY REFERENCES Category(categoryId) ON DELETE SET NULL ON UPDATE CASCADE,
    description NVARCHAR(255),
    image NVARCHAR(255),
    unitPrice DECIMAL(18,2) NOT NULL,
    status NVARCHAR(50),
    createdAt DATETIME DEFAULT GETDATE(),
    updatedAt DATETIME
);

--Ảnh hiểu thị trong carousel của trang chi tiết sản phẩm, lấy ảnh theo productId, khoảng từ 2-3 ảnh cho 1 sản phẩm
CREATE TABLE [dbo].[Gallery]
(
    [galleryId] INT IDENTITY(1,1) PRIMARY KEY,
    productId int FOREIGN KEY REFERENCES Products(productId),
    [src] NVARCHAR(1000),
);

-- Bảng Receipts (Phiếu nhập)
CREATE TABLE Receipts (
    receiptId INT PRIMARY KEY IDENTITY(1,1),
    dateInput DATETIME DEFAULT GETDATE(),
    supplierId INT FOREIGN KEY REFERENCES Suppliers(supplierId) ON DELETE SET NULL ON UPDATE CASCADE
);

-- Bảng ReceiptDetails (Chi tiết phiếu nhập)
CREATE TABLE ReceiptDetails (
    receiptDetailId INT PRIMARY KEY IDENTITY(1,1),
    receiptId INT NULL FOREIGN KEY REFERENCES Receipts(receiptId) ON DELETE SET NULL , -- Cho phép NULL để sử dụng SET NULL, xóa ON UPDATE CASCADE
    productId INT NULL FOREIGN KEY REFERENCES Products(productId) ON DELETE SET NULL ON UPDATE CASCADE, -- Cho phép NULL để sử dụng SET NULL
    quantity INT NOT NULL,
    inputPrice DECIMAL(18,2) NOT NULL,
    expiryDate DATETIME,
);

-- Bảng BatchesProduct (Các lô hàng của sản phẩm)
CREATE TABLE BatchesProduct (
    batchId INT PRIMARY KEY IDENTITY(1,1),
    receiptDetailId INT FOREIGN KEY REFERENCES ReceiptDetails(receiptDetailId) ON DELETE SET NULL,
    productId INT FOREIGN KEY REFERENCES Products(productId) ON DELETE SET NULL ON UPDATE CASCADE,
    quantity INT NOT NULL,
    expiryDate DATETIME,
);

-- Bảng Orders (Đơn hàng)
CREATE TABLE Orders (
    orderId INT PRIMARY KEY IDENTITY(1,1),
    userId INT FOREIGN KEY REFERENCES Users(userId) ON DELETE SET NULL , -- Người đặt hàng, xóa ON UPDATE CASCADE
    shippingFee DECIMAL(18,2),
    isConfirmed BIT DEFAULT 0, -- Trạng thái xác nhận đơn hàng (0: giỏ hàng, 1: đã xác nhận)
    paymentStatus NVARCHAR(50), -- Trạng thái thanh toán (vd: Waiting, Paid,	)
    deliveryStatus NVARCHAR(50), -- Trạng thái giao hàng (vd: Cancel, Waiting, Shipped, Delivered)
    paymentType NVARCHAR(50), -- Loại thanh toán (vd: QRCode, Cash)
    deliveryLocation NVARCHAR(255), -- Địa chỉ giao hàng
    receiverName NVARCHAR(100), -- Tên người nhận hàng
    receiverPhone VARCHAR(15), -- Số điện thoại người nhận hàng
    shipperId INT FOREIGN KEY REFERENCES Shippers(shipperId), -- Shipper giao hàng, xóa ON UPDATE CASCADE ON DELETE SET NULL
    orderCreatedAt DATETIME DEFAULT GETDATE(), -- Thời điểm tạo đơn hàng
    orderCompletedAt DATETIME, -- Thời điểm hoàn thành đơn hàng (sẽ cập nhật sau khi giao)
);

-- Bảng OrderDetails (Chi tiết đơn hàng)
CREATE TABLE OrderDetails (
    orderDetailId INT PRIMARY KEY IDENTITY(1,1),
    orderId INT FOREIGN KEY REFERENCES Orders(orderId) ON DELETE CASCADE ON UPDATE CASCADE,
    batchId INT FOREIGN KEY REFERENCES BatchesProduct(batchId) ON DELETE SET NULL ON UPDATE CASCADE,
    unitPriceOut DECIMAL(18,2) NOT NULL,
    quantity INT NOT NULL,
    --isReturn BIT,
);

-- Bảng Promos (Khuyến mãi)
CREATE TABLE Promos (
    promotionId INT PRIMARY KEY IDENTITY(1,1),
    productId INT FOREIGN KEY REFERENCES Products(productId) ON DELETE SET NULL ON UPDATE CASCADE,
    quantitySale INT NOT NULL,
    discount DECIMAL(5,2),
    startDate DATETIME NOT NULL,
    endDate DATETIME NOT NULL,
);

-- Chỉ mục cho tìm kiếm nhanh
CREATE INDEX idx_email_users ON Users(email);
CREATE INDEX idx_supplierId_products ON Products(supplierId);
CREATE INDEX idx_categoryId_products ON Products(categoryId);
CREATE INDEX idx_email_suppliers ON Suppliers(email);
GO


INSERT INTO Users (fullname, address, phone, email, password, passgoogle, avatar, [status], createdat)   
VALUES   
	('Alair Caiger', '17 Schurz Terrace', '2016107046', 'admin@gmail.com', '123123', null, 'https://robohash.org/illoquiavoluptate.png?size=50x50&set=set1', 'normal', '2024-03-19'),  
	('Heidi Lauridsen', '62042 Main Crossing', '4168902207', 'customer@gmail.com', '12345', null, 'https://robohash.org/rerumaperiamsunt.png?size=50x50&set=set1', 'normal', '2024-09-24'),  
	('Pris Campling', '0342 Menomonie Parkway', '3936476973', 'pcampling2@sina.com.cn', 'iN1$@A9(ZQ~*/Fo', null, 'https://robohash.org/solutaasperioresplaceat.png?size=50x50&set=set1', 'normal', '2024-05-06'),  
	('Yorgo Bartolomeotti', '2 Lillian Terrace', '6069431954', 'ybartolomeotti3@wunderground.com', 'dZ0(l)g+Py2B', null, 'https://robohash.org/rationeetdolorum.png?size=50x50&set=set1', 'blocked', '2024-09-24'),  
	('Michail Jays', '4325 Alpine Plaza', '8411817349', 'mjays4@seesaa.net', 'iC3>PEt&i,I%"l}', null, 'https://robohash.org/autsedvoluptatum.png?size=50x50&set=set1', 'normal', '2024-01-18'),  
	('Hermann Americi', '8781 Almo Point', '6315347755', 'hamerici5@springer.com', 'pQ5#c8VCyIMYQ|X?', null, 'https://robohash.org/etrecusandaeexplicabo.png?size=50x50&set=set1', 'normal', '2024-04-21'),  
	('Sharron Sor', '89 Haas Drive', '3369274448', 'ssor6@webmd.com', 'gP3(SPv3N', null, 'https://robohash.org/doloremconsecteturodit.png?size=50x50&set=set1', 'normal', '2024-09-21'),  
	('Sephira Morton', '17 Old Gate Alley', '4019075886', 'smorton7@youtube.com', 'hJ1~H~d>5)', null, 'https://robohash.org/debitisveritatismodi.png?size=50x50&set=set1', 'blocked', '2024-04-06'),  
	('Zoe Jonczyk', '5 Clove Parkway', '5882188493', 'zjonczyk8@umich.edu', 'dN7`9KI)xO|', null, 'https://robohash.org/isteullamid.png?size=50x50&set=set1', 'normal', '2024-08-11'),  
	('Colan Grim', '7685 Killdeer Road', '6298436163', 'cgrim9@oracle.com', 'lP8.so)"{d', null, 'https://robohash.org/occaecatiitaquepraesentium.png?size=50x50&set=set1', 'block', '2024-03-09'),  
	('Hana Wilcockes', '1 Carberry Park', '8819983146', 'hwilcockesa@youku.com', 'pN4*kXFwif!Y', null, 'https://robohash.org/autidquam.png?size=50x50&set=set1', 'normal', '2024-03-09'),  
	('Ingemar Aksell', '6771 Delaware Trail', '4683556489', 'iaksellb@prweb.com', 'dB9@8j}4lWR', null, 'https://robohash.org/vitaevoluptatemvoluptatibus.png?size=50x50&set=set1', 'normal', '2024-02-14'),  
	('Ashton Cappineer', '95301 Truax Center', '4219638191', 'acappineerc@wix.com', 'aJ6|*mI&K`exFfX', null, 'https://robohash.org/aenimipsum.png?size=50x50&set=set1', 'normal', '2024-07-22'),  
	( 'Kipper Godson', '52437 Magdeline Plaza', '2454379724', 'kgodsond@shutterfly.com', 'wG9!kE@r', null, 'https://robohash.org/quiaperspiciatisdignissimos.png?size=50x50&set=set1', 'normal', '2024-06-29'),  
	('Kendrick Hannant', '736 Canary Center', '7151830929', 'khannante@google.de', 'oF8@D>#|U(', null, 'https://robohash.org/etsunteius.png?size=50x50&set=set1', 'normal', '2024-03-30'),  
	('Enid Gillow', '834 Trailsway Crossing', '8411830364', 'egillowf@about.com', 'mX6){<l47EY=<"HT', null, 'https://robohash.org/nequeetnatus.png?size=50x50&set=set1', 'normal', '2024-01-18'),  
	('Elroy Hibbart', '11 8th Court', '9151177411', 'ehibbartg@myspace.com', 'bV2=pg!Q>hhV\b', null, 'https://robohash.org/eaaliquidautem.png?size=50x50&set=set1', 'normal', '2024-09-14'),  
	('Sasha Wabb', '1319 Thompson Parkway', '1148795986', 'swabbh@dion.ne.jp', 'wE4?=u4VBeFB0"', null, 'https://robohash.org/suscipitsedaccusamus.png?size=50x50&set=set1', 'normal', '2024-01-24'),  
	('Anatole Wintle', '188 Rutledge Place', '1098070476', 'awintlei@ycombinator.com', 'yD0~gzdsQh', null, 'https://robohash.org/autexhic.png?size=50x50&set=set1', 'normal', '2023-10-12'),  
	('Ofelia Laydel', '97 Clyde Gallagher Way', '6272946261', 'olaydelj@cdc.gov', 'sH6>|D~YbVuZ"g9B', null, 'https://robohash.org/nisiillumveritatis.png?size=50x50&set=set1', 'normal', '2024-08-01');

INSERT INTO [dbo].[Customers]
           ([userId])
     VALUES
           (2), (3), (4), (5), (6), (7), (8), (9), (10);

INSERT INTO [dbo].[Shippers]
           ([userId])
     VALUES
           (11), (12), (13), (14), (15); 

INSERT INTO [dbo].[Staffs]
           ([userId])
     VALUES
           (16), (17), (18), (19);

INSERT INTO [dbo].[Managers]
           ([userId])
     VALUES
           (1), (20);

INSERT INTO Suppliers (name, address, phone, email, moreinfo, createdat) 
VALUES
	(N'Nông Trại Xanh', N'89 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh', '0877583998', 'lienhe@nongtraixanh.com', N'Hoa Quả Hữu Cơ', '2023-11-01'),
	(N'Hải Sản Tươi Sống Đại Dương', N'556 Nguyễn Chí Thanh, Quận Hải Châu, Đà Nẵng', '0189035246', 'info@haisanfresh.com', N'Hải Sản và Động Vật Có Vỏ Tươi Sống', '2024-01-06'),
	(N'Sữa Núi Cao', N'57 Đường Tây Sơn, Quận Đống Đa, Hà Nội', '0154120076', 'hotro@suanuicao.com', N'Sản Phẩm Sữa và Trứng', '2023-10-20'),
	(N'Thực phẩm ABC', N'44 Đường Nguyễn Văn Trỗi, Quận 5, TP. Hồ Chí Minh', '0208747450', 'banhang@banhngon.com', N'Đồ ngọt, nước, gia vị,..', '2023-11-04'),
	(N'Trang Trại Thu Hoạch', N'83 Hẻm Giai Điệu, Quận Cái Răng, Cần Thơ', '0467532605', 'dathang@trangtraithuhoach.com', N'Thịt và Gia Cầm Tươi', '2024-01-29'),
	(N'Vườn Nhiệt Đới', N'7 Đường Nguyễn Văn Linh, Quận Ninh Kiều, Cần Thơ', '0612045424', 'info@vuonnhietdoi.com', N'Trái Cây và Rau Củ Nhiệt Đới', '2023-11-01');

-- 5. Category (Danh mục sản phẩm)
INSERT INTO Category (name)
VALUES
	('Fruits'),			--1
	('Vegetables'),		--2
	('Seafood'),		--3
	('Meat'),			--4
	('Beverages'),		--5
	('DairyProducts'),	--6
	('Snacks'),			--7
	('Spices'),			--8
	('Egg'),			--9
	('VegetableOil'),	--10
	('CerealsNuts'),	--11
	('Tuber');		--12 củ và quả

INSERT INTO Products (name, unitmeasure, supplierid, categoryid, description, image, unitprice, status, createdat, updatedat) 
VALUES
 (N'Dưa hấu không hạt trái 2kg', N'trái', 6, 1, N'Xuất xứ: Việt Nam', 'https://cdn.tgdd.vn/Products/Images/8788/226966/bhx/dua-hau-khong-hat-202312270957362195.jpg', 38000, 'In Stock', '2023-12-02', '2024-04-24'),
 (N'Dừa xiêm gọt vỏ 400g', N'trái', 6, 1, N'Xuất xứ: Việt Nam', 'https://cdn.tgdd.vn/Products/Images/8788/314978/bhx/combo-3-trai-dua-xiem-got-vo-202309161129454454.jpg', 10000, 'In Stock', '2024-01-07', '2024-04-25'),
 (N'Táo Gala nhập khẩu 1kg', N'kg', 6, 1, N'Xuất xứ: New Zealnd', 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8788/238689/bhx/hinh-2_202410040933066666.jpg', 39000, 'In Stock', '2023-12-29', '2024-03-10'),
 (N'Chuối già giống Nam Mỹ 1kg', N'kg', 6, 1, N'Xuất xứ: Nam Mỹ', 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8788/313132/bhx/cdntgddvnproductsimages8788228923bhxchuoi-gia-giong-nam-my-1kg-202012021040379843_202409301414305689.jpg', 22000, 'In Stock', '2023-12-02', '2024-06-09'),
 (N'Cam sành 1kg', N'kg', 6, 1, N'Xuất xứ: Việt Nam', 'https://cdn.tgdd.vn/Products/Images/8788/321604/bhx/cam-sanh-202401201943148305.jpg', 16000, 'In Stock', '2023-10-28', '2024-04-02'),
 (N'Cải thìa 300g', N'bó', 1, 2, N'Xuất xứ: Việt Nam', 'https://cdn.tgdd.vn/Products/Images/8820/238556/bhx/cai-thia-da-lat-202407090853555309.jpg', 5000, 'In Stock', '2023-11-30', '2024-06-24'),
 (N'Rau dền 400g', N'bó', 1, 2, N'Xuất xứ: Việt Nam', 'https://cdn.tgdd.vn/Products/Images/8820/222855/bhx/rau-den-400g-202405061612508385.jpg', 11000, 'In Stock', '2023-11-16', '2024-05-08'),
 (N'Rau má khoảng 200g', N'bó', 1, 2, N'Xuất xứ: Việt Nam', 'https://cdn.tgdd.vn/Products/Images/8820/271747/bhx/rau-ma-200g-202401101134251805.jpg', 10000, 'In Stock', '2024-01-08', '2024-03-08'),
 (N'Xà lách ta 300g',  N'bó', 1, 2, N'Xuất xứ: Việt Nam', 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8820/325723/bhx/cdntgddvnproductsimages8820325723bhxxa-lach-ta-300g-202405101613321517_202408301737550838.jpg', 12000, 'In Stock', '2024-02-07', '2024-04-12'),
 (N'Rau lang 400g', N'bó', 1, 2, N'Xuất xứ: Việt Nam', 'https://cdn.tgdd.vn/Products/Images/8820/324796/bhx/rau-lang-400g-202404090911569607.jpg', 7000, 'In Stock', '2023-12-05', '2024-04-14'),
 (N'Cá bống làm sạch 300g', N'phần', 2, 3, N'Xuất xứ: Việt Nam', 'https://cdn.tgdd.vn/Products/Images/8782/244404/bhx/ca-bong-202406131456458955.jpg', 33000, 'In Stock', '2023-12-14', '2024-07-10'),
 (N'Cá cam Nhật Bản 700g', N'con', 2, 3, N'Xuất xứ: Nhật Bản', 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8782/312457/bhx/2_202410070907151836.jpg', 75000, 'In Stock', '2023-10-27', '2024-08-31'),
 (N'Tôm thẻ Minh Phú 200g', N'phần', 2, 3, N'Xuất xứ: Việt Nam', 'https://cdn.tgdd.vn/Products/Images/8782/319747/bhx/tom-the-minh-phu-202405072324549168.jpg', 40000, 'In Stock', '2024-02-19', '2024-04-19'),
 (N'Lươn làm sạch 330g', N'phần', 2, 3, N'Xuất xứ: Việt Nam', 'https://cdn.tgdd.vn/Products/Images/8782/303078/bhx/luon-lam-sach-cat-khuc-tu-300g-tro-len-202405091126054723.jpg', 60000, 'In Stock', '2024-01-27', '2024-08-28'),
 (N'Cá lóc đã làm sạch 300g', N'con', 2, 3, N'Xuất xứ: Việt Nam', 'https://cdn.tgdd.vn/Products/Images/8782/220487/bhx/ca-loc-da-lam-sach-202405100830455108.jpg', 28000, 'In Stock', '2023-11-03', '2024-04-14'),
 (N'Sườn non heo 300g', N'phần', 5, 4, N'Xuất xứ: Việt Nam', 'https://cdn.tgdd.vn/Products/Images/8781/226856/bhx/suon-non-heo-202402221354553302.jpg', 65000, 'In Stock', '2024-02-23', '2024-05-13'),
 (N'Ba rọi heo rút sườn 500g', N'phần', 5, 4, N'Xuất xứ: Việt Nam', 'https://cdn.tgdd.vn/Products/Images/8781/241252/bhx/ba-roi-heo-rut-suon-cp-khay-500g-202111262057566174.jpg', 116000, 'In Stock', '2024-02-18', '2024-09-24'),
 (N'Đùi bò 300g', N'phần', 5, 4, N'Xuất xứ: Việt Nam', 'https://cdn.tgdd.vn/Products/Images/8139/233807/bhx/dui-bo-202407161431320916.jpg', 72000, 'In Stock', '2024-01-14', '2024-07-29'),
 (N'Bắp bò Fohla 250g', N'phần', 5, 4, N'Xuất xứ: Việt Nam', 'https://cdn.tgdd.vn/Products/Images/8139/304178/bhx/bap-bo-fohla-250g-202303220902440351.jpg', 435522, 'In Stock', '2024-02-24', '2024-05-03'),
 (N'Gà vườn đất đỏ 1.3kg', N'con', 5, 4, N'Xuất xứ: Việt Nam', 'https://cdn.tgdd.vn/Products/Images/8790/316860/bhx/ga-vuon-dat-do-202402271114030531.jpg', 128000, 'In Stock', '2024-02-11', '2024-09-26'),
 (N'Đùi gà góc tư 300g', N'phần', 5, 4, N'Xuất xứ: Việt Nam', 'https://cdn.tgdd.vn/Products/Images/8790/226946/bhx/dui-ga-goc-tu-1kg-202101141209389939.jpg', 30000, 'In Stock', '2023-12-17', '2024-03-30'),
 (N'Thùng 20 lon bia Budweiser 330ml', N'thùng', 4, 5, N'Xuất xứ: Việt Nam', 'https://cdn.tgdd.vn/Products/Images/2282/214410/bhx/thung-20-lon-bia-budweiser-330ml-202309191528132467.jpg', 292000, 'In Stock', '2023-11-26', '2024-04-14'),
 (N'Thùng 24 lon bia Tiger 330ml', N'thùng', 4, 5, N'Xuất xứ: Việt Nam', 'https://cdn.tgdd.vn/Products/Images/2282/316846/bhx/thung-24-lon-bia-tiger-lon-cao-330ml-202401091124421941.jpg', 350000, 'In Stock', '2023-10-20', '2024-04-21'),
 (N'Thùng 48 hộp sữa Dalat Milk 180ml', N'thùng', 3, 6, N'Xuất xứ: Việt Nam', 'https://cdn.tgdd.vn/Products/Images/2386/223740/bhx/thung-48-hop-sua-tuoi-tiet-trung-it-duong-dalat-milk-180ml-202209231405190472.jpg', 396000, 'In Stock', '2024-01-23', '2024-07-25'),
 (N'Phô mai Vinamilk hộp 120g', N'hộp', 3, 6, N'Xuất xứ: Việt Nam', 'https://cdn.tgdd.vn/Products/Images/7599/206646/bhx/pho-mai-vinamilk-hop-120g-8-mieng-201907191041306901.jpg', 27500, 'In Stock', '2023-12-23', '2024-08-25'),
 (N'Bánh cracker vị cốm non AFC 109g', N'hộp', 4, 7, N'Xuất xứ: Việt Nam', 'https://cdn.tgdd.vn/Products/Images/3357/302645/bhx/banh-cracker-vi-com-non-afc-dinh-duong-hop-109g-202302170839310749.jpg', 24500, 'In Stock', '2023-12-29', '2024-06-18'),
 (N'Bánh Oreo Cadbury socola hộp 180g', N'hộp', 4, 7, N'Xuất xứ: Việt Nam', 'https://cdn.tgdd.vn/Products/Images/7622/242620/bhx/banh-socola-pie-oreo-cadbury-hop-180g-202106290830079507.jpg', 28500, 'In Stock', '2023-11-23', '2024-10-07'),
 (N'Đường vàng Quảng Ngãi gói 1kg', N'gói', 4, 8, N'Xuất xứ: Việt Nam', 'https://cdn.tgdd.vn/Products/Images/2804/321751/bhx/duong-vang-quang-ngai-goi-1kg-202403121131038324.jpg', 32000, 'In Stock', '2024-01-25', '2024-05-10'),
 (N'Tương ớt Chinsu chai 500g', N'chai', 4, 8, N'Xuất xứ: Việt Nam', 'https://cdn.tgdd.vn/Products/Images/2567/213563/bhx/tuong-ot-chinsu-chai-500g-201911011615532253.jpg', 31000, 'In Stock', '2024-01-09', '2024-05-04'),
 (N'Tiêu đen xay Dh Foods hũ 45g', N'hũ', 4, 8, N'Xuất xứ: Việt Nam', 'https://cdn.tgdd.vn/Products/Images/2809/225392/bhx/tieu-den-xay-phu-quoc-dh-foods-hu-45g-202007031339222475.jpg', 27500, 'In Stock', '2023-12-06', '2024-04-12'),
 (N'Trứng gà ta hộp 6 quả', N'hộp', 3, 9, N'Xuất xứ: Việt Nam', 'https://cdn.tgdd.vn/Products/Images/8783/311111/bhx/trung-ga-ta-hop-6-qua-giao-ngau-nhien-thuong-hieu-202404151513102887.jpg', 23000, 'In Stock', '2024-01-13', '2024-08-22'),
 (N'Trứng vịt hộp 10 quả', N'hộp', 3, 9, N'Xuất xứ: Việt Nam', 'https://cdn.tgdd.vn/Products/Images/8783/311102/bhx/trung-vit-hop-10-qua-giao-ngau-nhien-thuong-hieu-202404151609171146.jpg', 37000, 'In Stock', '2023-12-26', '2024-10-01'),
 (N'Trứng cút hộp 30 quả', N'hộp', 3, 9, N'Xuất xứ: Việt Nam', 'https://cdn.tgdd.vn/Products/Images/8783/311101/bhx/trung-cut-hop-30-giao-ngau-nhien-thuong-hieu-202404151542176717.jpg', 26000, 'In Stock', '2023-11-20', '2024-10-06'),
 (N'Dầu ăn Neptune Light 1 lít', N'chai', 4, 10, N'Xuất xứ: Việt Nam', 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/2286/226995/bhx/226995-slide_202409121350273101.jpg', 56000, 'In Stock', '2023-10-27', '2024-04-15'),
 (N'Dầu hạt cải Simply 1 lít', N'chai', 4, 10, N'Xuất xứ: Việt Nam', 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/2286/76167/bhx/76167-slide_202409121329357392.jpg', 60000, 'In Stock', '2023-11-24', '2024-08-23'),
 (N'Gạo thơm ST25 túi 5kg', N'túi', 6, 11, N'Xuất xứ: Việt Nam', 'https://cdn.tgdd.vn/Products/Images/2513/296941/bhx/gao-thom-vua-gao-st25-lua-tom-tui-5kg-202211170832226107.jpg', 190000, 'In Stock', '2024-02-10', '2024-07-07'),
 (N'Đậu nành gói 500g', N'gói', 6, 11, N'Xuất xứ: Việt Nam', 'https://cdn.tgdd.vn/Products/Images/3235/252811/bhx/dau-nanh-naita-500g-202204161723244150.jpg', 22500, 'In Stock', '2024-01-13', '2024-06-17'),
 (N'Khoai tây túi 1kg', N'kg', 6, 12, N'Xuất xứ: Việt Nam', 'https://cdn.tgdd.vn/Products/Images/8785/230468/bhx/khoai-tay-202312260932510974.jpg', 30000, 'In Stock', '2023-10-20', '2024-03-30'),
 (N'Cà rốt túi 1kg', N'kg', 6, 12, N'Xuất xứ: Việt Nam', 'https://cdn.tgdd.vn/Products/Images/8785/234529/bhx/ca-rot-202312081116076334.jpg', 22000, 'In Stock', '2024-01-19', '2024-04-25'),
 (N'Bí đỏ hồ lô 1kg', N'kg', 6, 12, N'Xuất xứ: Việt Nam', 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8785/278777/bhx/cdntgddvnproductsimages8785232929bhxbi-do-ho-lo-tui-700g-202012282211431952_202409241058210607.jpg', 18000, 'In Stock', '2023-10-30', '2024-07-03');

INSERT INTO [dbo].[Gallery]
           (productId, [src])
VALUES 
	 (1, 'https://cdn.tgdd.vn/Products/Images/8788/226966/bhx/dua-hau-khong-hat-trai-tu-2-kg-tro-len-202408201609417371.jpg'), 
	 (1, 'https://cdn.tgdd.vn/Products/Images/8788/226966/bhx/dua-hau-khong-hat-trai-tu-2-kg-tro-len-202408201609082446.jpg'), 
	 (1, 'https://cdn.tgdd.vn/Products/Images/8788/226966/bhx/dua-hau-khong-hat-trai-tu-2-kg-tro-len-202408201608358631.jpg'),
	 (2, 'https://cdn.tgdd.vn/Products/Images/8788/314978/bhx/3-trai-dua-xiem-got-vo-300-400g-trai-202408201600113399.jpg'), 
	 (2, 'https://cdn.tgdd.vn/Products/Images/8788/314978/bhx/3-trai-dua-xiem-got-vo-300-400g-trai-202408201559391014.jpg'), 
	 (2, 'https://cdn.tgdd.vn/Products/Images/8788/314978/bhx/3-trai-dua-xiem-got-vo-300-400g-trai-202408201559406078.jpg'),
	 (3, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8788/238689/bhx/httpscdnv2tgddvnbhx-staticbhxproductsimages8788238665bhx273990-1-min202409061459382694_202410040912443414.jpg'),
	 (3, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8788/238689/bhx/httpscdnv2tgddvnbhx-staticbhxproductsimages8788238665bhx273990-3-min202409061459392041_202410040912449748.jpg'),
	 (3, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8788/238689/bhx/httpscdnv2tgddvnbhx-staticbhxproductsimages8788238665bhx273990-5-min202409061459399169_202410040912461303.jpg'),
	 (4, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8788/313132/bhx/httpscdnv2tgddvnbhx-staticbhxproductsimages8788228923bhx2071626683-min202409061335245917_202409301414313078.jpg'),
	 (4, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8788/313132/bhx/httpscdnv2tgddvnbhx-staticbhxproductsimages8788228923bhx2071626684-min202409061335252071_202409301414315640.jpg'),
	 (4, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8788/313132/bhx/httpscdnv2tgddvnbhx-staticbhxproductsimages8788228923bhx232740-4-min202409061335265665_202409301414321439.jpg'),
	 (5, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8788/321604/bhx/2071626628-min_202410111600443762.jpg'),
	 (5, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8788/321604/bhx/2071626631-min_202410111600446487.jpg'),
	 (5, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8788/321604/bhx/2071626629-min_202410111600457005.jpg'),
	 (6, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8820/238556/bhx/238556_202408311247184287.jpg'),
	 (6, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8820/238556/bhx/238556-1_202408311247180784.jpg'),
	 (6, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8820/238556/bhx/238556-2_202408311247175050.jpg'),
	 (7, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8820/222855/bhx/222855_202408311319018427.jpg'),
	 (7, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8820/222855/bhx/222855-1_202408311319005770.jpg'),
	 (7, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8820/222855/bhx/222855-2_202408311319008234.jpg'),
	 (8, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8820/271747/bhx/271747_202408311344313070.jpg'),
	 (8, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8820/271747/bhx/271747-1_202408311344307462.jpg'),
	 (8, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8820/271747/bhx/271747-2_202408311344309973.jpg'),
	 (9, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8820/325723/bhx/325723-1_202408301737534479.jpg'),
	 (9, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8820/325723/bhx/325723-2_202408301737537597.jpg'),
	 (9, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8820/325723/bhx/325723-4_202408301737542207.jpg'),
	 (10, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8782/244404/bhx/244404_202408291109558384.jpg'),
	 (10, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8782/244404/bhx/244404-1_202408291109547064.jpg'),
	 (10, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8782/244404/bhx/244404-2_202408291109543422.jpg'),
	 (11, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8782/244404/bhx/244404_202408291109558384.jpg'),
	 (11, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8782/244404/bhx/244404-1_202408291109547064.jpg'),
	 (11, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8782/244404/bhx/244404-2_202408291109543422.jpg'),
	 (12, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8782/313071/bhx/313071-1_202408291116274280.jpg'),
	 (12, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8782/313071/bhx/313071-2_202408291116269551.jpg'),
	 (12, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8782/313071/bhx/313071-3_202408291116264930.jpg'),
	 (13, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8782/319747/bhx/slide-319747-6-1_202408281631496359.jpg'),
	 (13, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8782/319747/bhx/slide-319747-3-1_202408281631509263.jpg'),
	 (13, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8782/319747/bhx/slide-319747-2-1_202408281631512262.jpg'),
	 (14, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8782/303078/bhx/2071627209-min_202409201440074562.jpg'),
	 (14, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8782/303078/bhx/2071627214-min_202409201440077259.jpg'),
	 (14, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8782/303078/bhx/2071627211-min_202409201440079781.jpg'),
	 (15, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8782/220487/bhx/220487_202408282326059104.jpg'),
	 (15, 'https://cdn.tgdd.vn/Products/Images/8782/220487/bhx/ca-loc-da-lam-sach-202408161532452975.jpg'),
	 (15, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8782/220487/bhx/220487-2_202408282326057023.jpg'),
	 (16, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8781/226856/bhx/226856_202408291059167950.png'),
	 (16, 'https://cdn.tgdd.vn/Products/Images/8781/226856/bhx/suon-non-heo-202408141421032792.jpg'),
	 (16, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8781/226856/bhx/2071626641_202408291059157184.jpg'),
	 (17, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8781/241252/bhx/2071627091_202409171316075206.jpg'),
	 (17, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8781/241252/bhx/2071627095-min_202409171316082793.jpg'),
	 (17, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8781/241252/bhx/2071627093-min-min_202409171316086608.jpg'),
	 (18, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8139/233807/bhx/233807-1_202408272150044503.jpg'),
	 (18, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8139/233807/bhx/233807-3_202408272150049322.jpg'),
	 (18, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8139/233807/bhx/233807-4_202408272150051813.jpg'),
	 (19, 'https://cdn.tgdd.vn/Products/Images/8139/304178/bhx/bap-bo-fohla-250g-202408271355413759.jpg'),
	 (19, 'https://cdn.tgdd.vn/Products/Images/8139/304178/bhx/bap-bo-fohla-250g-202408141154317094.jpg'),
	 (19, 'https://cdn.tgdd.vn/Products/Images/8139/304178/bhx/bap-bo-fohla-250g-202408271354479170.jpg'),
	 (20, 'https://cdn.tgdd.vn/Products/Images/8790/316860/bhx/ga-vuon-dat-do-202404161452126468.jpg'),
	 (20, 'https://cdn.tgdd.vn/Products/Images/8790/316860/bhx/ga-vuon-dat-do-202408141059045410.jpg'),
	 (20, 'https://cdn.tgdd.vn/Products/Images/8790/316860/bhx/ga-vuon-dat-do-202404161452129898.jpg'),
	 (21, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8790/226946/bhx/226946_202408280852287269.jpg'),
	 (21, 'https://cdn.tgdd.vn/Products/Images/8790/226946/bhx/dui-ga-goc-tu-202408141056485561.jpg'),
	 (21, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8790/226946/bhx/226946-4_202408280852279131.jpg'),
	 (22, 'https://cdn.tgdd.vn/Products/Images/2282/214410/bhx/thung-20-lon-bia-budweiser-330ml-202202101048047004.jpg'),
	 (22, 'https://cdn.tgdd.vn/Products/Images/2282/214410/bhx/thung-20-lon-bia-budweiser-330ml-202112272050382352.jpg'),
	 (23, 'https://cdn.tgdd.vn/Products/Images/2282/316846/bhx/thung-24-lon-bia-tiger-lon-cao-330ml-202311041013332173.jpg'),
	 (23, 'https://cdn.tgdd.vn/Products/Images/2282/316846/bhx/thung-24-lon-bia-tiger-lon-cao-330ml-202311041013346163.jpg'),
	 (24, 'https://cdn.tgdd.vn/Products/Images/2386/223740/bhx/thung-48-hop-sua-tuoi-tiet-trung-it-duong-dalat-milk-180ml-202202210757459213.jpg'),
	 (24, 'https://cdn.tgdd.vn/Products/Images/2386/223740/bhx/thung-48-hop-sua-tuoi-tiet-trung-it-duong-dalat-milk-180ml-202006110911277331.jpg'),
	 (25, 'https://cdn.tgdd.vn/Products/Images/7599/206646/bhx/pho-mai-vinamilk-hop-120g-8-mieng-202202110806159787.jpg'),
	 (25, 'https://cdn.tgdd.vn/Products/Images/7599/206646/bhx/pho-mai-vinamilk-hop-120g-8-mieng-201907191041362061.jpg'),
	 (26, 'https://cdn.tgdd.vn/Products/Images/3357/302645/bhx/banh-cracker-vi-com-non-afc-dinh-duong-hop-109g-202302170847521839.png'),
	 (26, 'https://cdn.tgdd.vn/Products/Images/3357/302645/bhx/banh-cracker-vi-com-non-afc-dinh-duong-hop-109g-202302170839326627.jpg'),
	 (26, 'https://cdn.tgdd.vn/Products/Images/3357/302645/bhx/banh-cracker-vi-com-non-afc-dinh-duong-hop-109g-202302170839329189.jpg'),
	 (27, 'https://cdn.tgdd.vn/Products/Images/7622/242620/bhx/sellingpoint.jpg'),
	 (27, 'https://cdn.tgdd.vn/Products/Images/7622/242620/bhx/banh-socola-pie-oreo-cadbury-hop-180g-202106290830092007.jpg'),
	 (27, 'https://cdn.tgdd.vn/Products/Images/7622/242620/bhx/banh-socola-pie-oreo-cadbury-hop-180g-202106290830097337.jpg'),
	 (28, 'https://cdn.tgdd.vn/Products/Images/2804/321751/bhx/duong-vang-quang-ngai-goi-1kg-202401251130536710.jpg'),
	 (28, 'https://cdn.tgdd.vn/Products/Images/2804/321751/bhx/duong-vang-quang-ngai-goi-1kg-202403121131053681.jpg'),
	 (29, 'https://cdn.tgdd.vn/Products/Images/2567/213563/bhx/tuong-ot-chinsu-chai-500g-202202161409526384.jpg'),
	 (29, 'https://cdn.tgdd.vn/Products/Images/2567/213563/bhx/tuong-ot-chinsu-chai-500g-201911011615537684.jpg'),
	 (30, 'https://cdn.tgdd.vn/Products/Images/2809/225392/bhx/tieu-den-xay-phu-quoc-dh-foods-hu-45g-202203112125397277.png'),
	 (30, 'https://cdn.tgdd.vn/Products/Images/2809/225392/bhx/tieu-den-xay-phu-quoc-dh-foods-hu-45g-202007031339243738.jpg'),
	 (31, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8783/311111/bhx/1742018738-min_202408281523595060.png'),
	 (31, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8783/311111/bhx/1742018700-min_202408281523599627.jpg'),
	 (31, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8783/311111/bhx/2071627178-min_202409191018357417.jpg'),
	 (32, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8783/311102/bhx/1742018767-min_202408281534303171.png'),
	 (32, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8783/311102/bhx/1742018768-min_202408281534309270.jpg'),
	 (33, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8783/311101/bhx/1742018745-min_202408281531510267.png'),
	 (33, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8783/311101/bhx/1742018746-min_202408281531515807.jpg'),
	 (34, 'https://cdn.tgdd.vn/Products/Images/2286/226995/bhx/sellingpoint.jpg'),
	 (34, 'https://cdn.tgdd.vn/Products/Images/2286/226995/bhx/dau-an-thuong-hang-neptune-light-chai-1-lit-202203281108121125.jpg'),
	 (35, 'https://cdn.tgdd.vn/Products/Images/2286/76167/bhx/dau-hat-cai-nguyen-chat-simply-chai-1-lit-202308081411591473.jpg'),
	 (35, 'https://cdn.tgdd.vn/Products/Images/2286/76167/bhx/dau-hat-cai-nguyen-chat-simply-chai-1-lit-202106031419193243.jpg'),
	 (36, 'https://cdn.tgdd.vn/Products/Images/2513/296941/bhx/sellingpoint.jpg'),
	 (36, 'https://cdn.tgdd.vn/Products/Images/2513/296941/bhx/gao-thom-vua-gao-st25-lua-tom-tui-5kg-202211170832234402.jpg'),
	 (37, 'https://cdn.tgdd.vn/Products/Images/3235/252811/bhx/dau-nanh-naita-500g-202204161723251336.jpg'),
	 (37, 'https://cdn.tgdd.vn/Products/Images/3235/252811/bhx/dau-nanh-goi-500g-202210031640478227.jpg'),
	 (38, 'https://cdn.tgdd.vn/Products/Images/8785/230468/bhx/khoai-tay-202312260932528281.jpg'),
	 (38, 'https://cdn.tgdd.vn/Products/Images/8785/230468/bhx/khoai-tay-cu-tu-130g-tro-len-202408141424016638.jpg'),
	 (39, 'https://cdn.tgdd.vn/Products/Images/8785/234529/bhx/ca-rot-202312081116078792.jpg'),
	 (39, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8785/234529/bhx/234529-1-1_202409051021237050.jpg'),
	 (40, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8785/278777/bhx/httpscdnv2tgddvnbhx-staticbhxproductsimages8785233887bhx233887202409041110435987_202409241058215298.png'),
	 (40, 'https://cdnv2.tgdd.vn/bhx-static/bhx/Products/Images/8785/278777/bhx/cdntgddvnproductsimages8785233887bhxbi-do-ho-lo-trai-tu-700g-tro-len-202408141431325331_202409241058220297.jpg');

INSERT INTO Receipts (dateinput, supplierid) 
VALUES 
    (DATEADD(DAY, -55, GETDATE()), 6),		--1  củ quả hạt (hết hạn)		-sp6
    (DATEADD(DAY, -50, GETDATE()), 1),		--2  rau (hết hạn)				-sp1
    (DATEADD(DAY, -45, GETDATE()), 3),		--3  thịt (hết hạn)				-sp5
    (DATEADD(DAY, -40, GETDATE()), 4),		--4  hải sản (hết hạn)			-sp2
    (DATEADD(DAY, -35, GETDATE()), 4),		--5  nước, gia vị, dầu, snack	-sp4
    (DATEADD(DAY, -20, GETDATE()), 3),		--6  sữa, phô mai				-sp3
    (DATEADD(DAY, -10, GETDATE()), 5),		--7  thịt						-sp5
    (DATEADD(DAY, -10, GETDATE()), 2),		--8  hải sản					-sp2
    (DATEADD(DAY, -2, GETDATE()), 1),		--9  rau, trái cây				-sp1
    (DATEADD(DAY, -2, GETDATE()), 6);		--10 củ quả hạt					-sp6

INSERT INTO ReceiptDetails 
	(receiptId, productId, quantity, inputPrice, expiryDate)
VALUES 
	(1        , 1        , 30     , 30000     , DATEADD(DAY, -41, GETDATE())),
	(1        , 2        , 30     , 5000     , DATEADD(DAY, -30, GETDATE())),
	(1        , 3        , 50     , 25000     , DATEADD(DAY, -35, GETDATE())),
	(2        , 6        , 30     , 3000     , DATEADD(DAY, -41, GETDATE())),
	(2        , 7        , 30     , 6000     , DATEADD(DAY, -41, GETDATE())),
	(3        , 16       , 50     , 50000     , DATEADD(DAY, -15, GETDATE())),
	(3        , 17       , 55     , 95000     , DATEADD(DAY, -15, GETDATE())),
	(3        , 18       , 50     , 55000     , DATEADD(DAY, -15, GETDATE())),
	(4        , 11       , 50     , 25000     , DATEADD(DAY, -18, GETDATE())),
	(4        , 12       , 55     , 60000     , DATEADD(DAY, -18, GETDATE())),
	(4        , 13       , 65     , 30000     , DATEADD(DAY, -18, GETDATE())),
	(5        , 22        , 30    , 251000    , DATEADD(MONTH, 5, GETDATE())),
	(5        , 23        , 30    , 300000    , DATEADD(MONTH, 5, GETDATE())),
	(5        , 26        , 50   , 18000     , DATEADD(MONTH, 5, GETDATE())),
	(5        , 27        , 50   , 20000     , DATEADD(MONTH, 5, GETDATE())),
	(5        , 28        , 50   , 22000     , DATEADD(MONTH, 5, GETDATE())),
	(5        , 29        , 50   , 25000     , DATEADD(MONTH, 5, GETDATE())),
	(5        , 30        , 50   , 20000     , DATEADD(MONTH, 5, GETDATE())),
	(5        , 34        , 60    , 48000     , DATEADD(MONTH, 7, GETDATE())),
	(5        , 35        , 60    , 50000     , DATEADD(MONTH, 7, GETDATE())),
	(6        , 24        , 30     , 360000    , DATEADD(MONTH, 5, GETDATE())),
	(6        , 25        , 100    , 20000     , DATEADD(DAY, 10, GETDATE())),
	(6        , 31        , 150    , 15000     , DATEADD(DAY, 13, GETDATE())),
	(6        , 32        , 100    , 30000     , DATEADD(DAY, 13, GETDATE())),
	(6        , 33        , 130    , 20000     , DATEADD(DAY, 13, GETDATE())),
	(7        , 16        , 70     , 50000     , DATEADD(DAY, 20, GETDATE())),
	(7        , 17        , 75     , 95000     , DATEADD(DAY, 20, GETDATE())),
	(7        , 18        , 74     , 55000     , DATEADD(DAY, 20, GETDATE())),
	(7        , 19        , 70     , 80000     , DATEADD(DAY, 20, GETDATE())),
	(7        , 20        , 30     , 100000    , DATEADD(DAY, 20, GETDATE())),
	(7        , 21        , 30     , 20000    , DATEADD(DAY, 20, GETDATE())),
	(8        , 11        , 50     , 25000     , DATEADD(DAY, 20, GETDATE())),
	(8        , 12        , 55     , 60000     , DATEADD(DAY, 20, GETDATE())),
	(8        , 13        , 65     , 30000     , DATEADD(DAY, 20, GETDATE())),
	(8        , 14        , 70     , 51000     , DATEADD(DAY, 20, GETDATE())),
	(8        , 15        , 70     , 10000     , DATEADD(DAY, 20, GETDATE())),
	(9        , 6        , 40     , 2000     , DATEADD(DAY, 6, GETDATE())),
	(9        , 7        , 40     , 5000     , DATEADD(DAY, 6, GETDATE())),
	(9        , 8        , 40     , 5000     , DATEADD(DAY, 6, GETDATE())),
	(9        , 9        , 40     , 6000     , DATEADD(DAY, 6, GETDATE())),
	(9        , 10       , 40     , 4000     , DATEADD(DAY, 6, GETDATE())),
	(10        , 1         , 70     , 30000     , DATEADD(DAY, 12, GETDATE())),
	(10        , 2         , 70     , 5000      , DATEADD(DAY, 12, GETDATE())),
	(10        , 3         , 70     , 25000     , DATEADD(DAY, 12, GETDATE())),
	(10        , 4         , 35     , 18000     , DATEADD(DAY, 12, GETDATE())),
	(10        , 5         , 35     , 11000     , DATEADD(DAY, 12, GETDATE())),
	(10        , 36        , 40     , 170000    , DATEADD(DAY, 12, GETDATE())),
	(10        , 37        , 40     , 18000     , DATEADD(DAY, 12, GETDATE())),
	(10        , 38        , 50     , 23000     , DATEADD(DAY, 12, GETDATE())),
	(10        , 39        , 50     , 18000     , DATEADD(DAY, 12, GETDATE())),
	(10        , 40        , 50     , 13000     , DATEADD(DAY, 12, GETDATE()));

--Đã bỏ createAt vì ko cẩn thiết
INSERT INTO BatchesProduct (receiptDetailId, productId, quantity, expiryDate)  
VALUES   
	(1, 1 , 20  , DATEADD(DAY, -41, GETDATE())),  
	(2, 2 , 25  , DATEADD(DAY, -30, GETDATE())),  
	(3, 3 , 40  , DATEADD(DAY, -35, GETDATE())),  
	(4, 6 , 30  , DATEADD(DAY, -41, GETDATE())),  
	(5, 7 , 30  , DATEADD(DAY, -41, GETDATE())),  
	(6, 16, 50  , DATEADD(DAY, -15, GETDATE())),  
	(7, 17, 55  , DATEADD(DAY, -15, GETDATE())),  
	(8, 18, 50  , DATEADD(DAY, -15, GETDATE())),  
	(9, 11, 47  , DATEADD(DAY, -18, GETDATE())),  
	(10, 12, 50 , DATEADD(DAY, -18, GETDATE())),  
	(11, 13, 60 , DATEADD(DAY, -18, GETDATE())),  
	(12, 22, 19 , DATEADD(MONTH, 5, GETDATE())),  
	(13, 23, 20 , DATEADD(MONTH, 5, GETDATE())),  
	(14, 26, 50, DATEADD(MONTH, 5, GETDATE())),  
	(15, 27, 50, DATEADD(MONTH, 5, GETDATE())),  
	(16, 28, 50, DATEADD(MONTH, 5, GETDATE())),  
	(17, 29, 50, DATEADD(MONTH, 5, GETDATE())),  
	(18, 30, 50, DATEADD(MONTH, 5, GETDATE())),  
	(19, 34, 60 , DATEADD(MONTH, 7, GETDATE())),  
	(20, 35, 60 , DATEADD(MONTH, 7, GETDATE())),  
	(21, 24, 26 , DATEADD(MONTH, 5, GETDATE())),  
	(22, 25, 100, DATEADD(DAY, 10, GETDATE())),  
	(23, 31, 150, DATEADD(DAY, 13, GETDATE())),  
	(24, 32, 100, DATEADD(DAY, 13, GETDATE())),  
	(25, 33, 130, DATEADD(DAY, 13, GETDATE())),  
	(26, 16, 70 , DATEADD(DAY, 20, GETDATE())),  
	(27, 17, 75 , DATEADD(DAY, 20, GETDATE())),  
	(28, 18, 74 , DATEADD(DAY, 20, GETDATE())),  
	(29, 19, 30 , DATEADD(DAY, 20, GETDATE())),  
	(30, 20, 5 , DATEADD(DAY, 20, GETDATE())),
	(31, 21, 20 , DATEADD(DAY, 20, GETDATE())),
	(32, 11, 50 , DATEADD(DAY, 20, GETDATE())),  
	(33, 12, 55 , DATEADD(DAY, 20, GETDATE())),  
	(34, 13, 40 , DATEADD(DAY, 20, GETDATE())),  
	(35, 14, 25 , DATEADD(DAY, 20, GETDATE())),  
	(36, 15, 47 , DATEADD(DAY, 20, GETDATE())),  
	(37, 6 , 40 , DATEADD(DAY, 6, GETDATE())),  
	(38, 7 , 10 , DATEADD(DAY, 6, GETDATE())),  
	(39, 8 , 15 , DATEADD(DAY, 6, GETDATE())),  
	(40, 9 , 20 , DATEADD(DAY, 6, GETDATE())),  
	(41, 10, 40 , DATEADD(DAY, 6, GETDATE())),
	(42, 1 , 55 , DATEADD(DAY, 12, GETDATE())),  
	(43, 2 , 66 , DATEADD(DAY, 12, GETDATE())),  
	(44, 3 , 59 , DATEADD(DAY, 12, GETDATE())),  
	(45, 4 , 35 , DATEADD(DAY, 12, GETDATE())),  
	(46, 5 , 35 , DATEADD(DAY, 12, GETDATE())),  
	(47, 36, 36 , DATEADD(DAY, 12, GETDATE())),  
	(48, 37, 40 , DATEADD(DAY, 12, GETDATE())),  
	(49, 38, 20 , DATEADD(DAY, 12, GETDATE())),  
	(50, 39, 20 , DATEADD(DAY, 12, GETDATE())),  
	(51, 40, 20 , DATEADD(DAY, 12, GETDATE()));

-- 10. Orders (Đơn hàng)
INSERT INTO Orders 
	(userId, shippingFee, isConfirmed, paymentStatus, deliveryStatus, paymentType, deliveryLocation, receiverName, receiverPhone, shipperId, orderCreatedAt)
VALUES 
	(3, 20000, 1, 'Waiting',    'Waiting',		'Cash', '123 Le Loi, Q1, TP.HCM', 'Nguyen Van A', '0912345678', 1, DATEADD(DAY, -9, GETDATE())),			--dang giao
	(2, 20000, 1, 'Paid',		'Delivered',		'QRCode', '456 Nguyen Trai, Q5, TP.HCM', 'Le Thi B', '0987654321', 2, DATEADD(DAY, -9, GETDATE())),			--dang giao
	(5, 20000, 1, 'Waiting',	'Shipping',		'Cash', '789 Hai Ba Trung, Q3, TP.HCM', 'Tran Van C', '0909090909', 3, GETDATE()),							--dang giao
	(4, 20000, 1, 'Paid',		'Delivered',	'QRCode', '101 Tran Hung Dao, Q1, TP.HCM', 'Hoang Van D', '0911111111', 2, DATEADD(DAY, -35, GETDATE())),	--tc cũ
	(2, 20000, 0, 'Watting',	'Waiting',		'Cash', '202 Le Van Sy, Q3, TP.HCM', 'Phan Thi E', '0922222222', 3, GETDATE()),								--chưa xác nhận (gốc)
	(6, 20000, 1, 'Waiting',	'Waiting',		'Cash', '303 Nguyen Thi Minh Khai, Q1, TP.HCM', 'Nguyen Thi F', '0933333333', 1, GETDATE()),				--dang giao
	(7, 20000, 1, 'Paid',		'Delivered',	'Cash', '404 Nguyen Van Cu, Q5, TP.HCM', 'Bui Van G', '0944444444', 1, DATEADD(DAY, -40, GETDATE())),		--tc cũ
	(8, 20000, 1, 'Paid',		'Delivered',	'Cash', '505 Le Duan, Q3, TP.HCM', 'Trinh Thi H', '0955555555', 2, DATEADD(DAY, -1, GETDATE())),				--tc
	(9, 20000, 1, 'Paid',		'Delivered',	'Cash', '606 Le Lai, Q1, TP.HCM', 'Vu Van I', '0966666666', 2, DATEADD(DAY, -9, GETDATE())),					--tc
	(10, 20000, 1,'Paid',		'Delivered',	'Cash', '707 Nguyen Thi Minh Khai, Q5, TP.HCM', 'Nguyen Van J', '0977777777', 3, DATEADD(DAY, -9, GETDATE()));	--tc

-- 11. OrderDetails (Chi tiết đơn hàng)
INSERT INTO OrderDetails 
	(orderId, batchId, unitPriceOut, quantity)
VALUES 
	--Đơn đã tc cũ
	(4, 1, 38000, 10), 
	(4, 2, 10000, 5), 
	(4, 3, 39000, 10),	--done
	(7, 9, 33000, 3),			--product 11, 12, 13
	(7, 10, 75000, 5), 
	(7, 11, 40000, 5),	--done
	--Đơn mới đã tc
	(8, 42, 38000, 15),			--product 1,2,3
	(8, 43, 10000, 4), 
	(8, 44, 39000, 11),	--done
	(9, 34, 40000, 25),			--product 13, 14, 15
	(9, 35, 60000, 30), 
	(9, 36, 28000, 23),	--done
	(10, 30, 128000, 10),		--product 20, 21, 22
	(10, 31, 30000, 30), 
	(10, 12, 292000, 11), --done
	--Đơn đang giao và chưa xác nhận
	(1, 13, 350000, 10),	--dơn cho user 3, product 23, 36, 19
	(1, 47, 190000, 4),
	(1, 29, 92000, 40),	--done
	(2, 35, 60000, 15),		--dơn cho user 2, product 14, 24, 20
	(2, 21, 396000, 4),
	(2, 30, 128000, 15),--done
	(3, 49, 30000, 30),		--dơn cho user 5, product 38,39,40
	(3, 50, 22000, 30),
	(3, 51, 18000, 30),	--done
	(5, 42, 30000, 5),		--dơn cho user 2 chưa xác nhận, product 1, 2, 12
	(5, 43, 22000, 4),
	(5, 33, 18000, 2), --done
	(6, 38, 30000, 30),		--dơn cho user 6, product 7, 8, 9
	(6, 39, 22000, 25),
	(6, 40, 18000, 20); --done

-- 12. Promos (Khuyến mãi)
INSERT INTO Promos (productId, quantitySale, discount, startDate, endDate)
VALUES 
(1, 20, 10.00, GETDATE(), DATEADD(day, 10, GETDATE())), 
(2, 10, 15.00, GETDATE(), DATEADD(day, 10, GETDATE())), 
(3, 5, 20.00, GETDATE(), DATEADD(day, 20, GETDATE())), 
(4, 30, 5.00, GETDATE(), DATEADD(day, 20, GETDATE())), 
(5, 50, 10.00, GETDATE(), DATEADD(day, 10, GETDATE())), 
(6, 20, 5.00, GETDATE(), DATEADD(day, 10, GETDATE())), 
(7, 15, 10.00, GETDATE(), DATEADD(day, 10, GETDATE())), 
(8, 25, 5.00, GETDATE(), DATEADD(day, 10, GETDATE())), 
(9, 10, 15.00, GETDATE(), DATEADD(day, 10, GETDATE())), 
(10, 8, 5.00, GETDATE(), DATEADD(day, 25, GETDATE())),
(11, 20, 0, DATEADD(day, -2, GETDATE()), DATEADD(day, -1, GETDATE())), 
(12, 20, 0, DATEADD(day, -2, GETDATE()), DATEADD(day, -1, GETDATE())), 
(13, 20, 0, DATEADD(day, -2, GETDATE()), DATEADD(day, -1, GETDATE())), 
(14, 20, 0, DATEADD(day, -2, GETDATE()), DATEADD(day, -1, GETDATE())), 
(15, 20, 0, DATEADD(day, -2, GETDATE()), DATEADD(day, -1, GETDATE())), 
(16, 20, 0, DATEADD(day, -2, GETDATE()), DATEADD(day, -1, GETDATE())), 
(17, 20, 0, DATEADD(day, -2, GETDATE()), DATEADD(day, -1, GETDATE())), 
(18, 20, 0, DATEADD(day, -2, GETDATE()), DATEADD(day, -1, GETDATE())), 
(19, 20, 0, DATEADD(day, -2, GETDATE()), DATEADD(day, -1, GETDATE())), 
(20, 20, 0, DATEADD(day, -2, GETDATE()), DATEADD(day, -1, GETDATE())),
(21, 20, 0, DATEADD(day, -2, GETDATE()), DATEADD(day, -1, GETDATE())), 
(22, 20, 0, DATEADD(day, -2, GETDATE()), DATEADD(day, -1, GETDATE())), 
(23, 20, 0, DATEADD(day, -2, GETDATE()), DATEADD(day, -1, GETDATE())), 
(24, 20, 0, DATEADD(day, -2, GETDATE()), DATEADD(day, -1, GETDATE())), 
(25, 20, 0, DATEADD(day, -2, GETDATE()), DATEADD(day, -1, GETDATE())), 
(26, 20, 0, DATEADD(day, -2, GETDATE()), DATEADD(day, -1, GETDATE())), 
(27, 20, 0, DATEADD(day, -2, GETDATE()), DATEADD(day, -1, GETDATE())), 
(28, 20, 0, DATEADD(day, -2, GETDATE()), DATEADD(day, -1, GETDATE())), 
(29, 20, 0, DATEADD(day, -2, GETDATE()), DATEADD(day, -1, GETDATE())), 
(30, 20, 0, DATEADD(day, -2, GETDATE()), DATEADD(day, -1, GETDATE())),
(31, 20, 0, DATEADD(day, -2, GETDATE()), DATEADD(day, -1, GETDATE())), 
(32, 20, 0, DATEADD(day, -2, GETDATE()), DATEADD(day, -1, GETDATE())), 
(33, 20, 0, DATEADD(day, -2, GETDATE()), DATEADD(day, -1, GETDATE())), 
(34, 20, 0, DATEADD(day, -2, GETDATE()), DATEADD(day, -1, GETDATE())), 
(35, 20, 0, DATEADD(day, -2, GETDATE()), DATEADD(day, -1, GETDATE())), 
(36, 20, 0, DATEADD(day, -2, GETDATE()), DATEADD(day, -1, GETDATE())), 
(37, 20, 0, DATEADD(day, -2, GETDATE()), DATEADD(day, -1, GETDATE())), 
(38, 20, 0, DATEADD(day, -2, GETDATE()), DATEADD(day, -1, GETDATE())), 
(39, 20, 0, DATEADD(day, -2, GETDATE()), DATEADD(day, -1, GETDATE())), 
(40, 20, 0, DATEADD(day, -2, GETDATE()), DATEADD(day, -1, GETDATE()));



--Script xóa bảng và nội dung
-- Xóa tất cả các ràng buộc khóa ngoại
/*
USE FreshFoodStore;
DECLARE @sql NVARCHAR(MAX) = N'';
SELECT @sql += 'ALTER TABLE ' + QUOTENAME(OBJECT_SCHEMA_NAME(f.parent_object_id)) + '.' 
              + QUOTENAME(OBJECT_NAME(f.parent_object_id)) 
              + ' DROP CONSTRAINT ' + QUOTENAME(f.name) + ';' + CHAR(13)
FROM sys.foreign_keys AS f;

EXEC sp_executesql @sql;

-- Xóa tất cả các bảng
DECLARE @dropTables NVARCHAR(MAX) = N'';
SELECT @dropTables += 'DROP TABLE IF EXISTS ' + QUOTENAME(OBJECT_SCHEMA_NAME(t.object_id)) 
                    + '.' + QUOTENAME(t.name) + ';' + CHAR(13)
FROM sys.tables AS t;

EXEC sp_executesql @dropTables;
GO
*/