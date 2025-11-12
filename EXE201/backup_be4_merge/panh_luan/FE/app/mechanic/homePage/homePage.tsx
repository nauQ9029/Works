import BottomNavigation from "@/components/BottomNavigation";
import { useMechanicStatus } from "@/contexts/MechanicStatusContext";
import { useUser } from "@/contexts/userContext";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

interface Banner {
  id: string;
  img: string;
  title: string;
  action?: {
    label: string;
    route:
      | "/mechanic/dashboard/dashboard"
      | "/mechanic/subscription/subscription"
      | "/mechanic/bookRepairList/bookRepairList"
      | "/common/chat/chat"
      | "/mechanic/workingStatus/workingStatus";
  };
}

export default function MechanicHomePage() {
  const { isOnline } = useMechanicStatus();
  const router = useRouter();
  const [bannerIndex, setBannerIndex] = useState(0);
 const { user } = useUser();
  // Stats
  const stats = { finished: 12, revenue: "8.2tr", rating: 4.9 };

  // Banner data
  const banners: Banner[] = [
    {
      id: "1",
      img: "https://picsum.photos/400/200?random=10",
      title: `Tháng này bạn đã hoàn thành ${stats.finished} đơn`,
      action: { label: "Xem thống kê", route: "/mechanic/dashboard/dashboard" },
    },
    {
      id: "2",
      img: "https://picsum.photos/400/200?random=11",
      title: "Nâng cấp gói hội viên để nhận nhiều đơn hơn",
      action: { label: "Nâng cấp ngay", route: "/mechanic/subscription/subscription" },
    },
  ];

  // Orders
  const orders = [
    { id: 1, customer: "Nguyễn Văn A", service: "Thay nhớt", distance: "3km", price: "150k" },
    { id: 2, customer: "Trần Thị B", service: "Vá lốp", distance: "1.5km", price: "80k" },
    { id: 3, customer: "Lê Văn C", service: "Ắc quy", distance: "5km", price: "450k" },
  ];

  // Reasons
  const reasons = [
    {
      id: "1",
      text: "Tại sao nên chọn FixGo",
      details: ["Tìm thợ theo vị trí", "Đa dạng dịch vụ", "Đặt lịch minh bạch", "Giao diện dễ dùng"],
    },
    { id: "2", img: "https://picsum.photos/300/200?random=1" },
    { id: "3", img: "https://picsum.photos/300/200?random=2" },
    {
      id: "4",
      text: "FIXGO – Thợ có mặt khi bạn cần!",
      details: ["Xe hư? Đừng lo, đã có FixGo!", "FixGo – Cứu cánh cho xế cưng của bạn"],
    },
  ];

  const itemWidth = Math.round(width * 0.82);
  const itemHeight = 160;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView contentContainerStyle={{ paddingBottom: 10 }}>
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
        </View>

        {/* STATUS */}
        <View style={styles.card}>
          <Image source={require("@/assets/images/pfp/mec1.png")} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>Trạng thái hoạt động</Text>
            <TouchableOpacity
              style={[styles.statusButton, { backgroundColor: isOnline ? "#2ECC71" : "#E74C3C" }]}
              onPress={() => router.push("/mechanic/workingStatus/workingStatus")}
            >
              <Text style={styles.statusText}>{isOnline ? "Đang hoạt động" : "Không hoạt động"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* BANNER */}
        <Carousel
          loop
          width={width}
          height={220}
          autoPlay
          autoPlayInterval={3000}
          data={banners}
          scrollAnimationDuration={800}
          mode="parallax"
          modeConfig={{ parallaxScrollingScale: 0.85, parallaxScrollingOffset: 120 }}
          onProgressChange={(_, absProgress) => setBannerIndex(Math.round(absProgress))}
         renderItem={({ item }) => (
  <View style={styles.bannerCard}>
    <Image source={{ uri: item.img }} style={styles.bannerImg} />
    <Text style={styles.bannerText}>{item.title}</Text>
    {item.action && (
      <Link href={item.action.route} asChild>
        <TouchableOpacity style={styles.bannerBtn}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>{item.action.label}</Text>
        </TouchableOpacity>
      </Link>
    )}
  </View>
)}
        />

        {/* FEATURES */}
        <Text style={styles.sectionTitle}>Tính Năng</Text>
        <View style={styles.featureRow}>
          <TouchableOpacity
            onPress={() => router.push("/mechanic/bookRepairList/bookRepairList")}
            style={styles.featureBox}
          >
            <MaterialIcons name="build" size={28} color="#B71C1C" />
            <Text style={styles.featureText}>Đơn hàng</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/common/chat/chat")}
            style={styles.featureBox}
          >
            <MaterialIcons name="event" size={28} color="#B71C1C" />
            <Text style={styles.featureText}>Tin nhắn</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/mechanic/dashboard/dashboard")}
            style={styles.featureBox}
          >
            <Ionicons name="chatbubble-ellipses-outline" size={28} color="#B71C1C" />
            <Text style={styles.featureText}>Thống kê</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/mechanic/subscription/subscription")}
            style={styles.featureBox}
          >
            <Ionicons name="trophy" size={28} color="#B71C1C" />
            <Text style={styles.featureText}>Hội viên</Text>
          </TouchableOpacity>
        </View>

        {/* REASONS */}
        <Text style={styles.sectionTitle}>Bạn cần khách, FixGo có ngay!</Text>
        <View style={styles.reasonsGrid}>
          {reasons.map((r) => (
            <View key={r.id} style={styles.reasonCard}>
              {r.img ? (
                <Image source={{ uri: r.img }} style={styles.reasonImg} />
              ) : (
                <>
                  {r.text && <Text style={styles.reasonHighlight}>{r.text}</Text>}
                  {r.details?.map((d, idx) => (
                    <Text key={idx} style={styles.reasonText}>• {d}</Text>
                  ))}
                </>
              )}
            </View>
          ))}
        </View>

        {/* STATS */}
        <Text style={styles.sectionTitle}>Thống kê của bạn</Text>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Ionicons name="checkmark-done-circle" size={28} color="#27ae60" />
            <Text style={styles.statValue}>{stats.finished}</Text>
            <Text style={styles.statLabel}>Đơn hoàn thành</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="wallet" size={28} color="#e67e22" />
            <Text style={styles.statValue}>{stats.revenue}</Text>
            <Text style={styles.statLabel}>Doanh thu</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="star" size={28} color="#f1c40f" />
            <Text style={styles.statValue}>{stats.rating}</Text>
            <Text style={styles.statLabel}>Đánh giá</Text>
          </View>
        </View>

        {/* RECENT ORDERS */}
        <Text style={styles.sectionTitle}>Đơn hàng gần đây</Text>
        <Carousel
          loop
          width={width}
          height={220}
          autoPlay={false}
          data={orders}
          pagingEnabled={true}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.85,
            parallaxScrollingOffset: 120,
          }}
          scrollAnimationDuration={800}
          renderItem={({ item }) => (
            <View style={styles.bannerCard}>
              <Image
                source={{ uri: "https://picsum.photos/400/200?random=" + item.id }}
                style={styles.bannerImg}
              />
              <View style={styles.orderContent}>
                <View style={styles.orderHeader}>
                  <Ionicons name="person-circle" size={40} color="#fff" />
                  <View style={{ marginLeft: 10 }}>
                    <Text style={[styles.bannerText, { fontSize: 16 }]}>{item.customer}</Text>
                    <Text style={{ color: "#fff", fontSize: 14 }}>
                      {item.service} {item.distance}
                    </Text>
                  </View>
                </View>
                <Text
                  style={[styles.orderPrice, { color: "#fff", bottom: 45, right: 15, position: "absolute" }]}
                >
                  {item.price}
                </Text>
                <TouchableOpacity style={[styles.bannerBtn, { bottom: 10, right: 15 }]}>
                  <Text style={{ color: "#fff", fontWeight: "bold" }}>Xem chi tiết</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </ScrollView>

      {/* BOTTOM NAV */}
      <BottomNavigation activeTab="home" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight || 0 : 10,
  },
  logoContainer: { flexDirection: "row", alignItems: "center" },
  logo: { width: 50, height: 50, marginRight: 6 },
  userContainer: { flexDirection: "row", alignItems: "center" },
  textContainer: { marginRight: 8, alignItems: "flex-end" },
  welcome: { fontSize: 12, color: "#777" },
  username: { fontSize: 14, fontWeight: "bold", color: "#D32F2F" },
  card: { flexDirection: "row", padding: 15, backgroundColor: "#f8f8f8", alignItems: "center" },
  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
  name: { fontSize: 18, fontWeight: "bold" },
  statusButton: { marginTop: 8, paddingVertical: 6, paddingHorizontal: 15, borderRadius: 8, alignSelf: "flex-start" },
  statusText: { color: "#fff", fontWeight: "bold" },
  bannerCard: { width, flex: 1, borderRadius: 15, overflow: "hidden", backgroundColor: "#000" },
  bannerImg: { width: "100%", height: "100%", resizeMode: "cover" },
  bannerText: { position: "absolute", bottom: 45, left: 15, color: "#fff", fontSize: 16, fontWeight: "bold" },
  bannerBtn: { position: "absolute", bottom: 10, left: 15, backgroundColor: "#B22222", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
  featureRow: { flexDirection: "row", justifyContent: "space-around", marginVertical: 14 },
  featureBox: { width: 90, height: 90, backgroundColor: "#fff", borderRadius: 12, justifyContent: "center", alignItems: "center", elevation: 2 },
  featureText: { marginTop: 6, fontSize: 12, color: "#B71C1C" },
  reasonsGrid: { flexDirection: "row", flexWrap: "wrap", backgroundColor: "#f2f2f2" },
  reasonCard: { width: "50%", backgroundColor: "#fff", borderWidth: 1, borderColor: "#B22222", borderRadius: 10, padding: 10 },
  reasonImg: { width: "100%", height: 100, borderRadius: 8, resizeMode: "cover" },
  reasonText: { fontSize: 14, color: "#222", lineHeight: 20, fontWeight: "500" },
  reasonHighlight: { fontSize: 16, color: "#B22222", fontWeight: "700", marginBottom: 6, textTransform: "uppercase" },
  sectionTitle: { fontSize: 16, fontWeight: "bold", marginLeft: 16, marginVertical: 14 },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 10,
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    width: width * 0.28,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  statValue: { fontSize: 18, fontWeight: "bold", color: "#B22222", marginTop: 6 },
  statLabel: { fontSize: 12, color: "#555", textAlign: "center", marginTop: 2 },
  orderContent: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "space-between",
    padding: 15,
  },
  orderHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
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