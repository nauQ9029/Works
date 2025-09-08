﻿/****** Object:  Database [G2HotelTest]    Script Date: 3/14/2025 10:24:28 AM ******/
CREATE DATABASE [G2HotelTest]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'G2HotelTest', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\G2HotelTest.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'G2HotelTest_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\G2HotelTest_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [G2HotelTest] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [G2HotelTest].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [G2HotelTest] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [G2HotelTest] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [G2HotelTest] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [G2HotelTest] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [G2HotelTest] SET ARITHABORT OFF 
GO
ALTER DATABASE [G2HotelTest] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [G2HotelTest] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [G2HotelTest] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [G2HotelTest] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [G2HotelTest] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [G2HotelTest] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [G2HotelTest] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [G2HotelTest] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [G2HotelTest] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [G2HotelTest] SET  ENABLE_BROKER 
GO
ALTER DATABASE [G2HotelTest] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [G2HotelTest] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [G2HotelTest] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [G2HotelTest] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [G2HotelTest] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [G2HotelTest] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [G2HotelTest] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [G2HotelTest] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [G2HotelTest] SET  MULTI_USER 
GO
ALTER DATABASE [G2HotelTest] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [G2HotelTest] SET DB_CHAINING OFF 
GO
ALTER DATABASE [G2HotelTest] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [G2HotelTest] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [G2HotelTest] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [G2HotelTest] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [G2HotelTest] SET QUERY_STORE = ON
GO
ALTER DATABASE [G2HotelTest] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [G2HotelTest]
GO
/****** Object:  Table [dbo].[Account]    Script Date: 3/14/2025 10:24:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Account](
	[IDAccount] [int] IDENTITY(1,1) NOT NULL,
	[FullName] [nvarchar](100) NULL,
	[Gender] [nvarchar](10) NULL,
	[City] [nvarchar](50) NULL,
	[Email] [nvarchar](100) NULL,
	[Phone] [nvarchar](20) NULL,
	[UserName] [nvarchar](50) NULL,
	[Pass] [nvarchar](50) NULL,
	[IDRole] [int] NULL,
	[IsActive] [bit] NULL,
	[IsBan] [bit] NULL,
PRIMARY KEY CLUSTERED 
(
	[IDAccount] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BookingDetail]    Script Date: 3/14/2025 10:24:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BookingDetail](
	[IDBookingDetail] [int] NOT NULL,
	[IDRoomType] [int] NOT NULL,
	[NumberOfRoom] [int] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[BookingDetails]    Script Date: 3/14/2025 10:24:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BookingDetails](
	[IDBooking] [int] IDENTITY(1,1) NOT NULL,
	[IDAccount] [int] NULL,
	[IDDiscount] [int] NULL,
	[FullName] [nvarchar](50) NULL,
	[Gender] [nvarchar](20) NULL,
	[Email] [nvarchar](50) NULL,
	[Phone] [nvarchar](20) NULL,
	[Adult] [int] NULL,
	[Child] [int] NULL,
	[Checkin] [date] NULL,
	[Checkout] [date] NULL,
	[TotalPrice] [int] NULL,
	[BookingTime] [date] NULL,
	[Note] [nvarchar](50) NULL,
	[isCancel] [bit] NULL,
 CONSTRAINT [PK__BookingD__B20896CF88BC2645] PRIMARY KEY CLUSTERED 
(
	[IDBooking] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Contact]    Script Date: 3/14/2025 10:24:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Contact](
	[IDContact] [int] IDENTITY(1,1) NOT NULL,
	[IDAccount] [int] NULL,
	[ContactName] [nvarchar](50) NULL,
	[ContactEmail] [nvarchar](50) NULL,
	[ContactPhone] [nvarchar](20) NULL,
	[ContactMessage] [nvarchar](500) NULL,
	[ContactStatus] [nvarchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[IDContact] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Discount]    Script Date: 3/14/2025 10:24:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Discount](
	[IDDiscount] [int] IDENTITY(1,1) NOT NULL,
	[DiscountName] [nvarchar](50) NULL,
	[DiscountValue] [decimal](10, 2) NULL,
	[StartDay] [date] NULL,
	[EndDay] [date] NULL,
	[Note] [nvarchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[IDDiscount] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Feedback]    Script Date: 3/14/2025 10:24:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Feedback](
	[IDFeedback] [int] IDENTITY(1,1) NOT NULL,
	[IDAccount] [int] NULL,
	[IDBooking] [int] NULL,
	[CustomerName] [nvarchar](50) NULL,
	[TimeFeedBack] [datetime] NULL,
	[Content] [nvarchar](255) NULL,
	[Rating] [nvarchar](10) NULL,
	[AdminReply] [nvarchar](500) NULL,
	[ReplyStatus] [nvarchar](20) NULL,
PRIMARY KEY CLUSTERED 
(
	[IDFeedback] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PaymentMethod]    Script Date: 3/14/2025 10:24:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PaymentMethod](
	[IDPayment] [int] NOT NULL,
	[NamePaymentMethod] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[IDPayment] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RoomType]    Script Date: 3/14/2025 10:24:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RoomType](
	[IDRoomType] [int] IDENTITY(1,1) NOT NULL,
	[NameRoomType] [nvarchar](50) NULL,
	[MaxPerson] [int] NULL,
	[NumberOfBed] [int] NULL,
	[NumberOfBath] [int] NULL,
	[Price] [int] NULL,
	[TotalRoom] [int] NULL,
	[RoomStatus] [nvarchar](50) NULL,
	[Content] [nvarchar](max) NULL,
	[Image] [nvarchar](max) NULL,
 CONSTRAINT [PK__RoomType__FCDD8EA6B672CEC6] PRIMARY KEY CLUSTERED 
(
	[IDRoomType] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TransactionInfo]    Script Date: 3/14/2025 10:24:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TransactionInfo](
	[IDTransaction] [int] NOT NULL,
	[IDBooking] [int] IDENTITY(1,1) NOT NULL,
	[IDPayment] [int] NULL,
	[TransInfor] [varchar](255) NULL,
	[TransTime] [datetime] NULL,
	[TransStatus] [varchar](50) NULL,
PRIMARY KEY CLUSTERED 
(
	[IDTransaction] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[BookingDetail]  WITH CHECK ADD  CONSTRAINT [FK_BookingDetail_BookingDetails] FOREIGN KEY([IDBookingDetail])
REFERENCES [dbo].[BookingDetails] ([IDBooking])
GO
ALTER TABLE [dbo].[BookingDetail] CHECK CONSTRAINT [FK_BookingDetail_BookingDetails]
GO
ALTER TABLE [dbo].[BookingDetail]  WITH CHECK ADD  CONSTRAINT [FK_BookingDetail_RoomType] FOREIGN KEY([IDRoomType])
REFERENCES [dbo].[RoomType] ([IDRoomType])
GO
ALTER TABLE [dbo].[BookingDetail] CHECK CONSTRAINT [FK_BookingDetail_RoomType]
GO
ALTER TABLE [dbo].[BookingDetails]  WITH CHECK ADD  CONSTRAINT [FK__BookingDe__IDDis__76969D2E] FOREIGN KEY([IDDiscount])
REFERENCES [dbo].[Discount] ([IDDiscount])
GO
ALTER TABLE [dbo].[BookingDetails] CHECK CONSTRAINT [FK__BookingDe__IDDis__76969D2E]
GO
ALTER TABLE [dbo].[BookingDetails]  WITH CHECK ADD  CONSTRAINT [FK_BookingDetails_Account] FOREIGN KEY([IDAccount])
REFERENCES [dbo].[Account] ([IDAccount])
GO
ALTER TABLE [dbo].[BookingDetails] CHECK CONSTRAINT [FK_BookingDetails_Account]
GO
ALTER TABLE [dbo].[Contact]  WITH CHECK ADD FOREIGN KEY([IDAccount])
REFERENCES [dbo].[Account] ([IDAccount])
GO
ALTER TABLE [dbo].[Feedback]  WITH CHECK ADD FOREIGN KEY([IDAccount])
REFERENCES [dbo].[Account] ([IDAccount])
GO
ALTER TABLE [dbo].[Feedback]  WITH CHECK ADD  CONSTRAINT [FK__Feedback__IDBook__02084FDA] FOREIGN KEY([IDBooking])
REFERENCES [dbo].[BookingDetails] ([IDBooking])
GO
ALTER TABLE [dbo].[Feedback] CHECK CONSTRAINT [FK__Feedback__IDBook__02084FDA]
GO
ALTER TABLE [dbo].[TransactionInfo]  WITH CHECK ADD  CONSTRAINT [FK__Transacti__IDBoo__7A672E12] FOREIGN KEY([IDBooking])
REFERENCES [dbo].[BookingDetails] ([IDBooking])
GO
ALTER TABLE [dbo].[TransactionInfo] CHECK CONSTRAINT [FK__Transacti__IDBoo__7A672E12]
GO
ALTER TABLE [dbo].[TransactionInfo]  WITH CHECK ADD FOREIGN KEY([IDPayment])
REFERENCES [dbo].[PaymentMethod] ([IDPayment])
GO
/****** Object:  StoredProcedure [dbo].[GetAvailableRoomTypes]    Script Date: 3/14/2025 10:24:28 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[GetAvailableRoomTypes]  
    @checkin DATE, 
    @checkout DATE  
AS  
BEGIN  
    WITH RoomBookingSummary AS (
        SELECT 
            rt.IDRoomType,
            rt.TotalRoom,
            ISNULL(SUM(bd.NumberOfRoom), 0) AS BookedRooms
        FROM 
            RoomType rt
        LEFT JOIN 
            BookingDetail bd ON rt.IDRoomType = bd.IDRoomType
        LEFT JOIN 
            BookingDetails b ON bd.IDBookingDetail = b.IDBooking
        WHERE 
            b.isCancel = 0
        AND 
            (b.Checkin < @checkout AND b.Checkout > @checkin) -- Điều kiện lấy các booking trùng với thời gian tìm kiếm
        GROUP BY 
            rt.IDRoomType, rt.TotalRoom
    )
    SELECT 
        rts.IDRoomType,
        rts.NameRoomType,
        rts.MaxPerson,
        rts.NumberOfBed,
        rts.NumberOfBath,
        rts.Price,
        rts.TotalRoom,
        (rts.TotalRoom - rbs.BookedRooms) AS AvailableRooms
    FROM 
        RoomType rts
    LEFT JOIN 
        RoomBookingSummary rbs ON rts.IDRoomType = rbs.IDRoomType
    WHERE 
        (rts.TotalRoom - ISNULL(rbs.BookedRooms, 0)) > 0; -- Kiểm tra số phòng còn trống
END
GO
USE [master]
GO
ALTER DATABASE [G2HotelTest] SET  READ_WRITE 
GO

GO
SET IDENTITY_INSERT [dbo].[Account] ON 

INSERT [dbo].[Account] ([IDAccount], [FullName], [Gender], [City], [Email], [Phone], [UserName], [Pass], [IDRole], [IsActive], [IsBan]) VALUES (1, N'G2Hotel', N'Female', N'Viet Nam', N'g2hotel@gmail.com', N'0113113113', N'owner', N'owner', 4, 1, 0)
INSERT [dbo].[Account] ([IDAccount], [FullName], [Gender], [City], [Email], [Phone], [UserName], [Pass], [IDRole], [IsActive], [IsBan]) VALUES (2, N'Tran Dang Len', N'Male', N'Da Nang', N'leen@gmail.com', N'0986423352', N'admin', N'admin', 2, 1, 0)
INSERT [dbo].[Account] ([IDAccount], [FullName], [Gender], [City], [Email], [Phone], [UserName], [Pass], [IDRole], [IsActive], [IsBan]) VALUES (3, N'Truong Quang Quoc', N'Male', N'Ha Tinh', N'quoctq@gmail.com', N'0321654987', N'rep2', N'rep2', 3, 1, 0)
INSERT [dbo].[Account] ([IDAccount], [FullName], [Gender], [City], [Email], [Phone], [UserName], [Pass], [IDRole], [IsActive], [IsBan]) VALUES (4, N'Luong Ton Hai Yen', N'Female', N'Can Tho', N'haien@gmail.com', N'0332624875', N'rep1', N'rep1', 3, 1, 0)
INSERT [dbo].[Account] ([IDAccount], [FullName], [Gender], [City], [Email], [Phone], [UserName], [Pass], [IDRole], [IsActive], [IsBan]) VALUES (5, N'Le Van Quang', N'Male', N'Da Nang', N'quanglee@gmail.com', N'0197348625', N'rep3', N'rep3', 3, 1, 0)
INSERT [dbo].[Account] ([IDAccount], [FullName], [Gender], [City], [Email], [Phone], [UserName], [Pass], [IDRole], [IsActive], [IsBan]) VALUES (6, N'Tran Van Tuan', N'Male', N'Ho Chi Minh City', N'tuasan@gmail.com', N'0987654321', N'user1', N'pass1', 1, 1, 0)
INSERT [dbo].[Account] ([IDAccount], [FullName], [Gender], [City], [Email], [Phone], [UserName], [Pass], [IDRole], [IsActive], [IsBan]) VALUES (7, N'Den Vau', N'Male', N'Binh Dinh', N'dongam@gmail.com', N'0875641113', N'user2', N'pass2', 1, 1, 0)
INSERT [dbo].[Account] ([IDAccount], [FullName], [Gender], [City], [Email], [Phone], [UserName], [Pass], [IDRole], [IsActive], [IsBan]) VALUES (8, N'Tran Hai Dang', N'Male', N'Da Nang', N'hdang@gmail.com', N'0456123789', N'user3', N'pass3', 1, 1, 0)
INSERT [dbo].[Account] ([IDAccount], [FullName], [Gender], [City], [Email], [Phone], [UserName], [Pass], [IDRole], [IsActive], [IsBan]) VALUES (9, N'Nguyen Thi B', N'Female', N'Quang Ngai', N'nguyenthib@gmail.com', N'0543216798', N'user4', N'pass4', 1, 1, 0)
INSERT [dbo].[Account] ([IDAccount], [FullName], [Gender], [City], [Email], [Phone], [UserName], [Pass], [IDRole], [IsActive], [IsBan]) VALUES (10, N'Nguyen Van Toan', N'Male', N'Quang Binh', N'toandone@gmail.com', N'0258796413', N'user5', N'pass5', 1, 1, 0)
INSERT [dbo].[Account] ([IDAccount], [FullName], [Gender], [City], [Email], [Phone], [UserName], [Pass], [IDRole], [IsActive], [IsBan]) VALUES (11, N'Nguyen Thi Thuy Thu', N'Female', N'Quang Tri', N'dlg@gmail.com', N'0986245137', N'user6', N'pass6', 1, 1, 0)
INSERT [dbo].[Account] ([IDAccount], [FullName], [Gender], [City], [Email], [Phone], [UserName], [Pass], [IDRole], [IsActive], [IsBan]) VALUES (12, N'Tran Minh Thong', N'Male', N'FPT', N'thong@gmail.com', N'0123456789', N'thong0189', N'Thong456@', 1, 1, 0)
INSERT [dbo].[Account] ([IDAccount], [FullName], [Gender], [City], [Email], [Phone], [UserName], [Pass], [IDRole], [IsActive], [IsBan]) VALUES (13, N'Tran Minh Thong', N'Male', N'FPT', N'thongngu0189@gmail.com', N'123456789', N'thong1111', N'Thong0189@', 1, 1, 0)
INSERT [dbo].[Account] ([IDAccount], [FullName], [Gender], [City], [Email], [Phone], [UserName], [Pass], [IDRole], [IsActive], [IsBan]) VALUES (14, N'Tran Minh Thong', NULL, NULL, N'123123@gmail.com', N'123456789', N'DE160464', N'123123', 1, 1, 0)
INSERT [dbo].[Account] ([IDAccount], [FullName], [Gender], [City], [Email], [Phone], [UserName], [Pass], [IDRole], [IsActive], [IsBan]) VALUES (15, N'Tran Minh Thong', N'Male', N'FPT', N'thongngu0189@gmail.com', N'123456789', N'asd123', N'123', 3, 0, 0)
SET IDENTITY_INSERT [dbo].[Account] OFF
GO
INSERT [dbo].[BookingDetail] ([IDBookingDetail], [IDRoomType], [NumberOfRoom]) VALUES (45, 2, 1)
INSERT [dbo].[BookingDetail] ([IDBookingDetail], [IDRoomType], [NumberOfRoom]) VALUES (46, 1, 1)
INSERT [dbo].[BookingDetail] ([IDBookingDetail], [IDRoomType], [NumberOfRoom]) VALUES (46, 2, 2)
INSERT [dbo].[BookingDetail] ([IDBookingDetail], [IDRoomType], [NumberOfRoom]) VALUES (47, 1, 1)
INSERT [dbo].[BookingDetail] ([IDBookingDetail], [IDRoomType], [NumberOfRoom]) VALUES (47, 3, 1)
GO
SET IDENTITY_INSERT [dbo].[BookingDetails] ON 

INSERT [dbo].[BookingDetails] ([IDBooking], [IDAccount], [IDDiscount], [FullName], [Gender], [Email], [Phone], [Adult], [Child], [Checkin], [Checkout], [TotalPrice], [BookingTime], [Note], [isCancel]) VALUES (45, 12, 4, N'Tran Minh Thong', N'Male', N'thong@gmail.com', N'0123456789', 1, 0, CAST(N'2024-07-24' AS Date), CAST(N'2024-07-25' AS Date), 700, CAST(N'2024-07-23' AS Date), N'Not Yet', 1)
INSERT [dbo].[BookingDetails] ([IDBooking], [IDAccount], [IDDiscount], [FullName], [Gender], [Email], [Phone], [Adult], [Child], [Checkin], [Checkout], [TotalPrice], [BookingTime], [Note], [isCancel]) VALUES (46, 12, 4, N'Tran Minh Thong', N'Male', N'thong@gmail.com', N'0123456789', 1, 0, CAST(N'2024-07-28' AS Date), CAST(N'2024-07-29' AS Date), 1900, CAST(N'2024-07-27' AS Date), N'Not Yet', 0)
INSERT [dbo].[BookingDetails] ([IDBooking], [IDAccount], [IDDiscount], [FullName], [Gender], [Email], [Phone], [Adult], [Child], [Checkin], [Checkout], [TotalPrice], [BookingTime], [Note], [isCancel]) VALUES (47, 12, 4, N'Tran Minh Thong', N'Male', N'thong@gmail.com', N'0123456789', 2, 0, CAST(N'2024-07-28' AS Date), CAST(N'2024-07-29' AS Date), 700, CAST(N'2024-07-27' AS Date), N'Not Yet', 0)
SET IDENTITY_INSERT [dbo].[BookingDetails] OFF
GO
SET IDENTITY_INSERT [dbo].[Contact] ON 

INSERT [dbo].[Contact] ([IDContact], [IDAccount], [ContactName], [ContactEmail], [ContactPhone], [ContactMessage], [ContactStatus]) VALUES (1, 12, N'Tran Minh Thong', N'thongngu0189@gmail.com', N'123456789', N'goood morning', N'Done')
SET IDENTITY_INSERT [dbo].[Contact] OFF
GO
SET IDENTITY_INSERT [dbo].[Discount] ON 

INSERT [dbo].[Discount] ([IDDiscount], [DiscountName], [DiscountValue], [StartDay], [EndDay], [Note]) VALUES (1, N'Discount 1', CAST(0.10 AS Decimal(10, 2)), CAST(N'2023-06-01' AS Date), CAST(N'2023-06-30' AS Date), N'ASDFGHWW')
INSERT [dbo].[Discount] ([IDDiscount], [DiscountName], [DiscountValue], [StartDay], [EndDay], [Note]) VALUES (2, N'Discount 2', CAST(0.20 AS Decimal(10, 2)), CAST(N'2023-07-01' AS Date), CAST(N'2023-07-31' AS Date), N'THANG7RUCRO')
INSERT [dbo].[Discount] ([IDDiscount], [DiscountName], [DiscountValue], [StartDay], [EndDay], [Note]) VALUES (3, N'Discount 3', CAST(0.30 AS Decimal(10, 2)), CAST(N'2023-08-01' AS Date), CAST(N'2025-08-31' AS Date), N'TRUNGTHUOK')
INSERT [dbo].[Discount] ([IDDiscount], [DiscountName], [DiscountValue], [StartDay], [EndDay], [Note]) VALUES (4, N'Discount NON', CAST(0.00 AS Decimal(10, 2)), CAST(N'2020-12-12' AS Date), CAST(N'2222-12-12' AS Date), NULL)
SET IDENTITY_INSERT [dbo].[Discount] OFF
GO
SET IDENTITY_INSERT [dbo].[Feedback] ON 

INSERT [dbo].[Feedback] ([IDFeedback], [IDAccount], [IDBooking], [CustomerName], [TimeFeedBack], [Content], [Rating], [AdminReply], [ReplyStatus]) VALUES (3, 12, NULL, NULL, CAST(N'2024-06-18T00:00:00.000' AS DateTime), N'good', N'5', N'thank you', NULL)
SET IDENTITY_INSERT [dbo].[Feedback] OFF
GO
INSERT [dbo].[PaymentMethod] ([IDPayment], [NamePaymentMethod]) VALUES (1, N'VNPAY')
GO
SET IDENTITY_INSERT [dbo].[RoomType] ON 

INSERT [dbo].[RoomType] ([IDRoomType], [NameRoomType], [MaxPerson], [NumberOfBed], [NumberOfBath], [Price], [TotalRoom], [RoomStatus], [Content], [Image]) VALUES (1, N'Vip Single', 5, 1, 2, 500, 5, N'Valid', N'1-2 Person', N'1718547656552.png')
INSERT [dbo].[RoomType] ([IDRoomType], [NameRoomType], [MaxPerson], [NumberOfBed], [NumberOfBath], [Price], [TotalRoom], [RoomStatus], [Content], [Image]) VALUES (2, N'Vip Double', 5, 2, 2, 700, 5, N'Valid', N'2-4 Person', NULL)
INSERT [dbo].[RoomType] ([IDRoomType], [NameRoomType], [MaxPerson], [NumberOfBed], [NumberOfBath], [Price], [TotalRoom], [RoomStatus], [Content], [Image]) VALUES (3, N'Nomal Single', 3, 1, 1, 200, 5, N'Available', N'1-2 Person', NULL)
INSERT [dbo].[RoomType] ([IDRoomType], [NameRoomType], [MaxPerson], [NumberOfBed], [NumberOfBath], [Price], [TotalRoom], [RoomStatus], [Content], [Image]) VALUES (4, N'Nomal Double', 5, 2, 1, 400, 5, N'Available', N'2-4 Person', NULL)
INSERT [dbo].[RoomType] ([IDRoomType], [NameRoomType], [MaxPerson], [NumberOfBed], [NumberOfBath], [Price], [TotalRoom], [RoomStatus], [Content], [Image]) VALUES (5, N'room 2', 3, 2, 1, 200, 10, N'Valid', N'ssss', N'Start-screen.jpg')
INSERT [dbo].[RoomType] ([IDRoomType], [NameRoomType], [MaxPerson], [NumberOfBed], [NumberOfBath], [Price], [TotalRoom], [RoomStatus], [Content], [Image]) VALUES (11, N'123', 100, 123, NULL, 123, 123, N'Valid', N'123', N'favicon.png')
SET IDENTITY_INSERT [dbo].[RoomType] OFF

select * from Account


-- Services
CREATE TABLE ServiceCategory (
    CategoryID Int identity(1,1) PRIMARY KEY,
    ServiceName NVARCHAR(255) NOT NULL
);

CREATE TABLE Service (
    ServiceID INT IDENTITY(1,1) PRIMARY KEY,
    ServiceName NVARCHAR(255) NOT NULL,
    CategoryID INT,
    FOREIGN KEY (CategoryID) REFERENCES ServiceCategory(CategoryID) ON DELETE CASCADE
);

CREATE TABLE ServiceItem (
    ItemID INT IDENTITY(1,1) PRIMARY KEY,
    ServiceID INT, -- Liên kết với bảng Service
    ItemName NVARCHAR(255) NOT NULL, -- Ví dụ: "Trà Sữa Trân Châu", "Xe SH 2024"
    Price DECIMAL(12,2) NOT NULL, -- Giá cho từng món / xe / dịch vụ con
    ImageURL VARCHAR(500), -- Đường dẫn ảnh
    Description TEXT, -- Mô tả chi tiết (tùy chọn)
    FOREIGN KEY (ServiceID) REFERENCES Service(ServiceID) ON DELETE CASCADE
);

INSERT INTO ServiceItem (ServiceID, ItemName, Price, ImageURL, Description) VALUES
-- Drinks Service
(2, 'Bubble Tea', 45000, 'images/trasua_blackpearl.jpg', N'A sweet, milky tea with chewy tapioca pearls, popular for its fun texture and wide variety of flavors'),
(2, 'Green Tea Latte', 40000, 'images/traxanh_sua.jpg', N'A creamy blend of matcha green tea and steamed milk, offering a smooth, earthy flavor'),
(2, 'Vietnamese Iced Coffee', 40000, 'images/caphe_suada.jpg', N'Strong brewed coffee mixed with sweetened condensed milk, served hot or iced for a rich, bold taste.'),
(2, 'Espresso', 50000, 'images/espresso.jpg', N'A concentrated shot of coffee with a deep, intense flavor and a layer of golden crema on top.'),
-- Foods Services
(1, 'Traditional Beef Pho', 120000, 'images/pho_bo.jpg', 'Beef pho with rich broth, rare and cooked beef slices, fresh herbs, and soft rice noodles'),
(1, 'Grilled Pork Banh Mi', 100000, 'images/banh_mi.jpg', 'Crispy baguette filled with flavorful grilled pork, pickled vegetables, fresh herbs, and special sauce'),
(1, 'Hanoi Grilled Pork with Vermicelli', 250000, 'images/bun_cha.jpg', 'Grilled pork served with vermicelli noodles, sweet and sour fish sauce, and fresh herbs'),
(1, 'Broken Rice with Grilled Pork, Skin and Egg Meatloaf', 220000, 'images/com_tam.jpg', 'Saigon-style broken rice with grilled pork chop, shredded pork skin, egg meatloaf, scallion oil, and mixed fish sauce'),
(1, 'Fresh Spring Rolls with Shrimp and Pork', 90000, 'images/goi_cuon.jpg', 'Fresh spring rolls with shrimp, pork, vermicelli, and herbs wrapped in rice paper, served with peanut dipping sauce'),
(1, 'Crispy Fried Spring Rolls', 95000, 'images/cha_gio.jpg', 'Crispy fried rolls stuffed with minced pork, wood ear mushrooms, and glass noodles, served with fresh herbs and sweet fish sauce'),
-- Bikes Rental Service
(3, 'Honda SH 150i 2024', 300000, 'images/sh150.jpg', N'A stylish and agile urban scooter with a 150cc engine, ideal for daily commuting and city riding'),
(3, 'Honda SH 350i 2024', 375000, 'images/sh350.jpg', N'A premium maxi-scooter with a powerful 330cc engine, combining performance, comfort, and modern tech for long-distance and city travel');

SELECT * FROM ServiceCategory
select * from ServiceItem

INSERT INTO ServiceCategory (ServiceName) VALUES 
(N'Foods'), (N'Drinks'),  (N'Bikes');

-- Thêm dữ liệu vào bảng Service
INSERT INTO Service (ServiceName, CategoryID) VALUES 
(N'Foods', 1),
(N'Drinks', 2),
(N'Bikes', 3);

-- History of services order
CREATE TABLE ServiceOrder (
    OrderID INT IDENTITY(1,1) PRIMARY KEY,
    ItemID INT NOT NULL,
    UserID INT NOT NULL,
    Quantity INT NOT NULL,
    TotalPrice DECIMAL(12,2) NOT NULL,
    OrderDate DATETIME NOT NULL DEFAULT GETDATE(),
	RentalDate DATE NULL,
    RentalTime TIME NULL,
    Status NVARCHAR(100) NOT NULL,
    FOREIGN KEY (ItemID) REFERENCES ServiceItem(ItemID) ON DELETE CASCADE,
    FOREIGN KEY (UserID) REFERENCES Account(IDAccount)
);

select * from ServiceOrder

select * from BookingDetails

drop table Service
drop table ServiceCategory
drop table ServiceItem
drop table ServiceOrder

SELECT * FROM BookingDetails WHERE IDAccount = 16 AND isCancel = '0'
SELECT COUNT(*) FROM BookingDetails WHERE IDAccount = 16 AND Checkout >= CURRENT_TIMESTAMP AND isCancel = 0

SELECT COUNT(*) FROM BookingDetails WHERE IDAccount = 16 AND CURRENT_TIMESTAMP BETWEEN Checkin AND Checkout AND isCancel = 0

SELECT Adult FROM BookingDetails WHERE IDBooking = 57 AND isCancel = 0 AND Checkout >= CAST(GETDATE() AS DATE)

SELECT SUM(Adult) as total_guests FROM BookingDetails WHERE IDAccount = 16 AND isCancel = 0 AND Checkout >= CAST(GETDATE() AS DATE)