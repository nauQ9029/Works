import BottomNavigation from "@/components/BottomNavigation";
import { useFeedback } from "@/contexts/FeedbackContext";
import { getBookings, getFeedbackByBookingId, updateBookingStatus } from "@/services/bookingServices";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { Button, Menu } from "react-native-paper";


const nextStatusOptions: Record<string, string[]> = {
  "Chờ xác nhận": ["Đang xử lý", "Từ chối"],
  "Đang xử lý": ["Hoàn thành", "Từ chối"],
  "Hoàn thành": [],
  "Từ chối": [],
};

const getColor = (status: string) => {
  switch (status) {
    case "Chờ xác nhận":
      return "#FF9800";
    case "Đang xử lý":
      return "#4CAF50";
    case "Hoàn thành":
      return "#2196F3";
    case "Từ chối":
      return "#F44336";
    default:
      return "#7f8c8d";
  }
};

// Component để render rating stars
const RatingStars = ({ rating }: { rating: number }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Ionicons
        key={i}
        name={i <= rating ? "star" : "star-outline"}
        size={16}
        color={i <= rating ? "#FFD700" : "#CCC"}
      />
    );
  }
  return <View style={styles.ratingStars}>{stars}</View>;
};

type StatusMenuProps = {
  status: string;
  onChange: (status: string) => void;
};

const StatusMenu: React.FC<StatusMenuProps> = ({ status, onChange }) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <Button
          mode="contained"
          onPress={openMenu}
          style={{ borderRadius: 20, backgroundColor: getColor(status) }}
          labelStyle={{ color: "#fff", fontWeight: "bold", fontSize: 13 }}
        >
          {status}
        </Button>
      }
    >
      {nextStatusOptions[status]?.map((s) => (
        <Menu.Item
          key={s}
          onPress={() => {
            onChange(s);
            closeMenu();
          }}
          title={s}
        />
      )) ?? null}
    </Menu>
  );
};

export default function BookRepairList() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('Chờ xác nhận');
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(true);
  const { showFeedback } = useFeedback();

  const [bookings, setBookings] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [feedbackData, setFeedbackData] = useState<Record<string, any[]>>({});
  const limit = 10;

  const tabs = [
    { label: 'Chờ xác nhận', icon: 'time-outline', color: '#FF9800' },
    { label: 'Đang xử lý', icon: 'checkmark-circle-outline', color: '#4CAF50' },
    { label: 'Từ chối', icon: 'close-circle-outline', color: '#F44336' },
    { label: 'Hoàn thành', icon: 'checkmark-done-circle-outline', color: '#2196F3' },
  ];

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

  // fetch data từ backend
  const fetchBookings = async (pageNum = 1, status?: string, search?: string) => {
    setLoading(true);
    try {
      const res = await getBookings({
        page: pageNum,
        limit,
        status: status || "",
        search: search || "",
      });
      setBookings(res.data || []);
      setPage(res.page);
      setTotalPages(res.totalPages);
      
      // Nếu là tab "Hoàn thành", fetch feedback cho từng booking
      if (status === "Hoàn thành" && res.data && res.data.length > 0) {
        fetchFeedbackForBookings(res.data);
      }
    } catch (err) {
      console.error(err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

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

  // fetch khi page, filter hoặc search thay đổi
  useEffect(() => {
    fetchBookings(page, selectedTab || undefined, searchText || undefined);
  }, [page, selectedTab, searchText]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Đang xử lý': return '#4CAF50';
      case 'Chờ xác nhận': return '#FF9800';
      case 'Từ chối': return '#F44336';
      case 'Hoàn thành': return '#2196F3';
      default: return '#9E9E9E';
    }
  };

  const renderBookingCard = (item: any) => {
    if (selectedTab === 'Chờ xác nhận') {
      // Giao diện cho "Chờ xác nhận"
      return (
        <View style={styles.pendingCard}>
          {/* Trạng thái */}
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusBadgeText}>{item.status}</Text>
          </View>

          {/* Header */}
          <View style={styles.pendingHeader}>
            <Ionicons name="warning-outline" size={26} color="#FF9800" />
            <Text style={styles.pendingTitle}>{item.customer}</Text>
          </View>

          {/* Thông tin */}
          <View style={styles.pendingInfo}>
            <Ionicons name="time-outline" size={16} color="#B71C1C" />
            <Text style={styles.pendingText}>Gửi lúc {item.date}</Text>
          </View>

          <View style={styles.pendingInfo}>
            <Ionicons name="location-outline" size={16} color="#B71C1C" />
            <Text style={styles.pendingText}>{item.address}</Text>
          </View>

          <View style={styles.pendingInfo}>
            <Ionicons name="call-outline" size={16} color="#B71C1C" />
            <Text style={styles.pendingText}>{item.phone}</Text>
          </View>

          {/* Hành động */}
          <View style={styles.pendingActions}>
            <StatusMenu
              status={item.status}
              onChange={async (newStatus) => {
                try {
                  const res = await updateBookingStatus(item.id, newStatus);
                  const updatedBooking = res.booking;

                  const mapped = {
                    id: updatedBooking._id,
                    customer: updatedBooking.customerId?.name || "Ẩn danh",
                    date: new Date(updatedBooking.createdAt).toLocaleString("vi-VN"),
                    email: updatedBooking.customerId?.email || "",
                    phone: updatedBooking.customerId?.phone || "",
                    address: updatedBooking.customerId?.address || "",
                    status: updatedBooking.status,
                    image: updatedBooking.customerId?.avatar || "https://randomuser.me/api/portraits/men/85.jpg",
                  };

                  setBookings((prev) =>
                    prev.map((o) => (o.id === item.id ? mapped : o))
                  );
                  if (newStatus === "Hoàn thành") {
                    showFeedback({
                      bookingId: mapped.id,
                      mechanicId: updatedBooking.mechanicId?._id || updatedBooking.mechanicId,
                    });
                    // Navigate đến trang feedback
                    router.push("/mechanic/feedback/feedback");
                  }
                } catch (err) {
                  console.error("Lỗi update status:", err);
                }
              }}
            />

            <TouchableOpacity style={styles.detailPendingButton}>
              <Ionicons name="information-circle-outline" size={18} color="#B71C1C" />
              <Text style={styles.detailPendingText}>Xem chi tiết</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (selectedTab === 'Hoàn thành') {
      // Giao diện đơn giản cho "Hoàn thành" với hiển thị feedback
      const bookingFeedback = feedbackData[item.id] || [];
      const hasFeedback = bookingFeedback.length > 0;
      
      return (
        <View style={styles.card}>
          {/* Trạng thái */}
          <View style={[styles.statusBadge, { backgroundColor: '#2196F3' }]}>
            <Text style={styles.statusBadgeText}>Hoàn thành</Text>
          </View>

          {/* Header */}
          <View style={styles.cardHeader}>
            <View style={styles.avatarCircle}>
              <Ionicons name="person" size={24} color="#B71C1C" />
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.name}>{item.customer}</Text>
              <View style={styles.dateTimeRow}>
                <Ionicons name="calendar-outline" size={14} color="#666" />
                <Text style={styles.dateTime}>{item.date}</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={18} color="#B71C1C" />
            <Text style={styles.infoText}>{item.phone}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={18} color="#B71C1C" />
            <Text style={styles.infoText}>{item.address}</Text>
          </View>

          {/* Feedback Section */}
          {hasFeedback ? (
            <View style={styles.feedbackSection}>
              <View style={styles.feedbackHeader}>
                <Ionicons name="star" size={18} color="#FFD700" />
                <Text style={styles.feedbackTitle}>Đánh giá từ khách hàng</Text>
              </View>
              {bookingFeedback.map((feedback: any, index: number) => (
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
              ))}
            </View>
          ) : (
            <View style={styles.noFeedbackSection}>
              <Ionicons name="chatbubble-outline" size={18} color="#999" />
              <Text style={styles.noFeedbackText}>Chưa có đánh giá</Text>
            </View>
          )}
        </View>
      );
    } else if (selectedTab === 'Từ chối') {
      return (
        <View style={styles.card}>
          <View style={[styles.statusBadge, { backgroundColor: '#F44336' }]}>
            <Text style={styles.statusBadgeText}>Từ chối</Text>
          </View>

          {/* Header */}
          <View style={styles.cardHeader}>
            <View style={styles.avatarCircle}>
              <Ionicons name="person" size={24} color="#B71C1C" />
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.name}>{item.customer}</Text>
              <View style={styles.dateTimeRow}>
                <Ionicons name="calendar-outline" size={14} color="#666" />
                <Text style={styles.dateTime}>{item.date}</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={18} color="#B71C1C" />
            <Text style={styles.infoText}>{item.phone}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={18} color="#B71C1C" />
            <Text style={styles.infoText}>{item.address}</Text>
          </View>
        </View>
      );
    } else {
      // Giao diện cho "Đang xử lý" và các trạng thái khác
      return (
        <View style={styles.card}>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
            <Text style={styles.statusBadgeText}>{item.status}</Text>
          </View>

          {/* Header */}
          <View style={styles.cardHeader}>
            <View style={styles.avatarCircle}>
              <Ionicons name="person" size={24} color="#B71C1C" />
            </View>
            <View style={styles.headerInfo}>
              <Text style={styles.name}>{item.customer}</Text>
              <View style={styles.dateTimeRow}>
                <Ionicons name="calendar-outline" size={14} color="#666" />
                <Text style={styles.dateTime}>{item.date}</Text>
              </View>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Ionicons name="mail-outline" size={18} color="#B71C1C" />
            <Text style={styles.infoText}>{item.email}</Text>
          </View>

          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={18} color="#B71C1C" />
            <Text style={styles.infoText}>{item.address}</Text>
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.callButton}>
              <Ionicons name="call" size={18} color="#fff" />
              <Text style={styles.callText}>Gọi điện</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.messageButton}>
              <Ionicons name="chatbubble-outline" size={18} color="#B71C1C" />
              <Text style={styles.messageText}>Nhắn tin</Text>
            </TouchableOpacity>
            
            <View style={styles.statusMenuContainer}>
              <StatusMenu
                status={item.status}
                onChange={async (newStatus) => {
                  try {
                    const res = await updateBookingStatus(item.id, newStatus);
                    const updatedBooking = res.booking;

                    const mapped = {
                      id: updatedBooking._id,
                      customer: updatedBooking.customerId?.name || "Ẩn danh",
                      date: new Date(updatedBooking.createdAt).toLocaleString("vi-VN"),
                      email: updatedBooking.customerId?.email || "",
                      phone: updatedBooking.customerId?.phone || "",
                      address: updatedBooking.customerId?.address || "",
                      status: updatedBooking.status,
                      image: updatedBooking.customerId?.avatar || "https://randomuser.me/api/portraits/men/85.jpg",
                    };

                    setBookings((prev) =>
                      prev.map((o) => (o.id === item.id ? mapped : o))
                    );
                    if (newStatus === "Hoàn thành") {
                      showFeedback({
                        bookingId: mapped.id,
                        mechanicId: updatedBooking.mechanicId?._id || updatedBooking.mechanicId,
                      });
                      // Navigate đến trang feedback
                      router.push("/mechanic/feedback/feedback");
                    }
                  } catch (err) {
                    console.error("Lỗi update status:", err);
                  }
                }}
              />
            </View>
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Danh sách đơn hàng</Text>
        <TouchableOpacity onPress={toggleSearch}>
          <Ionicons name="search" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* search bar */}
      {searchVisible && (
        <Animated.View style={[styles.searchBox, { opacity: fadeAnim }]}>
          <Ionicons name="search" size={18} color="#555" />
          <TextInput
            style={styles.searchInput}
            placeholder="Tên, SĐT, địa chỉ..."
            value={searchText}
            onChangeText={setSearchText}
            autoFocus
          />
          {searchText !== "" && (
            <TouchableOpacity onPress={() => setSearchText("")}>
              <Ionicons name="close-circle" size={18} color="#999" />
            </TouchableOpacity>
          )}
        </Animated.View>
      )}

      {/* Tabs */}
      <View style={styles.tabWrapper}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.tabContainer}
          contentContainerStyle={styles.tabContentContainer}
        >
          {tabs.map((tab) => {
            const isActive = selectedTab === tab.label;
            return (
              <TouchableOpacity
                key={tab.label}
                style={[
                  styles.tabButton,
                  isActive && styles.tabActive,
                ]}
                onPress={() => setSelectedTab(tab.label)}
              >
                <Text style={[
                  styles.tabText,
                  isActive && styles.tabTextActive,
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Nội dung chính của từng tab */}
      <ScrollView style={styles.scrollContainer}>
        {bookings.length === 0 && !loading ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Không có đơn hàng nào</Text>
          </View>
        ) : (
          bookings
            .filter(item => item.status === selectedTab)
            .map((item, index) => (
              <View key={index}>
                {renderBookingCard(item)}
              </View>
            ))
        )}
      </ScrollView>

      {/* pagination */}
      {bookings.length > 0 && (
        <View style={styles.paginationContainer}>
          <Button
            mode="outlined"
            disabled={page <= 1}
            onPress={() => setPage((p) => Math.max(1, p - 1))}
            style={styles.paginationButton}
          >
            Trước
          </Button>
          <Text style={styles.paginationText}>
            {page} / {totalPages}
          </Text>
          <Button
            mode="outlined"
            disabled={page >= totalPages}
            onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
            style={styles.paginationButton}
          >
            Sau
          </Button>
        </View>
      )}

      <BottomNavigation activeTab="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 10,
  },
  headerTitle: { fontSize: 18, fontWeight: "bold" },
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
  
  // Tab styles
  tabWrapper: {
    backgroundColor: '#fff',
    marginTop: 12,
    marginHorizontal: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  tabContainer: { paddingVertical: 8 },
  tabContentContainer: { paddingHorizontal: 8 },
  tabButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderRadius: 12,
    backgroundColor: '#F8F8F8',
    minWidth: 100,
  },
  tabActive: {
    backgroundColor: '#B71C1C',
    shadowColor: '#B71C1C',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  tabText: { fontSize: 13, color: '#666', fontWeight: '600' },
  tabTextActive: { color: '#fff', fontWeight: 'bold' },
  scrollContainer: { paddingHorizontal: 15, marginTop: 15 },

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
  actionRow: { flexDirection: 'row', marginTop: 15, gap: 8 },
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
  emptyContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center',
    paddingVertical: 50,
  },
  emptyText: { fontSize: 16, color: '#555' },
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
  address: { fontSize: 13, marginTop: 6, fontWeight: "600", color: "#222" },
  statusRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: "#eee",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});