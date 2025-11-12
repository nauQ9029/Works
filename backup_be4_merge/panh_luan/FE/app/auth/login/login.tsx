import { useUser } from "@/contexts/userContext";
import { LoginData } from "@/types/auth";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { forgotPassword, login } from "../../../services/authServices";

export default function Login() {
  const router = useRouter();
  const { setUser } = useUser();

  // form state
  const [form, setForm] = useState<LoginData>({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  // forgot password state
  const [modalVisible, setModalVisible] = useState(false);
  const [phone, setPhone] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState<"phone" | "newPassword">("phone");
  const [error, setError] = useState("");

  // modal feedback state
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (field: keyof LoginData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // === Forgot password flow ===
  const handleForgotPassword = () => {
    setStep("phone");
    setPhone("");
    setNewPassword("");
    setError("");
    setModalVisible(true);
  };

  const handleNext = async () => {
    if (step === "phone") {
      if (!phone) {
        setError("Vui lòng nhập số điện thoại");
        return;
      }
      try {
        const data = await forgotPassword.checkPhone(phone);
        if (!data.exists) {
          setError("Số điện thoại chưa đăng ký");
          return;
        }
        setError("");
        setStep("newPassword");
      } catch {
        setError("Có lỗi xảy ra, thử lại sau");
        setModalVisible(false);
      }
    } else if (step === "newPassword") {
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;

      if (!newPassword || !passwordRegex.test(newPassword)) {
        setError(
          "Mật khẩu phải ≥ 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt"
        );
        return;
      }

      try {
        await forgotPassword.resetPassword(phone, newPassword);
        setError("");
        setModalVisible(false);

        setIsSuccess(true);
        setFeedbackMessage("Đổi mật khẩu thành công!");
        setFeedbackVisible(true);
      } catch {
        setError("Đổi mật khẩu thất bại");
      }
    }
  };

const handleLogin = async () => {
  try {
    const res = await login(form);
    if (res.token && res.role) {
      setUser(res);
    } 
    else if (res.user && res.token) {
      setUser({ ...res.user, token: res.token });

    } 
    else {
      throw new Error("Phản hồi không hợp lệ từ server");
    }

    setIsSuccess(true);
    setFeedbackMessage(res.message || "Đăng nhập thành công!");
    setFeedbackVisible(true);

    setTimeout(() => {
      setFeedbackVisible(false);
      const role = res.role || res.user?.role;
      if (role === "mechanic") {
        router.replace("/mechanic/homePage/homePage");
      } else if (role === "garage") {
        router.replace("/(tabs)");
      } else {
        router.replace("/customer/homePage/homePage");
      }
    }, 1500);
  } catch (err: any) {
    setIsSuccess(false);
    setFeedbackMessage(err.response?.data?.message || "Login failed");
    setFeedbackVisible(true);
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.header}>ĐĂNG NHẬP</Text>

      {/* email */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={form.email}
            onChangeText={(v) => handleChange("email", v)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Ionicons name="checkmark" size={20} color="gray" />
        </View>
      </View>

      {/* password */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Mật khẩu</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={form.password}
            secureTextEntry={!showPassword}
            onChangeText={(v) => handleChange("password", v)}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.forgot} onPress={handleForgotPassword}>
        Quên mật khẩu ?
      </Text>

      {/* login button */}
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>ĐĂNG NHẬP</Text>
      </TouchableOpacity>

      {/* divider */}
      <View style={styles.dividerRow}>
        <View style={styles.line} />
        <Text style={styles.or}>hoặc</Text>
        <View style={styles.line} />
      </View>

      {/* google login */}
      <TouchableOpacity style={styles.socialBtn}>
        <Ionicons
          name="logo-google"
          size={20}
          color="red"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.socialText}>ĐĂNG NHẬP VỚI GOOGLE</Text>
      </TouchableOpacity>

      {/* facebook login */}
      <TouchableOpacity style={styles.socialBtn}>
        <Ionicons
          name="logo-facebook"
          size={20}
          color="blue"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.socialText}>ĐĂNG NHẬP VỚI FACEBOOK</Text>
      </TouchableOpacity>

      {/* footer */}
      <Text style={styles.footer}>
        Chưa có tài khoản?{" "}
        <Text
          style={styles.link}
          onPress={() => router.push("/auth/register/register-role")}
        >
          Đăng ký ngay
        </Text>
      </Text>

      {/* ==== Login/Reset feedback modal ==== */}
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

      {/* ==== Forgot password modal ==== */}
    <Modal
  visible={modalVisible}
  transparent
  animationType="slide"
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>
        {step === "phone" ? "Nhập số điện thoại" : "Nhập mật khẩu mới"}
      </Text>

      <TextInput
        style={styles.modalInput}
        placeholder={step === "phone" ? "Số điện thoại" : "Mật khẩu mới"}
        keyboardType={step === "phone" ? "phone-pad" : "default"}
        secureTextEntry={step === "newPassword"}
        value={step === "phone" ? phone : newPassword}
        onChangeText={(text) => {
          if (step === "phone") setPhone(text);
          else setNewPassword(text);
          setError("");
        }}
      />

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <View style={styles.modalButtons}>
        <TouchableOpacity
          style={styles.modalButton}
          onPress={() => setModalVisible(false)}
        >
          <Text style={{ color: "white" }}>Hủy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.modalButton} onPress={handleNext}>
          <Text style={{ color: "white" }}>
            {step === "phone" ? "Tiếp" : "Đổi mật khẩu"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20, justifyContent: "center" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 20, color: "#555" },

  inputContainer: { marginBottom: 15 },
  label: { fontSize: 14, color: "#555", marginBottom: 5 },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 30,
    paddingHorizontal: 15,
  },
  input: { flex: 1, height: 45 },

  forgot: { color: "#999", textAlign: "right", marginBottom: 20 },

  loginBtn: {
    backgroundColor: "#9B1C1C",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 20,
  },
  loginText: { color: "#fff", fontSize: 16, fontWeight: "bold" },

  dividerRow: { flexDirection: "row", alignItems: "center", marginBottom: 20 },
  line: { flex: 1, height: 1, backgroundColor: "#aaa" },
  or: { marginHorizontal: 8, color: "#555" },

  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 30,
    padding: 12,
    marginBottom: 15,
    justifyContent: "center",
  },
  socialText: { color: "#555", fontWeight: "600" },

  footer: { textAlign: "center", marginTop: 20, color: "#555" },
  link: { color: "#9B1C1C", fontWeight: "bold", textDecorationLine: "underline" },

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
  modalText: { fontSize: 16, color: "#333", textAlign: "center", marginBottom: 10 },
  modalBtn: {
    backgroundColor: "#9B1C1C",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  modalBtnText: { color: "#fff", fontWeight: "bold" },
   modalContainer: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 15 },
  modalInput: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 45,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#B22222",
    borderRadius: 10,
    alignItems: "center",
    color:"white"
  },
  errorText: {
  color: "red",
  fontSize: 12,
  marginBottom: 10,
},
});
