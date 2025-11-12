import BottomNavigation from "@/components/BottomNavigation-Mec";
import { useMechanicStatus } from "@/contexts/MechanicStatusContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

// mechanic current location (mock)
const mechanicLocation = {
    latitude: 15.968947529061719,
    longitude: 108.26089660980934,
};

// generate mock customers around mechanic
const customers = Array.from({ length: 10 }).map((_, i) => ({
    id: String(i + 1),
    coordinate: {
        latitude: mechanicLocation.latitude + (Math.random() * 0.02 - 0.01),
        longitude: mechanicLocation.longitude + (Math.random() * 0.02 - 0.01),
    },
}));

export default function WorkingStatus() {
    const router = useRouter();
    const { isOnline, setIsOnline } = useMechanicStatus();

    return (
        <View style={styles.container}>
            {/* map */}
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        ...mechanicLocation,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02,
                    }}
                    scrollEnabled={true}
                >
                    {/* mechanic marker */}
                    <Marker coordinate={mechanicLocation} title="Bạn (Thợ)">
                        <Image
                            source={require("@/assets/images/pfp/mec1.png")}
                            style={{ width: 35, height: 35, borderRadius: 20, borderWidth: 2, borderColor: "#2c3e50" }}
                        />
                    </Marker>

                    {/* customers nearby if online */}
                    {isOnline &&
                        customers.map((c) => (
                            <Marker
                                key={c.id}
                                coordinate={c.coordinate}
                                title={`Khách hàng ${c.id}`}
                                pinColor="#E74C3C"
                            />
                        ))}
                </MapView>

                {/* back button overlay */}
                <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={27} color="#000" />
                </TouchableOpacity>
            </View>

            {/* mechanic status */}
            <View style={styles.card}>
                <Image
                    source={require("@/assets/images/pfp/mec1.png")}
                    style={styles.avatar}
                />

                <View style={{ flex: 1 }}>
                    {/* text + switch */}
                    <View style={styles.statusRow}>
                        <Text style={styles.name}>Trạng thái hoạt động</Text>
                        <Switch
                            value={isOnline}
                            onValueChange={setIsOnline}
                            trackColor={{ false: "#E74C3C", true: "#2ECC71" }}
                            thumbColor={"#fff"}
                        />
                    </View>

                    {/* status */}
                    <Text
                        style={[
                            styles.statusText,
                            { color: isOnline ? "#2ECC71" : "#E74C3C" },
                        ]}
                    >
                        {isOnline ? "Đang Nhận Đơn" : "Ngừng Nhận Đơn"}
                    </Text>
                </View>
            </View>

            {/* Bottom Navigation */}
            <BottomNavigation activeTab="home" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },

    mapContainer: {
        flex: 1,
        position: "relative",
    },
    map: { flex: 1 },

    backBtn: {
        position: "absolute",
        top: 20,
        left: 9,
        padding: 8,
    },

    card: {
        flexDirection: "row",
        padding: 15,
        backgroundColor: "#f8f8f8",
        alignItems: "center",
    },

    statusRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
    name: { fontSize: 18, fontWeight: "bold" },
    statusText: { marginTop: 8, fontWeight: "bold" },
});
