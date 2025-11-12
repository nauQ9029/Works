import BottomNavigation from "@/components/BottomNavigation-Mec";
import { useUser } from "@/contexts/userContext";
import { useMechanicStatus } from "@/contexts/MechanicStatusContext";
import { useNotification } from "@/contexts/NotificationContext";
import BASE_URL from "@/services/api";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
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
import axios from "axios";
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

// Tab filter mapping - defines which statuses belong to which tab
const tabStatusMapping: { [key: string]: string[] } = {
    "chờ thợ": ["chờ thợ"],
    "đang xử lý": ["đã nhận", "đang di chuyển", "đang sửa"],
    "hoàn thành": ["hoàn thành"],
    "hủy": ["hủy"]
};

// Tab display mapping for filter buttons
const tabDisplayMap: { [key: string]: string } = {
    "chờ thợ": "Chờ xác nhận",
    "đang xử lý": "Đang xử lý",
    "hoàn thành": "Hoàn thành",
    "hủy": "Đã hủy"
};

// Define the next status in the workflow
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

    // Fetch bookings from backend
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

            const response = await axios.get(`${BASE_URL}/bookings/mechanic/${user.id}`);
            console.log("📦 Fetched bookings:", response.data);
            setOrders(response.data);
        } catch (error: any) {
            console.error("❌ Error fetching bookings:", error);
            showMechanicNotification(
                "Lỗi", 
                `Không thể tải danh sách đơn hàng: ${error.response?.data?.error || error.message}`,
                'error'
            );
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

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
        const socket = io('http://192.168.106.184:5000');
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

            {/* search bar with conditional rendering */}
            {searchVisible && (
                <Animated.View
                    style={[
                        styles.searchBox,
                        {
                            opacity: fadeAnim,
                        },
                    ]}
                >
                    <Ionicons name="search" size={18} color="#555" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Tên, SĐT, địa chỉ..."
                        value={searchText}
                        onChangeText={setSearchText}
                        autoFocus={true}
                    />
                    {searchText !== "" && (
                        <TouchableOpacity onPress={() => setSearchText("")}>
                            <Ionicons name="close-circle" size={18} color="#999" />
                        </TouchableOpacity>
                    )}
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
            {loading ? (
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
                        </TouchableOpacity>
                    )}
                />
            )}

            <BottomNavigation activeTab="bookings" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f0f0f0", paddingTop: 30 },

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
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 14,
        color: "#333",
    },

    filterRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#fff",
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderColor: "#ddd",
        borderRadius: 50,
        marginHorizontal: 10,
        marginBottom: 10,
    },
    filterBtn: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 15,
    },
    filterBtnActive: { backgroundColor: "#B71C1C" },
    filterText: { fontSize: 14, fontWeight: "500", color: "#333" },
    filterTextActive: { color: "#fff" },

    card: {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 10,
        marginBottom: 12,
        elevation: 2,
        position: "relative",
    },
    row: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
    avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
    name: { fontSize: 14, fontWeight: "bold" },

    infoRow: { flexDirection: "row", alignItems: "center", marginTop: 2 },
    infoText: { fontSize: 12, marginLeft: 4, color: "#555" },

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
});
