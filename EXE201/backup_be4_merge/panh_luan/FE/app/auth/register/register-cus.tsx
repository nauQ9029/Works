import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { register } from "../../../services/authServices";
import { RegisterData, UserRole } from "../../../types/auth";

export default function CustomerRegister() {
  const router = useRouter();
  const [role] = useState<UserRole>("customer");
  const [form, setForm] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "customer",
    birthday: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // modal feedback state
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // date picker state
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleChange = (field: keyof RegisterData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleDateChange = (_event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formatted = selectedDate.toISOString().split("T")[0]; // YYYY-MM-DD
      setForm((prev) => ({ ...prev, birthday: formatted }));
      setErrors((prev) => ({ ...prev, birthday: "" }));
    }
  };

  const validate = () => {
    let valid = true;
    let newErrors: { [key: string]: string } = {};

    if (!form.name || form.name.length < 3) {
      newErrors.name = "Họ tên phải có ít nhất 3 ký tự!";
      valid = false;
    }
    if (!/^\d{9,}$/.test(form.phone)) {
      newErrors.phone = "Số điện thoại phải có ít nhất 9 chữ số!";
      valid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      newErrors.email = "Email không hợp lệ!";
      valid = false;
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(form.password)) {
      newErrors.password =
        "Mật khẩu ≥ 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt!";
      valid = false;
    }
    if (!form.birthday?.trim()) {
      newErrors.birthday = "Vui lòng chọn ngày sinh!";
      valid = false;
    }

    if (form.password !== confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp!";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleRegister = async () => {
    if (!validate()) return;
    try {
      await register({ ...form, role });

      setIsSuccess(true);
      setFeedbackMessage("Đăng ký thành công!");
      setFeedbackVisible(true);

      setForm({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "customer",
        birthday: "",
      });
      setConfirmPassword("");

      setTimeout(() => {
        setFeedbackVisible(false);
        router.push("/auth/login/login");
      }, 1500);
    } catch (err: any) {
      setIsSuccess(false);
      setFeedbackMessage(err.response?.data?.message || "Đăng ký thất bại!");
      setFeedbackVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ĐĂNG KÝ - KHÁCH HÀNG</Text>

      <TextInput
        placeholder="Họ Và Tên"
        style={styles.input}
        value={form.name}
        onChangeText={(t) => handleChange("name", t)}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <TextInput
        placeholder="Số điện thoại"
        style={styles.input}
        keyboardType="phone-pad"
        value={form.phone}
        onChangeText={(t) => handleChange("phone", t)}
      />
      {errors.phone && <Text style={styles.errorText}>{errors.phone}</Text>}

      {/* Birthday Picker */}
<View>
  <View style={styles.dateRow}>
    <TextInput
      placeholder="Năm-Tháng-Ngày"
      style={[styles.input, { flex: 1 }]}
      value={form.birthday}
      onChangeText={(t) => handleChange("birthday", t)}
    />
    <TouchableOpacity
      style={styles.dateBtn}
      onPress={() => setShowDatePicker(true)}
    >
      <Ionicons name="calendar" size={20} color="#fff" />
    </TouchableOpacity>
  </View>

  {showDatePicker && (
    <DateTimePicker
      value={form.birthday ? new Date(form.birthday) : new Date()}
      mode="date"
      display="calendar"
      onChange={handleDateChange}
      maximumDate={new Date()}
    />
  )}
</View>
      {errors.birthday && (
        <Text style={styles.errorText}>{errors.birthday}</Text>
      )}

      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        value={form.email}
        onChangeText={(t) => handleChange("email", t)}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

      <TextInput
        placeholder="Mật khẩu"
        style={styles.input}
        secureTextEntry
        value={form.password}
        onChangeText={(t) => handleChange("password", t)}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

      <TextInput
        placeholder="Xác nhận mật khẩu"
        style={styles.input}
        secureTextEntry
        value={confirmPassword}
        onChangeText={(t) => setConfirmPassword(t)}
      />
      {errors.confirmPassword && (
        <Text style={styles.errorText}>{errors.confirmPassword}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>ĐĂNG KÝ</Text>
      </TouchableOpacity>

      <Text style={styles.loginText}>
        Đã có tài khoản?{" "}
        <Text
          style={{ color: "gray", textDecorationLine: "underline" }}
          onPress={() => router.replace("/auth/login/login")}
        >
          Đăng nhập ngay
        </Text>
      </Text>

      {/* ==== Feedback modal ==== */}
      <Modal transparent={true} visible={feedbackVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalBox,
              isSuccess ? styles.successBox : styles.errorBox,
            ]}
          >
            <Ionicons
              name={isSuccess ? "checkmark-circle" : "close-circle"}
              size={40}
              color={isSuccess ? "green" : "red"}
              style={{ marginBottom: 10 }}
            />
            <Text style={styles.modalText}>{feedbackMessage}</Text>
            {!isSuccess && (
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={() => setFeedbackVisible(false)}
              >
                <Text style={styles.modalBtnText}>OK</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "gray",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 50,
    padding: 12,
    marginVertical: 8,
  },
  button: {
    backgroundColor: "#A3210F",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  loginText: { textAlign: "center", marginTop: 20 },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: -5,
    marginBottom: 8,
    marginLeft: 10,
  },

  // modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: 280,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
  },
  successBox: { borderColor: "green", borderWidth: 2 },
  errorBox: { borderColor: "red", borderWidth: 2 },
  modalText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  modalBtn: {
    backgroundColor: "#9B1C1C",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  modalBtnText: { color: "#fff", fontWeight: "bold" },
  dateRow: {
  flexDirection: "row",
  alignItems: "center",
},
dateBtn: {
  marginLeft: 8,
  backgroundColor: "#A3210F",
  padding: 12,
  borderRadius: 50,
  alignItems: "center",
  justifyContent: "center",
},

});
