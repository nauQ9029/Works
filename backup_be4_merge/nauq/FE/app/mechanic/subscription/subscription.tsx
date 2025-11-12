import BottomNavigation from "@/components/BottomNavigation-Mec";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";


// Mock subscription plans (can be moved to separate file later)
const plans = [
    {
        id: "basic",
        title: "Cơ bản",
        price: "99K",
        per: "/Tháng",
        desc: "dành cho người mới",
        features: [
            "Không giới hạn đơn hàng",
            "Nhận phản hồi & đánh giá từ khách hàng",
            "Quản lý lịch làm việc cá nhân",
            "Quản lý thu nhập hằng ngày/tháng",
        ],
        buttonText: "Gói Cơ Bản",
        highlight: false,
    },
    {
        id: "standard",
        title: "Tiêu chuẩn",
        price: "199K",
        per: "/Tháng",
        desc: "dành cho người có điều kiện",
        features: [
            "Không giới hạn đơn hàng",
            "Ưu tiên hiển thị hồ sơ thợ.",
            "Hỗ trợ thiết kế hồ sơ cá nhân chuyên nghiệp.",
            "Cập nhật báo cáo hiệu suất chi tiết.",
            "Được hỗ trợ giải quyết tranh chấp.",
        ],
        buttonText: "Gói Tiêu Chuẩn",
        highlight: true, // Mark as Most Popular
    },
    {
        id: "premium",
        title: "Cao cấp",
        price: "299K",
        per: "/Tháng",
        desc: "dành cho người giàu",
        features: [
            "Không giới hạn đơn hàng",
            "Giới thiệu khách hàng VIP/doanh nghiệp",
            "Tư vấn thương hiệu cá nhân & phát triển.",
            "Hồ sơ được hiển thị lên trang chủ.",
            "Nhận báo cáo hằng tuần/tháng.",
            "CSKH riêng cho thợ Premium.",
        ],
        buttonText: "Gói Cao Cấp",
        highlight: false,
    },
];

export default function Subscription() {
    const router = useRouter();

    return (
        <View style={{ flex: 1, backgroundColor: "#c2c0c0ff" }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={26} color="#000" />
                    </TouchableOpacity>
                </View>

                <View style={styles.titleBox}>
                    <Ionicons name="trophy" size={32} color="red" />
                    <Text style={styles.title}>Mua gói hội viên</Text>
                    <Text style={styles.subtitle}>Chọn gói phù hợp</Text>
                </View>

                {/* Plans */}
                {plans.map((plan) => (
                    <View
                        key={plan.id}
                        style={[styles.planCard, plan.highlight && styles.highlightedPlan]}
                    >
                        {plan.highlight && (
                            <View style={styles.mostPopularTag}>
                                <Text style={styles.mostPopularText}>Most Popular</Text>
                            </View>
                        )}
                        <Text style={styles.planTitle}>{plan.title}</Text>
                        <View style={styles.planPriceRow}>
                            <Text style={styles.planPrice}>{plan.price}</Text>
                            <Text style={styles.planPer}>{plan.per}</Text>
                        </View>
                        <Text style={styles.planDesc}>{plan.desc}</Text>

                        {plan.features.map((feature, idx) => (
                            <View key={idx} style={styles.featureRow}>
                                <Ionicons name="checkmark" size={16} color="green" />
                                <Text style={styles.featureText}>{feature}</Text>
                            </View>
                        ))}

                        <TouchableOpacity
                            style={[styles.button, plan.highlight && styles.highlightedButton]}
                        >
                            <Text
                                style={[
                                    styles.buttonText,
                                    plan.highlight && { color: "#fff" },
                                ]}
                            >
                                {plan.buttonText}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}

                {/* Free Trial */}
                <View style={styles.freeTrialCard}>
                    <Ionicons name="shield-checkmark" size={22} color="green" />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.freeTrialTitle}>30 ngày miễn phí trải nghiệm</Text>
                        <Text style={styles.freeTrialSubtitle}>Thử miễn phí - Hủy mọi lúc</Text>
                    </View>
                </View>
            </ScrollView>

            {/* Floating Bottom Navigation */}
            <View style={styles.bottomNav}>
                <BottomNavigation activeTab="home" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },

    titleBox: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 16,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 6,
    },
    subtitle: {
        fontSize: 14,
        color: "#666",
        marginTop: 4,
    },
    planCard: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        marginHorizontal: 16,
    },
    highlightedPlan: {
        borderWidth: 2,
        borderColor: "red",
    },
    mostPopularTag: {
        alignSelf: "center",
        backgroundColor: "red",
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        marginBottom: 8,
    },
    mostPopularText: {
        color: "#fff",
        fontSize: 12,
        fontWeight: "bold",
    },
    planTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 6,
    },
    planPriceRow: {
        flexDirection: "row",
        alignItems: "flex-end",
    },
    planPrice: {
        fontSize: 22,
        fontWeight: "bold",
    },
    planPer: {
        fontSize: 14,
        color: "#666",
        marginLeft: 4,
    },
    planDesc: {
        fontSize: 13,
        color: "#666",
        marginVertical: 6,
    },
    featureRow: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 2,
    },
    featureText: {
        fontSize: 13,
        marginLeft: 6,
    },
    button: {
        backgroundColor: "#eee",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 12,
    },
    highlightedButton: {
        backgroundColor: "red",
    },
    buttonText: {
        fontWeight: "bold",
        color: "#000",
    },
    freeTrialCard: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 30,
        marginHorizontal: 16,
    },
    freeTrialTitle: {
        fontWeight: "bold",
        fontSize: 14,
    },
    freeTrialSubtitle: {
        fontSize: 12,
        color: "#666",
    },
    bottomNav: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#fff",
        elevation: 5,
    },
});
