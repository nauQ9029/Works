import BottomNavigation from "@/components/BottomNavigation-Mec";
import { useMechanicStatus } from "@/contexts/MechanicStatusContext";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { useMechanicOnline } from "@/hooks/useMechanicOnline"; // hook mình vừa tạo
import { getCustomersLookingForMechanic } from "@/services/customerServices";
import { updateOnlineStatus } from "@/services/mechanicServices";

// custom decode token
function decodeJWT(token: string): any {
  try {
    const payload = token.split(".")[1];
    const decoded = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(decoded);
  } catch (err) {
    console.error("Lỗi decode JWT:", err);
    return null;
  }
}

export default function WorkingStatus() {
  const { isOnline, setIsOnline } = useMechanicStatus();
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);

  const [customers, setCustomers] = useState<any[]>([]);

  // Lấy userId từ storage
  useEffect(() => {
    const fetchUserFromStorage = async () => {
      try {
        const userString = await AsyncStorage.getItem("user");
        if (!userString) return;
        const user = JSON.parse(userString);
        const decoded = decodeJWT(user.token);
        setUserId(decoded?.id || null);
      } catch (err) {
        console.error("Lỗi lấy user từ storage:", err);
      }
    };
    fetchUserFromStorage();
  }, []);

  // Hook quản lý vị trí + trạng thái online
  const mechanicLocation = useMechanicOnline(userId, isOnline);

  // Lấy khách hàng khi online
  useEffect(() => {
    if (!isOnline) {
      setCustomers([]);
      return;
    }

    const fetchCustomers = async () => {
      try {
        const data = await getCustomersLookingForMechanic(mechanicLocation);
        setCustomers(data);
      } catch (err) {
        console.error("✖ Lỗi lấy khách hàng:", err);
      }
    };

    fetchCustomers();
    const interval = setInterval(fetchCustomers, 10000); // refresh 10s
    return () => clearInterval(interval);
  }, [isOnline, mechanicLocation]);

  return (
    <View style={styles.container}>
      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            ...mechanicLocation,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
          scrollEnabled
        >
          {/* Marker thợ */}
          <Marker coordinate={mechanicLocation} title="Bạn (Thợ)">
            <Image
              source={require("@/assets/images/pfp/mec1.png")}
              style={{ width: 35, height: 35, borderRadius: 20, borderWidth: 2, borderColor: "#2c3e50" }}
            />
          </Marker>

          {/* Marker khách hàng */}
          {isOnline &&
            customers.map((c) => {
              const lat = Number(c.latitude);
              const lng = Number(c.longitude);
              if (isNaN(lat) || isNaN(lng)) return null;
              return <Marker key={c.id} coordinate={{ latitude: lat, longitude: lng }} title={c.name || `Khách hàng ${c.id}`} pinColor="#E74C3C" />;
            })}
        </MapView>

        {/* Back button */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={27} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Trạng thái thợ */}
      <View style={styles.card}>
        <Image source={require("@/assets/images/pfp/mec1.png")} style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <View style={styles.statusRow}>
            <Text style={styles.name}>Trạng thái hoạt động</Text>
            <Switch
              value={isOnline}
              onValueChange={(val) => {
                setIsOnline(val);
                if (userId) updateOnlineStatus(userId, val);
              }}
              trackColor={{ false: "#E74C3C", true: "#2ECC71" }}
              thumbColor={"#fff"}
            />
          </View>
          <Text style={[styles.statusText, { color: isOnline ? "#2ECC71" : "#E74C3C" }]}>
            {isOnline ? "Đang Nhận Đơn" : "Ngừng Nhận Đơn"}
          </Text>
        </View>
      </View>

      <BottomNavigation activeTab="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  mapContainer: { flex: 1, position: "relative" },
  map: { flex: 1 },
  backBtn: { position: "absolute", top: 20, left: 9, padding: 8 },
  card: { flexDirection: "row", padding: 15, backgroundColor: "#f8f8f8", alignItems: "center" },
  statusRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
  name: { fontSize: 18, fontWeight: "bold" },
  statusText: { marginTop: 8, fontWeight: "bold" },
});
