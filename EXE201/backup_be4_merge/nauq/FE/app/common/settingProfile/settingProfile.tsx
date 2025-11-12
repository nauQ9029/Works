// settingProfile.tsx
import BottomNavigationCus from "@/components/BottomNavigation-Cus";
import BottomNavigationMec from "@/components/BottomNavigation-Mec";
import { useUser } from "@/contexts/userContext";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const SettingProfile = () => {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Avatar + Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatar}>
              {user?.avatar ? (
                <Image
                  source={{ uri: user.avatar }}
                  style={{ width: 110, height: 110, borderRadius: 55 }}
                />
              ) : (
                <Icon name="person" size={60} color="#777" />
              )}
            </View>
            <TouchableOpacity style={styles.editIcon}>
              <Icon name="pencil" size={14} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.infoWrapper}>
            <Text style={styles.profileName}>{user?.name || "Chưa có tên"}</Text>
            <Text style={styles.profileRole}>{user?.role || "Chưa có vai trò"}</Text>
          </View>
        </View>

        {/* Tổng quan */}
        <Text style={styles.sectionTitle}>TỔNG QUAN</Text>
        <View style={styles.card}>
          <MenuItem
            icon="person-outline"
            label="Tài khoản"
            onPress={() => router.push("/common/editProfile/editProfile")}
          />
          <MenuItem icon="notifications-outline" label="Thông báo" />
          <MenuItem icon="cart-outline" label="Đơn hàng và Thanh toán" />
          <MenuItem icon="log-out-outline" label="Đăng xuất" danger />
          <MenuItem icon="trash-outline" label="Xóa tài khoản" danger />
        </View>

        {/* Phản hồi */}
        <Text style={styles.sectionTitle}>PHẢN HỒI</Text>
        <View style={styles.card}>
          <MenuItem icon="alert-circle-outline" label="Báo cáo lỗi" />
          <MenuItem icon="paper-plane-outline" label="Gửi phản hồi" />
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      {user?.role === 'mechanic' ? (
        <BottomNavigationMec activeTab="profile" />
      ) : (
        <BottomNavigationCus activeTab="profile" />
      )}
    </View>
  );
};

const MenuItem = ({
  icon,
  label,
  danger,
  onPress,
}: {
  icon: string;
  label: string;
  danger?: boolean;
  onPress?: () => void;
}) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuLeft}>
      <Icon
        name={icon}
        size={22}
        color={danger ? "#d9534f" : "#333"}
        style={{ width: 28 }}
      />
      <Text
        style={[
          styles.menuLabel,
          danger && { color: "#d9534f", fontWeight: "600" },
        ]}
      >
        {label}
      </Text>
    </View>
    <Icon name="chevron-forward" size={20} color="#bbb" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f6fa" },
  content: { padding: 20 },

  // Avatar + Info
  profileSection: {
    alignItems: "center",
    marginBottom: 28,
  },
  avatarWrapper: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#B71C1C",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
  },
  editIcon: {
    position: "absolute",
    right: 6,
    bottom: 6,
    backgroundColor: "#B71C1C",
    borderRadius: 16,
    padding: 6,
    elevation: 4,
  },
  infoWrapper: {
    marginTop: 14,
    alignItems: "center",
  },
  profileName: { fontSize: 22, fontWeight: "700", color: "#222", letterSpacing: 0.5 },
  profileRole: { fontSize: 15, color: "#B71C1C", marginTop: 4, fontWeight: "500" },

  // Sections
  sectionTitle: { fontSize: 14, color: "#555", fontWeight: "600", marginTop: 20, marginBottom: 10 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },

  menuItem: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#f0f0f0" },
  menuLeft: { flexDirection: "row", alignItems: "center" },
  menuLabel: { color: "#333", fontSize: 16 },

  bottomNav: { flexDirection: "row", justifyContent: "space-around", borderTopWidth: 0.5, borderTopColor: "#ddd", paddingVertical: 10, backgroundColor: "#fff" },
  navItem: { alignItems: "center" },
});

export default SettingProfile;
