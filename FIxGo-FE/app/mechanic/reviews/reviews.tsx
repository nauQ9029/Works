import BottomNavigation from "@/components/BottomNavigation-Mec";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function Reviews() {
  const router = useRouter();

  
  const reviews = [
    { id: "1", customer: "Nguyễn Văn A", rating: 5, comment: "Thợ làm nhanh, nhiệt tình!", date: "2025-10-01" },
    { id: "2", customer: "Trần Thị B", rating: 4, comment: "Ổn, nhưng đến hơi trễ.", date: "2025-10-03" },
    { id: "3", customer: "Lê Văn C", rating: 5, comment: "Rất hài lòng, sẽ gọi lại!", date: "2025-10-05" },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
     
      {/* Reviews list */}
      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        renderItem={({ item }) => (
          <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Ionicons name="person-circle" size={32} color="#555" />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.customer}>{item.customer}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
            </View>
            <View style={styles.ratingRow}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Ionicons
                  key={i}
                  name={i < item.rating ? "star" : "star-outline"}
                  size={18}
                  color="#f1c40f"
                />
              ))}
            </View>
            <Text style={styles.comment}>{item.comment}</Text>
          </View>
        )}
      />

      <BottomNavigation activeTab="profile" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  reviewCard: { backgroundColor: "#f9f9f9", padding: 16, borderRadius: 10, marginBottom: 12 },
  reviewHeader: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  customer: { fontSize: 15, fontWeight: "600" },
  date: { fontSize: 12, color: "#777" },
  ratingRow: { flexDirection: "row", marginVertical: 6 },
  comment: { fontSize: 14, color: "#333", lineHeight: 20 },
});
