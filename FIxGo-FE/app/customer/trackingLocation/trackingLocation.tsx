import BottomNavigation from "@/components/BottomNavigation-Cus";
import { API_BASE_URL } from "@/services/api";
import { getBookingById } from "@/services/bookingServices"; // Import hàm mới
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { io } from "socket.io-client";
type Coordinate = { latitude: number; longitude: number };

export default function MechanicOnTheWayScreen() {
  const router = useRouter();
  // 1. Chỉ cần nhận bookingId là đủ
  const { bookingId } = useLocalSearchParams<{ bookingId: string }>();
  const [booking, setBooking] = useState<any>(null);
  const [mechanicLocation, setMechanicLocation] = useState<Coordinate | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<Coordinate[]>([]);
  const [loading, setLoading] = useState(true);

  // 2. Tải dữ liệu booking ban đầu
  useEffect(() => {
    if (bookingId) {
      const fetchBookingData = async () => {
        try {
          setLoading(true);
          const bookingData = await getBookingById(bookingId);
          setBooking(bookingData);
          // Lưu vị trí ban đầu của thợ
          setMechanicLocation({
            latitude: bookingData.mechanicId.location.coordinates[1],
            longitude: bookingData.mechanicId.location.coordinates[0],
          });
        } catch (error) {
          console.error("Lỗi khi tải dữ liệu booking:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchBookingData();
    }
  }, [bookingId]);

  // 3. Lắng nghe cập nhật real-time qua Socket.io
  useEffect(() => {
    if (!bookingId || !booking) return;

    const socket = io(API_BASE_URL, {
      transports: ['websocket']
    });
    socket.on('connect', () => {
      console.log('✅ Tracking socket connected:', socket.id);
      socket.emit("join_room", bookingId);
    });

    // Lắng nghe vị trí của thợ được cập nhật
    socket.on("mechanic_location_updated", (data: { bookingId: string; location: Coordinate }) => {
      if (data.bookingId === bookingId) {
        console.log("🔹 Vị trí thợ được cập nhật:", data.location);
        setMechanicLocation(data.location);
      }
    });

    // Lắng nghe trạng thái booking thay đổi
    socket.on("booking_status_updated", (data: any) => {
      if (data.booking?._id === bookingId) {
        console.log("🔹 Trạng thái booking được cập nhật:", data.booking.status);
        if (["hoàn thành", "hủy"].includes(data.booking.status)) {
          setTimeout(() => {
            router.push({
              pathname: "/customer/feedback/feedback",
              params: { bookingId: bookingId as string },
            });
          }, 1000);
        }
      }
    });

    socket.on('disconnect', () => console.log('❌ Tracking socket disconnected'));
    socket.on('connect_error', (error) => console.error('❌ Lỗi kết nối socket:', error));

    return () => {
      console.log("🔹 Ngắt kết nối socket.");
      socket.disconnect();
    };
  }, [bookingId, booking]); // Chạy lại khi có booking data ban đầu

  // (Bạn có thể thêm logic vẽ đường đi bằng Google Directions API ở đây nếu muốn)

  if (loading || !booking || !mechanicLocation) {
    return (
      <View style={styles.centerScreen}>
        <ActivityIndicator size="large" color="#B71C1C" />
        <Text>Đang tải thông tin chuyến đi...</Text>
      </View>
    );
  }

  const customerLocation = {
    latitude: booking.location.coordinates[1],
    longitude: booking.location.coordinates[0],
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: (mechanicLocation.latitude + customerLocation.latitude) / 2,
            longitude: (mechanicLocation.longitude + customerLocation.longitude) / 2,
            latitudeDelta: Math.abs(mechanicLocation.latitude - customerLocation.latitude) * 2,
            longitudeDelta: Math.abs(mechanicLocation.longitude - customerLocation.longitude) * 2,
          }}
        >
          <Marker coordinate={mechanicLocation} title={booking.mechanicId.name} />
          <Marker coordinate={customerLocation} title="Vị trí của bạn" pinColor="blue" />
          <Polyline coordinates={[mechanicLocation, customerLocation]} strokeColor="#B71C1C" strokeWidth={4} />
        </MapView>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomSheet}>
        <Text style={styles.title}>Thợ sửa đang trên đường</Text>
        <View style={styles.mechanicRow}>
          <Image source={{ uri: booking.mechanicId.avatar || 'https://i.pravatar.cc/100' }} style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{booking.mechanicId.name}</Text>
            <Text style={styles.subtitle}>Thợ sửa xe chuyên nghiệp</Text>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.iconButton}><Ionicons name="chatbubble-outline" size={22} color="red" /></TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}><Ionicons name="call-outline" size={22} color="red" /></TouchableOpacity>
          </View>
        </View>

        {/* Các nút Hủy/Hoàn thành... */}

      </View>

      <View style={styles.bottomNavWrapper}>
        <BottomNavigation activeTab="home" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  centerScreen: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  mapContainer: { flex: 1 },
  map: { flex: 1 },
  backBtn: { position: "absolute", top: 50, left: 16, backgroundColor: 'rgba(255,255,255,0.7)', padding: 6, borderRadius: 20 },
  bottomSheet: { position: "absolute", bottom: 70, width: "100%", backgroundColor: "white", borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, elevation: 10, shadowColor: "#000", shadowOffset: { width: 0, height: -3 }, shadowOpacity: 0.1, shadowRadius: 3, },
  bottomNavWrapper: { position: 'absolute', bottom: 0, left: 0, right: 0 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 15, textAlign: 'center' },
  mechanicRow: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 12, backgroundColor: '#eee' },
  name: { fontSize: 16, fontWeight: "600" },
  subtitle: { fontSize: 13, color: "gray", marginTop: 2 },
  actionButtons: { flexDirection: "row" },
  iconButton: { marginLeft: 8, padding: 8, borderRadius: 20, backgroundColor: "#fff5f5" },
});