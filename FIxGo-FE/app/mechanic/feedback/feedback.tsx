import { useFeedback } from "@/contexts/FeedbackContext";
import { sendFeedback } from "@/services/bookingServices";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

// Negative & positive review options
const negativeOptions = [
    "THÁI ĐỘ KHÔNG THÂN THIỆN",
    "BÁO GIÁ GIAN DỐI",
    "CHUẨN ĐOÁN SAI LỖI",
    "PHỤ THU KHÔNG RÕ LÝ DO",
    "SỬA KHÔNG TRIỆT ĐỂ",
    "ĐẾN TRỄ SO VỚI HẸN",
    "THỜI GIAN SỬA QUÁ LÂU",
    "VẤN ĐỀ AN TOÀN",
];

const positiveOptions = [
    "THÁI ĐỘ CHUYÊN NGHIỆP",
    "ĐẦY ĐỦ DỤNG CỤ",
    "THÂN THIỆN, NHIỆT TÌNH",
    "RÕ RÀNG, MINH BẠCH",
    "KHÔNG PHÁT SINH CHI PHÍ",
    "ĐẾN NHANH, ĐÚNG GIỜ",
    "SẠCH SẼ",
    "NHANH CHÓNG",
];

export default function FeedbackScreen() {
  const { bookingId, mechanicId, hideFeedback } = useFeedback();
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(1); // Default 1 star như feedback.tsx
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [showThankYouPage, setShowThankYouPage] = useState(false);
  const router = useRouter();

  // Nếu không có bookingId, redirect về trang trước
  useEffect(() => {
    if (!bookingId) {
      router.back();
    }
  }, [bookingId]);

  const handleSelectTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const reviewOptions = rating < 3 ? negativeOptions : positiveOptions;

  const handleSubmit = async () => {
    if (!bookingId) return;
    setLoading(true);
    try {
      // Gửi feedback với tags được chọn
      const feedbackWithTags = selectedTags.length > 0 
        ? `${feedbackText}\n\nTags: ${selectedTags.join(', ')}`
        : feedbackText;
        
      await sendFeedback(bookingId, feedbackWithTags, rating);
      setFeedbackText("");
      setRating(1);
      setSelectedTags([]);
      
      setShowThankYouPage(true);
    } catch (err: any) {
      console.error("Lỗi gửi feedback:", err);
      // Có thể hiển thị thông báo lỗi ở đây nếu cần
    } finally {
      setLoading(false);
    }
  };

  const handleCloseThankYou = () => {
    setShowThankYouPage(false);
    hideFeedback();
    // Quay về trang danh sách đơn hàng
    router.push("/mechanic/bookRepairList/bookRepairList");
  };

  const handleBack = () => {
    hideFeedback();
    router.back();
  };

  // Hiển thị trang cảm ơn
  if (showThankYouPage) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.thankYouContainer}>
          <Ionicons name="checkmark-circle" size={64} color="#4CAF50" style={styles.successIcon} />
          <Text style={styles.modalTitle}>Cảm ơn bạn!</Text>
          <Text style={styles.modalMessage}>
            Cảm ơn bạn đã đánh giá dịch vụ của chúng tôi. Hẹn gặp lại bạn lần sau!
          </Text>
          <TouchableOpacity style={styles.modalButton} onPress={handleCloseThankYou}>
            <Text style={styles.modalButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Trang feedback chính
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Back button */}
        <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
          <Ionicons name="arrow-back" size={26} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Đơn sửa đã hoàn thành.</Text>
        <Text style={styles.subtitle}>Bạn đánh giá trải nghiệm dịch vụ như thế nào?</Text>

        {/* Star rating */}
        <View style={styles.starsRow}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => setRating(star)}>
              <Ionicons
                name={star <= rating ? "star" : "star-outline"}
                size={36}
                color="#FFA500"
              />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>
          {rating < 3 ? "Điều mà bạn chưa hài lòng ở thợ sửa xe?" : "Bạn hài lòng về điều gì ở thợ sửa xe?"}
        </Text>

        {/* Tag options */}
        <View style={styles.tagsContainer}>
          {reviewOptions.map((tag) => (
            <TouchableOpacity
              key={tag}
              style={[
                styles.tag,
                selectedTags.includes(tag) && styles.tagSelected,
              ]}
              onPress={() => handleSelectTag(tag)}
            >
              <Text
                style={[
                  styles.tagText,
                  selectedTags.includes(tag) && styles.tagTextSelected,
                ]}
              >
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Extra feedback */}
        <TextInput
          placeholder="Hãy cho chúng tôi biết thêm..."
          style={styles.textArea}
          value={feedbackText}
          onChangeText={setFeedbackText}
          multiline
          placeholderTextColor="#999"
        />

        {/* Submit */}
        <TouchableOpacity 
          style={[styles.submitBtn, loading && styles.submitBtnDisabled]} 
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitText}>
            {loading ? "Đang gửi..." : "Gửi Đánh Giá"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#979595ff",
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  backBtn: { 
    marginBottom: 10,
    alignSelf: 'flex-start',
    padding: 5,
  },
  title: { 
    fontSize: 20, 
    fontWeight: "bold", 
    color: "#fff", 
    marginBottom: 6 
  },
  subtitle: { 
    fontSize: 14, 
    color: "#fff", 
    marginBottom: 20 
  },
  starsRow: { 
    flexDirection: "row", 
    marginBottom: 20 
  },
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: "600", 
    color: "#fff", 
    marginBottom: 12 
  },
  tagsContainer: { 
    flexDirection: "row", 
    flexWrap: "wrap", 
    marginBottom: 20 
  },
  tag: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 4,
    backgroundColor: "#eee",
  },
  tagSelected: {
    backgroundColor: "#e6f0ff",
    borderColor: "#D32F2F",
  },
  tagText: { 
    fontSize: 13, 
    fontWeight: "900", 
    color: "#333" 
  },
  tagTextSelected: { 
    color: "#D32F2F", 
    fontWeight: "600" 
  },
  textArea: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    height: 100,
    textAlignVertical: "top",
    marginBottom: 20,
  },
  submitBtn: {
    backgroundColor: "#D32F2F",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  submitBtnDisabled: {
    backgroundColor: "#999",
  },
  submitText: { 
    color: "white", 
    fontSize: 16, 
    fontWeight: "600" 
  },

  // Thank You Page styles
  thankYouContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  successIcon: {
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 15,
    textAlign: "center",
  },
  modalMessage: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 24,
  },
  modalButton: {
    backgroundColor: "#D32F2F",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    minWidth: 100,
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});