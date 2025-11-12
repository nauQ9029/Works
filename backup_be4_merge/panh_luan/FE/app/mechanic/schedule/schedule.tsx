import BottomNavigation from "@/components/BottomNavigation";
import { useRouter } from "expo-router";
import React from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Calendar } from "react-native-calendars";

export default function Performance() {
  const router = useRouter();

  const schedule = [
    {
      date: "2025-10-07",
      time: "09:00",
      customerName: "Nguyễn Văn A",
      service: "Thay nhớt",
      status: "upcoming",
    },
    {
      date: "2025-10-07",
      time: "14:00",
      customerName: "Trần Thị B",
      service: "Bảo hành phanh",
      status: "upcoming",
    },
    {
      date: "2025-10-08",
      time: "10:00",
      customerName: "Lê Văn C",
      service: "Sửa điện",
      status: "completed",
    },
  ];


  const markedDates = schedule.reduce((acc, item) => {
    acc[item.date] = {
      marked: true,
      dotColor: "red",
    };
    return acc;
  }, {} as Record<string, any>);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "upcoming":
        return { color: "#27ae60", text: "Sắp tới" };
      case "completed":
        return { color: "#2980b9", text: "Hoàn thành" };
      case "cancelled":
        return { color: "#e74c3c", text: "Đã hủy" };
      default:
        return { color: "#7f8c8d", text: status };
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 80 }}>
        {/* Calendar */}
        <Calendar
          markedDates={markedDates}
          theme={{
            selectedDayBackgroundColor: "#2980b9",
            todayTextColor: "#e74c3c",
            dotColor: "red",
          }}
        />

        {/* Danh sách lịch */}
        {schedule.map((item, idx) => {
          const status = getStatusStyle(item.status);
          return (
            <View key={idx} style={styles.scheduleItem}>
              <View style={{ flex: 1 }}>
                <Text style={styles.date}>
                  {item.date} - {item.time}
                </Text>
                <Text style={styles.customer}>{item.customerName}</Text>
                <Text style={styles.service}>{item.service}</Text>
              </View>
              <Text style={[styles.status, { color: status.color }]}>
                {status.text}
              </Text>
            </View>
          );
        })}
      </ScrollView>

      <BottomNavigation activeTab="profile" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scheduleItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  date: { fontSize: 15, fontWeight: "600", color: "#2c3e50" },
  customer: { fontSize: 14, marginTop: 4, color: "#555" },
  service: { fontSize: 14, marginTop: 2, fontStyle: "italic", color: "#7f8c8d" },
  status: { fontSize: 14, fontWeight: "600" },
});
