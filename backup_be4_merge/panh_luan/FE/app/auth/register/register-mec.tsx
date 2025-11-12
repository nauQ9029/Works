import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { register } from "../../../services/authServices";
import { RegisterData } from "../../../types/auth";
const ALL_SKILLS = [
  "Vá xe",
  "Thay nhớt",
  "Cứu hộ",
  "Sửa xe số",
  "Sửa xe ga",
  "Rửa xe",
];

export const validateMechanicForm = (
  form: RegisterData,
  confirmPassword: string
): { errors: Record<string, string>; hasError: boolean } => {
  const errors: Record<string, string> = {};

  if (!form.name?.trim()) errors.name = "Vui lòng nhập họ tên";
  else if (form.name.trim().length < 3) errors.name = "Tên phải từ 3 ký tự";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email?.trim()) errors.email = "Vui lòng nhập email";
  else if (!emailRegex.test(form.email)) errors.email = "Email không hợp lệ";

  if (!form.phone?.trim()) errors.phone = "Vui lòng nhập số điện thoại";
  else if (!/^\d{9,}$/.test(form.phone)) errors.phone = "Số điện thoại phải từ 9 số";

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!form.password?.trim()) errors.password = "Vui lòng nhập mật khẩu";
  else if (!passwordRegex.test(form.password))
    errors.password =
      "Mật khẩu ≥ 8 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt";

  if (form.password !== confirmPassword)
    errors.confirmPassword = "Mật khẩu xác nhận không khớp";

if (!form.address?.trim()) {
  errors.address = "Vui lòng nhập địa chỉ";
} else if (form.address.trim().length < 5) {
  errors.address = "Địa chỉ quá ngắn";
} else if (!/\d+/.test(form.address)) {
  errors.address = "Địa chỉ cần có số nhà hoặc số đường";
}
if (!form.birthday?.trim()) {
  errors.birthday = "Vui lòng nhập ngày sinh";
} else if (!/^\d{4}-\d{2}-\d{2}$/.test(form.birthday)) {
  errors.birthday = "Ngày sinh không hợp lệ (YYYY-MM-DD)";
}


if (!form.experience?.trim()) {
  errors.experience = "Vui lòng nhập kinh nghiệm";
} else {

  const expNumber = parseInt(form.experience.match(/\d+/)?.[0] || "");
  if (isNaN(expNumber) || expNumber < 0) {
    errors.experience = "Kinh nghiệm phải là số năm hợp lệ";
  }
}

  if (!form.workingHours?.trim()) errors.workingHours = "Vui lòng nhập giờ làm việc";
  if (!form.skills || form.skills.length === 0)
    errors.skills = "Vui lòng chọn ít nhất một dịch vụ";

  const hasError = Object.values(errors).some((msg) => msg);
  return { errors, hasError };
};

export default function RegisterMechanicScreen() {
  const [form, setForm] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "mechanic",
    address: "",
    experience: "",
    skills: [],
    workingHours: "",
    birthday: "", 
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();
const [showDatePicker, setShowDatePicker] = useState(false);
  const handleChange = (field: keyof RegisterData, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSkill = (skill: string) => {
    const skills = form.skills || [];
    const updatedSkills = skills.includes(skill)
      ? skills.filter((s) => s !== skill)
      : [...skills, skill];
    handleChange("skills", updatedSkills as any);
  };
  const handleDateChange = (_event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formatted = selectedDate.toISOString().split("T")[0]; // YYYY-MM-DD
      setForm((prev) => ({ ...prev, birthday: formatted }));
      setErrors((prev) => ({ ...prev, birthday: "" }));
    }
  };
  const handleRegister = async () => {
    const { errors: newErrors, hasError } = validateMechanicForm(form, confirmPassword);
    setErrors(newErrors);

    if (hasError) {
      Alert.alert("Error", "Vui lòng kiểm tra lại thông tin");
      return;
    }

    try {
      await register(form);
      Alert.alert("Success", "Đăng ký thành công!");
      router.push("/auth/login/login");
    } catch (err: any) {
      console.log("❌ Registration error:", err.response?.data || err.message);
      Alert.alert("Error", err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>ĐĂNG KÝ - THỢ SỬA XE</Text>

        {/* Name */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Họ và tên"
            value={form.name}
            onChangeText={(v) => handleChange("name", v)}
          />
        </View>
        {errors.name && <Text style={styles.error}>{errors.name}</Text>}

        {/* Phone */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            keyboardType="phone-pad"
            value={form.phone}
            onChangeText={(v) => handleChange("phone", v)}
          />
        </View>
        {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

        {/* Email */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={form.email}
            onChangeText={(v) => handleChange("email", v)}
          />
        </View>
        {errors.email && <Text style={styles.error}>{errors.email}</Text>}
{/* Birthday */}
<View style={styles.inputWrapper}>
  <TextInput
    placeholder="Năm-Tháng-Ngày (YYYY-MM-DD)"
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

{errors.birthday && <Text style={styles.error}>{errors.birthday}</Text>}

        {/* Address */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Địa chỉ (VD: 123 Đường Lê Lợi, Q1, TP HCM)"
            value={form.address}
            onChangeText={(v) => handleChange("address", v)}
          />
        </View>
        {errors.address && <Text style={styles.error}>{errors.address}</Text>}

        {/* Experience */}
        <View style={styles.inputWrapper}>
<TextInput
  style={styles.input}
  placeholder="Kinh nghiệm (số năm)"
  keyboardType="numeric"
  value={form.experience}
  onChangeText={(v) => handleChange("experience", v)}
/>

        </View>
        {errors.experience && <Text style={styles.error}>{errors.experience}</Text>}

        {/* Skills */}
        <Text style={styles.label}>Dịch vụ cung cấp:</Text>
        <View style={styles.skillsContainer}>
          {ALL_SKILLS.map((skill) => (
            <TouchableOpacity
              key={skill}
              style={[
                styles.skillButton,
                (form.skills || []).includes(skill) && styles.skillButtonSelected,
              ]}
              onPress={() => toggleSkill(skill)}
            >
              <Text
                style={[
                  styles.skillText,
                  (form.skills || []).includes(skill) && styles.skillTextSelected,
                ]}
              >
                {skill}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {errors.skills && <Text style={styles.error}>{errors.skills}</Text>}

        {/* Working Hours */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Giờ làm việc (VD: 08:00 - 20:00)"
            value={form.workingHours}
            onChangeText={(v) => handleChange("workingHours", v)}
          />
        </View>
        {errors.workingHours && <Text style={styles.error}>{errors.workingHours}</Text>}

        {/* Password */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            secureTextEntry={!showPassword}
            value={form.password}
            onChangeText={(v) => handleChange("password", v)}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="gray" />
          </TouchableOpacity>
        </View>
        {errors.password && <Text style={styles.error}>{errors.password}</Text>}

        {/* Confirm Password */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Xác nhận mật khẩu"
            secureTextEntry={!showPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
        {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}

        {/* Register Button */}
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>ĐĂNG KÝ</Text>
        </TouchableOpacity>

        <Text style={styles.switchText}>
          Đã có tài khoản?{" "}
          <Text style={styles.link} onPress={() => router.push("/auth/login/login")}>
            Đăng nhập ngay
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  label: { fontSize: 14, fontWeight: "bold", marginBottom: 8 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  input: { flex: 1, height: 45 },
  error: { color: "red", fontSize: 12, marginBottom: 10, marginLeft: 5 },
  button: {
    backgroundColor: "#B22222",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  switchText: { textAlign: "center", marginTop: 15 },
  link: { color: "gray", textDecorationLine: "underline" },
  skillsContainer: { flexDirection: "row", flexWrap: "wrap", marginBottom: 15 },
  skillButton: { borderWidth: 1, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6, margin: 5 },
  skillButtonSelected: { backgroundColor: "#B22222", borderColor: "#B22222" },
  skillText: { color: "#333" },
  skillTextSelected: { color: "#fff", fontWeight: "bold" },
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