# Quick Start - Testing Order Creation

## Prerequisites
- Backend running on `http://localhost:5000`
- Frontend running on `http://localhost:3000`
- User logged in as customer

## Step-by-Step Test

### 1. Navigate to Create Order Page
```
URL: http://localhost:3000/customer/create-order
```

### 2. Select Service Type
- You should arrive with `serviceId` from previous page
- Or it defaults to service 1 (House Moving)

### 3. Choose Pickup Location
**Left Panel**:
- Click "Nơi chuyển đi" button (should be active)

**Right Panel - Map**:
- Click anywhere on map OR
- Use search box to find address OR
- Click target icon (📍) to use current location

**Result**:
- Green marker appears
- Address displays in input field

### 4. Choose Dropoff Location
**Left Panel**:
- Click "Nơi chuyển đến" button

**Right Panel - Map**:
- Click another location on map
- Red marker appears
- Address displays

**Result**:
- Both green (pickup) and red (dropoff) markers visible
- Summary shows "Từ: ... Đến: ..."

### 5. Add Location Details
- **Pickup description**: "Tầng 5, có thang máy"
- **Dropoff description**: "Tầng 2, không thang máy"

### 6. Select Moving Date & Time
- Click date picker
- Choose future date and time
- Example: March 15, 2026 at 9:00 AM

### 7. Upload Images (Optional)
- Click "Tải ảnh lên" button
- Select 1-3 room photos
- Wait for AI to detect items
- See results: "📦 AI đã phát hiện X món đồ"

### 8. Select House Size
- Click one of the size cards:
  - 2 Phòng ngủ / 1 Bếp
  - 3 Phòng ngủ / 1 Bếp
  - 4 Phòng ngủ / 1 Bếp
  
**Result**: Card highlights with blue border

### 9. Select Items Manually
- Click on furniture icons (bed, sofa, chair, etc.)
- Item gets blue border + checkmark
- Counter appears at bottom with +/- buttons
- Click + to increase quantity
- Click - to decrease (removes at 0)

**Example**:
- Giường: 2
- Sofa: 1
- Ghế: 4
- Tủ lạnh: 1

**Result**: Badge shows "8 Đồ vật ×"

### 10. Add Packed Boxes
- Click + button next to "Các thùng đã đóng gói"
- Example: Set to 10 boxes

### 11. Add Notes (Optional)
- Scroll to notes section
- Type: "Có két sắt nặng 200kg, cần 2 người khiêng"

### 12. Submit Order
- Scroll to bottom
- Click blue "Tiếp theo" button

**Expected Behavior**:
1. Button shows "Đang xử lý..." with spinner
2. Button disabled during processing
3. Network request sent to backend
4. After 1-2 seconds:
   - Success: Green notification appears
   - "Yêu cầu dịch vụ đã được tạo thành công!"
   - Navigate to confirmation page

## Validation Scenarios

### Test 1: Missing Pickup
- Don't select pickup location
- Click "Tiếp theo"
- **Expected**: "Vui lòng chọn địa điểm chuyển đi"

### Test 2: Missing Dropoff
- Select pickup but not dropoff
- Click "Tiếp theo"
- **Expected**: "Vui lòng chọn địa điểm chuyển đến"

### Test 3: Missing Date
- Select locations but not date
- Click "Tiếp theo"
- **Expected**: "Vui lòng chọn thời gian chuyển"

### Test 4: No Items
- Select locations and date
- Don't select any items or upload images
- Click "Tiếp theo"
- **Expected**: "Vui lòng chọn đồ đạc cần chuyển hoặc tải ảnh lên để AI ước tính"

### Test 5: Success Case
- Fill all required fields
- Select some items
- Click "Tiếp theo"
- **Expected**: Success message + navigation

## Check Backend Logs

Open backend terminal, should see:
```
📦 Creating order for user: 65f1234567890abcdef12345
Order data: {
  "serviceId": 1,
  "pickupLocation": { ... },
  "dropoffLocation": { ... },
  ...
}
```

Then:
```
✅ Order created successfully
Request ticket created with code: RT2602000001
```

## Check Database

MongoDB Compass or CLI:
```javascript
use homs_db

db.requesttickets.find().sort({createdAt: -1}).limit(1).pretty()
```

Should see the newly created ticket with:
- ✅ `code`: "RT2602XXXX"
- ✅ `customerId`: Your user ID
- ✅ `status`: "CREATED"
- ✅ `pickup` and `delivery` locations
- ✅ `items` array with selected items
- ✅ `estimatedDistance` in km
- ✅ `notes` with descriptions
- ✅ `createdAt` timestamp

## Check Frontend Console

Browser console (F12) should show:
```javascript
📦 Submitting order data: { ... }
✅ Order created successfully: {
  success: true,
  message: "Yêu cầu dịch vụ đã được tạo thành công",
  data: {
    ticketId: "...",
    code: "RT2602000001",
    status: "CREATED",
    estimatedDistance: 2.34,
    ...
  }
}
```

## Common Issues

### Issue: "Token không hợp lệ"
**Solution**: 
- Login again
- Check localStorage for accessToken
- Verify JWT hasn't expired

### Issue: Network Error
**Solution**:
- Check backend is running on port 5000
- Check CORS settings in backend
- Verify `REACT_APP_API_URL` in frontend .env

### Issue: Validation errors
**Solution**:
- Check all required fields filled
- Verify date is in future
- Ensure at least one item selected

### Issue: Map not loading
**Solution**:
- Check internet connection (OpenStreetMap needs connection)
- Wait 2-3 seconds for tiles to load
- Try zooming in/out

### Issue: AI not detecting items
**Solution**:
- Wait 5-10 seconds for model to load first time
- Use clear, well-lit photos
- Photos should contain furniture
- Check console for detection logs

## Success Indicators

✅ All markers visible on map  
✅ Addresses displayed in input fields  
✅ Date selected  
✅ Items selected with quantities  
✅ Badge shows correct count  
✅ Submit button works  
✅ Loading spinner appears  
✅ Success message displays  
✅ Navigation happens  
✅ Backend logs show creation  
✅ Database has new record  

## Next Page (Confirmation)

After successful creation, user should see:
- Order summary
- Ticket code: RT2602XXXX
- Estimated distance
- Item list
- Pricing information (if implemented)
- Payment options

---

**Test Duration**: 5-10 minutes  
**Required**: Login credentials, Test data  
**Environment**: Development (localhost)
