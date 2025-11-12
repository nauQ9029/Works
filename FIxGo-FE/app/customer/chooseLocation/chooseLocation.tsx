import BottomNavigation from "@/components/BottomNavigation-Cus";
import { useNotification } from "@/contexts/NotificationContext";
import { useUser } from "@/contexts/userContext";
import api from "@/services/api";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, KeyboardAvoidingView, Modal, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function SelectLocationScreen() {
    const router = useRouter();
    const { user } = useUser();
    const { socket } = useNotification();
    const { mechanicId, mechanicLat, mechanicLng } = useLocalSearchParams<{ mechanicId?: string, mechanicLat?: string, mechanicLng?: string }>();

    const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
    const [address, setAddress] = useState("Đang tải vị trí...");
    const [selectedType, setSelectedType] = useState("Home");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showFindingModal, setShowFindingModal] = useState(false);
    const [mechanicFound, setMechanicFound] = useState(false);
    const [loading, setLoading] = useState(true);
    const [currentBookingId, setCurrentBookingId] = useState<string | null>(null);
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);
    console.log("Received params:", { mechanicId, mechanicLat, mechanicLng });
    useEffect(() => {
        let isMounted = true;
        const getLocation = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                if (isMounted) Alert.alert('Permission denied');
                if (isMounted) setLoading(false);
                return;
            }
            const location = await Location.getCurrentPositionAsync({});
            if (!isMounted) return;
            setUserLocation(location);

            const reverseGeocode = await Location.reverseGeocodeAsync(location.coords);
            if (isMounted && reverseGeocode.length > 0) {
                const addr = reverseGeocode[0];
                const addressParts = [addr.streetNumber, addr.street, addr.subregion, addr.region];
                const formattedAddress = addressParts.filter(part => part).join(', ');
                setAddress(formattedAddress);
            }
            if (isMounted) setLoading(false);
        };
        getLocation();
        return () => { isMounted = false; };
    }, []);

    useEffect(() => {
        if (!socket || !currentBookingId) return;
        const handleBookingUpdate = (data: any) => {
            if (data.booking?._id === currentBookingId && data.booking.status === 'đã nhận') {
                if (timeoutId) clearTimeout(timeoutId);
                setMechanicFound(true);
                setTimeout(() => {
                    setShowFindingModal(false);
                    router.push({
                        pathname: "/customer/trackingLocation/trackingLocation",
                        params: { bookingId: data.booking._id },
                    });
                }, 1500);
            }
        };
        socket.on('your_booking_updated', handleBookingUpdate);
        return () => { socket.off('your_booking_updated', handleBookingUpdate); };
    }, [socket, currentBookingId, timeoutId]);

    const handleConfirmLocation = () => setShowConfirmModal(true);

    const handleConfirmBooking = async () => {
        setShowConfirmModal(false);
        if (!user || !userLocation) {
            Alert.alert("Lỗi", "Không có thông tin người dùng hoặc vị trí.");
            return;
        }

        const bookingData: any = {
            customerId: user.id,
            mechanicId: mechanicId,
            location: {
                type: "Point",
                coordinates: [userLocation.coords.longitude, userLocation.coords.latitude],
                address: address,
            },
            description: "Yêu cầu hỗ trợ sửa xe.",
        };

        console.log("Booking data chuẩn bị gửi:", bookingData);

        try {
            if (mechanicId) {
                bookingData.mechanicId = mechanicId;
                bookingData.status = "đang chờ";
                
                const response = await api.post('/bookings/create-specific', bookingData);
                const newBooking = response.data;
                
                router.push({
                    pathname: "/customer/trackingLocation/trackingLocation",
                    params: { 
                        bookingId: newBooking._id,
                        mechanicId, mechanicLat, mechanicLng,
                        customerLat: userLocation.coords.latitude,
                        customerLng: userLocation.coords.longitude,
                    }
                });
            } else {
                setShowFindingModal(true);
                setMechanicFound(false);
                bookingData.status = "chờ thợ";

                // SỬA LỖI URL: Bỏ /api
                const response = await api.post('/bookings/create-emergency', bookingData);
                setCurrentBookingId(response.data._id);

                const timeout = setTimeout(() => {
                    if (!mechanicFound) {
                        setShowFindingModal(false);
                        Alert.alert("Chưa có thợ nhận", "Yêu cầu của bạn đã được lưu. Chúng tôi sẽ thông báo khi có thợ nhận đơn.");
                        router.push("/customer/homePage/homePage");
                    }
                }, 30000);
                setTimeoutId(timeout);
            }
        } catch (err: any) {
            console.error("❌ Error creating booking:", err);
            Alert.alert("Đặt thợ thất bại", err.response?.data?.error || err.message);
            setShowFindingModal(false);
        }
    };

    useEffect(() => {
        return () => { if (timeoutId) clearTimeout(timeoutId); };
    }, [timeoutId]);

    if (loading) {
        return (
            <View style={styles.centerScreen}>
                <ActivityIndicator size="large" color="#B71C1C" />
                <Text>Đang lấy vị trí của bạn...</Text>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <SafeAreaView style={styles.container}>
                <View style={styles.mapContainer}>
                    {userLocation && (
                        <MapView style={styles.map} initialRegion={{
                            latitude: userLocation.coords.latitude,
                            longitude: userLocation.coords.longitude,
                            latitudeDelta: 0.02, longitudeDelta: 0.02,
                        }}>
                            <Marker coordinate={userLocation.coords} title="Vị trí của bạn" pinColor="blue" />
                            {mechanicId && mechanicLat && mechanicLng && (
                                <Marker
                                    coordinate={{ latitude: parseFloat(mechanicLat), longitude: parseFloat(mechanicLng) }}
                                    title="Vị trí của thợ"
                                />
                            )}
                        </MapView>
                    )}
                    <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={26} color="#000" />
                    </TouchableOpacity>
                </View>

                <View style={styles.bottomSheet}>
                    <Text style={styles.title}>Chọn vị trí</Text>
                    <Text style={styles.label}>Vị trí của bạn</Text>
                    <TextInput style={styles.input} value={address} onChangeText={setAddress} />
                    <Text style={styles.label}>Lưu như</Text>
                    <View style={styles.saveAsContainer}>
                        <TouchableOpacity style={[styles.option, selectedType === "Home" && styles.optionSelected]} onPress={() => setSelectedType("Home")}>
                            <Ionicons name="home-outline" size={20} color="red" /><Text style={styles.optionText}>Nhà riêng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.option, selectedType === "Office" && styles.optionSelected]} onPress={() => setSelectedType("Office")}>
                            <MaterialIcons name="work-outline" size={20} color="red" /><Text style={styles.optionText}>Văn phòng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.option, selectedType === "Others" && styles.optionSelected]} onPress={() => setSelectedType("Others")}>
                            <Ionicons name="location-outline" size={20} color="red" /><Text style={styles.optionText}>Khác</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.saveButton} onPress={handleConfirmLocation}>
                        <Text style={styles.saveButtonText}>Chọn địa chỉ này</Text>
                    </TouchableOpacity>
                </View>

                {/* SỬA LỖI LAYOUT */}
                <View style={styles.bottomNavWrapper}>
                    <BottomNavigation activeTab="home" />
                </View>

                <Modal visible={showConfirmModal} transparent={true} animationType="fade" onRequestClose={() => setShowConfirmModal(false)}>
                    <View style={styles.modalOverlay}>
                        <View style={styles.confirmModal}>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setShowConfirmModal(false)}>
                                <Ionicons name="close" size={24} color="#666" />
                            </TouchableOpacity>
                            <Text style={styles.modalTitle}>Xác nhận thông tin</Text>
                            <Text style={styles.modalText}>Địa chỉ: {address}</Text>
                            <Text style={styles.modalText}>Loại: {selectedType === "Home" ? "Nhà riêng" : selectedType === "Office" ? "Văn phòng" : "Khác"}</Text>
                            <View style={styles.modalButtons}>
                                <TouchableOpacity style={styles.cancelButton} onPress={() => setShowConfirmModal(false)}>
                                    <Text style={styles.cancelButtonText}>Hủy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmBooking}>
                                    <Text style={styles.confirmButtonText}>Xác nhận & Đặt</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal visible={showFindingModal} transparent={true} animationType="fade">
                    <View style={styles.modalOverlay}>
                        <View style={styles.findingModal}>
                            {!mechanicFound ? (
                                <>
                                    <ActivityIndicator size="large" color="#B71C1C" />
                                    <Text style={styles.findingTitle}>Đang tìm thợ phù hợp...</Text>
                                    <Text style={styles.findingText}>Vui lòng chờ trong giây lát</Text>
                                </>
                            ) : (
                                <>
                                    <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
                                    <Text style={styles.successTitle}>Đã tìm thấy thợ!</Text>
                                    <Text style={styles.successText}>Thợ đang trên đường đến</Text>
                                </>
                            )}
                        </View>
                    </View>
                </Modal>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    centerScreen: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    backBtn: { position: "absolute", top: 50, left: 16, backgroundColor: 'rgba(255,255,255,0.7)', padding: 6, borderRadius: 20 },
    mapContainer: { flex: 1 },
    map: { flex: 1 },
    bottomSheet: { position: "absolute", bottom: 70, width: "100%", backgroundColor: "white", borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, elevation: 10, },
    bottomNavWrapper: { position: 'absolute', bottom: 0, left: 0, right: 0 },
    title: { fontSize: 18, fontWeight: "bold", marginBottom: 10, textAlign: 'center' },
    label: { fontSize: 14, color: "gray", marginTop: 5 },
    input: { borderBottomWidth: 1, borderBottomColor: "#ddd", paddingVertical: 8, marginBottom: 15, fontSize: 16 },
    saveAsContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
    option: { flexDirection: "row", alignItems: "center", paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10, borderWidth: 1, borderColor: "#ddd", flex: 1, marginHorizontal: 5, justifyContent: 'center' },
    optionSelected: { borderColor: "red", backgroundColor: "#ffe5e5" },
    optionText: { marginLeft: 5, fontSize: 14 },
    saveButton: { backgroundColor: "darkred", paddingVertical: 14, borderRadius: 10, alignItems: "center" },
    saveButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
    modalOverlay: { flex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)", justifyContent: "center", alignItems: "center" },
    confirmModal: { backgroundColor: "white", borderRadius: 15, padding: 20, margin: 20, width: "85%", elevation: 10 },
    closeButton: { position: "absolute", top: 15, right: 15, zIndex: 1 },
    modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15, textAlign: "center", marginTop: 10 },
    modalText: { fontSize: 14, marginBottom: 8, color: "#666", lineHeight: 20 },
    modalButtons: { flexDirection: "row", justifyContent: "space-between", marginTop: 20, gap: 10 },
    cancelButton: { flex: 1, paddingVertical: 12, backgroundColor: "#f5f5f5", borderRadius: 8, alignItems: "center" },
    cancelButtonText: { color: "#666", fontWeight: "bold" },
    confirmButton: { flex: 1, paddingVertical: 12, backgroundColor: "#B71C1C", borderRadius: 8, alignItems: "center" },
    confirmButtonText: { color: "white", fontWeight: "bold" },
    findingModal: { backgroundColor: "white", borderRadius: 15, padding: 30, margin: 20, width: "80%", alignItems: "center", elevation: 10, },
    findingTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
    findingText: { fontSize: 14, color: "#666", textAlign: "center" },
    successTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10, textAlign: "center", color: "#4CAF50" },
    successText: { fontSize: 14, color: "#666", textAlign: "center" },
});