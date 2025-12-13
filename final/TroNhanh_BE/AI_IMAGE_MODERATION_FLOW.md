# 📸 AI IMAGE MODERATION - FLOW VÀ NGHIỆP VỤ

## 🎯 MỤC ĐÍCH
Hệ thống AI phân tích và duyệt ảnh tự động để đảm bảo:
1. **An toàn nội dung**: Loại bỏ ảnh có nội dung không phù hợp (adult, violence, racy)
2. **Chất lượng nội dung**: Đảm bảo ảnh liên quan đến phòng trọ/nhà ở
3. **Bảo vệ người dùng**: Ngăn chặn spam, lừa đảo, ảnh giả mạo

---

## 🔄 FLOW TỔNG QUAN

```
┌─────────────────┐
│  User Upload    │
│  Ảnh lên hệ     │
│  thống          │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  MULTER MIDDLEWARE                  │
│  - Nhận file upload                 │
│  - Lưu vào thư mục tạm              │
│  - Validate kích thước, định dạng   │
└────────┬────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────┐
│  IMAGE VALIDATION MIDDLEWARE        │
│  (validateUploadedImages)           │
└────────┬────────────────────────────┘
         │
         ├──────────────────────────────────────┐
         │                                      │
         ▼                                      ▼
┌────────────────────┐              ┌──────────────────────┐
│  GOOGLE VISION API │              │  ANALYZE IMAGE       │
│  Safe Search       │              │  Label Detection     │
│  Detection         │              │  Detection           │
└────────┬───────────┘              └──────────┬───────────┘
         │                                     │
         │                                     │
         └──────────────┬──────────────────────┘
                        │
                        ▼
         ┌──────────────────────────────┐
         │  PHÂN TÍCH KẾT QUẢ          │
         │  - Check Safety Violations   │
         │  - Check Forbidden Labels    │
         │  - Check Allowed Labels      │
         └──────────┬───────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
        ▼                       ▼
┌───────────────┐      ┌────────────────┐
│  ẢNH AN TOÀN  │      │  ẢNH VI PHẠM   │
│  (isSafe=true)│      │  (isSafe=false)│
└───────┬───────┘      └────────┬───────┘
        │                       │
        ▼                       ▼
┌───────────────┐      ┌────────────────────┐
│  Tiếp tục     │      │  LƯU VÀO DB        │
│  xử lý        │      │  FlaggedImage      │
│  (Optimize,   │      │  + Ghi log         │
│  Save to DB)  │      │  + Xóa file (nếu   │
└───────────────┘      │    auto-reject)    │
                       └────────────────────┘
```

---

## 🔍 CHI TIẾT CÁC BƯỚC

### **BƯỚC 1: KHỞI TẠO GOOGLE VISION CLIENT**

```javascript
// Ưu tiên 1: GOOGLE_CREDENTIALS_JSON (cho Production/Render)
if (process.env.GOOGLE_CREDENTIALS_JSON) {
  const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS_JSON);
  client = new vision.ImageAnnotatorClient({ credentials });
}
// Ưu tiên 2: GOOGLE_VISION_CREDENTIALS (cho Development - path to file)
else if (process.env.GOOGLE_VISION_CREDENTIALS) {
  client = new vision.ImageAnnotatorClient({
    keyFilename: process.env.GOOGLE_VISION_CREDENTIALS
  });
}
// Ưu tiên 3: GOOGLE_APPLICATION_CREDENTIALS (chuẩn của Google)
else {
  client = new vision.ImageAnnotatorClient();
}
```

**Giải thích:**
- Production (Render): Dùng `GOOGLE_CREDENTIALS_JSON` - paste toàn bộ nội dung file JSON vào env
- Development: Dùng `GOOGLE_VISION_CREDENTIALS` - đường dẫn đến file JSON
- Fallback: Dùng biến môi trường mặc định của Google Cloud

---

### **BƯỚC 2: MIDDLEWARE XỬ LÝ FILE UPLOAD**

Khi user upload ảnh, `validateUploadedImages` middleware được gọi:

```javascript
// Xử lý các format upload khác nhau:
- req.file: Single file (multer.single())
- req.files (Array): Multiple files (multer.array())
- req.files (Object): Named fields (multer.fields())
```

**Ví dụ:**
```javascript
// Upload phòng trọ với nhiều ảnh
req.files = {
  photos: [file1, file2, file3],
  documents: [file4]
}
```

---

### **BƯỚC 3: PHÂN TÍCH AN TOÀN (analyzeImageSafety)**

Hàm này thực hiện **2 phân tích song song** để tối ưu tốc độ:

#### **3.1. Safe Search Detection**
Phát hiện nội dung không an toàn:

| Category | Ngưỡng | Ý nghĩa |
|----------|---------|---------|
| **adult** | UNLIKELY | Nội dung người lớn (18+), khiêu dâm |
| **violence** | UNLIKELY | Bạo lực, máu me |
| **racy** | LIKELY | Hở hang, gợi cảm |
| **spoof** | POSSIBLE | Ảnh giả, chỉnh sửa quá mức |
| **medical** | POSSIBLE | Nội dung y tế nhạy cảm |

**Likelihood Levels:**
```
UNKNOWN (0) → VERY_UNLIKELY (1) → UNLIKELY (2) → POSSIBLE (3) → LIKELY (4) → VERY_LIKELY (5)
```

**Logic kiểm tra:**
```javascript
// Nếu likelihood của ảnh >= ngưỡng → VI PHẠM
if (LIKELIHOOD_SCORES[detections.adult] >= LIKELIHOOD_SCORES['UNLIKELY']) {
  violations.push({ category: 'adult', likelihood: detections.adult });
}
```

#### **3.2. Label Detection**
Phát hiện đối tượng/nhãn trong ảnh:

**A. ALLOWED_LABELS (Nhãn được phép):**
```javascript
ALLOWED_LABELS = [
  // Kiến trúc
  'building', 'house', 'apartment', 'room', 'ceiling', 'floor', 'wall', 'door', 'window',
  
  // Phòng
  'bedroom', 'living room', 'kitchen', 'bathroom',
  
  // Nội thất
  'furniture', 'bed', 'chair', 'table', 'desk', 'sofa',
  
  // Thiết bị
  'refrigerator', 'air conditioner', 'fan', 'television'
]
```

**B. FORBIDDEN_LABELS (Nhãn cấm):**
```javascript
FORBIDDEN_LABELS = [
  // Con người
  'person', 'people', 'human', 'face', 'selfie', 'portrait',
  
  // Cơ thể/quần áo
  'bra', 'bikini', 'lingerie', 'underwear', 'skin', 'body',
  
  // Nguy hiểm
  'weapon', 'gun', 'knife', 'blood', 'nudity'
]
```

**Logic kiểm tra:**
```javascript
// TÌM FORBIDDEN LABELS (score > 0.7)
const forbiddenFound = labels.filter(label => 
  FORBIDDEN_LABELS.some(forbidden => 
    label.description.includes(forbidden) && label.score > 0.7
  )
);

// Nếu tìm thấy → AUTO-REJECT
if (forbiddenFound.length > 0) {
  violations.push({ 
    category: 'inappropriate_content',
    labels: forbiddenFound.map(l => l.description)
  });
}

// TÌM ALLOWED LABELS (score > 0.6)
const allowedFound = labels.filter(label => 
  ALLOWED_LABELS.some(allowed => 
    label.description.includes(allowed) && label.score > 0.6
  )
);

// Tracking only - không tự động reject nếu thiếu allowed labels
hasRelevantContent = allowedFound.length > 0;
```

---

### **BƯỚC 4: KẾT QUẢ PHÂN TÍCH**

Function trả về object:

```javascript
{
  isSafe: true/false,           // Tổng kết: ảnh an toàn hay không
  violations: [                 // Danh sách vi phạm (nếu có)
    { category: 'adult', likelihood: 'LIKELY' },
    { category: 'inappropriate_content', labels: ['person', 'selfie'] }
  ],
  details: {                    // Chi tiết từng category
    adult: 'UNLIKELY',
    violence: 'VERY_UNLIKELY',
    racy: 'UNLIKELY',
    spoof: 'POSSIBLE',
    medical: 'VERY_UNLIKELY'
  },
  contentCheck: {
    hasRelevantContent: true,   // Có nội dung liên quan phòng trọ không
    allowedLabelsFound: ['room', 'bed', 'furniture'],
    forbiddenLabelsFound: []    // Empty nếu không có
  },
  timestamp: '2025-11-19T...'
}
```

---

### **BƯỚC 5: XỬ LÝ KẾT QUẢ (MIDDLEWARE)**

#### **5.1. Ảnh AN TOÀN (isSafe = true)**
```javascript
✅ Tiếp tục xử lý:
   - Optimize image (resize, compress)
   - Lưu vào database
   - Trả về thành công cho user
```

#### **5.2. Ảnh VI PHẠM (isSafe = false)**
```javascript
⚠️ Xử lý vi phạm:
   1. Log violation details
   2. Lưu vào FlaggedImage collection
   3. Tính severity (mức độ nghiêm trọng)
   4. Quyết định auto-reject hay manual review
   5. Xóa file nếu auto-reject
   6. Trả lỗi 400 cho user
```

**Lưu vào FlaggedImage:**
```javascript
const flaggedImage = new FlaggedImage({
  imagePath: filePath,
  originalFilename: file.originalname,
  imageUrl: `/uploads/${path.basename(filePath)}`,
  entityType: 'BoardingHouse',        // Loại entity
  entityId: req.params.boardingHouseId,
  uploaderId: req.user.id,
  moderationResult: safetyResult,     // Kết quả đầy đủ từ Vision API
  severity: 'HIGH',                   // Tính toán severity
  autoRejected: true                  // Tự động reject hay cần review
});
```

---

## 📊 SEVERITY LEVELS (MỨC ĐỘ NGHIÊM TRỌNG)

```javascript
function determineSeverity(violations) {
  // CRITICAL: Adult, violence, weapons
  if (violations.some(v => ['adult', 'violence'].includes(v.category))) {
    return 'CRITICAL';
  }
  
  // HIGH: Forbidden content (people, inappropriate items)
  if (violations.some(v => v.category === 'inappropriate_content')) {
    return 'HIGH';
  }
  
  // MEDIUM: Racy content
  if (violations.some(v => v.category === 'racy')) {
    return 'MEDIUM';
  }
  
  // LOW: Spoof, medical
  return 'LOW';
}
```

---

## 🚫 AUTO-REJECT LOGIC

```javascript
function shouldAutoReject(violations) {
  // Auto-reject nếu:
  // 1. Adult content LIKELY hoặc cao hơn
  // 2. Violence LIKELY hoặc cao hơn
  // 3. Có forbidden labels với score cao
  
  return violations.some(v => {
    if (v.category === 'adult' || v.category === 'violence') {
      return LIKELIHOOD_SCORES[v.likelihood] >= LIKELIHOOD_SCORES['LIKELY'];
    }
    if (v.category === 'inappropriate_content') {
      return true; // Always auto-reject forbidden labels
    }
    return false;
  });
}
```

---

## 🎨 CÁC FUNCTION PHỤ TRỢ

### **1. detectLabels()**
Chỉ phát hiện labels/objects, không check safety:
```javascript
const labels = await detectLabels(imagePath);
// Returns: [
//   { description: 'Room', score: 0.95, confidence: 95 },
//   { description: 'Furniture', score: 0.89, confidence: 89 }
// ]
```

### **2. detectText()**
Phát hiện text trong ảnh (hữu ích để phát hiện spam, quảng cáo):
```javascript
const text = await detectText(imagePath);
// Returns: "GIÁ RẺ NHẤT HÀ NỘI - 0123456789"
```

### **3. comprehensiveImageAnalysis()**
Kết hợp cả 3: safety + labels + text:
```javascript
const analysis = await comprehensiveImageAnalysis(imagePath);
// Returns: {
//   safety: { isSafe, violations, details, contentCheck },
//   labels: [...top 10 labels...],
//   detectedText: "...",
//   analysisTimestamp: "..."
// }
```

### **4. batchAnalyzeImages()**
Phân tích nhiều ảnh cùng lúc:
```javascript
const results = await batchAnalyzeImages([path1, path2, path3]);
// Returns: [
//   { imagePath: path1, status: 'fulfilled', data: {...} },
//   { imagePath: path2, status: 'rejected', error: '...' }
// ]
```

---

## 🔧 CẤU HÌNH NGƯỠNG

### **Điều chỉnh độ nghiêm ngặt:**

```javascript
// STRICT MODE (hiện tại - recommended cho production)
const SAFETY_THRESHOLDS = {
  adult: 'UNLIKELY',      // Rất nghiêm ngặt
  violence: 'UNLIKELY',   // Rất nghiêm ngặt
  racy: 'LIKELY',         // Vừa phải
  spoof: 'POSSIBLE',      // Vừa phải
  medical: 'POSSIBLE'     // Vừa phải
};

// MODERATE MODE (nếu muốn giảm false positive)
const SAFETY_THRESHOLDS = {
  adult: 'POSSIBLE',
  violence: 'POSSIBLE',
  racy: 'VERY_LIKELY',
  spoof: 'LIKELY',
  medical: 'LIKELY'
};

// RELAXED MODE (chỉ reject khi chắc chắn)
const SAFETY_THRESHOLDS = {
  adult: 'LIKELY',
  violence: 'LIKELY',
  racy: 'VERY_LIKELY',
  spoof: 'VERY_LIKELY',
  medical: 'VERY_LIKELY'
};
```

---

## 📝 VÍ DỤ THỰC TÊ

### **Ví dụ 1: Ảnh phòng ngủ hợp lệ**
```javascript
Input: room_bedroom.jpg

Google Vision phát hiện:
- Labels: ['bedroom', 'furniture', 'bed', 'room', 'interior design']
- Safe Search: { adult: 'VERY_UNLIKELY', violence: 'VERY_UNLIKELY', racy: 'UNLIKELY' }

Kết quả:
✅ isSafe = true
✅ hasRelevantContent = true (có 'bedroom', 'bed', 'room')
✅ violations = []
→ Ảnh được chấp nhận
```

### **Ví dụ 2: Ảnh selfie người dùng**
```javascript
Input: selfie.jpg

Google Vision phát hiện:
- Labels: ['person', 'face', 'selfie', 'smile', 'beauty']
- Safe Search: { adult: 'UNLIKELY', racy: 'POSSIBLE' }

Kết quả:
❌ isSafe = false
❌ violations = [{ 
     category: 'inappropriate_content', 
     labels: ['person', 'face', 'selfie', 'beauty']
   }]
→ Ảnh bị reject (forbidden labels)
```

### **Ví dụ 3: Ảnh có nội dung nhạy cảm**
```javascript
Input: inappropriate.jpg

Google Vision phát hiện:
- Labels: ['skin', 'body', 'underwear']
- Safe Search: { adult: 'LIKELY', racy: 'VERY_LIKELY' }

Kết quả:
❌ isSafe = false
❌ violations = [
     { category: 'adult', likelihood: 'LIKELY' },
     { category: 'racy', likelihood: 'VERY_LIKELY' },
     { category: 'inappropriate_content', labels: ['skin', 'body', 'underwear'] }
   ]
❌ severity = 'CRITICAL'
❌ autoRejected = true
→ Ảnh bị reject ngay lập tức và xóa file
```

### **Ví dụ 4: Ảnh cảnh quan (không liên quan phòng trọ)**
```javascript
Input: landscape.jpg

Google Vision phát hiện:
- Labels: ['sky', 'tree', 'nature', 'landscape', 'outdoor']
- Safe Search: { adult: 'VERY_UNLIKELY', violence: 'VERY_UNLIKELY' }

Kết quả:
✅ isSafe = true (không có violations)
⚠️  hasRelevantContent = false (không có allowed labels)
→ Ảnh được chấp nhận (không tự động reject nếu chỉ thiếu relevant content)
   Nhưng admin có thể review sau
```

---

## 🎯 ĐIỂM QUAN TRỌNG

### **1. Tại sao không auto-reject ảnh thiếu relevant content?**
- Tránh false positive (ví dụ: ảnh góc rộng nhà trọ có thể không detect được 'room')
- Google Vision có thể miss một số labels
- Cho phép linh hoạt hơn (ảnh ngoại cảnh khu trọ, ảnh ban công, v.v.)

### **2. Tại sao lại check cả labels và safe search?**
- **Safe Search**: Phát hiện nội dung nhạy cảm (adult, violence)
- **Labels**: Phát hiện đối tượng cụ thể (người, vũ khí, đồ lót)
- Kết hợp 2 phương pháp → độ chính xác cao hơn

### **3. Tại sao cần threshold score (0.7 cho forbidden, 0.6 cho allowed)?**
- Google Vision trả về score từ 0-1 (độ tin cậy)
- Score thấp = không chắc chắn → tránh false positive
- Forbidden cần score cao hơn (0.7) để đảm bảo chắc chắn

---

## 🚀 SETUP CHO PRODUCTION (RENDER)

### **Bước 1: Chuẩn bị Google Cloud credentials**
```bash
# Lấy nội dung file JSON
cat tronhanhimgverifictaion-be236ee6d769.json
# Copy toàn bộ output
```

### **Bước 2: Thêm vào Render Environment Variables**
```
Key: GOOGLE_CREDENTIALS_JSON
Value: {
  "type": "service_account",
  "project_id": "...",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  ...
}
```

### **Bước 3: Deploy & Test**
```bash
# Sau khi deploy, test với endpoint
POST /api/test/image-moderation
```

---

## 📈 MONITORING & LOGGING

Các log quan trọng để theo dõi:
```javascript
[VISION API] Analyzing image: /path/to/image.jpg
[VISION API] Detected labels: room, furniture, bed, window
[IMAGE FLAGGED] photo.jpg - Violations: [...]
[AUTO-REJECTED] Deleted flagged file: inappropriate.jpg
[CONTENT VIOLATION] Forbidden content detected: ['person', 'face']
```

---

## 🎓 KẾT LUẬN

Hệ thống AI Image Moderation này cung cấp:
- ✅ **Bảo mật**: Lọc nội dung không phù hợp tự động
- ✅ **Chất lượng**: Đảm bảo ảnh liên quan đến phòng trọ
- ✅ **Linh hoạt**: Có thể điều chỉnh ngưỡng theo nhu cầu
- ✅ **Tracking**: Lưu lại lịch sử vi phạm để review
- ✅ **Hiệu quả**: Xử lý song song, tối ưu tốc độ

**Use cases chính:**
1. Upload ảnh phòng trọ (BoardingHouse)
2. Upload ảnh phòng (Room)
3. Upload avatar người dùng
4. Upload ảnh tìm bạn cùng phòng (Roommate)
