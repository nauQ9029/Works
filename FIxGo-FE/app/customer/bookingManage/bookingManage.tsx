import { Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function BookingManage() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState('Đã xác nhận');

  const tabs = [
    { label: 'Chờ xác nhận', icon: 'time-outline', count: 3, color: '#FF9800' },
    { label: 'Đã xác nhận', icon: 'checkmark-circle-outline', count: 12, color: '#4CAF50' },
    { label: 'Đã hủy', icon: 'close-circle-outline', count: 2, color: '#F44336' },
    { label: 'Đã hoàn thành', icon: 'checkmark-done-circle-outline', count: 45, color: '#2196F3' },
  ];

  const bookings = Array(6).fill({
    name: 'Anh Bùi',
    date: '28/06/2025',
    time: '12:21 AM',
    email: 'anhbui0409@gmail.com',
    address: '26 Lê Trung Đình, Đà Nẵng',
    phone: '0901234567',
    status: 'Đã xác nhận',
    service: 'Thay dầu + Kiểm tra tổng quát',
  });

  const pendingBookings = Array(2).fill({
    name: 'Xe bị hư bánh trước',
    createdAt: '07/10/2025 - 09:30 AM',
    location: 'Ngã 3 Ông Ích Khiêm - Đà Nẵng',
    note: 'Xe tôi bị xì bánh giữa đường, cần hỗ trợ gấp!',
    status: 'Chờ xác nhận',
  });

  const completedBookings = Array(2).fill({
    name: 'Anh Bùi',
    date: '28/06/2025',
    time: '12:21 AM',
    address: '26 Lê Trung Đình, Đà Nẵng',
    service: 'Thay dầu + Kiểm tra tổng quát',
  });

  const cancelBookings = [
  {
    name: 'Anh Trần',
    date: '06/10/2025',
    time: '03:45 PM',
    service: 'Thay bình ắc quy',
    reason: 'Khách bận đột xuất, hủy lịch',
  },
  {
    name: 'Chị Mai',
    date: '02/10/2025',
    time: '09:00 AM',
    service: 'Rửa xe + kiểm tra phanh',
    reason: 'Thời tiết xấu, không thể đến',
  },
];


  const getStatusColor = (status) => {
    switch(status) {
      case 'Đã xác nhận': return '#4CAF50';
      case 'Chờ xác nhận': return '#FF9800';
      case 'Đã hủy': return '#F44336';
      case 'Đã hoàn thành': return '#2196F3';
      default: return '#9E9E9E';
    }
  };

  return (
    <View style={styles.container}>

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
                <View style={[
                  styles.countBadge,
                  { backgroundColor: isActive ? '#fff' : tab.color }
                ]}>
                  <Text style={[
                    styles.countText,
                    { color: isActive ? '#B71C1C' : '#fff' }
                  ]}>
                    {tab.count}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Nội dung chính của từng tab */}
      <ScrollView style={styles.scrollContainer}>
        {selectedTab === 'Chờ xác nhận' ? (
          // Giao diện cho "Chờ xác nhận"
          pendingBookings.map((item, index) => (
            <View key={index} style={styles.pendingCard}>
              {/* Trạng thái */}
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                <Text style={styles.statusBadgeText}>{item.status}</Text>
              </View>

              {/* Header */}
              <View style={styles.pendingHeader}>
                <Ionicons name="warning-outline" size={26} color="#FF9800" />
                <Text style={styles.pendingTitle}>{item.name}</Text>
              </View>

              {/* Thông tin */}
              <View style={styles.pendingInfo}>
                <Ionicons name="time-outline" size={16} color="#B71C1C" />
                <Text style={styles.pendingText}>Gửi lúc {item.createdAt}</Text>
              </View>

              <View style={styles.pendingInfo}>
                <Ionicons name="location-outline" size={16} color="#B71C1C" />
                <Text style={styles.pendingText}>{item.location}</Text>
              </View>

              <View style={styles.pendingInfo}>
                <Ionicons name="document-text-outline" size={16} color="#B71C1C" />
                <Text style={styles.pendingText}>{item.note}</Text>
              </View>

              {/* Hành động */}
              <View style={styles.pendingActions}>
                <TouchableOpacity style={styles.cancelButton}>
                  <Ionicons name="close-circle-outline" size={18} color="#fff" />
                  <Text style={styles.cancelText}>Huỷ đơn</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.detailPendingButton}>
                  <Ionicons name="information-circle-outline" size={18} color="#B71C1C" />
                  <Text style={styles.detailPendingText}>Xem chi tiết</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
) : selectedTab === 'Đã hoàn thành' ? (
  // Giao diện đơn giản cho "Đã hoàn thành"
  completedBookings.map((item, index) => (
    <View key={index} style={styles.card}>
      {/* Trạng thái */}
      <View style={[styles.statusBadge, { backgroundColor: '#2196F3' }]}>
        <Text style={styles.statusBadgeText}>Đã hoàn thành</Text>
      </View>

      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.avatarCircle}>
          <Ionicons name="person" size={24} color="#B71C1C" />
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.dateTimeRow}>
            <Ionicons name="calendar-outline" size={14} color="#666" />
            <Text style={styles.dateTime}>{item.date}</Text>
            <Ionicons name="time-outline" size={14} color="#666" style={{ marginLeft: 8 }} />
            <Text style={styles.dateTime}>{item.time}</Text>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.infoRow}>
        <Ionicons name="construct-outline" size={18} color="#B71C1C" />
        <Text style={styles.infoText}>{item.service}</Text>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="location-outline" size={18} color="#B71C1C" />
        <Text style={styles.infoText}>{item.address}</Text>
      </View>

    </View>
  ))
  ) : selectedTab === 'Đã hủy' ? (
  cancelBookings.map((item, index) => (
    <View key={index} style={styles.card}>
      <View style={[styles.statusBadge, { backgroundColor: '#F44336' }]}>
        <Text style={styles.statusBadgeText}>Đã hủy</Text>
      </View>

      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.avatarCircle}>
          <Ionicons name="person" size={24} color="#B71C1C" />
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.dateTimeRow}>
            <Ionicons name="calendar-outline" size={14} color="#666" />
            <Text style={styles.dateTime}>{item.date}</Text>
            <Ionicons name="time-outline" size={14} color="#666" style={{ marginLeft: 8 }} />
            <Text style={styles.dateTime}>{item.time}</Text>
          </View>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.infoRow}>
        <Ionicons name="construct-outline" size={18} color="#B71C1C" />
        <Text style={styles.infoText}>{item.service}</Text>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="chatbubble-ellipses-outline" size={18} color="#B71C1C" />
        <Text style={styles.infoText}>Lý do: {item.reason}</Text>
      </View>

      <TouchableOpacity style={styles.rebookButton}>
        <Ionicons name="refresh-outline" size={18} color="#fff" />
        <Text style={styles.rebookText}>Đặt lại lịch</Text>
      </TouchableOpacity>
    </View>
  ))

        ) : (
          // Các trạng thái khác (Đã xác nhận, Đã hủy, Đã hoàn thành)
          bookings.map((item, index) => (
            <View key={index} style={styles.card}>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                <Text style={styles.statusBadgeText}>{item.status}</Text>
              </View>

              {/* Header */}
              <View style={styles.cardHeader}>
                <View style={styles.avatarCircle}>
                  <Ionicons name="person" size={24} color="#B71C1C" />
                </View>
                <View style={styles.headerInfo}>
                  <Text style={styles.name}>{item.name}</Text>
                  <View style={styles.dateTimeRow}>
                    <Ionicons name="calendar-outline" size={14} color="#666" />
                    <Text style={styles.dateTime}>{item.date}</Text>
                    <Ionicons name="time-outline" size={14} color="#666" style={{ marginLeft: 8 }} />
                    <Text style={styles.dateTime}>{item.time}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.divider} />

              <View style={styles.infoRow}>
                <Ionicons name="construct-outline" size={18} color="#B71C1C" />
                <Text style={styles.infoText}>{item.service}</Text>
              </View>

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
                
                <TouchableOpacity style={styles.detailButton}>
                  <Ionicons name="information-circle-outline" size={18} color="#666" />
                  <Text style={styles.detailText}>Chi tiết</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

/* ==== STYLES ==== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
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
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginHorizontal: 4,
    borderRadius: 12,
    backgroundColor: '#F8F8F8',
    minWidth: 110,
  },
  tabActive: {
    backgroundColor: '#B71C1C',
    shadowColor: '#B71C1C',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  tabText: { fontSize: 12, color: '#666', fontWeight: '600', marginRight: 6 },
  tabTextActive: { color: '#fff', fontWeight: 'bold' },
  countBadge: {
    minWidth: 20, height: 20, borderRadius: 10,
    justifyContent: 'center', alignItems: 'center',
    paddingHorizontal: 6, marginLeft: 4,
  },
  countText: { fontSize: 10, fontWeight: 'bold' },
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
  detailButton: {
    flex: 1, flexDirection: 'row', backgroundColor: '#F5F5F5',
    paddingVertical: 12, borderRadius: 12, alignItems: 'center', justifyContent: 'center',
  },
  detailText: { color: '#666', fontWeight: 'bold', fontSize: 13, marginLeft: 6 },

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
  cancelButton: {
    flex: 1, flexDirection: 'row', backgroundColor: '#B71C1C',
    paddingVertical: 12, borderRadius: 10, alignItems: 'center', justifyContent: 'center',
  },
  cancelText: { color: '#fff', fontWeight: 'bold', marginLeft: 6, fontSize: 13 },
  detailPendingButton: {
    flex: 1, flexDirection: 'row', backgroundColor: '#FFF0F0',
    paddingVertical: 12, borderRadius: 10, alignItems: 'center', justifyContent: 'center',
  },
  detailPendingText: { color: '#B71C1C', fontWeight: 'bold', marginLeft: 6, fontSize: 13 },
 
  /* Card đơn giản cho "Đã hoàn thành" */
  reviewButton: {
    marginTop: 12,
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  reviewText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },

// đã hủy
  cancelledCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#F44336',
  },
  rebookButton: {
    marginTop: 12,
    backgroundColor: '#B71C1C',
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  rebookText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },

});
