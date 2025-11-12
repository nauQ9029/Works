
import BottomNavigation from "@/components/BottomNavigation-Cus";
import { getAllMechanics } from "@/services/mechanicServices";
import { Ionicons } from "@expo/vector-icons";
import * as Location from 'expo-location'; // Thêm thư viện location
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Animated,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import MapView, { Marker } from "react-native-maps";


const { height: screenHeight } = Dimensions.get('window');
const MAP_MAX_HEIGHT = screenHeight * 0.78;
const MAP_MIN_HEIGHT = 400;

type Mechanic = {
    id: string;
    userId: string;
    name: string;
    rating: number;
    experience: string;
    image: string;
    coordinate: { latitude: number; longitude: number };
    address: string;
    skills: string[];
};

export default function NearbyMechanics() {
    const router = useRouter();
    const [mechanics, setMechanics] = useState<Mechanic[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
    const [loading, setLoading] = useState(true); // State để theo dõi quá trình tải
    const mapRef = useRef<MapView>(null);
    const scrollY = useRef(new Animated.Value(0)).current;

    const DEFAULT_REGION = {
        latitude: 16.0544,
        longitude: 108.2022,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
    };

    useFocusEffect(
        useCallback(() => {

            const initialize = async () => {
                try {

                    // --- PHẦN 1: LẤY VỊ TRÍ NGƯỜI DÙNG ---
                    let { status } = await Location.requestForegroundPermissionsAsync();
                    if (status !== 'granted') {
                        Alert.alert('Permission Denied', 'Bạn cần cấp quyền truy cập vị trí để tìm thợ ở gần.');
                        return; // Dừng hàm ở đây
                    }

                    let location = await Location.getCurrentPositionAsync({});
                    setUserLocation(location);

                    // --- PHẦN 2: LẤY DANH SÁCH THỢ GẦN ĐÓ ---
                    if (location) {
                        const onlineMechanics = await getAllMechanics({
                            availability: 'true',
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        });
                        setMechanics(onlineMechanics);

                        mapRef.current?.animateToRegion({
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.02,
                            longitudeDelta: 0.02,
                        }, 500);
                    }
                } catch (error) {
                    // Nếu có bất kỳ lỗi nào trong các bước trên, nó sẽ được bắt ở đây
                    Alert.alert("Lỗi", "Không thể tải dữ liệu, vui lòng thử lại.");
                } finally {
                    // Khối này LUÔN LUÔN chạy, dù có lỗi hay không
                    setLoading(false);
                }
            };

            initialize();

        }, [])
    );

    const mapHeight = scrollY.interpolate({
        inputRange: [0, 50],
        outputRange: [MAP_MAX_HEIGHT, MAP_MIN_HEIGHT],
        extrapolate: "clamp",
    });

    const handleMarkerPress = (mechanic: Mechanic) => {
        if (selectedId === mechanic.id) {
            router.push({
                pathname: "/customer/mechanicDetails/mechanicDetails",
                params: { mechanicId: mechanic.userId }
            });
        } else {
            setSelectedId(mechanic.id);
            mapRef.current?.animateToRegion({
                latitude: mechanic.coordinate.latitude,
                longitude: mechanic.coordinate.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
            }, 500);
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#B71C1C" />
                <Text>Đang tìm vị trí và thợ sửa xe...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={26} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Nearby Mechanics</Text>
                <Ionicons name="heart-outline" size={24} color="#000" />
            </View>

            {/* 1. Đưa bản đồ và thanh tìm kiếm ra ngoài, làm anh em với FlatList */}
            <Animated.View style={[styles.mapContainer, { height: mapHeight }]}>
                <MapView ref={mapRef} style={styles.map}
                    region={userLocation ? {
                        latitude: userLocation.coords.latitude,
                        longitude: userLocation.coords.longitude,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02,
                    } : DEFAULT_REGION}>
                    {/* Vị trí của khách hàng (bạn) */}
                    {userLocation && (
                        <Marker
                            coordinate={userLocation.coords}
                            title="Vị trí của bạn"
                            pinColor="blue"
                        />
                    )}
                    {/* Vị trí của các thợ online */}
                    {mechanics.map((m) => (
                        <Marker
                            key={m.id}
                            coordinate={m.coordinate}
                            title={m.name}
                            description="Nhấn vào đây để xem chi tiết"
                            onCalloutPress={() => handleMarkerPress(m)}
                        >
                        </Marker>
                    ))}
                </MapView>
            </Animated.View>

            <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={20} color="#555" style={{ marginRight: 8 }} />
                <Text style={styles.searchText}>Tìm theo vị trí</Text>
                <Ionicons name="ellipsis-horizontal" size={20} color="#555" style={{ marginLeft: "auto" }} />
            </View>


            {/* 2. FlatList giờ chỉ chứa danh sách thợ và chiếm phần không gian còn lại */}
            <Animated.FlatList
                data={mechanics}
                style={{ flex: 1 }}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingHorizontal: 16 }}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image
                            source={
                                item.image
                                    ? { uri: item.image }
                                    : require('../../../assets/images/logo/fix.png')
                            }
                            style={styles.image}
                        />
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.location}>{item.address}</Text>
                            <Text style={styles.experience}>Kinh nghiệm: {item.experience}</Text>
                            <Text style={styles.rating}>⭐ {item.rating}</Text>
                            {item.skills?.length > 0 && (
                                <View style={styles.vehicleBox}>
                                    <Text style={styles.vehicle}>{item.skills.join(", ")}</Text>
                                </View>
                            )}
                        </View>
                        <TouchableOpacity
                            style={styles.bookBtn}
                            onPress={() => {
                                if (item.coordinate) {
                                    mapRef.current?.animateToRegion({
                                        latitude: item.coordinate.latitude,
                                        longitude: item.coordinate.longitude,
                                        latitudeDelta: 0.02,
                                        longitudeDelta: 0.02,
                                    }, 500);
                                }
                                router.push({
                                    pathname: "/customer/mechanicDetails/mechanicDetails",
                                    params: { mechanicId: item.id }
                                });
                            }}
                        >
                            <Text style={styles.bookText}>ĐẶT NGAY</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <BottomNavigation activeTab="home" />
        </View >
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", paddingTop: 30 },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    headerTitle: { fontSize: 18, fontWeight: "bold" },
    mapContainer: {
        width: "90%",
        alignSelf: "center",
        borderWidth: 2,
        borderColor: "#cac9c9ff",
        borderRadius: 12,
        overflow: "hidden",
        marginBottom: 10,
    },
    map: { flex: 1 },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 14,
        marginBottom: 16,
    },
    searchText: { fontSize: 14, color: "#666" },
    card: {
        flexDirection: "row",
        padding: 14,
        backgroundColor: "#fff",
        borderRadius: 12,
        marginBottom: 12,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        minHeight: 120,
    },
    image: { width: 70, height: 70, borderRadius: 12, backgroundColor: '#eee' },
    name: { fontWeight: "bold", fontSize: 15, color: "#B71C1C" },
    location: { fontSize: 13, color: "#444" },
    experience: { fontSize: 12, color: "#777" },
    rating: { fontSize: 12, color: "#F57C00", marginTop: 4 },
    vehicleBox: {
        backgroundColor: "#f2f2f2",
        padding: 6,
        borderRadius: 8,
        marginTop: 6,
    },
    vehicle: { fontSize: 12, color: "#333" },
    bookBtn: {
        backgroundColor: "#B71C1C",
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 8,
        alignSelf: "center",
    },
    bookText: { color: "#fff", fontWeight: "bold" },
});