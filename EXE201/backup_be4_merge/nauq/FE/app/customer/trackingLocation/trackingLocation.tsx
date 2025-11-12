import BottomNavigation from "@/components/BottomNavigation-Cus";
import BASE_URL from "@/services/api";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { io } from "socket.io-client";
import axios from "axios";

export default function MechanicOnTheWayScreen() {
  const router = useRouter();
  const { bookingId } = useLocalSearchParams();
  const mechanicLocation = { latitude: 15.980864036903103, longitude: 108.25122105737384 };
  const customerLocation = { latitude: 15.969066305149333, longitude: 108.26089825983595 };

  type Coordinate = { latitude: number; longitude: number };
  const [routeCoordinates, setRouteCoordinates] = useState<Coordinate[]>([]);
  const [isLoadingRoute, setIsLoadingRoute] = useState(true);


  // // Function to decode polyline from Google Directions API
  // const decodePolyline = (encoded: string): Coordinate[] => {
  //   const poly = [];
  //   let index = 0, len = encoded.length;
  //   let lat = 0, lng = 0;

  //   while (index < len) {
  //     let b, shift = 0, result = 0;
  //     do {
  //       b = encoded.charCodeAt(index++) - 63;
  //       result |= (b & 0x1f) << shift;
  //       shift += 5;
  //     } while (b >= 0x20);
  //     const dlat = ((result & 1) ? ~(result >> 1) : (result >> 1));
  //     lat += dlat;

  //     shift = 0;
  //     result = 0;
  //     do {
  //       b = encoded.charCodeAt(index++) - 63;
  //       result |= (b & 0x1f) << shift;
  //       shift += 5;
  //     } while (b >= 0x20);
  //     const dlng = ((result & 1) ? ~(result >> 1) : (result >> 1));
  //     lng += dlng;

  //     poly.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
  //   }
  //   return poly;
  // };

  // // Function to get directions using Google Directions API
  // const getDirections = async () => {
  //   try {
  //     setIsLoadingRoute(true);
  //     const origin = `${mechanicLocation.latitude},${mechanicLocation.longitude}`;
  //     const destination = `${customerLocation.latitude},${customerLocation.longitude}`;

  //     // Replace 'YOUR_API_KEY' with your actual Google Maps API key
  //     // For demo purposes, we'll use a mock route that follows roads more realistically
  //     const mockRoutePoints = [
  //       mechanicLocation,
  //       { latitude: 15.979125284035566, longitude: 108.25134786816572 }, // Turn point 1
  //       { latitude: 15.979138175592393, longitude: 108.25360892911549 }, // Turn point 2
  //       { latitude: 15.97818276363993, longitude: 108.25362439695917 }, // Turn point 3
  //       { latitude: 15.978535932011036, longitude: 108.25490629384008 }, // Turn point 4
  //       { latitude: 15.971675587558376, longitude: 108.25464151783135 }, // Turn point 5
  //       { latitude: 15.971664434494928, longitude: 108.25668133867298 }, // Turn point 6
  //       { latitude: 15.969137273666448, longitude: 108.2567151291073 }, // Turn point 7
  //       customerLocation,
  //     ];

  //     setRouteCoordinates(mockRoutePoints);
  //     setIsLoadingRoute(false);

  //     // Uncomment below for real Google Directions API implementation:
  //     /*
  //     const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY';
  //     const response = await fetch(
  //       `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`
  //     );
  //     const data = await response.json();

  //     if (data.routes && data.routes.length > 0) {
  //       const route = data.routes[0];
  //       const decodedCoords = decodePolyline(route.overview_polyline.points);
  //       setRouteCoordinates(decodedCoords);
  //     }
  //     */
  //   } catch (error) {
  //     console.error('Error fetching directions:', error);
  //     // Fallback to straight line if route fetching fails
  //     setRouteCoordinates([mechanicLocation, customerLocation]);
  //   } finally {
  //     setIsLoadingRoute(false);
  //   }
  // };

  // useEffect(() => {
  //   getDirections();
  // }, []);

  // Function to update booking status (for testing purposes)
  const updateBookingStatus = async (status: string) => {
    try {
      console.log(`🔹 Updating booking status to: ${status}`);
      
      const response = await axios.post(`${BASE_URL}/bookings/status`, {
        bookingId,
        status,
      });
      
      console.log("✅ Status updated successfully:", response.data);
      
      // The socket listener will handle navigation automatically
    } catch (error: any) {
      console.error("❌ Error updating status:", error);
      Alert.alert(
        "Error", 
        `Failed to update booking status: ${error.response?.data?.error || error.message}`
      );
    }
  };

  useEffect(() => {
    if (!bookingId) return;

    console.log("🔹 Setting up socket connection for booking tracking:", bookingId);

    const socket = io(BASE_URL.replace("/api", ""), {
      transports: ['websocket', 'polling'],
      forceNew: true,
    });

    // Register socket connection
    socket.on('connect', () => {
      console.log('✅ Tracking socket connected:', socket.id);
      socket.emit("join_room", bookingId);
    });

    // Listen for booking status updates
    socket.on("booking_status_updated", (data: any) => {
      console.log("🔹 Received booking_status_updated:", data);
      if (data.booking && data.booking._id === bookingId) {
        console.log("🔹 Booking matches current bookingId, status:", data.booking.status);
        
        // Navigate to feedback screen for completed or cancelled bookings
        if (["hoàn thành", "hủy"].includes(data.booking.status)) {
          console.log("🔹 Booking finished, navigating to feedback screen...");
          
          // Small delay to ensure smooth transition
          setTimeout(() => {
            router.push({
              pathname: "/customer/feedback/feedback",
              params: { 
                bookingId: bookingId as string,
                status: data.booking.status,
                mechanicId: data.booking.mechanicId?._id || data.booking.mechanicId
              },
            });
          }, 1000);
        }
      }
    });

    // Also listen for general booking updates
    socket.on("your_booking_updated", (data: any) => {
      console.log("🔹 Received your_booking_updated:", data);
      if (data.booking && data.booking._id === bookingId) {
        console.log("🔹 Your booking updated, status:", data.booking.status);
        
        if (["hoàn thành", "hủy"].includes(data.booking.status)) {
          console.log("🔹 Booking finished via your_booking_updated, navigating to feedback...");
          
          setTimeout(() => {
            router.push({
              pathname: "/customer/feedback/feedback",
              params: { 
                bookingId: bookingId as string,
                status: data.booking.status,
                mechanicId: data.booking.mechanicId?._id || data.booking.mechanicId
              },
            });
          }, 1000);
        }
      }
    });

    socket.on('disconnect', () => {
      console.log('❌ Tracking socket disconnected');
    });

    socket.on('connect_error', (error) => {
      console.error('❌ Tracking socket connection error:', error);
    });

    return () => {
      console.log("🔹 Cleaning up tracking socket connection");
      socket.disconnect();
    };
  }, [bookingId, router]);


  return (
    <SafeAreaView style={styles.container}>
      {/* Map Section */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 15.975405782482411,
            longitude: 108.25656383359159,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          }}>
          {/* Mechanic marker */}
          <Marker coordinate={mechanicLocation} pinColor="red" />

          {/* Customer marker */}
          <Marker coordinate={customerLocation} pinColor="red" />

          {/* Route Polyline */}
          {routeCoordinates.length > 0 && (
            <Polyline
              coordinates={routeCoordinates}
              strokeColor="#2196F3"
              strokeWidth={4}
              lineDashPattern={[10, 5]}
            />
          )}

          {/* Loading indicator for route */}
          {isLoadingRoute && (
            <Marker
              coordinate={{
                latitude: (mechanicLocation.latitude + customerLocation.latitude) / 2,
                longitude: (mechanicLocation.longitude + customerLocation.longitude) / 2
              }}
              title="Loading route..."
            />
          )}
        </MapView>

        {/* Back button */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet */}
      <View style={styles.bottomSheet}>
        <Text style={styles.title}>Thợ sửa đang trên đường</Text>

        {/* Mechanic Info Row */}
        <View style={styles.mechanicRow}>
          <Image
            source={{
              uri: "https://i.pravatar.cc/100", // sample avatar
            }}
            style={styles.avatar}
          />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>Bùi Lê Việt Anh</Text>
            <Text style={styles.subtitle}>Thợ sửa xe chuyên nghiệp</Text>
          </View>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="chatbubble-outline" size={22} color="red" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="call-outline" size={22} color="red" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Info Details */}
        <View style={styles.infoItem}>
          <Ionicons name="location-outline" size={20} color="red" />
          <Text style={styles.infoText}>
            2972 Westheimer Rd. Santa Ana, Illinois 85486
          </Text>
        </View>

        <View style={styles.infoItem}>
          <MaterialIcons name="directions-car" size={20} color="red" />
          <Text style={styles.infoText}>
            Honda Wave Alpha - 59X2-123.45
          </Text>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="time-outline" size={20} color="red" />
          <Text style={styles.infoText}>03:00PM (Max 20 min)</Text>
        </View>

        {/* Cancel Button for Customer */}
        <View style={styles.statusButtons}>
          <TouchableOpacity 
            style={[styles.statusButton, styles.cancelButton]}
            onPress={() => updateBookingStatus("hủy")}
          >
            <Ionicons name="close-circle-outline" size={20} color="white" />
            <Text style={styles.buttonText}>Hủy đơn</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab="home" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  mapContainer: { flex: 1 },
  map: { flex: 1 },

  backBtn: { position: "absolute", top: 40, left: 16 },

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
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 15 },
  mechanicRow: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 12 },
  name: { fontSize: 16, fontWeight: "600" },
  subtitle: { fontSize: 13, color: "gray" },
  actionButtons: { flexDirection: "row" },
  iconButton: {
    marginHorizontal: 5,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#fff5f5",
  },
  infoItem: { flexDirection: "row", alignItems: "center", marginVertical: 5 },
  infoText: { marginLeft: 8, fontSize: 14, flexShrink: 1 },
  
  // Cancel button for customer
  statusButtons: {
    marginTop: 20,
  },
  statusButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    gap: 5,
  },
  cancelButton: {
    backgroundColor: "#F44336",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});
