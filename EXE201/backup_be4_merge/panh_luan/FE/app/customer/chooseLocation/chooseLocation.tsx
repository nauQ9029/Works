import BottomNavigation from "@/components/BottomNavigation";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";


export default function SelectLocationScreen() {
  const router = useRouter();
  const [address, setAddress] = useState("26 Lê Trung Đình, Hòa Hải, Ngũ Hành Sơn, Đà Nẵng");
  const [selectedType, setSelectedType] = useState("Home");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showFindingModal, setShowFindingModal] = useState(false);
  const [mechanicFound, setMechanicFound] = useState(false);

  // Handle finding mechanic simulation
  useEffect(() => {
    if (showFindingModal && !mechanicFound) {
      const timer = setTimeout(() => {
        setMechanicFound(true);
        // Wait a bit more to show success message, then navigate
        setTimeout(() => {
          setShowFindingModal(false);
          router.push("/customer/trackingLocation/trackingLocation");
        }, 1500);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showFindingModal, mechanicFound, router]);

  const handleConfirmLocation = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmBooking = () => {
    setShowConfirmModal(false);
    setShowFindingModal(true);
    setMechanicFound(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Map Section */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 15.968947529061719,
            longitude: 108.26089660980934,
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
          }}
        >
          <Marker coordinate={{ latitude: 15.968947529061719, longitude: 108.26089660980934 }} />
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

        <TouchableOpacity style={styles.saveButton}
          onPress={handleConfirmLocation}>
          <Text style={styles.saveButtonText}>Chọn địa chỉ này</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="home" />

      {/* Confirmation Modal */}
      <Modal
        visible={showConfirmModal}
        transparent={true}
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
            <Text style={styles.modalText}>Loại: {selectedType === "Home" ? "Nhà riêng" : selectedType === "Office" ? "Văn phòng" : "Khác"}</Text>

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
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.findingModal}>
            {!mechanicFound ? (
              <>
                <ActivityIndicator size="large" color="#B71C1C" style={styles.loader} />
                <Text style={styles.findingTitle}>Đang tìm thợ sửa chữa...</Text>
                <Text style={styles.findingText}>Vui lòng chờ trong giây lát</Text>
              </>
            ) : (
              <>
                <Ionicons name="checkmark-circle" size={60} color="#4CAF50" style={styles.successIcon} />
                <Text style={styles.successTitle}>Đã tìm thấy thợ!</Text>
                <Text style={styles.successText}>Bùi Lê Việt Anh đã nhận đơn của bạn</Text>
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
});
