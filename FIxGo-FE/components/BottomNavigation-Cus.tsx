import { useUser } from "@/contexts/userContext";
import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface BottomNavigationProps {
  activeTab?: "home" | "chat" | "spareParts" | "profile";
}

export default function BottomNavigation({
  activeTab = "home",
}: BottomNavigationProps) {
  const router = useRouter();
  const { user } = useUser();
  const pathname = usePathname();

  // Hàm xác định tab active dựa trên route hiện tại
  const getDerivedActiveTab = () => {
    if (pathname.includes("homePage")) return "home";
    if (pathname.includes("chat")) return "chat";
    if (pathname.includes("bookRepairList") || pathname.includes("sparePartsList")) return "spareParts";
    if (pathname.includes("settingProfile")) return "profile";
    return activeTab; // Fallback to prop if no match
  };

  const currentTab = getDerivedActiveTab();

  const handleNavigation = (tab: string) => {
    if (currentTab === tab) return;

    switch (tab) {
      case "home":
        if (user?.role === "mechanic") {
          router.replace("/mechanic/homePage/homePage");
        } else {
          router.replace("/customer/homePage/homePage");
        }
        break;
      case "chat":
        router.push("/common/chat/chat");
        break;
      case "spareParts":
        if (user?.role === "mechanic") {
          router.push("/mechanic/bookRepairList/bookRepairList");
        } else {
          router.push("/customer/sparePartsList/sparePartsList");
        }
        break;
      case "profile":
        router.push("/common/settingProfile/settingProfile");
        break;
    }
  };

  const getIconName = (tab: string) => {
    if (tab === "home") return currentTab === "home" ? "home" : "home-outline";
    if (tab === "chat") return currentTab === "chat" ? "chatbubble" : "chatbubble-outline";
    if (tab === "spareParts") {
      return currentTab === "spareParts"
        ? user?.role === "mechanic"
          ? "construct"
          : "cube"
        : user?.role === "mechanic"
        ? "construct-outline"
        : "cube-outline";
    }
    if (tab === "profile") return currentTab === "profile" ? "person" : "person-outline";
    return "home-outline";
  };

  const getIconColor = (tab: string) => (currentTab === tab ? "#B71C1C" : "#666");

  const getNavItemStyle = (tab: string) => [
    styles.navItem,
    currentTab === tab && styles.activeNavItem,
  ];

  return (
    <View style={styles.bottomNav}>
      {["home", "chat", "spareParts", "profile"].map((tab) => (
        <TouchableOpacity
          key={tab}
          style={getNavItemStyle(tab)}
          onPress={() => handleNavigation(tab)}
          activeOpacity={currentTab === tab ? 1 : 0.7}
          disabled={currentTab === tab}
        >
          <View style={styles.iconContainer}>
            <Ionicons name={getIconName(tab)} size={28} color={getIconColor(tab)} />
            {currentTab === tab && <View style={styles.activeIndicator} />}
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    height: 80,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ddd",
    width: "100%",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    paddingBottom: 6,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  activeNavItem: {
    backgroundColor: "rgba(183, 28, 28, 0.1)",
    borderRadius: 12,
    marginHorizontal: 4,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  activeIndicator: {
    position: "absolute",
    bottom: -12,
    width: 24,
    height: 3,
    backgroundColor: "#B71C1C",
    borderRadius: 2,
  },
});