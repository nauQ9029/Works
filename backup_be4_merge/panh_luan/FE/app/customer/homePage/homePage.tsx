import BottomNavigation from "@/components/BottomNavigation";
import { useFeedback } from "@/contexts/FeedbackContext";
import { useUser } from "@/contexts/userContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Button } from "react-native-paper";
const { width } = Dimensions.get("window");

type ServiceKey = "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i";
const serviceMap: Record<ServiceKey, { label: string; image: string }> = {
  a: { label: "Thay lốp khẩn cấp", image: "https://www.dunlopmotorcycletires.com/wp-content/uploads/2021/03/breakingthebead.jpg" },
  b: { label: "Xử lý xe ngập nước", image: "https://images2.thanhnien.vn/528068263637045248/2023/5/21/437d74d0a2f57cab25e4-1684650803943839760992.jpg" },
  c: { label: "Xe không nổ máy", image: "https://zuttoride.vn/uploads/image/Nga/khong-the-de-no-xe-may.jpg" },
  d: { label: "Xe hết xăng", image: "https://i.ex-cdn.com/vovgiaothong.vn/files/f1/Sites/1/media/letung/images/bao-xang.jpg" },
  e: { label: "Va chạm xe máy", image: "https://danviet.ex-cdn.com/files/f1/upload/1-2018/images/2018-02-25/Bi-va-cham-xe-may-mua-le-hoi-can-lam-ngay-5-viec-sau-xe-may1-1519527525-width660height440.jpg" },
  f: { label: "Mất chìa khóa", image: "https://thosuachuakhoa.vn/wp-content/uploads/2022/08/ca77a280-20190927_074343.jpg" },
  g: { label: "Đứt xích", image: "https://nhongsendia.vn/images/2018/05/20180529_a0d5d03e94f6b52b0f87055d8dd03950_1527561331.jpg" },
  h: { label: "Thay nhớt", image: "https://voxemay.vn/wp-content/uploads/2019/11/thoi-gian-thay-dau-nhot-xe-may.jpg" },
  i: { label: "Khói từ ống xả", image: "https://imgcdn.tapchicongthuong.vn/cartime-media/24/8/15/ong-xa_66bd7d40c5b7c.jpg" },
};
const pages: ServiceKey[][] = [["a", "b", "c"], ["d", "e", "f"], ["g", "h", "i"]];

export default function HomePage() {
  const router = useRouter();
 const { user } = useUser();
 const { showFeedback } = useFeedback();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContent}>

        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image source={require("@/assets/images/logo/fixgo.png")} style={styles.logo} />
          </View>
          <View style={styles.userContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.welcome}>Chào mừng trở lại</Text>
              <Text style={styles.username}>
                {user?.name || "Khách"}
              </Text>
            </View>
            {user?.avatar ? (
              <Image source={{ uri: user.avatar }} style={styles.avatarCircle} />
            ) : (
              <Ionicons name="person-circle-outline" size={34} color="#333" />
            )}
          </View>
               <Button
  onPress={() => {
    console.log("Test Feedback clicked");
    showFeedback({ bookingId: "68e4088536beb43d7049b42d", mechanicId: "68e4c5d2626db9cc8092b3c1" });
    // Navigate đến trang feedback
    router.push("/customer/feedback/feedback");
  }}
>
  Test Feedback
</Button>


        </View>

        {/* MAP SECTION */}
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 15.968947529061719,
              longitude: 108.26089660980934,
              latitudeDelta: 0.02,
              longitudeDelta: 0.02,
            }}
            zoomEnabled={true}
          >
            <Marker coordinate={{ latitude: 15.968947529061719, longitude: 108.26089660980934 }} />
          </MapView>
          <TouchableOpacity
            style={styles.findBtn}
            onPress={() => router.push("/customer/nearbyMechanics/nearbyMechanics")}
            activeOpacity={0.7}
          >
            <Ionicons name="construct-outline" size={20} color="#fff" />
            <Text style={styles.findBtnText}>Tìm thợ ngay</Text>
          </TouchableOpacity>
        </View>

        {/* BADGES */}
        <View style={styles.badgesRow}>
          <TouchableOpacity style={styles.badge} activeOpacity={0.7}>
            <Text style={styles.badgeText}>Khu vực</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/customer/sparePartsList/sparePartsList")}
            style={styles.badge}
            activeOpacity={0.7}>
            <Text style={styles.badgeText}>Tham khảo giá</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.badge} activeOpacity={0.7}>
            <Text style={styles.badgeText}>Đặt lịch</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.badge} activeOpacity={0.7}>
            <Text style={styles.badgeText}>Hỗ trợ ngay</Text>
          </TouchableOpacity>
        </View>

        {/* FEATURES */}
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
          {pages.map((page, pageIdx) => (
            <View key={pageIdx} style={styles.page}>
              {page.map((key) => (
                <TouchableOpacity
                  key={key}
                  style={styles.serviceCard}
                  activeOpacity={0.8}
                >
                  <Image source={{ uri: serviceMap[key].image }} style={styles.serviceImage} />
                  <Text style={styles.serviceText}>{serviceMap[key].label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </ScrollView>

        {/* MECHANICS */}
        <Text style={styles.sectionTitle}>Thợ được đánh giá cao gần bạn</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            onPress={() => router.push("/customer/mechanicDetails/mechanicDetails")}
            style={styles.mechanicCard}
            activeOpacity={0.8}>
            <Image source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }} style={styles.mechanicImage} />
            <Text style={styles.mechanicName}>Lebron James</Text>
            <Text style={styles.mechanicInfo}>5 năm kinh nghiệm</Text>
            <Text style={styles.rating}>⭐ 4.9 (100)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/customer/mechanicDetails/mechanicDetails")}
            style={styles.mechanicCard}
            activeOpacity={0.8}>
            <Image source={{ uri: "https://randomuser.me/api/portraits/women/44.jpg" }} style={styles.mechanicImage} />
            <Text style={styles.mechanicName}>Shangtoong Emptypee</Text>
            <Text style={styles.mechanicInfo}>11 năm kinh nghiệm</Text>
            <Text style={styles.rating}>⭐ 4.7 (85)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/customer/mechanicDetails/mechanicDetails")}
            style={styles.mechanicCard}
            activeOpacity={0.8}>
            <Image source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }} style={styles.mechanicImage} />
            <Text style={styles.mechanicName}>Muhammad Ali</Text>
            <Text style={styles.mechanicInfo}>1 năm kinh nghiệm</Text>
            <Text style={styles.rating}>⭐ 4.5 (56)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => router.push("/customer/mechanicDetails/mechanicDetails")}
            style={styles.mechanicCard}
            activeOpacity={0.8}>
            <Image source={{ uri: "https://randomuser.me/api/portraits/men/69.jpg" }} style={styles.mechanicImage} />
            <Text style={styles.mechanicName}>John von Neumann</Text>
            <Text style={styles.mechanicInfo}>1 năm kinh nghiệm</Text>
            <Text style={styles.rating}>⭐ 4.1 (24)</Text>
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { flex: 1 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 12,
  },
  logoContainer: { flexDirection: "row", alignItems: "center" },
  logo: { width: 50, height: 50, marginRight: 6 },
  logoText: { fontWeight: "bold", color: "#D32F2F", fontSize: 18 },
  userContainer: { flexDirection: "row", alignItems: "center" },
  textContainer: { flexDirection: "column", alignItems: "flex-end", marginRight: 8 },
  welcome: { fontSize: 12, color: "#777" },
  username: { fontSize: 14, fontWeight: "bold", color: "#D32F2F" },

  mapContainer: {
    height: 600,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
  },
  map: { flex: 1 },
  findBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B71C1C",
    padding: 16,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginBottom: 10,
  },
  findBtnText: { color: "#fff", marginLeft: 6, fontWeight: "bold" },

  // BADGES
  badgesRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 16,
    marginBottom: 20,
  },
  badge: {
    backgroundColor: "#eee",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  badgeText: { fontSize: 13, fontWeight: "500" },

  page: { width, paddingHorizontal: 15, paddingVertical: 8 },
  serviceCard: { marginBottom: 12, borderRadius: 12, overflow: "hidden" },
  serviceImage: { width: "100%", height: 120, borderRadius: 12 },
  serviceText: {
    position: "absolute",
    bottom: 10,
    left: 16,
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    textShadowColor: "rgba(0,0,0,0.7)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },

  sectionTitle: { fontSize: 16, fontWeight: "bold", marginLeft: 16, marginTop: 20 },
  mechanicCard: {
    backgroundColor: "#fff",
    margin: 12,
    marginBottom: 30,
    padding: 14,
    borderRadius: 12,
    width: 160,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mechanicImage: { width: "100%", height: 100, borderRadius: 8 },
  mechanicName: { fontWeight: "bold", marginTop: 8 },
  mechanicInfo: { fontSize: 12, color: "#555", marginTop: 2 },
  rating: { fontSize: 12, color: "#F57C00", marginTop: 4 },
  avatarCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
});
