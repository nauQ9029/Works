# 👨‍💼 OWNER (LANDLORD) - WORKFLOW VÀ NGHIỆP VỤ

## 🎯 TỔNG QUAN

**Owner (Landlord)** hay **Chủ trọ** là người sở hữu và cho thuê nhà trọ/phòng trọ. Đây là vai trò quan trọng trong hệ thống với các quyền hạn và trách nhiệm sau:

### **Vai trò và quyền hạn:**
- ✅ Đăng tin cho thuê nhà trọ (BoardingHouse) và phòng (Room)
- ✅ Quản lý nhà trọ và phòng của mình
- ✅ Xem và quản lý booking từ khách hàng
- ✅ Duyệt/từ chối yêu cầu thuê phòng
- ✅ Tạo và quản lý hợp đồng thuê phòng
- ✅ Xem thống kê doanh thu, ratings, bookings
- ✅ Mua và quản lý gói membership để đăng nhiều nhà trọ hơn
- ✅ Chat với khách hàng tiềm năng

### **Hạn chế:**
- ❌ Cần mua membership package để đăng bài (có giới hạn số lượng bài đăng)
- ❌ Bài đăng phải được admin duyệt mới hiển thị công khai
- ❌ Không thể xóa nhà trọ đang có phòng được thuê
- ❌ Ảnh upload phải qua AI moderation

---

## 🔄 LIFECYCLE TỔNG QUAN

```
┌──────────────────────────────────────────────────────────────┐
│                  ĐĂNG KÝ TÀI KHOẢN                           │
│  - Đăng ký với role: 'owner'                                │
│  - Xác thực email                                           │
│  - Cập nhật profile (tên, SĐT, avatar)                      │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────────┐
│              MUA MEMBERSHIP PACKAGE                          │
│  - Xem danh sách gói membership                             │
│  - Chọn gói phù hợp (số bài đăng, thời hạn, giá)           │
│  - Thanh toán qua PayOS/VNPay                               │
│  - Nhận quyền đăng bài                                      │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────────┐
│              TẠO MẪU HỢP ĐỒNG (OPTIONAL)                    │
│  - Soạn mẫu hợp đồng chuẩn                                  │
│  - Upload chữ ký số                                         │
│  - Lưu template để dùng cho tất cả booking                  │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────────┐
│              ĐĂNG TIN NHÀ TRỌ                               │
│  - Điền thông tin nhà trọ (tên, địa chỉ, tiện ích)         │
│  - Upload ảnh (qua AI moderation)                           │
│  - Thêm danh sách phòng (số phòng, giá, diện tích)         │
│  - Gửi bài → status: 'pending'                             │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────────┐
│              CHỜ ADMIN DUYỆT                                │
│  - Admin review bài đăng                                    │
│  - approved → Bài đăng công khai                            │
│  - rejected → Nhận thông báo lý do, sửa lại                 │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────────┐
│              NHẬN VÀ QUẢN LÝ BOOKING                        │
│  - Nhận thông báo có booking mới                            │
│  - Xem thông tin khách hàng                                 │
│  - Chat với khách để trao đổi                               │
│  - Duyệt/từ chối booking                                    │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────────┐
│              TẠO HỢP ĐỒNG & CHỜ KÝ                          │
│  - Hệ thống tạo hợp đồng từ template                        │
│  - Gửi cho khách hàng ký                                    │
│  - Khách ký → Chủ trọ ký                                    │
│  - Hoàn tất hợp đồng                                        │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────────┐
│              NHẬN THANH TOÁN & BÀN GIAO                     │
│  - Khách thanh toán tiền cọc/tiền thuê                      │
│  - Booking status → 'paid'                                  │
│  - Room status → 'Booked'                                   │
│  - Bàn giao phòng cho khách                                 │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────────┐
│              QUẢN LÝ TRONG QUÁ TRÌNH THUÊ                   │
│  - Theo dõi trạng thái phòng                                │
│  - Chat với khách khi cần                                   │
│  - Nhận review/rating từ khách                              │
│  - Xem báo cáo doanh thu                                    │
└────────────────────┬─────────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────────┐
│              KẾT THÚC HỢP ĐỒNG                              │
│  - Hợp đồng hết hạn hoặc khách checkout                     │
│  - Room status → 'Available'                                │
│  - Có thể cho thuê lại                                      │
└──────────────────────────────────────────────────────────────┘
```

---

## 📋 CHI TIẾT CÁC CHỨC NĂNG

---

## 1️⃣ QUẢN LÝ TÀI KHOẢN

### **1.1. Đăng ký tài khoản Owner**

#### **Flow:**
```
User đăng ký → Chọn role 'owner' → Nhập thông tin 
→ Xác thực email → Kích hoạt tài khoản
```

#### **Model User:**
```javascript
{
  role: 'owner',           // Vai trò chủ trọ
  name: "Nguyễn Văn A",
  email: "owner@example.com",
  phone: "0123456789",
  password: "hashed_password",
  status: 'active',        // active/inactive/banned
  verified: true,          // Đã xác thực email
  isMembership: 'active',  // active/inactive/none
  avatar: "/uploads/avatars/...",
  provider: 'local'        // hoặc 'google'
}
```

### **1.2. Cập nhật profile**

```
PUT /api/profile
FormData: {
  name, phone, avatar (file)
}
```

---

## 2️⃣ MEMBERSHIP PACKAGE (GÓI THÀNH VIÊN)

### **Tại sao cần membership?**
- Hệ thống giới hạn số lượng bài đăng cho mỗi owner
- Cần mua gói để được quyền đăng nhiều nhà trọ
- Mỗi gói có: giá, thời hạn, số bài đăng cho phép

### **2.1. Xem danh sách gói membership**

```
GET /api/membership-packages
```

#### **Response:**
```javascript
[
  {
    "_id": "...",
    "packageName": "Basic",
    "price": 299000,          // 299k VNĐ
    "duration": 30,           // 30 ngày
    "postsAllowed": 3,        // Đăng được 3 nhà trọ
    "description": "Gói cơ bản cho chủ trọ mới",
    "features": [
      "Đăng tối đa 3 nhà trọ",
      "Hỗ trợ 24/7",
      "AI tạo mô tả tự động"
    ],
    "isActive": true
  },
  {
    "_id": "...",
    "packageName": "Premium",
    "price": 599000,
    "duration": 60,
    "postsAllowed": 10,
    "description": "Gói cao cấp cho chủ nhiều nhà trọ",
    "features": [
      "Đăng tối đa 10 nhà trọ",
      "Ưu tiên hiển thị",
      "Phân tích chi tiết",
      "Hỗ trợ VIP"
    ],
    "isActive": true
  }
]
```

### **2.2. Mua gói membership**

#### **Flow:**
```
┌─────────────────┐
│  Chủ trọ chọn   │
│  gói membership │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  Tạo Payment record                 │
│  - status: 'Pending'                │
│  - amount: package.price            │
│  - membershipPackageId              │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  Redirect đến PayOS/VNPay           │
│  - Khách thanh toán                 │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  Webhook nhận kết quả               │
│  - Nếu thành công:                  │
│    • Payment.status = 'Paid'        │
│    • User.isMembership = 'active'   │
│    • Gửi notification               │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  Chủ trọ có thể đăng bài            │
└─────────────────────────────────────┘
```

#### **Endpoint:**
```
POST /api/payment/create-membership
{
  "ownerId": "60d5ec49...",
  "membershipPackageId": "60d5ec49..."
}
```

### **2.3. Kiểm tra membership hiện tại**

```
GET /api/boarding-houses/owner/membership-info
Authorization: Bearer {token}
```

#### **Response:**
```javascript
{
  "success": true,
  "membershipInfo": {
    "hasActiveMembership": true,
    "packageName": "Premium",
    "postsAllowed": 10,             // Được phép đăng 10 bài
    "currentPostsCount": 7,         // Đã đăng 7 bài
    "remainingPosts": 3,            // Còn lại 3 slot
    "isExpired": false,
    "expiredAt": "2025-12-19T10:00:00.000Z"
  }
}
```

### **2.4. Logic kiểm tra membership khi đăng bài**

```javascript
// Trong createBoardingHouse controller
const latestPayment = await Payment.findOne({ 
  ownerId, 
  status: "Paid" 
})
.sort({ createAt: -1 })
.populate("membershipPackageId");

if (!latestPayment || !latestPayment.membershipPackageId) {
  return res.status(403).json({ 
    message: "Bạn cần mua gói membership để đăng bài!" 
  });
}

const membershipPackage = latestPayment.membershipPackageId;
const expiredAt = new Date(
  latestPayment.createdAt.getTime() + 
  membershipPackage.duration * 24 * 60 * 60 * 1000
);

if (new Date() > expiredAt) {
  return res.status(403).json({ 
    message: "Gói membership của bạn đã hết hạn!" 
  });
}

const currentPostsCount = await BoardingHouse.countDocuments({ ownerId });
if (currentPostsCount >= membershipPackage.postsAllowed) {
  return res.status(403).json({ 
    message: `Bạn đã đạt giới hạn ${membershipPackage.postsAllowed} bài đăng!` 
  });
}

// ✅ OK, cho phép đăng bài
```

---

## 3️⃣ QUẢN LÝ NHÀ TRỌ (BOARDING HOUSE)

### **3.1. Tạo nhà trọ mới**

```
POST /api/boarding-houses
Authorization: Bearer {token}
```

#### **Flow chi tiết:**
(Xem file `BOARDING_HOUSE_CRUD_FLOW.md` phần CREATE)

#### **Điểm quan trọng:**
1. ✅ Check membership trước khi cho phép tạo
2. ✅ Upload ảnh qua AI moderation
3. ✅ Optimize ảnh tự động
4. ✅ Tạo BoardingHouse với status `pending`
5. ✅ Tạo luôn các Room kèm theo
6. ✅ Chờ admin duyệt

### **3.2. Xem danh sách nhà trọ của mình**

```
GET /api/boarding-houses?ownerId={ownerId}
Authorization: Bearer {token}
```

#### **Response:**
```javascript
[
  {
    "_id": "...",
    "ownerId": { ... },
    "name": "Nhà Trọ ABC",
    "approvedStatus": "approved",  // pending/approved/rejected/deleted
    "totalRooms": 10,
    "availableRoomsCount": 7,
    "minPrice": 1500000,
    "maxPrice": 3000000,
    // ... more fields
  }
]
```

### **3.3. Cập nhật nhà trọ**

```
PUT /api/boarding-houses/:id
Authorization: Bearer {token}
```

#### **Lưu ý:**
- Khi cập nhật, `approvedStatus` sẽ reset về `pending`
- Cần admin duyệt lại
- Ảnh cũ sẽ bị xóa nếu upload ảnh mới

### **3.4. Xóa nhà trọ**

```
DELETE /api/boarding-houses/:id
Authorization: Bearer {token}
```

#### **Điều kiện xóa:**
- ❌ Không được có phòng đang ở trạng thái `Booked`
- ✅ Sẽ xóa cascade tất cả rooms và reviews

---

## 4️⃣ QUẢN LÝ HỢP ĐỒNG (CONTRACT)

### **4.1. Tạo mẫu hợp đồng**

Owner nên tạo mẫu hợp đồng chuẩn để tái sử dụng cho tất cả booking.

#### **Endpoint:**
```
POST /api/contracts/template
Authorization: Bearer {token}
```

#### **Request:**
```javascript
{
  "title": "HỢP ĐỒNG THUÊ PHÒNG TRỌ",
  "content": `
CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
Độc lập - Tự do - Hạnh phúc

HỢP ĐỒNG THUÊ PHÒNG TRỌ

Hôm nay, ngày [DATE], tại [ADDRESS], chúng tôi gồm:

BÊN A (BÊN CHO THUÊ):
- Họ tên: [OWNER_NAME]
- CMND/CCCD: [OWNER_ID]
- Địa chỉ: [OWNER_ADDRESS]
- Số điện thoại: [OWNER_PHONE]

BÊN B (BÊN THUÊ):
- Họ tên: [TENANT_NAME]
- CMND/CCCD: [TENANT_ID]
- Địa chỉ: [TENANT_ADDRESS]
- Số điện thoại: [TENANT_PHONE]

ĐIỀU 1: ĐỐI TƯỢNG VÀ NỘI DUNG HỢP ĐỒNG
...
  `,
  "signatureDataUrl": "data:image/png;base64,iVBORw0KG..."  // Chữ ký số
}
```

#### **Flow:**
```
┌─────────────────┐
│  Owner soạn     │
│  mẫu hợp đồng   │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  Upload chữ ký số (canvas)          │
│  - Convert canvas to base64         │
│  - Gửi kèm content                  │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  BE lưu template                    │
│  - Decode base64 → PNG file         │
│  - Lưu vào /uploads/signatures/     │
│  - Lưu DB: ContractTemplate         │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  Template sẵn sàng dùng cho booking │
└─────────────────────────────────────┘
```

### **4.2. Xem mẫu hợp đồng của mình**

```
GET /api/contracts/template
Authorization: Bearer {token}
```

### **4.3. Hợp đồng cho booking cụ thể**

Khi khách đã booking và thanh toán, hệ thống tự động tạo hợp đồng từ template.

#### **Khách ký hợp đồng:**
```
POST /api/contracts/sign-tenant
{
  "bookingId": "...",
  "signatureDataUrl": "data:image/png;base64,..."
}
```

#### **Owner xem và export PDF:**
```
GET /api/contracts/:id/export
→ Download PDF với 2 chữ ký (owner + tenant)
```

---

## 5️⃣ QUẢN LÝ BOOKING

### **5.1. Xem danh sách booking**

```
GET /api/boarding-houses/owner/recent-bookings
Authorization: Bearer {token}
```

#### **Response:**
```javascript
{
  "success": true,
  "bookings": [
    {
      "_id": "...",
      "userId": {
        "name": "Nguyễn Văn B",
        "email": "customer@example.com",
        "phone": "0987654321"
      },
      "roomId": {
        "roomNumber": "101",
        "price": 2000000
      },
      "boardingHouseId": {
        "name": "Nhà Trọ ABC"
      },
      "status": "pending",              // pending/paid/completed/cancelled
      "contractStatus": "pending_approval",  // Trạng thái hợp đồng
      "guestInfo": {
        "firstName": "Văn",
        "lastName": "Nguyễn",
        "purpose": "Học tập",
        "startDate": "2025-12-01",
        "leaseDuration": "6 months"
      },
      "createdAt": "2025-11-19T10:00:00.000Z"
    }
  ]
}
```

### **5.2. Duyệt booking**

```
PUT /api/bookings/:id/approve
Authorization: Bearer {token}
```

#### **Flow:**
```
┌─────────────────┐
│  Khách đặt phòng│
│  status: pending│
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  Owner nhận notification            │
│  "Bạn có booking mới từ [NAME]"     │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  Owner xem thông tin khách          │
│  - Tên, SĐT, email                  │
│  - Mục đích thuê                    │
│  - Thời gian thuê                   │
└────────┬────────────────────────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌─────────┐ ┌──────────┐
│ APPROVE │ │ REJECT   │
└────┬────┘ └────┬─────┘
     │           │
     │           ▼
     │      ┌──────────────────────┐
     │      │ Gửi lý do từ chối    │
     │      │ Booking cancelled    │
     │      └──────────────────────┘
     │
     ▼
┌─────────────────────────────────────┐
│  contractStatus: approved           │
│  Tạo hợp đồng từ template           │
│  Gửi cho khách ký                   │
└─────────────────────────────────────┘
```

### **5.3. Từ chối booking**

```
PUT /api/bookings/:id/reject
{
  "rejectionReason": "Phòng đã có người đặt trước"
}
```

---

## 6️⃣ THỐNG KÊ VÀ BÁO CÁO

Owner có dashboard riêng với các chỉ số quan trọng.

### **6.1. Tổng quan thống kê**

```
GET /api/boarding-houses/owner/statistics
Authorization: Bearer {token}
```

#### **Response:**
```javascript
{
  "success": true,
  "statistics": {
    "totalBoardingHouses": 5,      // Tổng số nhà trọ
    "totalRooms": 30,               // Tổng số phòng
    "availableRooms": 22,           // Phòng trống
    "bookedRooms": 8,               // Phòng đã thuê
    "totalRevenue": 45000000,       // Tổng doanh thu (VNĐ)
    "totalBookings": 35             // Tổng số booking
  }
}
```

### **6.2. Doanh thu theo tháng**

```
GET /api/boarding-houses/owner/monthly-revenue?months=6
Authorization: Bearer {token}
```

#### **Response:**
```javascript
{
  "success": true,
  "monthlyRevenue": [
    {
      "month": "Th6 2025",
      "monthNumber": 6,
      "year": 2025,
      "revenue": 8500000,
      "bookingsCount": 4
    },
    {
      "month": "Th7 2025",
      "revenue": 9200000,
      "bookingsCount": 5
    },
    // ... 4 tháng nữa
  ]
}
```

#### **Biểu đồ:**
```
Revenue (triệu VNĐ)
   │
10 │              ┌──┐
 9 │         ┌──┐ │  │
 8 │    ┌──┐ │  │ │  │ ┌──┐
 7 │    │  │ │  │ │  │ │  │
 6 │    │  │ │  │ │  │ │  │
   └────┴──┴─┴──┴─┴──┴─┴──┴──
      Jun Jul Aug Sep Oct Nov
```

### **6.3. Top nhà trọ được booking nhiều nhất**

```
GET /api/boarding-houses/owner/top-accommodations
Authorization: Bearer {token}
```

#### **Response:**
```javascript
{
  "success": true,
  "topAccommodations": [
    {
      "_id": "...",
      "name": "Nhà Trọ Sinh Viên A",
      "totalBookings": 25,
      "totalRevenue": 15000000,
      "averageRating": 4.8
    },
    {
      "_id": "...",
      "name": "Nhà Trọ Gần Trường B",
      "totalBookings": 18,
      "totalRevenue": 12000000,
      "averageRating": 4.5
    }
  ]
}
```

### **6.4. Xem ratings và reviews**

```
GET /api/boarding-houses/owner/ratings
Authorization: Bearer {token}
```

#### **Response:**
```javascript
{
  "success": true,
  "boardingHouses": [
    {
      "_id": "...",
      "name": "Nhà Trọ ABC",
      "averageRating": 4.7,
      "totalReviews": 15,
      "createdAt": "2025-01-15T..."
    }
  ]
}
```

#### **Chi tiết rating của 1 nhà trọ:**
```
GET /api/boarding-houses/owner/:id/ratings
```

```javascript
{
  "success": true,
  "accommodationTitle": "Nhà Trọ ABC",
  "avgRating": 4.7,
  "totalReviews": 15,
  "ratings": [
    {
      "_id": "...",
      "customerId": {
        "name": "Trần Thị C",
        "avatar": "/uploads/..."
      },
      "rating": 5,
      "comment": "Phòng sạch sẽ, chủ nhà thân thiện!",
      "createdAt": "2025-11-18T..."
    },
    // ... more reviews
  ]
}
```

---

## 7️⃣ CHAT VỚI KHÁCH HÀNG

### **7.1. Danh sách cuộc hội thoại**

```
GET /api/chats
Authorization: Bearer {token}
```

#### **Response:**
```javascript
[
  {
    "_id": "...",
    "participants": [
      {
        "_id": "...",
        "name": "Nguyễn Văn A",  // Owner
        "role": "owner"
      },
      {
        "_id": "...",
        "name": "Trần Thị B",     // Customer
        "role": "customer"
      }
    ],
    "lastMessage": {
      "content": "Phòng còn trống không ạ?",
      "createdAt": "2025-11-19T15:30:00.000Z"
    },
    "unreadCount": 2
  }
]
```

### **7.2. Xem tin nhắn**

```
GET /api/chats/:chatId/messages
Authorization: Bearer {token}
```

### **7.3. Gửi tin nhắn**

```
POST /api/chats/:chatId/messages
{
  "content": "Phòng vẫn còn trống ạ, bạn có muốn xem phòng không?"
}
```

### **7.4. Real-time chat với Socket.io**

```javascript
// Client (Owner)
socket.on('new_message', (message) => {
  if (message.chatId === currentChatId) {
    appendMessage(message);
    playNotificationSound();
  }
});
```

---

## 8️⃣ NOTIFICATIONS (THÔNG BÁO)

Owner nhận thông báo về các sự kiện quan trọng:

### **Các loại thông báo:**

| Event | Title | Message |
|-------|-------|---------|
| **New Booking** | 🔔 Booking mới | Bạn có booking mới từ [Customer Name] cho phòng [Room Number] |
| **Payment Received** | 💰 Thanh toán thành công | Khách hàng [Name] đã thanh toán cho phòng [Room Number] |
| **New Review** | ⭐ Đánh giá mới | [Customer] đã đánh giá [Rating] sao cho [BoardingHouse Name] |
| **Membership Expiring** | ⚠️ Gói membership sắp hết hạn | Gói [Package Name] sẽ hết hạn vào [Date] |
| **Post Approved** | ✅ Bài đăng được duyệt | Bài đăng "[BoardingHouse Name]" đã được admin phê duyệt |
| **Post Rejected** | ❌ Bài đăng bị từ chối | Bài đăng "[Name]" bị từ chối. Lý do: [Reason] |

### **Endpoint:**
```
GET /api/notifications
Authorization: Bearer {token}
```

#### **Response:**
```javascript
{
  "notifications": [
    {
      "_id": "...",
      "userId": "...",
      "title": "🔔 Booking mới",
      "message": "Bạn có booking mới từ Nguyễn Văn B cho phòng 101",
      "type": "booking",
      "isRead": false,
      "createdAt": "2025-11-19T16:00:00.000Z"
    }
  ],
  "unreadCount": 5
}
```

---

## 🔐 BẢO MẬT & PHÂN QUYỀN

### **Middleware xác thực:**

```javascript
// authMiddleware.js
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  const decoded = jwt.verify(token, JWT_SECRET);
  req.user = decoded;  // { id, email, role }
  next();
};
```

### **Kiểm tra quyền sở hữu:**

```javascript
// Trong controller
const boardingHouse = await BoardingHouse.findById(id);

if (boardingHouse.ownerId.toString() !== req.user.id) {
  return res.status(403).json({ 
    message: "Bạn không có quyền thực hiện thao tác này" 
  });
}
```

### **Routes bảo vệ:**

```javascript
// Chỉ owner mới truy cập được
router.get('/owner/statistics', authMiddleware, requireOwner, controller);

// Middleware kiểm tra role
const requireOwner = (req, res, next) => {
  if (req.user.role !== 'owner') {
    return res.status(403).json({ message: 'Chỉ chủ trọ mới được truy cập' });
  }
  next();
};
```

---

## 📊 BUSINESS RULES

### **BR-1: Membership Requirements**
- Owner PHẢI có gói membership active để đăng bài
- Số lượng bài đăng không vượt quá `postsAllowed`
- Membership hết hạn → không đăng bài mới được (nhưng bài cũ vẫn hiển thị)

### **BR-2: Approval Workflow**
- Bài đăng mới → status: `pending`
- Cần admin duyệt → `approved` mới hiển thị công khai
- Nếu bị `rejected`, owner cần sửa và gửi lại

### **BR-3: Deletion Rules**
- Không xóa được nhà trọ có phòng đang `Booked`
- Xóa nhà trọ → cascade xóa rooms + reviews
- Admin có thể soft delete (status: `deleted`)

### **BR-4: Booking Management**
- Owner có quyền approve/reject booking
- Sau khi approve, khách phải thanh toán trong thời gian quy định
- Khách thanh toán → Room status = `Booked`

### **BR-5: Revenue Calculation**
- Chỉ tính booking có status: `paid` hoặc `completed`
- Chỉ tính payment có status: `Paid`
- Revenue = SUM(payments.amount)

---

## 🎯 KPI & METRICS

Owner có thể theo dõi các chỉ số:

### **Occupancy Rate (Tỷ lệ lấp đầy):**
```
Occupancy = (Booked Rooms / Total Rooms) × 100%
```

### **Average Revenue Per Room:**
```
Avg Revenue = Total Revenue / Total Rooms
```

### **Booking Conversion Rate:**
```
Conversion = (Paid Bookings / Total Bookings) × 100%
```

### **Average Rating:**
```
Avg Rating = SUM(reviews.rating) / COUNT(reviews)
```

---

## 🔄 TYPICAL USER JOURNEY

### **Kịch bản: Chủ trọ mới bắt đầu**

```
NGÀY 1: Đăng ký và setup
├─ 09:00: Đăng ký tài khoản với role 'owner'
├─ 09:05: Xác thực email
├─ 09:10: Cập nhật profile (tên, SĐT, avatar)
└─ 09:15: Xem danh sách gói membership

NGÀY 2: Mua membership
├─ 10:00: Chọn gói Premium (10 bài, 60 ngày, 599k)
├─ 10:05: Thanh toán qua PayOS
├─ 10:06: Nhận thông báo "Thanh toán thành công"
└─ 10:10: Kiểm tra membership info (10 slots available)

NGÀY 3: Tạo mẫu hợp đồng
├─ 14:00: Soạn mẫu hợp đồng chuẩn
├─ 14:30: Vẽ chữ ký số trên canvas
└─ 14:35: Lưu template

NGÀY 4-5: Đăng bài
├─ Nhà trọ #1: "Nhà Trọ Sinh Viên A" (3 phòng)
│  ├─ Upload 10 ảnh
│  ├─ AI moderation: Pass ✅
│  ├─ Optimize images
│  └─ Status: pending
│
├─ Nhà trọ #2: "Nhà Trọ Gần Trường B" (5 phòng)
│  └─ Status: pending
│
└─ Membership: 8/10 slots used

NGÀY 6: Admin duyệt
├─ 09:00: Nhà trọ #1 → approved ✅
├─ 09:30: Nhà trọ #2 → rejected ❌
│          Lý do: "Ảnh không rõ ràng"
├─ 10:00: Sửa ảnh nhà trọ #2, gửi lại
└─ 15:00: Nhà trọ #2 → approved ✅

TUẦN 2: Nhận booking đầu tiên
├─ Khách A đặt phòng 101 (Nhà trọ #1)
├─ Owner nhận notification
├─ Xem thông tin khách, chat trao đổi
├─ Approve booking
├─ Hệ thống gửi hợp đồng cho khách ký
├─ Khách ký → Owner ký → Hoàn tất
├─ Khách thanh toán → Room status: Booked
└─ Bàn giao phòng

THÁNG 1: Quản lý & thống kê
├─ 5 nhà trọ đã đăng
├─ 30 phòng (22 available, 8 booked)
├─ 35 bookings (25 paid, 8 pending, 2 cancelled)
├─ Doanh thu: 45 triệu VNĐ
├─ Rating trung bình: 4.7/5
└─ 15 reviews

THÁNG 2: Gia hạn membership
├─ Nhận thông báo "Gói sắp hết hạn"
├─ Mua thêm gói Premium (60 ngày nữa)
└─ Tiếp tục quản lý
```

---

## 🎨 DASHBOARD LAYOUT

### **Trang chủ Owner Dashboard:**

```
┌─────────────────────────────────────────────────────────────┐
│  👨‍💼 DASHBOARD CHỦ TRỌ - [Owner Name]                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📊 THỐNG KÊ TỔNG QUAN                                      │
│  ┌────────────┬────────────┬────────────┬────────────┐     │
│  │ 🏠 Nhà trọ │ 🚪 Phòng   │ 💰 Doanh thu│ ⭐ Rating  │     │
│  │    5       │    30      │  45 triệu  │   4.7/5    │     │
│  └────────────┴────────────┴────────────┴────────────┘     │
│                                                             │
│  📈 DOANH THU 6 THÁNG GẦN NHẤT                              │
│  [Biểu đồ cột]                                              │
│                                                             │
│  🔔 BOOKING MỚI (3)                                         │
│  ┌───────────────────────────────────────────────────┐     │
│  │ • Nguyễn Văn B - Phòng 101 - 2tr/tháng   [Duyệt] │     │
│  │ • Trần Thị C - Phòng 205 - 2.5tr/tháng   [Duyệt] │     │
│  │ • Lê Văn D - Phòng 103 - 2tr/tháng       [Duyệt] │     │
│  └───────────────────────────────────────────────────┘     │
│                                                             │
│  🏘️ NHÀ TRỌ CỦA TÔI                                         │
│  [Danh sách nhà trọ với actions: Sửa, Xóa, Xem chi tiết]   │
│                                                             │
│  💳 MEMBERSHIP                                              │
│  Gói: Premium | Còn: 8/10 slots | Hết hạn: 19/12/2025      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 API ENDPOINTS SUMMARY

### **Membership:**
```
GET    /api/membership-packages              // Xem gói
POST   /api/payment/create-membership        // Mua gói
GET    /api/boarding-houses/owner/membership-info  // Check membership
```

### **Boarding House:**
```
POST   /api/boarding-houses                  // Tạo nhà trọ
GET    /api/boarding-houses?ownerId={id}     // Danh sách của mình
GET    /api/boarding-houses/:id              // Chi tiết
PUT    /api/boarding-houses/:id              // Cập nhật
DELETE /api/boarding-houses/:id              // Xóa
```

### **Statistics:**
```
GET    /api/boarding-houses/owner/statistics           // Tổng quan
GET    /api/boarding-houses/owner/monthly-revenue      // Doanh thu tháng
GET    /api/boarding-houses/owner/recent-bookings      // Booking gần đây
GET    /api/boarding-houses/owner/top-accommodations   // Top nhà trọ
GET    /api/boarding-houses/owner/ratings              // Danh sách ratings
GET    /api/boarding-houses/owner/:id/ratings          // Rating chi tiết
```

### **Contract:**
```
POST   /api/contracts/template                // Tạo mẫu
GET    /api/contracts/template                // Xem mẫu
GET    /api/contracts/:id/export              // Export PDF
```

### **Booking:**
```
GET    /api/boarding-houses/owner/recent-bookings  // Danh sách
PUT    /api/bookings/:id/approve               // Duyệt
PUT    /api/bookings/:id/reject                // Từ chối
```

### **Chat & Notifications:**
```
GET    /api/chats                              // Danh sách chat
GET    /api/chats/:id/messages                 // Tin nhắn
POST   /api/chats/:id/messages                 // Gửi tin
GET    /api/notifications                      // Thông báo
PUT    /api/notifications/:id/read             // Đánh dấu đã đọc
```

---

## 🎓 BEST PRACTICES

### **1. Quản lý ảnh:**
- ✅ Upload ảnh chất lượng cao, rõ nét
- ✅ Chụp nhiều góc độ (ngoại thất, nội thất, tiện ích)
- ✅ Tránh ảnh có người trong khung hình
- ✅ Đặt tên file có ý nghĩa (vd: room101_bed.jpg)

### **2. Mô tả nhà trọ:**
- ✅ Viết mô tả chi tiết, đầy đủ
- ✅ Nêu rõ tiện ích, quy định
- ✅ Ghi địa chỉ chính xác
- ✅ Cập nhật thường xuyên

### **3. Quản lý booking:**
- ✅ Phản hồi nhanh (trong vòng 24h)
- ✅ Chat thân thiện với khách
- ✅ Rõ ràng về giá cả, điều khoản
- ✅ Duyệt booking kịp thời

### **4. Chăm sóc khách hàng:**
- ✅ Giữ phòng sạch sẽ
- ✅ Bảo trì thiết bị định kỳ
- ✅ Hỗ trợ khách 24/7
- ✅ Khuyến khích khách review

### **5. Tối ưu doanh thu:**
- ✅ Cập nhật giá theo thị trường
- ✅ Chạy ưu đãi vào mùa thấp điểm
- ✅ Tăng chất lượng để được rating cao
- ✅ Đa dạng hóa loại phòng

---

## ❗ COMMON ISSUES & SOLUTIONS

### **Issue 1: Không đăng được bài**
```
Error: "Bạn cần mua gói membership để đăng bài!"
→ Solution: Mua gói membership package
```

### **Issue 2: Ảnh bị reject**
```
Error: "Image flagged: inappropriate_content"
→ Solution: 
  - Xóa ảnh có người
  - Chụp lại ảnh rõ hơn
  - Không chụp nội dung nhạy cảm
```

### **Issue 3: Không xóa được nhà trọ**
```
Error: "Không thể xóa vì có phòng đang được đặt"
→ Solution:
  - Đợi hợp đồng hết hạn
  - Hoặc thỏa thuận với khách checkout sớm
```

### **Issue 4: Membership hết hạn**
```
Error: "Gói membership đã hết hạn"
→ Solution: Mua gói mới để tiếp tục
→ Note: Bài cũ vẫn hiển thị, chỉ không đăng bài mới được
```

---

## 🎉 KẾT LUẬN

Owner (Landlord) workflow cung cấp:

✅ **Quản lý toàn diện**: Từ đăng bài → nhận booking → quản lý hợp đồng  
✅ **Thống kê chi tiết**: Doanh thu, ratings, occupancy rate  
✅ **Tương tác tốt**: Chat với khách, nhận thông báo real-time  
✅ **Bảo mật cao**: Phân quyền rõ ràng, xác thực đầy đủ  
✅ **Dễ sử dụng**: Dashboard trực quan, API rõ ràng  

**Key Features:**
- 💳 Membership-based posting system
- 🤖 AI-powered image moderation
- 📝 Digital contract management
- 📊 Comprehensive analytics
- 💬 Real-time chat & notifications
- ⭐ Review & rating management
