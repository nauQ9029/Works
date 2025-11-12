import BottomNavigation from "@/components/BottomNavigation-Cus";
import { useUser } from "@/contexts/userContext";
import { useNotification } from "@/contexts/NotificationContext";
import BASE_URL from "@/services/api";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import axios from "axios";
import * as Location from "expo-location";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function SelectLocationScreen() {
  const router = useRouter();
  const { user } = useUser();
  const { socket } = useNotification();
  const { mechanicId } = useLocalSearchParams();

  const [address, setAddress] = useState("");
  const [selectedType, setSelectedType] = useState("Home");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showFindingModal, setShowFindingModal] = useState(false);
  const [mechanicFound, setMechanicFound] = useState(false);
  const [coords, setCoords] = useState({ latitude: 0, longitude: 0 });
  const [currentBookingId, setCurrentBookingId] = useState<string | null>(null);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

  // Get user location and reverse geocode to address
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied");
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      setCoords(loc.coords);
      
      // Get address from coordinates
      try {
        const reverseGeocode = await Location.reverseGeocodeAsync({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
        });
        
        if (reverseGeocode.length > 0) {
          const addr = reverseGeocode[0];
          const fullAddress = `${addr.streetNumber || ''} ${addr.street || ''}, ${addr.district || ''}, ${addr.city || ''}, ${addr.region || ''}`.trim();
          setAddress(fullAddress);
        }
      } catch (error) {
        console.log("Error getting address:", error);
        setAddress("Unable to get address");
      }
    })();
  }, []);

  // Listen for mechanic acceptance while on this screen
  useEffect(() => {
    if (!socket || !currentBookingId) return;

    const handleBookingUpdate = (data: any) => {
      console.log('📨 Local: Booking updated:', data);
      if (data.booking && data.booking._id === currentBookingId && data.booking.status === 'đã nhận') {
        // Clear the timeout since mechanic accepted
        if (timeoutId) {
          clearTimeout(timeoutId);
          setTimeoutId(null);
        }
        
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
    socket.on('booking_status_updated', handleBookingUpdate);

    return () => {
      socket.off('your_booking_updated', handleBookingUpdate);
      socket.off('booking_status_updated', handleBookingUpdate);
    };
  }, [socket, currentBookingId, timeoutId, router]);



  // Open confirmation modal and auto-update address with current location
  const handleConfirmLocation = async () => {
    try {
      // Get fresh current location
      const currentLoc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setCoords(currentLoc.coords);
      
      // Update address with fresh location if not already set
      if (!address || address === "Unable to get address") {
        try {
          const reverseGeocode = await Location.reverseGeocodeAsync({
            latitude: currentLoc.coords.latitude,
            longitude: currentLoc.coords.longitude,
          });
          
          if (reverseGeocode.length > 0) {
            const addr = reverseGeocode[0];
            const fullAddress = `${addr.streetNumber || ''} ${addr.street || ''}, ${addr.district || ''}, ${addr.city || ''}, ${addr.region || ''}`.trim();
            setAddress(fullAddress);
          }
        } catch (error) {
          console.log("Error getting fresh address:", error);
        }
      }
    } catch (error) {
      console.log("Error getting current location:", error);
    }
    
    setShowConfirmModal(true);
  };

  // Confirm booking: create booking and wait for real mechanic response
  const handleConfirmBooking = async () => {
    try {
      setShowConfirmModal(false);
      setShowFindingModal(true);
      setMechanicFound(false);

      // Use current coordinates (already updated in handleConfirmLocation)
      const { latitude, longitude } = coords;

      // Prepare booking data
      const bookingData = {
        customerId: user?.id,
        serviceId: null, // emergency / system-assigned service
        location: {
          type: "Point",
          coordinates: [longitude, latitude],
          address: address || "Current location",
        },
        description: "Yêu cầu hỗ trợ gần đây",
        status: "chờ thợ",
      };

      console.log(">>> [DEBUG] Sending bookingData:", bookingData);

      // Send booking to backend
      const res = await axios.post(`${BASE_URL}/bookings/create`, bookingData);
      console.log("✅ Booking created:", res.data);
      
      // Store booking ID for socket event matching
      setCurrentBookingId(res.data._id);

      // Real-time updates will be handled by socket events
      // Add timeout fallback in case no mechanic responds within 1 minute
      const timeout = setTimeout(() => {
        if (!mechanicFound) {
          setShowFindingModal(false);
          Alert.alert(
            "Booking Saved", 
            "Your request has been saved. We'll notify you when a mechanic becomes available.",
            [{ 
              text: "OK", 
              onPress: () => {
                // Navigate to homepage instead of going back
                router.push("/customer/homePage/homePage");
              }
            }]
          );
        }
      }, 15000); // 15 seconds timeout
      
      setTimeoutId(timeout);

    } catch (err: any) {
      console.error("❌ Error creating booking:", err);
      Alert.alert("Booking failed", err.response?.data?.error || err.message);
      setShowFindingModal(false);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Map Section */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: coords.latitude || 15.9689,
            longitude: coords.longitude || 108.2608,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          <Marker coordinate={coords} />
        </MapView>

        {/* Back button */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet */}
      <View style={styles.bottomSheet}>
        <Text style={styles.title}>Chọn vị trí</Text>
        <Text style={styles.label}>Vị trí của bạn</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />

        <Text style={styles.label}>Lưu như</Text>
        <View style={styles.saveAsContainer}>
          <TouchableOpacity
            style={[styles.option, selectedType === "Home" && styles.optionSelected]}
            onPress={() => setSelectedType("Home")}
          >
            <Ionicons name="home-outline" size={20} color="red" />
            <Text style={styles.optionText}>Nhà riêng</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.option, selectedType === "Office" && styles.optionSelected]}
            onPress={() => setSelectedType("Office")}
          >
            <MaterialIcons name="work-outline" size={20} color="red" />
            <Text style={styles.optionText}>Văn phòng</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.option, selectedType === "Others" && styles.optionSelected]}
            onPress={() => setSelectedType("Others")}
          >
            <Ionicons name="location-outline" size={20} color="red" />
            <Text style={styles.optionText}>Khác</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleConfirmLocation}>
          <Text style={styles.saveButtonText}>Chọn địa chỉ này</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="home" />

      {/* Confirmation Modal */}
      <Modal
        visible={showConfirmModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowConfirmModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.confirmModal}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowConfirmModal(false)}
            >
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>Xác nhận thông tin</Text>
            <Text style={styles.modalText}>Địa chỉ: {address}</Text>
            <Text style={styles.modalText}>
              Loại: {selectedType === "Home" ? "Nhà riêng" : selectedType === "Office" ? "Văn phòng" : "Khác"}
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowConfirmModal(false)}
              >
                <Text style={styles.cancelButtonText}>Hủy</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={handleConfirmBooking}
              >
                <Text style={styles.confirmButtonText}>Xác nhận & Đặt</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Finding Mechanic Modal */}
      <Modal 
        visible={showFindingModal} 
        transparent 
        animationType="fade"
        onRequestClose={() => {
          // Allow user to cancel and go back to homepage
          if (timeoutId) {
            clearTimeout(timeoutId);
            setTimeoutId(null);
          }
          setShowFindingModal(false);
          router.push("/customer/homePage/homePage");
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.findingModal}>
            {!mechanicFound ? (
              <>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => {
                    if (timeoutId) {
                      clearTimeout(timeoutId);
                      setTimeoutId(null);
                    }
                    setShowFindingModal(false);
                    router.push("/customer/homePage/homePage");
                  }}
                >
                  <Ionicons name="close" size={24} color="#666" />
                </TouchableOpacity>
                <ActivityIndicator size="large" color="#B71C1C" style={styles.loader} />
                <Text style={styles.findingTitle}>Đang tìm thợ sửa chữa...</Text>
                <Text style={styles.findingText}>Vui lòng chờ trong giây lát</Text>
                <Text style={styles.waitingText}>Đơn hàng sẽ được lưu và thông báo khi có thợ nhận</Text>
              </>
            ) : (
              <>
                <Ionicons name="checkmark-circle" size={60} color="#4CAF50" style={styles.successIcon} />
                <Text style={styles.successTitle}>Đã tìm thấy thợ!</Text>
                <Text style={styles.successText}>Thợ sửa chữa đã nhận đơn của bạn</Text>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  backBtn: { position: "absolute", top: 40, left: 16 },

  mapContainer: { flex: 1 },
  map: { flex: 1 },
  bottomSheet: {
    position: "absolute",
    bottom: 70,
    width: "100%",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    elevation: 5,
  },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  label: { fontSize: 14, color: "gray", marginTop: 5 },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 5,
    marginBottom: 15,
  },
  saveAsContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    flex: 1,
    marginHorizontal: 5,
  },
  optionSelected: { borderColor: "red", backgroundColor: "#ffe5e5" },
  optionText: { marginLeft: 5, fontSize: 14 },
  saveButton: { backgroundColor: "darkred", paddingVertical: 14, borderRadius: 10, alignItems: "center" },
  saveButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  bottomNav: {
    height: 70,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ddd",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  confirmModal: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    margin: 20,
    width: "85%",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  closeButton: {
    position: "absolute",
    top: 15,
    right: 15,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    marginTop: 10,
  },
  modalText: {
    fontSize: 14,
    marginBottom: 8,
    color: "#666",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#666",
    fontWeight: "bold",
  },
  confirmButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: "#B71C1C",
    borderRadius: 8,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  findingModal: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 30,
    margin: 20,
    width: "80%",
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  loader: {
    marginBottom: 20,
  },
  findingTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  findingText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  successIcon: {
    marginBottom: 15,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#4CAF50",
  },
  successText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  waitingText: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    marginTop: 10,
    fontStyle: "italic",
  },
});
