import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function RoleScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>BẠN LÀ?</Text>

            <TouchableOpacity style={styles.button} onPress={() => router.push("/auth/register/register-cus")}>
                <Text style={styles.buttonText}>KHÁCH HÀNG</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => router.push("/auth/register/register-mec")}>
                <Text style={styles.buttonText}>THỢ SỬA XE</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
    title: { fontSize: 20, fontWeight: "bold", color: "gray", marginBottom: 40 },
    button: { backgroundColor: "#A3210F", paddingVertical: 15, paddingHorizontal: 40, borderRadius: 50, marginVertical: 10 },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" }
});
