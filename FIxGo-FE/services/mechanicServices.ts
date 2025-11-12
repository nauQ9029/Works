
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const API_URL = "https://fixgo-be.onrender.com/api/mechanics";


export const getAllMechanics = async (filters = {}) => {
  // Phần 1 & 2: Tạo URL và gọi API vẫn giữ nguyên
  const queryString = new URLSearchParams(filters).toString();
  const url = `${API_URL}/all${queryString ? `?${queryString}` : ''}`;
  console.log(`Đang gọi API tới: ${url}`);
  const res = await axios.get(url);

  // --- THAY ĐỔI CHÍNH Ở PHẦN MAPPING BÊN DƯỚI ---

  // LƯU Ý QUAN TRỌNG: API aggregation của bạn có thể trả về dữ liệu trong res.data.data
  // Nếu gặp lỗi, hãy thử thay `res.data` bằng `res.data.data`
  const dataToMap = res.data.data || res.data;

  const formatted = dataToMap.map((m: any) => {
    // Lấy tọa độ từ m.location thay vì m.userId.location
    const [lng, lat] = m.location?.coordinates || [0, 0];

    return {
      id: m._id, 
      userId: m.userId, 
      name: m.name || "Không rõ tên", // Lấy trực tiếp từ m.name
      rating: m.ratingAverage ?? 0,
      experience: m.experienceYears ? `${m.experienceYears} năm` : "Chưa rõ",
      image: m.avatar || "https://example.com/default.png", // Lấy từ m.avatar
      coordinate: {
        latitude: lat,
        longitude: lng,
      },
      address: m.rawAddress || "Chưa có địa chỉ", // Lấy từ m.rawAddress
      skills: m.skills || [],
      availability: m.availability,
      distance: m.distance, // Thêm trường khoảng cách mới mà API trả về
    };
  });

  return formatted;
};

export const getMechanicByID = async (mechanicId: string) => {
  const res = await axios.get(`${API_URL}/${mechanicId}`, {
    headers: {
      Authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
    },
  });
  return res.data;
}

// mechanicServices.ts
export const getOnlineMechanics = async () => {
  const res = await axios.get(`${API_URL}/online`);
  return res.data.map((m: any) => ({
    id: m._id,
    name: m.name,
    image: m.avatar,
    coordinate: {
      latitude: m.location.coordinates[1],
      longitude: m.location.coordinates[0],
    },
  }));
};

// cập nhật vị trí thợ
export const updateMechanicLocation = async (mechanicId: string, latitude: number, longitude: number) => {
    const payload = {
        userId: mechanicId,
        location: {
            type: 'Point',
            coordinates: [longitude, latitude] // [kinh độ, vĩ độ]
        }
    };

    console.log("Payload chuẩn bị gửi lên server:", JSON.stringify(payload));

    try {
        // 1. Kích hoạt lại dòng này và thay thế bằng service API của bạn
        const response = await axios.post(`${API_URL}/update-location`, payload); // Sửa endpoint nếu cần

        // 2. Chỉ log thành công KHI API thực sự trả về kết quả tốt
        console.log("✔ Vị trí đã được gửi thành công!", response.data);
        return response.data; // Trả về data để xử lý tiếp nếu cần

    } catch (error) {
        console.error("✖ Lỗi gửi vị trí:", error);
        // Ném lỗi ra ngoài để component có thể bắt và xử lý (ví dụ: hiển thị thông báo)
        throw error;
    }
};

export const updateOnlineStatus = async (userId: string, status: boolean) => {
  if (!userId) return;
  try {
    await axios.put(`${API_URL}/${userId}/status`, { isOnline: status });
    console.log("✔ Cập nhật trạng thái:", status);
  } catch (err) {
    console.error("✖ Lỗi cập nhật trạng thái:", err);
  }
};