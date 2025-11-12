import BottomNavigation from "@/components/BottomNavigation-Cus";
import { getMechanicByID } from "@/services/mechanicServices"; // Import hàm API
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router"; // Import hook để nhận params
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const { width } = Dimensions.get("window");

// Dữ liệu reviews tĩnh này sẽ được dùng làm dự phòng nếu API không trả về reviews
const staticReviews = [
  { id: "1", name: "Phan Phương", comment: "Thợ rất chuyên nghiệp, sửa nhanh và đúng bệnh!", rating: 5, time: "5 ngày trước" },
  { id: "2", name: "Đinh Nguyễn Khánh Luân", comment: "Phục vụ tận tâm, giá cả hợp lý.", rating: 5, time: "6 ngày trước" },
  { id: "3", name: "Diệu Đặng", comment: "Thái độ hơi khó chịu, nhưng tay nghề tốt.", rating: 3.6, time: "2 tuần trước" },
  { id: "4", name: "Đỗ Phương Anh", comment: "Ok.", rating: 4, time: "2 tuần trước" },
  { id: "5", name: "Phạm Lê Minh Quân", comment: "Bad.", rating: 1, time: "7 tuần trước" },
];

export default function MechanicDetails() {
  const router = useRouter();
  const { mechanicId } = useLocalSearchParams<{ mechanicId: string }>();
  console.log("Received mechanicId from params:", mechanicId);
  const [mechanic, setMechanic] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"intro" | "reviews">("intro");

  useEffect(() => {
    console.log("Received mechanicId:", mechanicId);
    if (mechanicId) {
      const fetchMechanicData = async () => {
        try {
          setLoading(true);
          const data = await getMechanicByID(mechanicId);
          setMechanic(data);
        } catch (error) {
          console.error("Failed to fetch mechanic details:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchMechanicData();
    }
  }, [mechanicId]);

  if (loading) {
    return (
      <View style={styles.centerScreen}>
        <ActivityIndicator size="large" color="#B71C1C" />
      </View>
    );
  }

  if (!mechanic) {
    return (
      <View style={styles.centerScreen}>
        <Text>Không tìm thấy thông tin thợ.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* HEADER IMAGE */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri:
              mechanic.userId.avatar ||
              "https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_1024,h_683/https://www.wyotech.edu/wp-content/uploads/2023/06/how-to-become-a-car-mechanic.jpg",
          }}
          style={styles.image}
        />

        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.heartBtn}>
          <Ionicons name="heart-outline" size={26} color="#fff" />
        </TouchableOpacity>

        {/* STATS FLOATING */}
        <View style={styles.statsRow}>
          <View style={[styles.statBox, { borderColor: "#B71C1C" }]}>
            <Ionicons name="construct" size={35} color="#B71C1C" style={styles.statIcon} />
            <Text style={styles.statValue}>{mechanic.experienceYears} năm</Text>
            <Text style={styles.statLabel}>Kinh nghiệm</Text>
          </View>
          <View style={[styles.statBox, { borderColor: "#FBC02D" }]}>
            <Ionicons name="star" size={35} color="#FBC02D" style={styles.statIcon} />
            <Text style={styles.statValue}>{mechanic.ratingAverage.toFixed(1)}</Text>
            <Text style={styles.statLabel}>Đánh giá</Text>
          </View>
          <View style={[styles.statBox, { borderColor: "#FB8C00" }]}>
            <Ionicons name="people" size={35} color="#FB8C00" style={styles.statIcon} />
            <Text style={styles.statValue}>150+</Text>
            <Text style={styles.statLabel}>Khách hàng</Text>
          </View>
        </View>
      </View>

      {/* TABS */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "intro" && styles.activeTab]}
          onPress={() => setActiveTab("intro")}
        >
          <Text style={[styles.tabText, activeTab === "intro" && styles.activeTabText]}>
            Giới thiệu
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "reviews" && styles.activeTab]}
          onPress={() => setActiveTab("reviews")}
        >
          <Text style={[styles.tabText, activeTab === "reviews" && styles.activeTabText]}>
            Đánh giá
          </Text>
        </TouchableOpacity>
      </View>

      {/* TAB CONTENT */}
      <View style={{ flex: 1 }}>
        {activeTab === "intro" ? (
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.introBox}>
              <Text style={styles.introText}>
                {mechanic.userId.bio || `Là một thợ sửa xe với hơn ${mechanic.experienceYears} năm kinh nghiệm trong nghề.`}
              </Text>
              <View style={styles.scheduleRow}>
                <Ionicons name="calendar" size={20} color="#B71C1C" />
                <Text style={styles.scheduleText}>Thứ 2 – Thứ 6</Text>
                <Ionicons name="time-outline" size={20} color="#B71C1C" style={{ marginLeft: 16 }} />
                <Text style={styles.scheduleText}>17:30 – 22:00</Text>
                <Ionicons name="ellipse" size={10} color={mechanic.availability ? "green" : "red"} style={{ marginLeft: 16 }} />
                <Text style={[styles.scheduleText, { color: mechanic.availability ? "green" : "red" }]}>
                  {mechanic.availability ? 'Trực tuyến' : 'Ngoại tuyến'}
                </Text>
              </View>
            </View>
          </ScrollView>
        ) : (
          <FlatList
            data={mechanic.reviews || staticReviews}
            keyExtractor={(item) => item.id}
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            renderItem={({ item }) => (
              <View style={styles.reviewCard}>
                <Ionicons name="person-circle-outline" size={36} color="#777" style={{ marginRight: 8 }} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.reviewName}>{item.name}</Text>
                  <Text style={styles.reviewComment}>{item.comment}</Text>
                  <Text style={styles.reviewTime}>{item.time}</Text>
                </View>
                <Text style={styles.reviewRating}>⭐ {item.rating}</Text>
              </View>
            )}
          />
        )}
      </View>

      {/* BOTTOM BAR */}
      <View style={styles.bottomBar}>
        <View style={{ flex: 1 }}>
          <Text style={styles.mechanicName}>{mechanic.userId.name}</Text>
          <Text style={styles.mechanicInfo}>{mechanic.userId.rawAddress || 'Chưa có địa chỉ'}</Text>
        </View>
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.push("/common/chat/chat")}>
          <Ionicons name="chatbubble-outline" size={22} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.push("/common/videoCall/videoCall")}>
          <Ionicons name="call-outline" size={22} color="#333" />
        </TouchableOpacity>
      </View>

      {/* ACTION BUTTONS */}
      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.bookBtn}
          onPress={() => {
            // Giả sử 'mechanic' là object chứa thông tin chi tiết của thợ
            if (mechanic) {
              router.push({
                pathname: "/customer/chooseLocation/chooseLocation",
                params: {
                  mechanicId: mechanicId,
                  // Gửi cả kinh độ và vĩ độ của thợ
                  mechanicLng: mechanic.userId.location.coordinates[0],
                  mechanicLat: mechanic.userId.location.coordinates[1],
                }
              });
            }
          }}
        >
          <Text style={styles.bookText}>Đặt Ngay</Text>
        </TouchableOpacity>
      <TouchableOpacity style={styles.starBtn}>
        <Ionicons name="star-outline" size={24} color="#B71C1C" />
      </TouchableOpacity>
    </View>

      {/* Bottom Navigation */ }
  <BottomNavigation activeTab="home" />
    </View >
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  centerScreen: { flex: 1, justifyContent: 'center', alignItems: 'center' },

  imageContainer: { width: "100%", height: 400, position: "relative" },
  image: { width: "100%", height: "100%" },
  backBtn: { position: "absolute", top: 40, left: 16, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 20, padding: 4 },
  heartBtn: { position: "absolute", top: 40, right: 16, backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: 20, padding: 4 },

  statsRow: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: -50, // Đẩy xuống để một nửa nằm ngoài ảnh
    left: 16,
    right: 16,
    zIndex: 1,
  },
  statBox: {
    width: 110,
    height: 100,
    marginHorizontal: 5,
    padding: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderRadius: 12,
    position: "relative",
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statIcon: { position: "absolute", top: 8, right: 8, opacity: 0.5 },
  statValue: { fontSize: 22, fontWeight: "bold", color: "#000", marginTop: 35 },
  statLabel: { fontSize: 14, color: "#555" },

  tabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginTop: 60, // Thêm khoảng trống cho statsRow
  },
  tab: { flex: 1, paddingVertical: 12, alignItems: "center" },
  activeTab: { borderBottomWidth: 3, borderBottomColor: "#B71C1C" },
  tabText: { fontSize: 16, color: "#555" },
  activeTabText: { color: "#B71C1C", fontWeight: "bold" },

  introBox: { padding: 16 },
  introText: { fontSize: 16, color: "#444", lineHeight: 24 },
  scheduleRow: { flexDirection: "row", alignItems: "center", marginTop: 16 },
  scheduleText: { marginLeft: 6, fontSize: 14, color: "#333" },

  reviewCard: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
  },
  reviewName: { fontWeight: "bold", fontSize: 16 },
  reviewComment: { fontSize: 15, color: "#444", marginTop: 2 },
  reviewTime: { fontSize: 12, color: "#999", marginTop: 4 },
  reviewRating: { fontSize: 15, fontWeight: "bold", marginLeft: "auto" },

  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  mechanicName: { fontWeight: "bold", fontSize: 20, color: "#222" },
  mechanicInfo: { fontSize: 14, color: "#666" },
  iconBtn: {
    marginLeft: 12,
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 30,
  },

  actionRow: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: '#eee'
  },
  bookBtn: {
    flex: 1,
    backgroundColor: "#B71C1C",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 10,
  },
  bookText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  starBtn: {
    borderWidth: 2,
    borderColor: "#B71C1C",
    borderRadius: 10,
    padding: 12,
  },
});