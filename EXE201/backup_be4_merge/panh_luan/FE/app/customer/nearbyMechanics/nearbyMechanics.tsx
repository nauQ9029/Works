import BottomNavigation from "@/components/BottomNavigation";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
    Animated,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import MapView, { Marker } from "react-native-maps";

const mechanics = [
    {
        id: "1",
        name: "Lebron James",
        location: "Cầu Rồng",
        experience: "5 năm kinh nghiệm",
        rating: 4.8,
        reviews: 240,
        vehicle: "Honda Air Blade - 36M1-789.12",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        coordinate: {
            // mock coords: randomize nearby, REPLACE WITH REAL MECHANIC COORDS
            latitude: 15.9689 + Math.random() * 0.02 - 0.01,
            longitude: 108.2608 + Math.random() * 0.02 - 0.01,
        },
    },
    {
        id: "2",
        name: "Sangtong",
        location: "Công viên New World",
        experience: "11 năm kinh nghiệm",
        rating: 4.6,
        reviews: 120,
        vehicle: "Yamaha Exciter - 30P1-456.78",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        coordinate: {
            latitude: 15.9689 + Math.random() * 0.02 - 0.01,
            longitude: 108.2608 + Math.random() * 0.02 - 0.01,
        },
    },
    {
        id: "3",
        name: "Muhammad Ali",
        location: "Phố cổ Hà Nội",
        experience: "3 năm kinh nghiệm",
        rating: 4.7,
        reviews: 89,
        vehicle: "Yamaha Exciter - 30P1-456.78",
        image: "https://randomuser.me/api/portraits/men/36.jpg",
        coordinate: {
            latitude: 15.9689 + Math.random() * 0.02 - 0.01,
            longitude: 108.2608 + Math.random() * 0.02 - 0.01,
        },
    },
    {
        id: "4",
        name: "John von Neumann",
        location: "Quận Ba Đình",
        experience: "7 năm kinh nghiệm",
        rating: 4.9,
        reviews: 156,
        vehicle: "Yamaha Exciter - 30P1-456.78",
        image: "https://randomuser.me/api/portraits/men/69.jpg",
        coordinate: {
            latitude: 15.9689 + Math.random() * 0.02 - 0.01,
            longitude: 108.2608 + Math.random() * 0.02 - 0.01,
        },
    },
    {
        id: "5",
        name: "Marie Curie",
        location: "Hồ Tây",
        experience: "4 năm kinh nghiệm",
        rating: 4.5,
        reviews: 73,
        vehicle: "Honda Vision - 29X1-234.56",
        image: "https://randomuser.me/api/portraits/women/58.jpg",
        coordinate: {
            latitude: 15.9689 + Math.random() * 0.02 - 0.01,
            longitude: 108.2608 + Math.random() * 0.02 - 0.01,
        },
    },
    {
        id: "6",
        name: "Albert Einstein",
        location: "Cầu Giấy",
        experience: "9 năm kinh nghiệm",
        rating: 4.8,
        reviews: 201,
        vehicle: "SH Mode - 30A1-987.65",
        image: "https://randomuser.me/api/portraits/men/85.jpg",
        coordinate: {
            latitude: 15.9689 + Math.random() * 0.02 - 0.01,
            longitude: 108.2608 + Math.random() * 0.02 - 0.01,
        },
    },
];

const { height: screenHeight } = Dimensions.get('window');
const MAP_MAX_HEIGHT = screenHeight * 0.78; // almost full screen (85% of screen height)
const MAP_MIN_HEIGHT = 400; // minimized map height
const CARD_HEIGHT = 120; // approximate height of each card
const VISIBLE_CARDS = 3;
const LIST_HEIGHT = CARD_HEIGHT * VISIBLE_CARDS; // height to show 3 cards

export default function NearbyMechanics() {
    const router = useRouter();

    const mapRef = useRef<MapView>(null); // reference to the MapView (to center on mechanic's location when a card is tapped)
    const [selectedId, setSelectedId] = useState<string | null>(null); // to track selected mechanic


    const scrollY = useRef(new Animated.Value(0)).current;

    const mapHeight = scrollY.interpolate({
        inputRange: [0, 50], // shorter scroll distance for quicker transition
        outputRange: [MAP_MAX_HEIGHT, MAP_MIN_HEIGHT],
        extrapolate: "clamp",
    });

    // first tap selects, second tap navigates
    const handleMarkerPress = (m: typeof mechanics[0]) => {
        if (selectedId === m.id) {
            // 2nd tap → navigate
            setSelectedId(null);
            setTimeout(() => {
                router.push("/customer/mechanicDetails/mechanicDetails");
            }, 500);
        } else {
            // 1st tap → center + show infos
            setSelectedId(m.id);
            mapRef.current?.animateToRegion(
                {
                    latitude: m.coordinate.latitude,
                    longitude: m.coordinate.longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                },
                500
            );
        }
    };

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

            {/* Animated List */}
            <Animated.FlatList
                data={mechanics}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingHorizontal: 16 }}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16} // smooth animation
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                ListHeaderComponent={
                    <>
                        {/* Animated Map */}
                        <Animated.View style={[styles.mapContainer, { height: mapHeight }]}>
                            <MapView
                                ref={mapRef}
                                style={styles.map}
                                initialRegion={{
                                    latitude: 15.968947529061719,
                                    longitude: 108.26089660980934,
                                    latitudeDelta: 0.02,
                                    longitudeDelta: 0.02,
                                }}
                                scrollEnabled={true} // disable map interaction when scrolling
                            >
                                {/* current location of CUSTOMER */}
                                <Marker
                                    coordinate={{
                                        latitude: 15.968947529061719,
                                        longitude: 108.26089660980934,
                                    }}
                                />

                                {/* location of MECHANICS */}
                                {mechanics.map((m) => (
                                    <Marker
                                        key={m.id}
                                        coordinate={m.coordinate}
                                        title={m.name}
                                        description={`${m.experience} • ⭐${m.rating}`}
                                        onPress={() => handleMarkerPress(m)}
                                    >
                                        {/* custom marker with avatar */}
                                        <Image
                                            source={{ uri: m.image }}
                                            style={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: 20,
                                                borderWidth: selectedId === m.id ? 3 : 2,
                                                borderColor: selectedId === m.id ? "#F57C00" : "#B71C1C",
                                            }}
                                        />
                                    </Marker>
                                ))}

                            </MapView>
                        </Animated.View>

                        {/* Search Bar - always visible, positioned below map */}
                        <View style={styles.searchContainer}>
                            <Ionicons
                                name="search-outline"
                                size={20}
                                color="#555"
                                style={{ marginRight: 8 }}
                            />
                            <Text style={styles.searchText}>Tìm theo vị trí</Text>
                            <Ionicons
                                name="ellipsis-horizontal"
                                size={20}
                                color="#555"
                                style={{ marginLeft: "auto" }}
                            />
                        </View>
                    </>
                }
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.location}>{item.location}</Text>
                            <Text style={styles.experience}>{item.experience}</Text>
                            <Text style={styles.rating}>
                                ⭐ {item.rating} ({item.reviews})
                            </Text>
                            {item.vehicle && (
                                <View style={styles.vehicleBox}>
                                    <Text style={styles.vehicle}>{item.vehicle}</Text>
                                </View>
                            )}
                        </View>

                        <TouchableOpacity
                            style={styles.bookBtn}
                            onPress={() => {
                                mapRef.current?.animateToRegion({
                                    latitude: item.coordinate.latitude,
                                    longitude: item.coordinate.longitude,
                                    latitudeDelta: 0.02,
                                    longitudeDelta: 0.02,
                                }, 500);
                                router.push("/customer/mechanicDetails/mechanicDetails");
                            }}
                        >
                            <Text style={styles.bookText}>ĐẶT NGAY</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            {/* Bottom Navigation */}
            <BottomNavigation activeTab="home" />
        </View>
    );
}

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

    // MAP
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
        minHeight: 120, // ensures consistent card height for 4 cards calculation
    },
    image: { width: 70, height: 70, borderRadius: 12 },
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
