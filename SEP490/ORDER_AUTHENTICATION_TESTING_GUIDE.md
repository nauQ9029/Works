# Order Process Authentication Testing Guide

## Overview
This document provides a comprehensive guide for testing the authentication requirements in the order process, both on the frontend and backend using Postman.

## What Was Implemented

### Backend Changes

1. **Optional Authentication Middleware** (`authMiddleware.js`)
   - Added `optionalVerifyToken` middleware that doesn't fail if no token is present
   - Existing `verifyToken` middleware still requires authentication

2. **Order Validation Endpoint** (No Authentication Required)
   - **Endpoint**: `POST /api/orders/validate`
   - **Purpose**: Validate order data before user logs in
   - **Authentication**: NOT required
   
3. **Order Creation Endpoint** (Authentication Required)
   - **Endpoint**: `POST /api/orders/create`
   - **Purpose**: Create the actual order in the database
   - **Authentication**: REQUIRED

### Frontend Changes

1. **ConfirmMovingOrder Page**
   - After user confirms order details, checks if user is authenticated
   - If NOT authenticated:
     - Shows a modal prompting login/signup
     - Saves order data to `localStorage` as `pendingOrder`
     - Redirects to login/register page
   - If authenticated:
     - Proceeds to Deposit page

2. **Deposit Page**
   - Checks authentication on page load
   - If NOT authenticated, redirects to login
   - Loads pending order from `localStorage` if coming from login
   - Before submitting order, double-checks authentication
   - On 401 error, saves data and redirects to login

---

## Postman Testing Guide

### Prerequisites
- Postman installed
- Backend server running (typically `http://localhost:5000`)
- A valid user account for authenticated tests

### Test Collection Setup

#### Environment Variables
Create a Postman environment with these variables:
```
BASE_URL: http://localhost:5000
ACCESS_TOKEN: (leave empty, will be set during login)
```

---

## Test Scenarios

### Scenario 1: Validate Order Without Authentication ✅

**Test Case**: Verify that order validation works without authentication

**Request**:
```http
POST {{BASE_URL}}/api/orders/validate
Content-Type: application/json

Body:
{
  "serviceId": 1,
  "serviceName": "Chuyển Nhà Trọn Gói",
  "pickupLocation": {
    "address": "123 Nguyen Hue, District 1, HCMC",
    "lat": 10.7769,
    "lng": 106.7009
  },
  "dropoffLocation": {
    "address": "456 Le Loi, District 3, HCMC",
    "lat": 10.7756,
    "lng": 106.6920
  },
  "movingDate": "2026-03-15T09:00:00.000Z",
  "manualItems": {
    "bed": 2,
    "sofa": 1,
    "fridge": 1
  },
  "packedBoxes": 5,
  "additionalNotes": "Please handle with care"
}
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Dữ liệu đơn hàng hợp lệ",
  "requiresAuth": true,
  "data": {
    "isValid": true,
    "estimatedDistance": 2.34
  }
}
```

**Assertions**:
- Status Code: `200 OK`
- Response has `success: true`
- Response has `requiresAuth: true`
- No authentication header required

---

### Scenario 2: Create Order WITHOUT Authentication ❌

**Test Case**: Verify that order creation fails without authentication

**Request**:
```http
POST {{BASE_URL}}/api/orders/create
Content-Type: application/json

Body:
{
  "serviceId": 1,
  "serviceName": "Chuyển Nhà Trọn Gói",
  "pickupLocation": {
    "address": "123 Nguyen Hue, District 1, HCMC",
    "lat": 10.7769,
    "lng": 106.7009
  },
  "dropoffLocation": {
    "address": "456 Le Loi, District 3, HCMC",
    "lat": 10.7756,
    "lng": 106.6920
  },
  "movingDate": "2026-03-15T09:00:00.000Z",
  "manualItems": {
    "bed": 2,
    "sofa": 1,
    "fridge": 1
  },
  "survey": {
    "type": "ONLINE",
    "date": "2026-03-10T14:00:00.000Z",
    "timeSlot": "14:00"
  },
  "paymentMethod": "bank_transfer",
  "depositAmount": 100000
}
```

**Expected Response**:
```json
{
  "message": "Unauthorized: Thiếu token hoặc sai định dạng"
}
```

**Assertions**:
- Status Code: `401 Unauthorized`
- Cannot create order without authentication

---

### Scenario 3: Login and Get Access Token

**Test Case**: Login to get a valid access token

**Request**:
```http
POST {{BASE_URL}}/api/auth/login
Content-Type: application/json

Body:
{
  "email": "customerA@example.com",
  "password": "hash123"
}
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Đăng nhập thành công",
  "data": {
    "user": {
      "_id": "...",
      "fullName": "Nguyễn Văn A",
      "email": "customerA@example.com",
      "role": "Customer"
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresInMs": 1800000
  }
}
```

**Post-Actions**:
In Postman Tests tab, add:
```javascript
if (pm.response.code === 200) {
    const response = pm.response.json();
    pm.environment.set("ACCESS_TOKEN", response.data.accessToken);
}
```

**Assertions**:
- Status Code: `200 OK`
- Response contains `accessToken`
- Token saved to environment

---

### Scenario 4: Create Order WITH Authentication ✅

**Test Case**: Verify that order creation succeeds with authentication

**Request**:
```http
POST {{BASE_URL}}/api/orders/create
Authorization: Bearer {{ACCESS_TOKEN}}
Content-Type: application/json

Body:
{
  "serviceId": 1,
  "serviceName": "Chuyển Nhà Trọn Gói",
  "pickupLocation": {
    "address": "123 Nguyen Hue, District 1, HCMC",
    "lat": 10.7769,
    "lng": 106.7009
  },
  "dropoffLocation": {
    "address": "456 Le Loi, District 3, HCMC",
    "lat": 10.7756,
    "lng": 106.6920
  },
  "pickupDescription": "3rd floor, no elevator",
  "dropoffDescription": "Ground floor with parking",
  "movingDate": "2026-03-15T09:00:00.000Z",
  "houseSize": "3 Phòng ngủ\n1 Bếp",
  "manualItems": {
    "bed": 2,
    "sofa": 1,
    "chair": 4,
    "wardrobe": 2,
    "fridge": 1,
    "tv": 2
  },
  "packedBoxes": 10,
  "additionalNotes": "Có két sắt nhỏ cần vận chuyển",
  "survey": {
    "type": "OFFLINE",
    "date": "2026-03-10T14:00:00.000Z",
    "timeSlot": "14:00"
  },
  "paymentMethod": "vnpay",
  "depositAmount": 100000
}
```

**Expected Response**:
```json
{
  "success": true,
  "message": "Yêu cầu dịch vụ đã được tạo thành công",
  "data": {
    "ticketId": "65f8a1b2c3d4e5f6g7h8i9j0",
    "code": "RT2603XXXX",
    "status": "WAITING_SURVEY",
    "estimatedDistance": 2.34,
    "pickup": {
      "address": "123 Nguyen Hue, District 1, HCMC",
      "coordinates": {
        "lat": 10.7769,
        "lng": 106.7009
      }
    },
    "delivery": {
      "address": "456 Le Loi, District 3, HCMC",
      "coordinates": {
        "lat": 10.7756,
        "lng": 106.6920
      }
    },
    "items": [...],
    "createdAt": "2026-02-26T..."
  }
}
```

**Assertions**:
- Status Code: `201 Created`
- Response has `success: true`
- Response contains `ticketId` and `code`
- Status is `WAITING_SURVEY` (because survey is scheduled)

---

### Scenario 5: Create Order with Invalid/Expired Token ❌

**Test Case**: Verify that order creation fails with expired token

**Request**:
```http
POST {{BASE_URL}}/api/orders/create
Authorization: Bearer invalid_or_expired_token
Content-Type: application/json

Body: (same as Scenario 4)
```

**Expected Response**:
```json
{
  "message": "Invalid token"
}
```
or
```json
{
  "message": "Token has expired"
}
```

**Assertions**:
- Status Code: `401 Unauthorized` or `403 Forbidden`
- Cannot create order with invalid token

---

### Scenario 6: Get My Orders (Authenticated)

**Test Case**: Verify that user can retrieve their orders

**Request**:
```http
GET {{BASE_URL}}/api/orders/my-orders
Authorization: Bearer {{ACCESS_TOKEN}}
```

**Expected Response**:
```json
{
  "success": true,
  "count": 1,
  "data": [
    {
      "_id": "...",
      "code": "RT2603XXXX",
      "customerId": {...},
      "status": "WAITING_SURVEY",
      "estimatedDistance": 2.34,
      "createdAt": "..."
    }
  ]
}
```

**Assertions**:
- Status Code: `200 OK`
- Returns array of user's orders
- Each order has proper fields

---

## Frontend Testing Guide

### Test Flow 1: Unregistered User Journey

1. **Start Order Process**
   - Navigate to service selection
   - Choose service (e.g., "Chuyển Nhà Trọn Gói")
   - Fill in pickup/dropoff locations
   - Select items and details
   - Click "Continue"

2. **Confirm Order**
   - Select survey method (Online/Offline)
   - Select survey date and time
   - Check confirmation checkbox
   - Click "Xác nhận & Gửi yêu cầu"

3. **Authentication Modal Appears** ✅
   - Modal should appear with title "Cần Đăng Nhập"
   - Should have message about needing to login
   - Should show two buttons: "Đăng Nhập" and "Đăng Ký"
   - Check `localStorage` - should have `pendingOrder` data

4. **Click Login or Register**
   - Should redirect to `/login` or `/register`
   - `pendingOrder` should still be in `localStorage`

5. **Complete Login/Registration**
   - Enter credentials and login
   - Should automatically redirect back to deposit page
   - Order data should be loaded from `localStorage`
   - `pendingOrder` should be cleared from `localStorage`

6. **Complete Deposit**
   - Select payment method
   - Agree to terms
   - Click "Gửi yêu cầu"
   - Should successfully create order
   - Should redirect to home page with success message

---

### Test Flow 2: Registered User Journey

1. **Login First**
   - Go to login page
   - Enter credentials
   - Login successfully

2. **Start Order Process**
   - Navigate to service selection
   - Choose service
   - Fill in all details
   - Complete order form

3. **Confirm Order**
   - Select survey details
   - Click confirm
   - **Should directly proceed to Deposit page** (no auth modal)
   - No `pendingOrder` in `localStorage`

4. **Complete Deposit**
   - Select payment method
   - Submit order
   - Order created successfully

---

### Test Flow 3: Session Expiry During Order

1. **Start Logged In**
   - Login to the application
   - Start creating an order

2. **Complete Order Form**
   - Fill in all details
   - Go to confirmation page

3. **Let Session Expire** (or manually clear token)
   - Clear `localStorage` or wait for token expiry
   - Try to submit order

4. **Should Handle Gracefully** ✅
   - Should detect authentication failure
   - Should save order data to `localStorage`
   - Should redirect to login
   - After login, should restore order data

---

## Database Verification

After creating an order successfully, verify in MongoDB:

```javascript
// Connect to MongoDB and check
db.requesttickets.find().sort({createdAt: -1}).limit(1).pretty()
```

**Should see**:
- New ticket with proper `code` (e.g., RT2603XXXX)
- `customerId` referencing the logged-in user
- Proper `pickup` and `delivery` locations
- `items` array with all selected items
- `survey` object with scheduled survey details
- `status` set to `WAITING_SURVEY` or `CREATED`

---

## Common Issues and Solutions

### Issue 1: "Unauthorized" when creating order
**Symptom**: Getting 401 error even with token
**Solution**: 
- Check if token is expired
- Verify token is in Authorization header as `Bearer <token>`
- Check if user exists in database

### Issue 2: Order data not loading after login
**Symptom**: Redirected to deposit but data is missing
**Solution**:
- Check if `pendingOrder` exists in localStorage before login
- Verify timestamp is within valid range (< 1 hour)
- Check browser console for errors

### Issue 3: Modal not appearing for unregistered users
**Symptom**: Proceeds to deposit without authentication
**Solution**:
- Check UserContext is properly providing `isAuthenticated`
- Verify `useUser` hook is imported and used
- Check authentication state in React DevTools

---

## Security Considerations

✅ **What's Protected**:
- Order creation requires authentication
- User can only view their own orders
- Token verification on sensitive endpoints

✅ **What's Public**:
- Order validation (no sensitive data)
- Service selection page
- Public content pages

⚠️ **Important Notes**:
- Order data temporarily stored in localStorage is fine (non-sensitive)
- User must be authenticated before final order submission
- Backend always validates authentication for order creation
- Frontend checks are for UX, backend is the security boundary

---

## Success Criteria

✅ All these should pass:

1. ✅ Unregistered users can fill order form
2. ✅ Authentication is required before final submission
3. ✅ Order data is saved temporarily during auth flow
4. ✅ After login, order data is restored
5. ✅ Backend rejects unauthenticated order creation
6. ✅ Backend accepts authenticated order creation
7. ✅ Validation endpoint works without auth
8. ✅ Session expiry is handled gracefully

---

## Conclusion

The order process now has proper authentication validation:
- **Frontend**: Allows unregistered users to explore, prompts auth at the right time
- **Backend**: Strictly enforces authentication for order creation
- **UX**: Seamless flow with data persistence during authentication

This provides a good balance between user experience (don't force login too early) and security (require auth before sensitive operations).
