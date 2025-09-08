Thiết kế các file 
root
    app.js
    routes
        orders.js
        products.js
    views
        productList.ejs
        orderSuccess.ejs
    public
        styles.css

Phan 1:
1. Generate code
    app.js
    // Create Express server with EJS view engine and routes for products and orders
    orders.js
    // Express POST /orders to handle product order and render orderSuccess.ejs
    products.js
    // Express route GET /products to render productList.ejs with product array
    productList.ejs
    <!-- Display list of products with an order form for each -->
    orderSuccess.ejs
    <!-- Show success message after placing order -->

2. Refactoring code ( if (!productId || !quantity || isNaN(quantity) || quantity <= 0) {
        return res.status(400).render('orderError', { title: 'Order Error', message: 'Invalid order data' });
    })
    from order.js
// Refactor: Extract order validation into a separate function

Phan 2: 
B1. install 
npm install --save-dev jest supertest
 add package.json
"scripts": {
  "test": "jest"
}

B2: create file /tests/order.test.js
// Test POST /orders with valid data

B3: npm test
TH1: fail all
- fix /views/orderSuccess.ejs: bsung 
<p>Product ID: <%= order.productId %></p>
<p>Quantity: <%= order.quantity %></p>
- fix create orderError.ejs 
res.status(400).render('orderError', { message: 'Invalid order data' });
TH2: fail 1 
Tạo lỗi cố ý - Chèn bug vào /routes/orders.js
// BUG: Bỏ qua check quantity > 0
function isValidOrder(productId, quantity) {
    return productId && quantity;  // ❌ Thiếu kiểm tra NaN và quantity > 0
}

TH3 pass

    
