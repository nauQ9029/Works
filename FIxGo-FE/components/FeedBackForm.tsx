import {
  StyleSheet
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

const FeedbackForm = () => {
  // Component này không cần thiết nữa vì đã có trang riêng biệt
  // Giữ lại để tránh breaking changes
  return null;
};

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

  // Styles không dùng nữa nhưng giữ lại để tránh lỗi
  modalContent: { flex: 1 },
  closeBtn: { 
    alignSelf: 'flex-end',
    marginBottom: 10,
    padding: 5,
  },
  thankYouModalOverlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  thankYouModalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "100%",
    maxWidth: 300,
  },
  messageModal: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 40,
    alignSelf: "center",
    width: "80%",
  },
  errorMessage: { 
    marginBottom: 20, 
    textAlign: "center",
    fontSize: 16,
    color: "#333",
  },
});

export default FeedbackForm;
