import BottomNavigation from "@/components/BottomNavigation-Mec";
import { useFeedback } from "@/contexts/FeedbackContext";
import { useMechanicStatus } from "@/contexts/MechanicStatusContext";
import { useNotification } from "@/contexts/NotificationContext";
import { useUser } from "@/contexts/userContext";
import BASE_URL from "@/services/api";
import { getFeedbackByBookingId } from "@/services/bookingServices";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Animated,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import io from 'socket.io-client';

// Define booking interface
interface Booking {
  id: string;
  customer: string;
  email: string;
  phone: string;
  avatar: string;
  address: string;
  coordinates?: number[];
  status: string;
  description: string;
  service: string;
  price: number;
  distance: string;
  distanceKm?: number;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

// Backend booking interface (what comes from socket events)
interface BackendBooking {
  _id?: string;
  id?: string;
  customerId?: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    avatar: string;
  };
  location?: {
    coordinates: number[];
    address: string;
  };
  status: string;
  description?: string;
  serviceId?: {
    _id: string;
    name: string;
    price: number;
  };
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

// status labels mapping
const statusLabels = ["chờ thợ", "đang xử lý", "hoàn thành", "hủy"];
const statusDisplayMap: { [key: string]: string } = {
  "chờ thợ": "Chờ xác nhận",
  "đã nhận": "Đã nhận",
  "đang di chuyển": "Đang di chuyển",
  "đang sửa": "Đang sửa chữa",
  "hoàn thành": "Hoàn thành",
  "hủy": "Đã hủy"
};

// tab filter mapping - defines which statuses belong to which tab
const tabStatusMapping: { [key: string]: string[] } = {
  "chờ thợ": ["chờ thợ"],
  "đang xử lý": ["đã nhận", "đang di chuyển", "đang sửa"],
  "hoàn thành": ["hoàn thành"],
  "hủy": ["hủy"]
};

// tab display mapping for filter buttons
const tabDisplayMap: { [key: string]: string } = {
  "chờ thợ": "Chờ xác nhận",
  "đang xử lý": "Đang xử lý",
  "hoàn thành": "Hoàn thành",
  "hủy": "Đã hủy"
};

// define the next status in the workflow
const getNextStatus = (currentStatus: string): string | null => {
  const statusFlow = {
    "đã nhận": "đang di chuyển",
    "đang di chuyển": "đang sửa",
    "đang sửa": "hoàn thành"
  };
  return statusFlow[currentStatus as keyof typeof statusFlow] || null;
};

export default function BookRepairList() {
  const router = useRouter();
  const { user } = useUser();
  const { isOnline } = useMechanicStatus();
  const { showMechanicNotification } = useNotification();
  const [orders, setOrders] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const socketRef = useRef<any>(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [feedbackData, setFeedbackData] = useState<Record<string, any[]>>({});
  const { showFeedback } = useFeedback();

  // fetch feedback cho các booking đã hoàn thành
  const fetchFeedbackForBookings = async (completedBookings: any[]) => {
    const feedbackMap: Record<string, any[]> = {};

    for (const booking of completedBookings) {
      try {
        const feedback = await getFeedbackByBookingId(booking.id);
        feedbackMap[booking.id] = feedback;
      } catch (error) {
        console.log(`No feedback found for booking ${booking.id}`);
        feedbackMap[booking.id] = [];
      }
    }

    setFeedbackData(feedbackMap);
  };

  // Remove this conflicting useEffect

  // fetch bookings from backend, including feedback for completed ones
  const fetchBookings = async () => {
    try {
      if (!user?.id) {
        Alert.alert("Error", "User not found. Please login again.");
        return;
      }

      // Only fetch bookings if mechanic is online
      if (!isOnline) {
        console.log("📦 Mechanic is offline, not fetching bookings");
        setOrders([]);
        return;
      }

      setLoading(true);

      const response = await axios.get(`${BASE_URL}/bookings/mechanic/${user.id}`);
      const bookings = response.data || [];

      console.log("📦 Fetched bookings:", bookings);
      setOrders(bookings);

      // ✅ If bookings are completed ("Hoàn thành"), fetch feedbacks for them
      const completedBookings = bookings.filter((b: any) => b.status === "Hoàn thành");
      if (completedBookings.length > 0) {
        console.log(`💬 Fetching feedback for ${completedBookings.length} completed bookings...`);
        fetchFeedbackForBookings(completedBookings);
      }
    } catch (error: any) {
      console.error("❌ Error fetching bookings:", error);
      showMechanicNotification(
        "Lỗi",
        `Không thể tải danh sách đơn hàng: ${error.response?.data?.error || error.message}`,
        "error"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // // fetch data từ backend
  // const fetchBookingsWithFeedback = async (pageNum = 1, status?: string, search?: string) => {
  //   setLoading(true);
  //   try {
  //     const res = await getBookings({
  //       page: pageNum,
  //       limit,
  //       status: status || "",
  //       search: search || "",
  //     });
  //     setBookings(res.data || []);
  //     setPage(res.page);
  //     setTotalPages(res.totalPages);

  //     // Nếu là tab "Hoàn thành", fetch feedback cho từng booking
  //     if (status === "Hoàn thành" && res.data && res.data.length > 0) {
  //       fetchFeedbackForBookings(res.data);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     setBookings([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // Socket.IO setup for real-time updates
  useEffect(() => {
    if (!user?.id || !isOnline) {
      // Disconnect socket if mechanic goes offline
      if (socketRef.current) {
        socketRef.current.disconnect();
        setSocketConnected(false);
      }
      return;
    }

    // Initialize socket connection
    const socket = io('https://fixgo-be.onrender.com');
    socketRef.current = socket;

    // Handle socket connection events
    socket.on('connect', () => {
      console.log('📡 Socket connected');
      setSocketConnected(true);
      socket.emit('register', user.id);
      console.log('📡 Socket registered for mechanic:', user.id);
    });

    socket.on('disconnect', () => {
      console.log('📡 Socket disconnected');
      setSocketConnected(false);
    });

    // Listen for new bookings
    socket.on('new_booking', (data: { booking: BackendBooking; mechanicId: string }) => {
      console.log('🔔 New booking received:', data);
      if (data.mechanicId === user.id) {
        // Format the booking data to match the expected structure
        const formattedBooking: Booking = {
          id: data.booking.id || data.booking._id || '',
          customer: data.booking.customerId?.name || 'Unknown',
          email: data.booking.customerId?.email || '',
          phone: data.booking.customerId?.phone || '',
          avatar: data.booking.customerId?.avatar || 'https://randomuser.me/api/portraits/men/85.jpg',
          address: data.booking.location?.address || 'Address not provided',
          coordinates: data.booking.location?.coordinates,
          status: data.booking.status || 'chờ thợ',
          description: data.booking.description || '',
          service: data.booking.serviceId?.name || 'Emergency Service',
          price: data.booking.serviceId?.price || 0,
          distance: 'Unknown', // Will be calculated by backend
          distanceKm: undefined,
          createdAt: data.booking.createdAt || new Date().toISOString(),
          updatedAt: data.booking.updatedAt || new Date().toISOString(),
          completedAt: data.booking.completedAt
        };

        // Add new booking to the list
        setOrders(prevOrders => {
          // Check if booking already exists to avoid duplicates
          const exists = prevOrders.some(order => order.id === formattedBooking.id);
          if (exists) return prevOrders;

          return [formattedBooking, ...prevOrders];
        });

        // Show notification
        showMechanicNotification(
          "Đơn hàng mới!",
          `Có đơn hàng mới từ ${formattedBooking.customer}`,
          'info'
        );
      }
    });

    // Listen for booking updates
    socket.on('booking_status_updated', (data: { booking: any }) => {
      console.log('📝 Booking status updated:', data);
      const bookingId = data.booking.id || data.booking._id;
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === bookingId
            ? { ...order, status: data.booking.status, updatedAt: data.booking.updatedAt }
            : order
        )
      );
    });

    // Listen for booking assignments
    socket.on('booking_assigned', (data: { booking: any }) => {
      console.log('✅ Booking assigned:', data);
      const bookingId = data.booking.id || data.booking._id;
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === bookingId
            ? { ...order, status: 'đã nhận', updatedAt: data.booking.updatedAt }
            : order
        )
      );
    });

    // Listen for booking rejections by other mechanics
    socket.on('booking_rejected_by_mechanic', (data: { bookingId: string; mechanicId: string }) => {
      console.log('❌ Booking rejected by mechanic:', data);
      // Refresh the list to get updated available bookings
      fetchBookings();
    });

    // Listen for general booking updates that affect availability
    socket.on('booking_created', (data: { bookingId: string }) => {
      console.log('🔔 New booking created globally:', data);
      // Refresh to show new available bookings
      fetchBookings();
    });

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        console.log('📡 Socket disconnected');
      }
    };
  }, [user?.id, isOnline]);

  // Load data on component mount and when online status changes
  useEffect(() => {
    fetchBookings();
  }, [user?.id, isOnline]);

  // Handle pull-to-refresh
  const onRefresh = () => {
    setRefreshing(true);
    fetchBookings();
  };

  // Handle accepting a booking
  const handleAcceptBooking = async (bookingId: string) => {
    try {
      if (!user?.id) {
        Alert.alert("Error", "User not found. Please login again.");
        return;
      }

      if (!isOnline) {
        showMechanicNotification("Không khả dụng", "Bạn cần bật trạng thái 'Đang làm việc' để có thể nhận đơn hàng.", 'warning');
        return;
      }

      console.log("🔹 Accepting booking:", bookingId);

      const response = await axios.post(`${BASE_URL}/bookings/assign`, {
        bookingId,
        mechanicId: user.id
      });

      console.log("✅ Booking accepted:", response.data);
      showMechanicNotification("Thành công", "Đã nhận đơn hàng thành công!", 'success');

      // Update local state immediately
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === bookingId
            ? { ...order, status: 'đã nhận' }
            : order
        )
      );

    } catch (error: any) {
      console.error("❌ Error accepting booking:", error);

      let errorMessage = "Failed to accept booking";
      if (error.response?.data?.error) {
        const backendError = error.response.data.error;

        if (backendError.includes("Booking status must be 'chờ thợ'")) {
          errorMessage = "This booking has already been taken by another mechanic. Please refresh the list.";
          // Auto-refresh to show current status
          fetchBookings();
        } else if (backendError.includes("Mechanic is not available")) {
          errorMessage = "You are not available to accept bookings. Please check your status.";
        } else {
          errorMessage = backendError;
        }
      }

      showMechanicNotification("Không thể nhận đơn", errorMessage, 'error');
    }
  };

  // Handle rejecting a booking
  const handleRejectBooking = async (bookingId: string) => {
    try {
      if (!user?.id) {
        Alert.alert("Error", "User not found. Please login again.");
        return;
      }

      Alert.alert(
        "Confirm Rejection",
        "Are you sure you want to reject this booking?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Reject",
            style: "destructive",
            onPress: async () => {
              try {
                console.log("🔹 Rejecting booking:", bookingId);

                const response = await axios.post(`${BASE_URL}/bookings/rejectMechanic`, {
                  bookingId,
                  mechanicId: user.id
                });

                console.log("✅ Booking rejected:", response.data);
                showMechanicNotification("Thành công", "Đã từ chối đơn hàng thành công!", 'success');

                // Refresh the list
                fetchBookings();

              } catch (error: any) {
                console.error("❌ Error rejecting booking:", error);
                showMechanicNotification(
                  "Lỗi",
                  `Không thể từ chối đơn hàng: ${error.response?.data?.error || error.message}`,
                  'error'
                );
              }
            }
          }
        ]
      );
    } catch (error: any) {
      console.error("❌ Error in reject handler:", error);
    }
  };

  // Handle updating booking to next status
  const handleUpdateStatus = async (bookingId: string, currentStatus: string) => {
    try {
      if (!user?.id) {
        Alert.alert("Error", "User not found. Please login again.");
        return;
      }

      if (!isOnline) {
        showMechanicNotification("Không khả dụng", "Bạn cần bật trạng thái 'Đang làm việc' để có thể cập nhật trạng thái đơn hàng.", 'warning');
        return;
      }

      const nextStatus = getNextStatus(currentStatus);
      if (!nextStatus) {
        showMechanicNotification("Lỗi", "Không có trạng thái tiếp theo cho đơn hàng này.", 'error');
        return;
      }

      const statusAction = {
        "đang di chuyển": "di chuyển đến khách hàng",
        "đang sửa": "bắt đầu sửa chữa",
        "hoàn thành": "hoàn thành công việc"
      };

      const actionText = statusAction[nextStatus as keyof typeof statusAction] || "cập nhật trạng thái";

      Alert.alert(
        "Xác nhận cập nhật",
        `Bạn có chắc chắn muốn ${actionText}?`,
        [
          { text: "Hủy", style: "cancel" },
          {
            text: "Xác nhận",
            onPress: async () => {
              try {
                console.log("🔹 Updating booking status:", bookingId, "to", nextStatus);

                const response = await axios.post(`${BASE_URL}/bookings/status`, {
                  bookingId,
                  status: nextStatus
                });

                console.log("✅ Status updated:", response.data);
                showMechanicNotification("Thành công", `Đã cập nhật trạng thái thành "${statusDisplayMap[nextStatus]}"`, 'success');

                // Update local state immediately
                setOrders(prevOrders =>
                  prevOrders.map(order =>
                    order.id === bookingId
                      ? { ...order, status: nextStatus, updatedAt: new Date().toISOString() }
                      : order
                  )
                );

              } catch (error: any) {
                console.error("❌ Error updating status:", error);
                showMechanicNotification(
                  "Lỗi",
                  `Không thể cập nhật trạng thái: ${error.response?.data?.error || error.message}`,
                  'error'
                );
              }
            }
          }
        ]
      );
    } catch (error: any) {
      console.error("❌ Error in status update handler:", error);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // toggle search bar
  const toggleSearch = () => {
    if (searchVisible) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start(() => setSearchVisible(false));
    } else {
      setSearchVisible(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  };

  // filter orders by status + search
  const filteredOrders = orders.filter((o) => {
    let matchesFilter = true;
    if (activeFilter !== null) {
      // Check if the order's status is included in the selected tab's status mapping
      const allowedStatuses = tabStatusMapping[activeFilter] || [activeFilter];
      matchesFilter = allowedStatuses.includes(o.status);
    }

    const query = searchText.toLowerCase();
    const matchesSearch =
      o.customer.toLowerCase().includes(query) ||
      o.phone.toLowerCase().includes(query) ||
      o.email.toLowerCase().includes(query) ||
      o.address.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Đang xử lý': return '#4CAF50';
      case 'Chờ xác nhận': return '#FF9800';
      case 'Từ chối': return '#F44336';
      case 'Hoàn thành': return '#2196F3';
      default: return '#9E9E9E';
    }
  };

  // Render rating stars component (placeholder)
  const RatingStars = ({ rating }: { rating: number }) => (
    <View style={styles.ratingStars}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Ionicons
          key={star}
          name={star <= rating ? "star" : "star-outline"}
          size={14}
          color="#FFD700"
        />
      ))}
    </View>
  );

  // Simple status menu component (placeholder)
  const StatusMenu = ({ status, onChange }: { status: string; onChange: (newStatus: string) => void }) => {
    const nextStatus = getNextStatus(status);
    if (!nextStatus) return null;
    
    return (
      <TouchableOpacity 
        style={styles.nextStageBtn}
        onPress={() => onChange(nextStatus)}
      >
        <Ionicons name="arrow-forward" size={16} color="#fff" />
        <Text style={styles.actionBtnText}>
          {nextStatus === "đang di chuyển" && "Di chuyển"}
          {nextStatus === "đang sửa" && "Bắt đầu sửa"}
          {nextStatus === "hoàn thành" && "Hoàn thành"}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Danh sách đơn hàng</Text>
          <View style={styles.statusIndicators}>
            {!isOnline && (
              <View style={styles.offlineIndicator}>
                <View style={styles.offlineDot} />
                <Text style={styles.offlineText}>Offline</Text>
              </View>
            )}
            {socketConnected && isOnline && (
              <View style={styles.connectionIndicator}>
                <View style={styles.connectedDot} />
                <Text style={styles.connectionText}>Live</Text>
              </View>
            )}
          </View>
        </View>
        <TouchableOpacity onPress={toggleSearch}>
          <Ionicons name="search" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Search Box */}
      {searchVisible && (
        <Animated.View style={[styles.searchBox, { opacity: fadeAnim }]}>
          <Ionicons name="search" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm đơn hàng..."
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#999"
          />
        </Animated.View>
      )}
      {/* filter tabs */}
      <View style={styles.filterRow}>
        {statusLabels.map((label) => (
          <TouchableOpacity
            key={label}
            style={[
              styles.filterBtn,
              activeFilter === label && styles.filterBtnActive,
            ]}
            onPress={() =>
              setActiveFilter(activeFilter === label ? null : label)
            }
          >
            <Text
              style={[
                styles.filterText,
                activeFilter === label && styles.filterTextActive,
              ]}
            >
              {tabDisplayMap[label] || label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* orders list */}
      {
        loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#B71C1C" />
            <Text style={styles.loadingText}>Đang tải danh sách đơn hàng...</Text>
          </View>
        ) : (
          <FlatList
            data={filteredOrders}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ padding: 10 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Ionicons
                  name={isOnline ? "list-outline" : "person-outline"}
                  size={64}
                  color={isOnline ? "#ccc" : "#e74c3c"}
                />
                <Text style={styles.emptyText}>
                  {isOnline ? "Không có đơn hàng nào" : "Bạn đang offline"}
                </Text>
                <Text style={styles.emptySubText}>
                  {isOnline ? "Kéo xuống để tải lại" : "Bật trạng thái 'Đang làm việc' để nhận đơn hàng"}
                </Text>
              </View>
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => {
                  // Navigate to booking details or handle booking action
                  console.log("Selected booking:", item.id);
                }}
              >
                {/* top row: avatar + info */}
                <View style={styles.row}>
                  <Image source={{ uri: item.avatar }} style={styles.avatar} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.name}>{item.customer}</Text>
                    <View style={styles.infoRow}>
                      <Ionicons name="time-outline" size={14} color="#555" />
                      <Text style={styles.infoText}>{formatDate(item.createdAt)}</Text>
                      <Ionicons
                        name="mail-outline"
                        size={14}
                        color="#555"
                        style={{ marginLeft: 8 }}
                      />
                      <Text style={styles.infoText} numberOfLines={1}>{item.email}</Text>
                    </View>
                  </View>
                </View>

                {/* phone number */}
                <View style={styles.infoRow}>
                  <Ionicons name="call-outline" size={14} color="#555" />
                  <Text style={styles.address}>SĐT: {item.phone}</Text>
                </View>

                {/* address with distance */}
                <View style={styles.infoRow}>
                  <Ionicons name="location-outline" size={14} color="#555" />
                  <Text style={styles.address} numberOfLines={1}>
                    {item.address}
                  </Text>
                </View>

                {/* service and distance */}
                <View style={styles.serviceRow}>
                  <View style={styles.infoRow}>
                    <Ionicons name="construct-outline" size={14} color="#B71C1C" />
                    <Text style={styles.serviceText}>{item.service}</Text>
                  </View>
                  <View style={styles.distanceContainer}>
                    <Ionicons name="navigate-outline" size={16} color="#2ecc71" />
                    <Text style={styles.distanceText}>{item.distance}</Text>
                  </View>
                </View>

                {/* description if available */}
                {item.description && (
                  <Text style={styles.descriptionText} numberOfLines={2}>
                    {item.description}
                  </Text>
                )}

                {/* action buttons for pending bookings or status display */}
                <View style={styles.actionRow}>
                  {item.status === "chờ thợ" ? (
                    <View style={styles.actionButtons}>
                      <TouchableOpacity
                        style={styles.rejectBtn}
                        onPress={() => handleRejectBooking(item.id)}
                      >
                        <Ionicons name="close" size={16} color="#fff" />
                        <Text style={styles.actionBtnText}>Từ chối</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.acceptBtn}
                        onPress={() => handleAcceptBooking(item.id)}
                      >
                        <Ionicons name="checkmark" size={16} color="#fff" />
                        <Text style={styles.actionBtnText}>Nhận đơn</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={styles.actionButtons}>
                      <TouchableOpacity
                        style={[
                          styles.statusBtn,
                          item.status === "đã nhận" && { backgroundColor: "#3498db" },
                          item.status === "đang di chuyển" && { backgroundColor: "#f39c12" },
                          item.status === "đang sửa" && { backgroundColor: "#9b59b6" },
                          item.status === "hoàn thành" && { backgroundColor: "#2ecc71" },
                          item.status === "hủy" && { backgroundColor: "#e74c3c" },
                        ]}
                      >
                        <Text style={styles.statusText}>
                          {statusDisplayMap[item.status] || item.status}
                        </Text>
                      </TouchableOpacity>

                      {/* Show next stage button for active bookings */}
                      {getNextStatus(item.status) && (
                        <TouchableOpacity
                          style={styles.nextStageBtn}
                          onPress={() => handleUpdateStatus(item.id, item.status)}
                        >
                          <Ionicons name="arrow-forward" size={16} color="#fff" />
                          <Text style={styles.actionBtnText}>
                            {getNextStatus(item.status) === "đang di chuyển" && "Di chuyển"}
                            {getNextStatus(item.status) === "đang sửa" && "Bắt đầu sửa"}
                            {getNextStatus(item.status) === "hoàn thành" && "Hoàn thành"}
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
                </View>

                {/* Feedback Section for completed bookings */}
                {item.status === "hoàn thành" && (
                  <View style={styles.feedbackSection}>
                    <View style={styles.feedbackHeader}>
                      <Ionicons name="star" size={18} color="#FFD700" />
                      <Text style={styles.feedbackTitle}>Đánh giá từ khách hàng</Text>
                    </View>
                    {feedbackData[item.id] && feedbackData[item.id].length > 0 ? (
                      feedbackData[item.id].map((feedback: any, index: number) => (
                        <View key={index} style={styles.feedbackItem}>
                          <View style={styles.ratingRow}>
                            <RatingStars rating={feedback.rating} />
                            <Text style={styles.ratingText}>({feedback.rating}/5)</Text>
                          </View>
                          {feedback.comment && (
                            <Text style={styles.feedbackComment}>"{feedback.comment}"</Text>
                          )}
                          <Text style={styles.feedbackDate}>
                            {new Date(feedback.createdAt).toLocaleDateString('vi-VN')}
                          </Text>
                        </View>
                      ))
                    ) : (
                      <View style={styles.noFeedbackSection}>
                        <Ionicons name="chatbubble-outline" size={18} color="#999" />
                        <Text style={styles.noFeedbackText}>Chưa có đánh giá</Text>
                      </View>
                    )}
                  </View>
                )}
              </TouchableOpacity>
            )}
          />
        )
      }

      <BottomNavigation activeTab="bookings" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 30,
  },

  scrollContainer: { paddingHorizontal: 15, marginTop: 15 },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 10,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
  headerCenter: {
    flex: 1,
    alignItems: "center"
  },
  connectionIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  connectedDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#2ecc71",
    marginRight: 4,
  },
  connectionText: {
    fontSize: 10,
    color: "#2ecc71",
    fontWeight: "500",
  },
  statusIndicators: {
    flexDirection: "row",
    alignItems: "center",
  },
  offlineIndicator: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(231, 76, 60, 0.1)",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
  },
  offlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#e74c3c",
    marginRight: 4,
  },
  offlineText: {
    fontSize: 10,
    color: "#e74c3c",
    fontWeight: "500",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 50,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 14, color: "#333" },


  /* Card mặc định */
  card: {
    backgroundColor: '#fff', borderRadius: 20, padding: 18, marginBottom: 15,
    shadowColor: '#000', shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12, shadowRadius: 6, elevation: 5, position: 'relative',
  },
  statusBadge: {
    position: 'absolute', top: 15, right: 15,
    paddingHorizontal: 12, paddingVertical: 6, borderRadius: 15,
  },
  statusBadgeText: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  avatarCircle: {
    width: 50, height: 50, borderRadius: 25,
    backgroundColor: '#FFE0E0', justifyContent: 'center', alignItems: 'center',
    marginRight: 12,
  },
  headerInfo: { flex: 1 },
  name: { fontSize: 17, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  dateTimeRow: { flexDirection: 'row', alignItems: 'center' },
  dateTime: { fontSize: 12, color: '#666', marginLeft: 4 },
  divider: { height: 1, backgroundColor: '#E0E0E0', marginBottom: 12 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingLeft: 5 },
  infoText: { fontSize: 13, color: '#444', marginLeft: 10, flex: 1 },
  callButton: {
    flex: 1, flexDirection: 'row', backgroundColor: '#B71C1C',
    paddingVertical: 12, borderRadius: 12, alignItems: 'center', justifyContent: 'center',
  },
  callText: { color: '#fff', fontWeight: 'bold', fontSize: 13, marginLeft: 6 },
  messageButton: {
    flex: 1, flexDirection: 'row', backgroundColor: '#FFE0E0',
    paddingVertical: 12, borderRadius: 12, alignItems: 'center', justifyContent: 'center',
  },
  messageText: { color: '#B71C1C', fontWeight: 'bold', fontSize: 13, marginLeft: 6 },
  statusMenuContainer: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
  },

  /* Card chờ xác nhận */
  pendingCard: {
    backgroundColor: '#fff', borderRadius: 18, padding: 18, marginBottom: 15,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, shadowRadius: 5, elevation: 4, position: 'relative',
  },
  pendingHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  pendingTitle: { fontSize: 16, fontWeight: 'bold', marginLeft: 8, color: '#333' },
  pendingInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  pendingText: { marginLeft: 8, fontSize: 13, color: '#444', flex: 1 },
  pendingActions: { flexDirection: 'row', marginTop: 15, gap: 10 },
  detailPendingButton: {
    flex: 1, flexDirection: 'row', backgroundColor: '#FFF0F0',
    paddingVertical: 12, borderRadius: 10, alignItems: 'center', justifyContent: 'center',
  },
  detailPendingText: { color: '#B71C1C', fontWeight: 'bold', marginLeft: 6, fontSize: 13 },

  // Empty state và pagination
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  paginationButton: { marginHorizontal: 5 },
  paginationText: { alignSelf: "center", marginHorizontal: 5 },

  // Feedback styles
  ratingStars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  feedbackSection: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 15,
    marginTop: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700',
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  feedbackTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  feedbackItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#FFD700',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
    fontWeight: '600',
  },
  feedbackComment: {
    fontSize: 13,
    color: '#555',
    fontStyle: 'italic',
    marginBottom: 8,
    lineHeight: 18,
  },
  feedbackDate: {
    fontSize: 11,
    color: '#999',
    textAlign: 'right',
  },
  noFeedbackSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  noFeedbackText: {
    fontSize: 13,
    color: '#999',
    marginLeft: 8,
    fontStyle: 'italic',
  },


  address: { fontSize: 13, marginTop: 6, fontWeight: "600", color: "#222" },

  statusRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  statusBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: "flex-end",
  },
  statusText: { color: "#fff", fontWeight: "bold", fontSize: 13 },

  // Loading and empty states
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 50,
    marginTop: 50,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#666",
    marginTop: 16,
    textAlign: "center",
  },
  emptySubText: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
    textAlign: "center",
  },

  // Service and distance styles
  serviceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 4,
  },
  serviceText: {
    fontSize: 13,
    marginLeft: 4,
    color: "#B71C1C",
    fontWeight: "600",
  },
  distanceContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f9ff",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2ecc71",
  },
  distanceText: {
    fontSize: 12,
    marginLeft: 4,
    color: "#2ecc71",
    fontWeight: "bold",
  },
  descriptionText: {
    fontSize: 12,
    color: "#666",
    marginTop: 6,
    fontStyle: "italic",
    lineHeight: 16,
  },

  // Action buttons styles
  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 8,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 8,
  },
  acceptBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2ecc71",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  rejectBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e74c3c",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  actionBtnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  nextStageBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f39c12",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },


  // Các styles cũ không còn dùng nhưng giữ lại để tránh lỗi
  filterRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    borderRadius: 50,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  filterBtn: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 15 },
  filterBtnActive: { backgroundColor: "#B71C1C" },
  filterText: { fontSize: 14, fontWeight: "500", color: "#333" },
  filterTextActive: { color: "#fff" },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
});
