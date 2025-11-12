import { useUser } from "@/contexts/userContext";
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

const EditProfile = () => {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
           <Image source={{ uri: user?.avatar || "https://via.placeholder.com/150" }} style={styles.avatar} />
            <TouchableOpacity style={styles.editIcon}>
              <Icon name="pencil" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.name}>Xin chào, {user?.name ?? "Người dùng"}</Text>
            <Text style={styles.subtitle}>Chào mừng trở lại</Text>

            {/* mechanic mới có rating */}
            {user?.role === "mechanic" && (
              <View style={styles.ratingRow}>
                <Icon name="star" size={16} color="#FFB300" />
                 <Text style={styles.rating}>{user?.rating ?? 0}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Account Info */}
        <View style={styles.card}>
          <MenuItem icon="mail" label="Email" value={user?.email ?? ""} />
          <MenuItem icon="lock-closed" label="Mật khẩu" value="••••••" />
          <MenuItem icon="call" label="Số điện thoại" value={user?.phone ?? ""} />
        </View>

        {/* Language & Birthday */}
        <View style={styles.card}>
          <MenuItem icon="language" label="Ngôn ngữ" value={user?.language ?? ""} />
        <MenuItem
  icon="calendar"
  label="Ngày sinh"
  value={user?.birthday ? new Date(user.birthday).toLocaleDateString("vi-VN") : ""}
/>

        </View>

        {/* Update Button */}
        <TouchableOpacity
          style={styles.updateButton}
          activeOpacity={0.85}
          onPress={() => console.log("Update profile", user)}
        >
          <Icon
            name="cloud-upload-outline"
            size={20}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.updateButtonText}>Cập nhật thông tin</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const MenuItem = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
  <TouchableOpacity style={styles.menuItem}>
    <View style={styles.menuLeft}>
      <View style={styles.iconWrapper}>
        <Icon name={icon} size={22} color="#fff" />
      </View>
      <View>
        <Text style={styles.menuLabel}>{label}</Text>
        <Text style={styles.menuValue}>{value}</Text>
      </View>
    </View>
    <Icon name="chevron-forward" size={20} color="#bbb" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f6fa" },

  content: { padding: 16 },

  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24, // to make card to ra hơn
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#B71C1C",
    elevation: 5,
  },
  avatarWrapper: {
    position: "relative",
    marginRight: 16,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 16,
  },
  editIcon: {
    position: "absolute",
    bottom: 4,
    right: 4,
    backgroundColor: "#B71C1C",
    borderRadius: 20,
    padding: 6,
    elevation: 4,
  },
  profileInfo: { flex: 1 },
  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#000",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF3E0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    paddingHorizontal: 10,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuLeft: { flexDirection: "row", alignItems: "center", flex: 1 },
  iconWrapper: {
    backgroundColor: "#B71C1C",
    padding: 10,
    borderRadius: 12,
    marginRight: 14,
  },
  menuLabel: { fontSize: 14, color: "#777" },
  menuValue: { fontSize: 16, fontWeight: "600", color: "#000" },

  updateButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#B71C1C",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 24, // nhỏ gọn, vừa đủ chữ + icon
    marginTop: 16,
    alignSelf: "center", // nằm giữa, không full width
    shadowColor: "#B71C1C",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});

export default EditProfile;
