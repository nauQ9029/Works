# 🏠 BOARDING HOUSE CRUD - FLOW VÀ NGHIỆP VỤ

## 🎯 TỔNG QUAN HỆ THỐNG

Hệ thống quản lý nhà trọ (BoardingHouse) với các thực thể liên quan:
- **BoardingHouse**: Thông tin chung về nhà trọ (chủ trọ, địa chỉ, tiện ích chung, ảnh bên ngoài)
- **Room**: Các phòng thuộc nhà trọ (số phòng, giá, diện tích, ảnh bên trong, trạng thái)
- **Review**: Đánh giá của khách hàng về nhà trọ
- **Booking**: Đơn đặt phòng
- **RoommatePost**: Bài đăng tìm bạn cùng phòng

---

## 📊 KIẾN TRÚC DỮ LIỆU

```
┌─────────────────────────────────────┐
│       BoardingHouse (Nhà trọ)       │
├─────────────────────────────────────┤
│ - _id                               │
│ - ownerId → User (chủ trọ)          │
│ - name (tên nhà trọ)                │
│ - description (mô tả)               │
│ - location (địa chỉ, lat, lng)     │
│ - amenities[] (tiện ích chung)     │
│ - photos[] (ảnh bên ngoài)         │
│ - approvedStatus (pending/approved/ │
│   rejected/deleted)                 │
│ - isApproved (boolean)              │
│ - createdAt, updatedAt              │
└──────────────┬──────────────────────┘
               │ 1
               │
               │ N
┌──────────────▼──────────────────────┐
│           Room (Phòng)              │
├─────────────────────────────────────┤
│ - _id                               │
│ - boardingHouseId → BoardingHouse   │
│ - customerId → User (người thuê)    │
│ - roomNumber (số/mã phòng)          │
│ - description (mô tả riêng)         │
│ - price (giá thuê)                  │
│ - area (diện tích m2)               │
│ - status (Available/Booked/         │
│   Unavailable)                      │
│ - photos[] (ảnh bên trong phòng)   │
│ - amenities[] (tiện ích riêng)     │
│ - createdAt, updatedAt              │
└─────────────────────────────────────┘
```

---

## 🔄 FLOW TỔNG QUAN CRUD

```
┌──────────────────────────────────────────────────────────────┐
│                    CHỦ TRỌ (OWNER)                           │
└──────────────────────────────────────────────────────────────┘
         │
         ├─ CREATE ──────────────────────────────────────┐
         │                                               │
         ├─ READ (Get All/Get By ID) ───────────────────┤
         │                                               │
         ├─ UPDATE ──────────────────────────────────────┤
         │                                               │
         └─ DELETE ──────────────────────────────────────┤
                                                         │
                                                         ▼
┌──────────────────────────────────────────────────────────────┐
│                    ADMIN (Quản trị)                          │
│  - Xem danh sách tất cả nhà trọ (với filter)                │
│  - Duyệt/Từ chối bài đăng (Approve/Reject)                  │
│  - Xóa mềm nhà trọ (Soft Delete)                            │
└──────────────────────────────────────────────────────────────┘
                                                         │
                                                         ▼
┌──────────────────────────────────────────────────────────────┐
│                  NGƯỜI DÙNG (Customer)                       │
│  - Xem danh sách nhà trọ đã duyệt                           │
│  - Xem chi tiết nhà trọ + phòng + review                    │
│  - Đặt phòng (Booking)                                      │
│  - Đánh giá (Review)                                        │
└──────────────────────────────────────────────────────────────┘
```

---

## 📝 CHI TIẾT CÁC LUỒNG CRUD

---

## 1️⃣ CREATE - TẠO NHÀ TRỌ

### **Route:**
```
POST /api/boarding-houses
```

### **Flow chi tiết:**

```
┌─────────────────┐
│  Chủ trọ gửi    │
│  form data với  │
│  photos + rooms │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  MULTER MIDDLEWARE                  │
│  uploadAccommodation.fields([       │
│    {name: 'photos', maxCount: 10},  │
│    {name: 'files', maxCount: 50}    │
│  ])                                 │
│  - Upload files vào:                │
│    uploads/accommodation/           │
│  - Tạo unique filename              │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  IMAGE VALIDATION MIDDLEWARE        │
│  validateUploadedImages             │
│  - Gọi Google Vision API            │
│  - Check safety + labels            │
│  - Reject nếu vi phạm               │
│  - Lưu FlaggedImage nếu unsafe      │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  IMAGE OPTIMIZATION MIDDLEWARE      │
│  optimizeUploadedImages             │
│  - Resize ảnh (max 1920x1080)       │
│  - Compress (quality 85%)           │
│  - Convert to WebP (optional)       │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  CONTROLLER: createBoardingHouse    │
└────────┬────────────────────────────┘
         │
         ├─ BƯỚC 1: Validation
         │  ├─ Check ownerId
         │  ├─ Kiểm tra membership (Payment)
         │  └─ Parse JSON data (location, rooms, photosMap)
         │
         ├─ BƯỚC 2: Xử lý ảnh
         │  ├─ Lấy uploaded files từ req.files
         │  ├─ Map ảnh theo photosMap hoặc roomNumber
         │  └─ Tạo array photoPaths
         │
         ├─ BƯỚC 3: Tạo BoardingHouse
         │  ├─ const newBoardingHouse = new BoardingHouse({
         │  │    ownerId, name, description,
         │  │    location, amenities,
         │  │    photos: photoPaths (ảnh chung nhà trọ)
         │  │  })
         │  └─ await newBoardingHouse.save()
         │
         ├─ BƯỚC 4: Tạo Rooms (nếu có)
         │  ├─ Parse rooms từ req.body.rooms
         │  ├─ Map ảnh cho từng phòng:
         │  │  - Dùng photosMap[roomNumber] để match
         │  │  - Hoặc fallback: check originalname chứa roomNumber
         │  ├─ Tạo roomDocs với:
         │  │  - boardingHouseId: savedHouse._id
         │  │  - photos: roomPhotos (ảnh riêng của phòng)
         │  └─ await Room.insertMany(roomDocs)
         │
         └─ BƯỚC 5: Trả response
            └─ res.status(201).json({
                 message: "Nhà trọ và các phòng đã được tạo thành công!",
                 data: savedHouse
               })
```

### **Request Body Example:**

```javascript
// Form-Data
{
  ownerId: "60d5ec49f1a2c8b1f8e4e1a1",
  name: "Nhà Trọ Sinh Viên ABC",
  description: "Nhà trọ gần trường ĐH XYZ, yên tĩnh, an ninh",
  
  // JSON string
  location: JSON.stringify({
    district: "Cầu Giấy",
    street: "Đường Nguyễn Văn Huyên",
    addressDetail: "Số 123, Ngõ 456",
    latitude: 21.0285,
    longitude: 105.8542
  }),
  
  amenities: JSON.stringify([
    "Wifi miễn phí",
    "Chỗ để xe",
    "Camera an ninh",
    "Giờ giấc tự do"
  ]),
  
  // JSON string - mảng phòng
  rooms: JSON.stringify([
    {
      roomNumber: "101",
      description: "Phòng đơn, có gác",
      price: 2000000,
      area: 20,
      amenities: ["Giường", "Tủ quần áo", "Ban công"]
    },
    {
      roomNumber: "102",
      description: "Phòng đôi, rộng rãi",
      price: 3000000,
      area: 30,
      amenities: ["2 Giường", "Tủ lạnh", "Điều hòa"]
    }
  ]),
  
  // JSON string - map ảnh với phòng
  photosMap: JSON.stringify({
    "101": ["room101_1.jpg", "room101_2.jpg"],
    "102": ["room102_1.jpg", "room102_2.jpg"]
  }),
  
  // Files (multipart/form-data)
  photos: [File, File], // Ảnh chung nhà trọ
  files: [File, File, File, File] // Ảnh các phòng
}
```

### **Response Success:**

```javascript
{
  "message": "Nhà trọ và các phòng đã được tạo thành công!",
  "data": {
    "_id": "60d5ec49f1a2c8b1f8e4e1a2",
    "ownerId": "60d5ec49f1a2c8b1f8e4e1a1",
    "name": "Nhà Trọ Sinh Viên ABC",
    "description": "Nhà trọ gần trường ĐH XYZ...",
    "location": { ... },
    "amenities": [...],
    "photos": [
      "/uploads/accommodation/1732012345678-house_exterior.jpg",
      "/uploads/accommodation/1732012345679-house_parking.jpg"
    ],
    "approvedStatus": "pending",
    "isApproved": false,
    "createdAt": "2025-11-19T10:30:00.000Z",
    "updatedAt": "2025-11-19T10:30:00.000Z"
  }
}
```

### **Điểm quan trọng:**

1. **Membership Check**: Hệ thống check xem chủ trọ đã thanh toán gói membership chưa (tùy business logic)
2. **PhotosMap**: Dùng để map chính xác ảnh nào thuộc phòng nào
3. **Fallback Mapping**: Nếu không có photosMap, tự động match bằng roomNumber trong filename
4. **Transaction**: Code đã bỏ transaction để tránh lỗi khi không dùng replica set
5. **ApprovedStatus**: Mặc định là "pending", cần admin duyệt

---

## 2️⃣ READ - ĐỌC THÔNG TIN NHÀ TRỌ

### **2.1. Lấy danh sách tất cả nhà trọ**

#### **Route:**
```
GET /api/boarding-houses?ownerId=xxx (optional)
```

#### **Flow:**

```
┌─────────────────┐
│  Client request │
│  GET /api/      │
│  boarding-houses│
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  CONTROLLER: getAllBoardingHouses   │
└────────┬────────────────────────────┘
         │
         ├─ BƯỚC 1: Parse query params
         │  ├─ ownerId (nếu có) → lấy nhà trọ của chủ cụ thể
         │  └─ Không có ownerId → lấy nhà trọ đã duyệt (approved)
         │
         ├─ BƯỚC 2: Build match filter
         │  ├─ Nếu có ownerId:
         │  │  matchFilter.ownerId = ObjectId(ownerId)
         │  └─ Nếu không:
         │     matchFilter.approvedStatus = "approved"
         │
         ├─ BƯỚC 3: Aggregate với Room
         │  ├─ $match: matchFilter
         │  ├─ $lookup: Join với collection 'rooms'
         │  ├─ $addFields: Tính toán
         │  │  - availableRoomsCount (đếm phòng Available)
         │  │  - minPrice, maxPrice (giá min/max)
         │  │  - minArea, maxArea (diện tích min/max)
         │  │  - totalRooms (tổng số phòng)
         │  └─ $project: Loại bỏ field 'rooms' (chỉ giữ thống kê)
         │
         ├─ BƯỚC 4: Populate ownerId
         │  └─ .populate('ownerId', 'name email')
         │
         └─ BƯỚC 5: Trả response
            └─ res.status(200).json(boardingHouses)
```

#### **Response Example:**

```javascript
[
  {
    "_id": "60d5ec49f1a2c8b1f8e4e1a2",
    "ownerId": {
      "_id": "60d5ec49f1a2c8b1f8e4e1a1",
      "name": "Nguyễn Văn A",
      "email": "owner@example.com"
    },
    "name": "Nhà Trọ Sinh Viên ABC",
    "description": "...",
    "location": { ... },
    "amenities": [...],
    "photos": [...],
    "approvedStatus": "approved",
    
    // ✅ Thống kê được tính tự động
    "totalRooms": 10,
    "availableRoomsCount": 7,
    "minPrice": 1500000,
    "maxPrice": 3500000,
    "minArea": 15,
    "maxArea": 35,
    
    "createdAt": "2025-11-19T10:30:00.000Z",
    "updatedAt": "2025-11-19T10:30:00.000Z"
  },
  // ... more boarding houses
]
```

---

### **2.2. Lấy chi tiết một nhà trọ**

#### **Route:**
```
GET /api/boarding-houses/:id
```

#### **Flow:**

```
┌─────────────────┐
│  Client request │
│  GET /api/      │
│  boarding-houses│
│  /60d5ec49...   │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  CONTROLLER: getBoardingHouseById   │
└────────┬────────────────────────────┘
         │
         ├─ BƯỚC 1: Lấy thông tin nhà trọ
         │  └─ BoardingHouse.findById(id)
         │     .populate('ownerId', 'name email phone')
         │
         ├─ BƯỚC 2: Lấy danh sách phòng
         │  └─ Room.find({ boardingHouseId: house._id })
         │
         ├─ BƯỚC 3: Gắn trạng thái booking cho mỗi phòng
         │  └─ Với mỗi room:
         │     ├─ Tìm latest booking: Booking.findOne({ roomId })
         │     │  .sort({ createdAt: -1 })
         │     ├─ Xác định bookingStatus:
         │     │  - "Paid": status='paid' && contractStatus='approved'
         │     │  - "Pending": status='pending' || contractStatus='pending'
         │     │  - "Available": không có booking hoặc đã kết thúc
         │     └─ Return: { ...room, bookingStatus }
         │
         ├─ BƯỚC 4: Lấy reviews
         │  └─ Review.find({ boardingHouseId: id })
         │     .populate('customerId', 'name avatar')
         │     .sort({ createdAt: -1 })
         │
         ├─ BƯỚC 5: Lấy roommate posts
         │  ├─ RoommatePost.find({ boardingHouseId: house._id })
         │  │  .populate('userId', 'name avatar phone gender')
         │  ├─ Group posts by roomId: postsByRoom[roomId] = post
         │  └─ Gắn vào rooms:
         │     { ...room, hasRoommatePost, roommatePost }
         │
         └─ BƯỚC 6: Trả response
            └─ res.status(200).json({
                 ...house,
                 rooms: roomsWithPosts,
                 reviews
               })
```

#### **Response Example:**

```javascript
{
  "_id": "60d5ec49f1a2c8b1f8e4e1a2",
  "ownerId": {
    "_id": "60d5ec49f1a2c8b1f8e4e1a1",
    "name": "Nguyễn Văn A",
    "email": "owner@example.com",
    "phone": "0123456789"
  },
  "name": "Nhà Trọ Sinh Viên ABC",
  "description": "...",
  "location": { ... },
  "amenities": [...],
  "photos": [...],
  
  // ✅ Danh sách phòng với trạng thái chi tiết
  "rooms": [
    {
      "_id": "60d5ec49f1a2c8b1f8e4e1a3",
      "boardingHouseId": "60d5ec49f1a2c8b1f8e4e1a2",
      "roomNumber": "101",
      "price": 2000000,
      "area": 20,
      "status": "Available",
      "photos": [...],
      "amenities": [...],
      
      // ✅ Trạng thái booking (được tính động)
      "bookingStatus": "Paid", // hoặc "Pending", "Available"
      
      // ✅ Roommate post (nếu có)
      "hasRoommatePost": true,
      "roommatePost": {
        "_id": "60d5ec49f1a2c8b1f8e4e1a4",
        "userId": { ... },
        "description": "Tìm bạn cùng phòng..."
      }
    },
    // ... more rooms
  ],
  
  // ✅ Reviews
  "reviews": [
    {
      "_id": "60d5ec49f1a2c8b1f8e4e1a5",
      "customerId": {
        "_id": "...",
        "name": "Trần Thị B",
        "avatar": "/uploads/avatars/..."
      },
      "rating": 5,
      "comment": "Nhà trọ sạch sẽ, chủ nhà thân thiện!",
      "createdAt": "2025-11-18T15:00:00.000Z"
    },
    // ... more reviews
  ]
}
```

---

## 3️⃣ UPDATE - CẬP NHẬT NHÀ TRỌ

### **Route:**
```
PUT /api/boarding-houses/:id
```

### **Flow chi tiết:**

```
┌─────────────────┐
│  Chủ trọ gửi    │
│  form data mới  │
│  (có thể có ảnh)│
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  MULTER + IMAGE VALIDATION +        │
│  IMAGE OPTIMIZATION                 │
│  (giống như CREATE)                 │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  CONTROLLER: updateBoardingHouse    │
└────────┬────────────────────────────┘
         │
         ├─ BƯỚC 1: Parse data
         │  ├─ Parse location, amenities
         │  └─ Lấy photoPaths từ req.files (nếu có)
         │
         ├─ BƯỚC 2: Lấy thông tin nhà trọ hiện tại
         │  ├─ existingHouse = await BoardingHouse.findById(id)
         │  ├─ Nếu không tồn tại:
         │  │  - Xóa files đã upload (cleanup)
         │  │  - Return 404
         │  └─ Lưu lại oldPhotos = existingHouse.photos
         │
         ├─ BƯỚC 3: Chuẩn bị updateData
         │  ├─ updateData = { name, description, amenities, location }
         │  ├─ updateData.updatedAt = Date.now()
         │  ├─ updateData.approvedStatus = "pending" ⚠️ Cần duyệt lại
         │  └─ Nếu có ảnh mới:
         │     updateData.photos = photoPaths
         │
         ├─ BƯỚC 4: Cập nhật DB
         │  └─ updated = await BoardingHouse.findByIdAndUpdate(
         │       id, updateData, { new: true }
         │     )
         │
         ├─ BƯỚC 5: Xóa ảnh cũ (nếu có ảnh mới)
         │  ├─ Nếu photoPaths.length > 0 && oldPhotos.length > 0:
         │  │  ├─ Với mỗi photoUrl trong oldPhotos:
         │  │  │  - Lấy filename = path.basename(photoUrl)
         │  │  │  - filePathToDelete = uploads/accommodation/{filename}
         │  │  │  - fs.unlink(filePathToDelete)
         │  │  └─ await Promise.all(deletePromises)
         │  └─ Bỏ qua lỗi ENOENT (file không tồn tại)
         │
         └─ BƯỚC 6: Trả response
            └─ res.status(200).json({
                 message: "Cập nhật nhà trọ thành công",
                 data: updated
               })
```

### **Điểm quan trọng:**

1. **Chỉ ghi đè ảnh khi có upload mới**: Nếu không upload ảnh → giữ nguyên ảnh cũ
2. **Xóa ảnh cũ an toàn**: 
   - Chỉ xóa sau khi update DB thành công
   - Bỏ qua lỗi nếu file không tồn tại
   - Không block response nếu xóa file lỗi
3. **Reset approvedStatus**: Khi cập nhật, đặt lại về "pending" để admin duyệt lại
4. **Cleanup on error**: Nếu có lỗi, xóa files mới đã upload

### **Update không có ảnh mới:**

```javascript
// Request
PUT /api/boarding-houses/60d5ec49f1a2c8b1f8e4e1a2
{
  name: "Nhà Trọ Sinh Viên ABC - Đã sửa",
  description: "Mô tả mới...",
  location: {...},
  amenities: [...]
  // Không có photos
}

// → photos cũ được giữ nguyên
```

### **Update có ảnh mới:**

```javascript
// Request
PUT /api/boarding-houses/60d5ec49f1a2c8b1f8e4e1a2
FormData: {
  name: "Nhà Trọ Sinh Viên ABC - Đã sửa",
  photos: [new_file_1.jpg, new_file_2.jpg]
}

// → photos cũ bị xóa, thay bằng ảnh mới
```

---

## 4️⃣ DELETE - XÓA NHÀ TRỌ

### **Route:**
```
DELETE /api/boarding-houses/:id
```

### **Flow chi tiết:**

```
┌─────────────────┐
│  Chủ trọ yêu    │
│  cầu xóa nhà trọ│
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  CONTROLLER: deleteBoardingHouse    │
└────────┬────────────────────────────┘
         │
         ├─ BƯỚC 1: Kiểm tra phòng đang được đặt
         │  ├─ bookedRoom = await Room.findOne({
         │  │    boardingHouseId: houseId,
         │  │    status: "Booked"
         │  │  })
         │  └─ Nếu có phòng đang Booked:
         │     - Return 400: "Không thể xóa vì có phòng đang được đặt!"
         │
         ├─ BƯỚC 2: Xóa tất cả reviews
         │  └─ await Review.deleteMany({ boardingHouseId: houseId })
         │
         ├─ BƯỚC 3: Xóa tất cả rooms
         │  └─ await Room.deleteMany({ boardingHouseId: houseId })
         │
         ├─ BƯỚC 4: Xóa boarding house
         │  ├─ deletedHouse = await BoardingHouse.deleteOne({ _id: houseId })
         │  └─ Nếu deletedCount === 0:
         │     - Return 404: "Không tìm thấy nhà trọ"
         │
         └─ BƯỚC 5: Trả response
            └─ res.status(200).json({
                 message: "Xóa nhà trọ và tất cả các phòng thành công"
               })
```

### **Business Rules:**

1. **Không cho xóa nếu có phòng đang được đặt**: Bảo vệ khách hàng đã booking
2. **Cascade delete**: Xóa tất cả dữ liệu liên quan (rooms, reviews)
3. **Hard delete**: Xóa vĩnh viễn khỏi database (không phải soft delete)

### **Response Error (có phòng booked):**

```javascript
{
  "message": "Không thể xóa nhà trọ này vì đang có phòng được khách hàng đặt!"
}
```

### **Response Success:**

```javascript
{
  "message": "Xóa nhà trọ và tất cả các phòng thành công"
}
```

---

## 🛡️ ADMIN WORKFLOWS

Admin có các quyền đặc biệt để quản lý nhà trọ:

---

### **ADMIN-1: Xem tất cả nhà trọ (với filter)**

#### **Route:**
```
GET /api/admin/boarding-houses?page=1&limit=20&status=pending&search=...
```

#### **Query Params:**
- `page`: Trang hiện tại (default: 1)
- `limit`: Số lượng/trang (max: 20)
- `owner`: Tên hoặc email chủ trọ (regex search)
- `status`: approvedStatus (pending/approved/rejected/deleted)
- `fromDate`, `toDate`: Lọc theo ngày tạo
- `search`: Tìm kiếm theo tên nhà trọ

#### **Response:**

```javascript
{
  "total": 156,
  "page": 1,
  "pageSize": 20,
  "boardingHouses": [
    {
      "_id": "...",
      "ownerId": { "_id": "...", "name": "...", "email": "..." },
      "name": "Nhà Trọ ABC",
      "approvedStatus": "pending",
      "createdAt": "2025-11-19T10:00:00.000Z"
      // ... more fields
    },
    // ... 19 more
  ]
}
```

---

### **ADMIN-2: Xem chi tiết nhà trọ (kèm rooms)**

#### **Route:**
```
GET /api/admin/boarding-houses/:id
```

#### **Response:**

```javascript
{
  "_id": "...",
  "ownerId": { ... },
  "name": "Nhà Trọ ABC",
  "description": "...",
  "approvedStatus": "pending",
  
  // ✅ Danh sách phòng
  "rooms": [
    {
      "_id": "...",
      "roomNumber": "101",
      "price": 2000000,
      "status": "Available"
      // ... more
    },
    // ... more rooms
  ]
}
```

---

### **ADMIN-3: Duyệt/Từ chối bài đăng**

#### **Route:**
```
PUT /api/admin/boarding-houses/:id/approve
```

#### **Request Body:**

```javascript
// Duyệt
{
  "approvedStatus": "approved"
}

// Từ chối
{
  "approvedStatus": "rejected",
  "rejectedReason": "Ảnh không rõ ràng, thiếu thông tin địa chỉ"
}
```

#### **Flow:**

```
┌─────────────────┐
│  Admin quyết    │
│  định approve/  │
│  reject         │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  Validate approvedStatus            │
│  - Chỉ cho phép: approved, rejected │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  Cập nhật BoardingHouse             │
│  - approvedStatus                   │
│  - isApproved (true nếu approved)   │
│  - approvedAt (timestamp nếu approved)│
│  - rejectedReason (nếu rejected)    │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  Response                           │
│  - Thông báo thành công             │
│  - Trả về data đã update            │
└─────────────────────────────────────┘
```

#### **Response:**

```javascript
{
  "message": "Boarding house post updated.",
  "data": {
    "_id": "...",
    "approvedStatus": "approved",
    "isApproved": true,
    "approvedAt": "2025-11-19T14:30:00.000Z",
    // ... full object
  }
}
```

---

### **ADMIN-4: Xóa mềm nhà trọ (Soft Delete)**

#### **Route:**
```
PUT /api/admin/boarding-houses/:id/delete
```

#### **Request Body:**

```javascript
{
  "reason": "Vi phạm quy định: đăng ảnh không phù hợp, spam"
}
```

#### **Flow:**

```
┌─────────────────┐
│  Admin yêu cầu  │
│  xóa với lý do  │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  Validate                           │
│  - reason bắt buộc                  │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  Kiểm tra nhà trọ                   │
│  - Tồn tại?                         │
│  - Đã bị xóa chưa?                  │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  Kiểm tra phòng đang được thuê      │
│  - Room.findOne({                   │
│      boardingHouseId,               │
│      status: 'Booked'               │
│    })                               │
└────────┬────────────────────────────┘
         │
         ├─ Có phòng Booked
         │  └─ Return 400: Cannot delete
         │
         └─ Không có phòng Booked
            │
            ▼
┌─────────────────────────────────────┐
│  Soft Delete                        │
│  - approvedStatus = 'deleted'       │
│  - deletedReason = reason           │
│  - await house.save()               │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  Ghi Audit Log                      │
│  - AuditLog.create({                │
│      adminId, action, description   │
│    })                               │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  Response                           │
│  - Thông báo thành công             │
└─────────────────────────────────────┘
```

#### **Điểm quan trọng:**

1. **Soft Delete**: Không xóa khỏi DB, chỉ đổi status thành "deleted"
2. **Bảo vệ booking**: Không cho xóa nếu có phòng đang được thuê
3. **Audit Log**: Ghi lại lịch sử hành động của admin
4. **Reason required**: Bắt buộc ghi lý do xóa

#### **Response Error:**

```javascript
{
  "message": "Cannot delete this boarding house as it has currently rented rooms. Please resolve the bookings first."
}
```

#### **Response Success:**

```javascript
{
  "message": "Boarding house deleted successfully.",
  "data": {
    "_id": "...",
    "approvedStatus": "deleted",
    "deletedReason": "Vi phạm quy định..."
  }
}
```

---

## 🔐 AUTHENTICATION & AUTHORIZATION

### **Middleware sử dụng:**

```javascript
// Public routes (không cần auth)
GET /api/boarding-houses              // Xem danh sách nhà trọ approved
GET /api/boarding-houses/:id          // Xem chi tiết

// Owner routes (cần authMiddleware)
POST /api/boarding-houses             // Tạo nhà trọ
PUT /api/boarding-houses/:id          // Cập nhật
DELETE /api/boarding-houses/:id       // Xóa
GET /api/boarding-houses?ownerId=xxx  // Xem nhà trọ của mình

// Admin routes (cần adminAuth)
GET /api/admin/boarding-houses        // Xem tất cả
PUT /api/admin/boarding-houses/:id/approve
PUT /api/admin/boarding-houses/:id/delete
```

### **Kiểm tra quyền sở hữu:**

```javascript
// Trong controller UPDATE/DELETE
const house = await BoardingHouse.findById(id);

// Kiểm tra user có phải chủ nhà trọ không
if (house.ownerId.toString() !== req.user._id.toString()) {
  return res.status(403).json({ 
    message: "Bạn không có quyền chỉnh sửa nhà trọ này" 
  });
}
```

---

## 📊 TRẠNG THÁI VÀ LIFECYCLE

### **Trạng thái của BoardingHouse:**

```
┌──────────────┐
│   PENDING    │ ← Mới tạo, chờ admin duyệt
└──────┬───────┘
       │
       ├──────────────────┐
       │                  │
       ▼                  ▼
┌──────────┐       ┌──────────┐
│ APPROVED │       │ REJECTED │
└──────┬───┘       └──────────┘
       │
       │ (Admin xóa mềm)
       ▼
┌──────────┐
│ DELETED  │
└──────────┘
```

### **Trạng thái của Room:**

```
┌──────────────┐
│  AVAILABLE   │ ← Phòng trống, có thể đặt
└──────┬───────┘
       │
       │ (User booking)
       ▼
┌──────────────┐
│   BOOKED     │ ← Đã có người đặt
└──────┬───────┘
       │
       │ (Hết hợp đồng)
       ▼
┌──────────────┐
│  AVAILABLE   │
└──────────────┘

       hoặc
       
┌──────────────┐
│ UNAVAILABLE  │ ← Chủ trọ đánh dấu không cho thuê
└──────────────┘
```

---

## 🎨 THỐNG KÊ & BÁO CÁO (OWNER)

Hệ thống cung cấp các endpoint thống kê cho chủ trọ:

### **1. Ratings (Đánh giá)**

```
GET /api/boarding-houses/owner/ratings
→ Lấy tất cả nhà trọ của owner với ratings

GET /api/boarding-houses/owner/:id/ratings
→ Lấy chi tiết ratings của 1 nhà trọ
```

### **2. Statistics (Thống kê tổng quan)**

```
GET /api/boarding-houses/owner/statistics
→ Tổng số nhà trọ, phòng, booking, doanh thu
```

### **3. Monthly Revenue (Doanh thu theo tháng)**

```
GET /api/boarding-houses/owner/monthly-revenue
→ Biểu đồ doanh thu 12 tháng gần nhất
```

### **4. Recent Bookings (Đơn đặt gần đây)**

```
GET /api/boarding-houses/owner/recent-bookings
→ Danh sách booking mới nhất
```

### **5. Top Accommodations (Nhà trọ được đặt nhiều nhất)**

```
GET /api/boarding-houses/owner/top-accommodations
→ Ranking nhà trọ theo số lượng booking
```

### **6. Membership Info (Thông tin gói thành viên)**

```
GET /api/boarding-houses/owner/current-membership
GET /api/boarding-houses/owner/membership-info
→ Thông tin gói đang dùng, ngày hết hạn
```

---

## 🔍 TÌM KIẾM (SEARCH)

### **Route:**
```
GET /api/boarding-houses/searchBoardingHouse?query=...&district=...&minPrice=...&maxPrice=...
```

### **Query Params:**
- `query`: Từ khóa tìm kiếm (tên, mô tả)
- `district`: Lọc theo quận/huyện
- `minPrice`, `maxPrice`: Lọc theo giá
- `minArea`, `maxArea`: Lọc theo diện tích
- `amenities`: Lọc theo tiện ích (comma-separated)

### **Flow tìm kiếm:**

```
1. Text Search (MongoDB text index)
   - Search trong: name, description, location.addressDetail

2. Filter
   - location.district
   - price range (aggregate với rooms)
   - area range (aggregate với rooms)
   - amenities (array contains)

3. Sort
   - Relevance score (text search)
   - Price (low to high / high to low)
   - Created date (newest first)

4. Pagination
   - page, limit
```

---

## 🎓 BEST PRACTICES

### **1. Upload ảnh:**
- ✅ Sử dụng unique filename (timestamp + original name)
- ✅ AI moderation trước khi lưu
- ✅ Optimize ảnh (resize, compress)
- ✅ Cleanup ảnh cũ khi update
- ✅ Cleanup ảnh khi có lỗi

### **2. Validation:**
- ✅ Validate data phía server (không tin tưởng client)
- ✅ Check membership trước khi cho phép đăng
- ✅ Check quyền sở hữu trước khi update/delete
- ✅ Check phòng booked trước khi xóa

### **3. Performance:**
- ✅ Sử dụng index (ownerId, text search)
- ✅ Aggregate thay vì multiple queries
- ✅ Populate chỉ field cần thiết
- ✅ Pagination cho danh sách lớn

### **4. Security:**
- ✅ Authentication middleware
- ✅ Verify ownership
- ✅ AI image moderation
- ✅ Input sanitization
- ✅ Rate limiting (recommended)

### **5. Error Handling:**
- ✅ Try-catch cho tất cả async operations
- ✅ Cleanup resources on error
- ✅ Meaningful error messages
- ✅ Log errors với context

---

## 📋 CHECKLIST TESTING

### **CREATE:**
- [ ] Tạo nhà trọ với ảnh hợp lệ
- [ ] Tạo nhà trọ với ảnh vi phạm (should reject)
- [ ] Tạo nhà trọ với rooms
- [ ] Tạo nhà trọ với photosMap
- [ ] Tạo nhà trọ không có membership (should fail)

### **READ:**
- [ ] Lấy danh sách nhà trọ approved (public)
- [ ] Lấy danh sách nhà trọ của owner (private)
- [ ] Lấy chi tiết nhà trọ với rooms + reviews
- [ ] Lấy nhà trọ không tồn tại (404)

### **UPDATE:**
- [ ] Update thông tin cơ bản (không đổi ảnh)
- [ ] Update với ảnh mới (xóa ảnh cũ)
- [ ] Update bởi không phải owner (403)
- [ ] Update nhà trọ không tồn tại (404)

### **DELETE:**
- [ ] Xóa nhà trọ không có phòng booked
- [ ] Xóa nhà trọ có phòng booked (should fail)
- [ ] Xóa bởi không phải owner (403)
- [ ] Cascade delete rooms + reviews

### **ADMIN:**
- [ ] Admin xem tất cả nhà trọ
- [ ] Admin approve nhà trọ
- [ ] Admin reject nhà trọ với lý do
- [ ] Admin soft delete nhà trọ
- [ ] Admin không thể xóa nhà có phòng booked

---

## 🚀 VÍ DỤ FLOW HOÀN CHỈNH

### **Kịch bản: Chủ trọ đăng nhà trọ mới**

```
1. Chủ trọ điền form trên FE:
   - Tên: "Nhà Trọ Sinh Viên XYZ"
   - Địa chỉ: Quận Cầu Giấy, Hà Nội
   - Tiện ích: Wifi, Chỗ xe, Camera
   - Upload 2 ảnh chung nhà trọ
   - Thêm 3 phòng:
     • 101: 2tr/tháng, 20m2, upload 2 ảnh
     • 102: 2.5tr/tháng, 25m2, upload 3 ảnh
     • 103: 3tr/tháng, 30m2, upload 2 ảnh

2. FE gửi POST request:
   FormData {
     ownerId, name, description,
     location (JSON), amenities (JSON),
     rooms (JSON), photosMap (JSON),
     photos: [2 files],
     files: [7 files] // 2+3+2
   }

3. BE xử lý:
   ├─ Multer: Upload 9 files
   ├─ AI Moderation: Check 9 ảnh
   │  ├─ 8 ảnh pass
   │  └─ 1 ảnh vi phạm (có người trong ảnh)
   │     → Reject toàn bộ request
   │     → Xóa 9 files
   │     → Return 400

4. Chủ trọ upload lại (thay ảnh vi phạm):
   ├─ AI Moderation: 9 ảnh pass ✅
   ├─ Image Optimization: Resize + compress
   ├─ Controller:
   │  ├─ Tạo BoardingHouse (status: pending)
   │  └─ Tạo 3 Rooms với ảnh tương ứng
   └─ Return 201

5. Admin duyệt:
   PUT /api/admin/boarding-houses/{id}/approve
   { approvedStatus: "approved" }
   → status = approved, isApproved = true

6. Nhà trọ hiển thị công khai:
   GET /api/boarding-houses
   → Khách hàng thấy nhà trọ mới
```

---

## 🎉 KẾT LUẬN

Hệ thống CRUD nhà trọ cung cấp:

✅ **Đầy đủ chức năng**: CREATE, READ, UPDATE, DELETE  
✅ **Phân quyền rõ ràng**: Owner, Admin, Public  
✅ **An toàn**: AI moderation, authentication, validation  
✅ **Hiệu quả**: Aggregate, index, pagination  
✅ **Linh hoạt**: Soft delete, approval workflow  
✅ **Tracking**: Audit log, statistics  

**Entities liên quan:**
- BoardingHouse (1) → (N) Room
- BoardingHouse (1) → (N) Review
- BoardingHouse (1) → (N) RoommatePost
- Room (1) → (N) Booking
