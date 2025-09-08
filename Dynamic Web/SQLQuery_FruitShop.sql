create database DynamicWebForFruitShop

use DynamicWebForFruitShop
-- Customers table
CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Email VARCHAR(100),
    Password VARCHAR(100), 
    Address VARCHAR(255),
    Phone VARCHAR(20),
    RegistrationDate DATE
);

-- Products table
CREATE TABLE Products (
    ProductID INT PRIMARY KEY,
    ProductName VARCHAR(255),
    Description TEXT ,
    Category VARCHAR(50),
    Price DECIMAL(10, 2) CONSTRAINT CHK_Price_Positive CHECK (Price >= 0),
    StockQuantity INT CONSTRAINT CHK_StockQuantity_NonNegative CHECK (StockQuantity >= 0),
	ProductImage VARCHAR(MAX),
	UnitOfMeasurement VARCHAR(10)
);

-- Orders table
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    CustomerID INT FOREIGN KEY REFERENCES Customers(CustomerID),
    OrderDate DATETIME,
    Status VARCHAR(20)
);

-- OrderDetails table
CREATE TABLE OrderDetails (
    OrderDetailID INT PRIMARY KEY,
    OrderID INT FOREIGN KEY REFERENCES Orders(OrderID),
    ProductID INT FOREIGN KEY REFERENCES Products(ProductID),
    Quantity INT,
    Subtotal DECIMAL(10, 2)
);

-- Payments table
CREATE TABLE Payments (
    PaymentID INT PRIMARY KEY,
    OrderID INT FOREIGN KEY REFERENCES Orders(OrderID),
    PaymentDate DATETIME,
    Amount DECIMAL(10, 2),
    PaymentMethod VARCHAR(50)
);

-- Reviews table (optional)
CREATE TABLE Reviews (
    ReviewID INT PRIMARY KEY,
    ProductID INT FOREIGN KEY REFERENCES Products(ProductID),
    CustomerID INT FOREIGN KEY REFERENCES Customers(CustomerID),
    Rating INT,
    Comment TEXT,
    ReviewDate DATETIME
);

-- Categories table (optional)
CREATE TABLE Categories (
    CategoryID INT PRIMARY KEY,
    CategoryName VARCHAR(50)
);

-- Cart table
CREATE TABLE Cart (
    CartID INT PRIMARY KEY,
    CustomerID INT FOREIGN KEY REFERENCES Customers(CustomerID),
    ProductID INT FOREIGN KEY REFERENCES Products(ProductID),
    Quantity INT CONSTRAINT CHK_Quantity_NonNegative CHECK (Quantity >= 0)
);

INSERT INTO Customers (CustomerID, FirstName, LastName, Email, Password, Address, Phone, RegistrationDate)
VALUES
    (1, 'John', 'Doe', 'john.doe@example.com', '123', '123 Main St', '555-123-4567', '2023-01-15'),
    (2, 'Jane', 'Smith', 'jane.smith@example.com', '123', '456 Elm St', '555-987-6543', '2023-02-20');

-- Insert fruit shop categories
INSERT INTO Categories (CategoryID, CategoryName)
VALUES
    (1, 'Apples'),
    (2, 'Bananas'),
    (3, 'Oranges'),
    (4, 'Berries'),
    (5, 'Citrus Fruits'),
    (6, 'Tropical Fruits');

-- Insert fruit products for a fruit shop
INSERT INTO Products (ProductID, ProductName, Description, Category, Price, StockQuantity, ProductImage, UnitOfMeasurement)
VALUES
    (1, 'Red Delicious Apples', 'Sweet and crispy apples', 'Apples',50 ,20,'\images\RedDeliciousApples.jpg', 'kg'),
    (2, 'Cavendish Bananas', 'Fresh and ripe bananas', 'Bananas',30 ,25,'\images\CavendishBananas.jpg', 'kg' ),
    (3, 'Navel Oranges', 'Juicy and seedless oranges', 'Oranges',35 ,30,'\images\NavelOranges.jpg', 'kg' ),
    (4, 'Strawberries', 'Sweet and succulent strawberries', 'Berries',45,30, '\images\Strawberries.jpg', 'kg'),
    (5, 'Lemons', 'Tangy and aromatic citrus fruits', 'Citrus Fruits',32 ,35,'\images\Lemons.jpg', 'kg' ),
    (6, 'Pineapples', 'Exotic and tropical pineapples', 'Tropical Fruits',42,20,'\images\Pineapples.jpg', 'kg');


-- Insert data into Orders table
INSERT INTO Orders (OrderID, CustomerID, OrderDate, Status)
VALUES
    (1, 1, '2023-03-01', 'Pending'),
    (2, 2, '2023-03-02', 'Shipped');

-- Insert data into OrderDetails table
INSERT INTO OrderDetails (OrderDetailID, OrderID, ProductID, Quantity, Subtotal)
VALUES
    (1, 1, 1, 2, 39.98),
    (2, 1, 2, 3, 89.97),
    (3, 2, 2, 1, 29.99);

-- Insert data into Payments table
INSERT INTO Payments (PaymentID, OrderID, PaymentDate, Amount, PaymentMethod)
VALUES
    (1, 1, '2023-03-02', 129.95, 'Credit Card'),
    (2, 2, '2023-03-03', 29.99, 'PayPal');

-- Insert data into Reviews table
INSERT INTO Reviews (ReviewID, ProductID, CustomerID, Rating, Comment, ReviewDate)
VALUES
    (1, 1, 1, 5, 'Great product!', '2023-03-05'),
    (2, 2, 2, 4, 'Good value for money', '2023-03-06');




-- Insert data into Cart table
INSERT INTO Cart (CartID, CustomerID, ProductID, Quantity)
VALUES
    (1, 1, 1, 2),
    (2, 1, 2, 1);


--Function to Calculate Order Total
CREATE FUNCTION CalculateOrderTotal(@OrderID INT)
RETURNS DECIMAL(10, 2)
AS
BEGIN
    DECLARE @Total DECIMAL(10, 2);
    SELECT @Total = SUM(Quantity * Subtotal)
    FROM OrderDetails
    WHERE OrderID = @OrderID;
    RETURN @Total;
END;


--Trigger to Update Stock Quantity
CREATE TRIGGER UpdateStockOnOrder
ON OrderDetails
AFTER INSERT
AS
BEGIN
    DECLARE @ProductID INT, @Quantity INT;
    SELECT @ProductID = ProductID, @Quantity = Quantity
    FROM inserted;

    UPDATE Products
    SET StockQuantity = StockQuantity - @Quantity
    WHERE ProductID = @ProductID;
END;


--Stored Procedure to Place an Order
CREATE PROCEDURE PlaceOrder
    @CustomerID INT,
    @ProductID INT,
    @Quantity INT
AS
BEGIN
    DECLARE @OrderID INT;
    INSERT INTO Orders (CustomerID, OrderDate, Status)
    VALUES (@CustomerID, GETDATE(), 'Pending');

    SET @OrderID = SCOPE_IDENTITY();

    INSERT INTO OrderDetails (OrderID, ProductID, Quantity, Subtotal)
    VALUES (@OrderID, @ProductID, @Quantity, (SELECT Price FROM Products WHERE ProductID = @ProductID) * @Quantity);
END;

