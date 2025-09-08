import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function CustomDrawerContent(props: any) {
  const router = useRouter();

  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: "#000" }}>
      {/* Touchable Profile Section */}
      <Pressable
        onPress={() => router.push("/profile")}
        android_ripple={{ color: "#333" }} // Lighter ripple for dark UI
        style={({ pressed }) => [
          styles.profileContainer,
          pressed && Platform.OS === "ios" && { backgroundColor: "#1a1a1a" }, // iOS fallback
        ]}
      >
        <Image
          source={require("../assets/images/pfps/pfp1.jpg")}
          style={styles.avatar}
        />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.profileName}>Kidphima</Text>
          <Text style={styles.profileLink}>View Profile</Text>
        </View>
      </Pressable>

      {/* Drawer Links */}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomColor: "#333",
    borderBottomWidth: 1,
    marginBottom: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 999,
  },
  profileName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  profileLink: {
    color: "#aaa",
    fontSize: 14,
  },
});
