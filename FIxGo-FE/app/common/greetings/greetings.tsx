import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function WelcomeScreen() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Logo */}
            <Image
                source={require("../../../assets/images/logo/fix.png")}
                style={styles.logo}
                resizeMode="contain"
            />

            {/* Title */}
            <Text style={styles.appName}>FIXGO</Text>
            <Text style={styles.title}>Chào mừng đến FixGo</Text>
            <Text style={styles.subtitle}>Sửa nhanh – Giá rẻ – Có mặt liền</Text>

            {/* Buttons */}
            <TouchableOpacity
                style={styles.primaryButton}
                onPress={() => router.push("/auth/register/register-role")}
            >
                <Text style={styles.primaryButtonText}>ĐĂNG KÝ</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.secondaryButton}
                onPress={() => router.push("/auth/login/login")}
            >
                <Text style={styles.secondaryButtonText}>ĐĂNG NHẬP</Text>
            </TouchableOpacity>

            {/* Terms */}
            <Text style={styles.terms}>
                Bằng cách <Text style={{ fontWeight: "bold" }}>Đăng ký</Text> hoặc{" "}
                <Text style={{ fontWeight: "bold" }}>Đăng nhập</Text>, bạn đồng ý với
                các Điều khoản và Điều kiện
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    logo: {
        width: 350,
        height: 350,
    },
    appName: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#a71916",
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 14,
        color: "gray",
        marginBottom: 40,
    },
    primaryButton: {
        backgroundColor: "#a71916",
        paddingVertical: 15,
        borderRadius: 30,
        width: "80%",
        alignItems: "center",
        marginBottom: 15,
    },
    primaryButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    secondaryButton: {
        borderColor: "gray",
        borderWidth: 1,
        paddingVertical: 15,
        borderRadius: 30,
        width: "80%",
        alignItems: "center",
        marginBottom: 30,
    },
    secondaryButtonText: {
        color: "gray",
        fontSize: 16,
        fontWeight: "600",
    },
    terms: {
        fontSize: 12,
        color: "gray",
        textAlign: "center",
        paddingHorizontal: 20,
        lineHeight: 18,
    },
});
