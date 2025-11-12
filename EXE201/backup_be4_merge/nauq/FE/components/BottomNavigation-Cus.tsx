import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface BottomNavigationProps {
  activeTab?: 'home' | 'chat' | 'spareParts' | 'profile';
}

export default function BottomNavigation({
  activeTab = "home",
}: BottomNavigationProps) {
  const router = useRouter();

  const handleNavigation = (tab: string) => {
    // Prevent navigation if the tab is already active
    if (activeTab === tab) {
      return;
    }

    switch (tab) {
      case "home":
        router.push("/customer/homePage/homePage");
        break;
      case 'chat':
        router.push("/common/chat/chat");
        break;
      case 'spareParts':
        router.push("/customer/sparePartsList/sparePartsList");
        break;
      case "profile":
        router.push("/common/settingProfile/settingProfile");
        break;
    }
  };

  const getIconColor = (tab: string) => {
    return activeTab === tab ? "#B71C1C" : "#666";
  };

  const getNavItemStyle = (tab: string) => {
    return [
      styles.navItem,
      activeTab === tab && styles.activeNavItem
    ];
  };

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={getNavItemStyle('home')}
        onPress={() => handleNavigation('home')}
        activeOpacity={activeTab === 'home' ? 1 : 0.7}
        disabled={activeTab === 'home'}
      >
        <View style={styles.iconContainer}>
          <Ionicons
            name={activeTab === 'home' ? 'home' : 'home-outline'}
            size={28}
            color={getIconColor('home')}
          />
          {activeTab === 'home' && <View style={styles.activeIndicator} />}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={getNavItemStyle('chat')}
        onPress={() => handleNavigation('chat')}
        activeOpacity={activeTab === 'chat' ? 1 : 0.7}
        disabled={activeTab === 'chat'}
      >
        <View style={styles.iconContainer}>
          <Ionicons
            name={activeTab === 'chat' ? 'chatbubble' : 'chatbubble-outline'}
            size={28}
            color={getIconColor('chat')}
          />
          {activeTab === 'chat' && <View style={styles.activeIndicator} />}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={getNavItemStyle('spareParts')}
        onPress={() => handleNavigation('spareParts')}
        activeOpacity={activeTab === 'spareParts' ? 1 : 0.7}
        disabled={activeTab === 'spareParts'}
      >
        <View style={styles.iconContainer}>
          <Ionicons
            name={activeTab === 'spareParts' ? 'document-text' : 'document-text-outline'}
            size={28}
            color={getIconColor('spareParts')}
          />
          {activeTab === 'spareParts' && <View style={styles.activeIndicator} />}
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={getNavItemStyle('profile')}
        onPress={() => handleNavigation('profile')}
        activeOpacity={activeTab === 'profile' ? 1 : 0.7}
        disabled={activeTab === 'profile'}
      >
        <View style={styles.iconContainer}>
          <Ionicons
            name={activeTab === 'profile' ? 'person' : 'person-outline'}
            size={28}
            color={getIconColor('profile')}
          />
          {activeTab === 'profile' && <View style={styles.activeIndicator} />}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {

    height: 80,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
    backgroundColor: 'rgba(183, 28, 28, 0.1)', // Light red background for active tab
    borderRadius: 12,
    marginHorizontal: 4,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -12,
    width: 24,
    height: 3,
    backgroundColor: '#B71C1C',
    borderRadius: 2,
  },
});
