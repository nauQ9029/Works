import BottomNavigation from "@/components/BottomNavigation-Cus";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";

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

const reviews = [
  {
    id: "1",
    name: "Phan Phương",
    comment: "Thợ rất chuyên nghiệp, sửa nhanh và đúng bệnh!",
    rating: 5,
    time: "5 ngày trước",
  },
  {
    id: "2",
    name: "Đinh Nguyễn Khánh Luân",
    comment: "Phục vụ tận tâm, giá cả hợp lý.",
    rating: 5,
    time: "6 ngày trước",
  },
  {
    id: "3",
    name: "Diệu Đặng",
    comment: "Thái độ hơi khó chịu, nhưng tay nghề tốt.",
    rating: 3.6,
    time: "2 tuần trước",
  },
  {
    id: "4",
    name: "Đỗ Phương Anh",
    comment: "Ok.",
    rating: 4,
    time: "2 tuần trước",
  },
  {
    id: "5",
    name: "Phạm Lê Minh Quân",
    comment: "Bad.",
    rating: 1,
    time: "7 tuần trước",
  },
];

export default function MechanicDetails() {
  const router = useRouter();
  const { mechanicId } = useLocalSearchParams();
  // const { user } = useUser();
  // const [mechanic, setMechanic] = useState<any>(null);

  // Instead of fetching mechanic, just mock it using mechanicId
  const mechanic = {
    _id: mechanicId,
    name: `Mechanic ${mechanicId}`,
    age: 30,
    address: "Some Address",
    image: "https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_1024,h_683/https://www.wyotech.edu/wp-content/uploads/2023/06/how-to-become-a-car-mechanic.jpg"
  };

  const [activeTab, setActiveTab] = useState<"intro" | "reviews">("intro");

  // useEffect(() => {
  //   if (!mechanicId) return;
  //   axios.get(`${BASE_URL}/users/mechanic/${mechanicId}`)
  //     .then(res => setMechanic(res.data))
  //     .catch(err => console.error("Error loading mechanic:", err));
  // }, [mechanicId]);

  if (!mechanic) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#B71C1C" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* HEADER IMAGE */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: mechanic.image || "https://sp-ao.shortpixel.ai/client/to_auto,q_glossy,ret_img,w_1024,h_683/https://www.wyotech.edu/wp-content/uploads/2023/06/how-to-become-a-car-mechanic.jpg",
          }}
          style={styles.image}
        />

        {/* Back button */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>

        {/* Heart button */}
        <TouchableOpacity style={styles.heartBtn}>
          <Ionicons name="heart-outline" size={26} color="#fff" />
        </TouchableOpacity>

        {/* STATS FLOATING */}
        <View style={styles.statsRow}>
          <View style={[styles.statBox, { borderColor: "#B71C1C" }]}>
            <Ionicons name="construct" size={35} color="#B71C1C" style={styles.statIcon} />
            <Text style={[styles.statValue]}>4 năm</Text>
            <Text style={[styles.statLabel]}>Kinh nghiệm</Text>
          </View>

          <View style={[styles.statBox, { borderColor: "#FBC02D" }]}>
            <Ionicons name="star" size={35} color="#FBC02D" style={styles.statIcon} />
            <Text style={[styles.statValue]}>3.6</Text>
            <Text style={[styles.statLabel]}>Đánh giá</Text>
          </View>

          <View style={[styles.statBox, { borderColor: "#FB8C00" }]}>
            <Ionicons name="people" size={35} color="#FB8C00" style={styles.statIcon} />
            <Text style={[styles.statValue]}>150+</Text>
            <Text style={[styles.statLabel]}>Khách hàng</Text>
          </View>
        </View>
      </View>

      {/* TABS */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "intro" && styles.activeTab]}
          onPress={() => setActiveTab("intro")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "intro" && styles.activeTabText,
            ]}
          >
            Giới thiệu
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "reviews" && styles.activeTab]}
          onPress={() => setActiveTab("reviews")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "reviews" && styles.activeTabText,
            ]}
          >
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
                Bùi Lê Việt Anh là một thợ sửa xe máy và có hơn 4 năm kinh nghiệm
                trong nghề. Với tay nghề cao, sự tận tâm và tinh thần trách nhiệm,
                Anh đã giúp hàng trăm khách hàng sửa chữa xe nhanh chóng và hiệu quả.
              </Text>

              <View style={styles.scheduleRow}>
                <Ionicons name="calendar" size={20} color="#B71C1C" />
                <Text style={styles.scheduleText}>Thứ 2 – Thứ 6</Text>
                <Ionicons
                  name="time-outline"
                  size={20}
                  color="#B71C1C"
                  style={{ marginLeft: 16 }}
                />
                <Text style={styles.scheduleText}>17:30 – 22:00</Text>
                <Ionicons
                  name="ellipse"
                  size={10}
                  color="green"
                  style={{ marginLeft: 16 }}
                />
                <Text style={[styles.scheduleText, { color: "green" }]}>
                  Trực tuyến
                </Text>
              </View>
            </View>
          </ScrollView>
        ) : (
          <FlatList
            data={reviews}
            keyExtractor={(item) => item.id}
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            renderItem={({ item }) => (
              <View style={styles.reviewCard}>
                <Ionicons
                  name="person-circle-outline"
                  size={36}
                  color="#777"
                  style={{ marginRight: 8 }}
                />
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
          <Text style={styles.mechanicName}>{mechanic.name}</Text>
          <Text style={styles.mechanicInfo}>{mechanic.age} tuổi - {mechanic.address}</Text>
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
        <TouchableOpacity style={styles.bookBtn}
          onPress={() => router.push({
            pathname: "/customer/chooseLocation/chooseLocation",
            params: { mechanicId },
          })}>
          <Text style={styles.bookText}>Đặt Ngay</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.starBtn}>
          <Ionicons name="star-outline" size={24} color="#B71C1C" />
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  imageContainer: { width: "100%", height: 400, position: "relative" },
  image: { width: "100%", height: "100%" },
  backBtn: { position: "absolute", top: 40, left: 16 },
  heartBtn: { position: "absolute", top: 40, right: 16 },

  statsRow: {
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    bottom: 10,
    left: 16,
    right: 16,
  },

  statBox: {
    width: 100,
    height: 90,
    marginHorizontal: 5,
    padding: 8,
    backgroundColor: "rgba(255, 255, 255, 0.87)",
    borderWidth: 2,
    borderRadius: 12,
    position: "relative",
  },

  statIcon: {
    position: "absolute",
    top: 8,
    right: 8,
  },

  statValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginTop: 28, // pushes text lower
    textAlign: "left",
  },

  statLabel: {
    fontSize: 14,
    color: "#000",
    marginTop: -2,
    textAlign: "left",
  },

  tabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#B71C1C",
  },
  tabText: { fontSize: 20, color: "#555" },
  activeTabText: { color: "#B71C1C", fontWeight: "bold" },

  introBox: { padding: 16 },
  introText: { fontSize: 20, color: "#444", lineHeight: 23 },
  scheduleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },
  scheduleText: { marginLeft: 4, fontSize: 15, color: "#333" },

  reviewCard: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
  },
  reviewName: { fontWeight: "bold", fontSize: 20 },
  reviewComment: { fontSize: 18, color: "#444" },
  reviewTime: { fontSize: 15, color: "#999", marginTop: 2 },
  reviewRating: { fontSize: 15, fontWeight: "bold", marginLeft: 8 },

  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f5f5f5",
  },
  mechanicName: { fontWeight: "bold", fontSize: 30, color: "#222" },
  mechanicInfo: { fontSize: 20, color: "#666" },
  iconBtn: {
    marginLeft: 12,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 30,
    elevation: 2,
  },

  actionRow: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
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
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#B71C1C",
    borderRadius: 10,
    padding: 12,
  },
});
