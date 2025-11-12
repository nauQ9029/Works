import BottomNavigation from "@/components/BottomNavigation-Mec";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import { Card } from "react-native-paper";

import { useRouter } from "expo-router";
import { jobs, metrics, revenueChart, statusPie } from "../../../mockData/mockData";

const screenWidth = Dimensions.get("window").width;

export default function Dashboard() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                {/* HEADER */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={26} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Thống kê</Text>
                    <TouchableOpacity>
                        <Ionicons name="menu" size={28} color="#333" />
                    </TouchableOpacity>
                </View>

                {/* DATE RANGE FILTER */}
                <Card style={styles.card}>
                    <View style={styles.dateRow}>
                        <View style={styles.dateBox}><Text>2024-01-01</Text></View>
                        <View style={styles.dateBox}><Text>2024-12-31</Text></View>
                        <Ionicons name="calendar" size={26} color="red" />
                    </View>
                </Card>

                {/* METRICS */}
                <View style={styles.metricGrid}>
                    <Card style={styles.metricCard}>
                        <View style={styles.metricHeader}>
                            <Ionicons name="checkmark-circle" size={20} color="green" />
                            <Text style={[styles.metricChange, { color: "green" }]}>
                                +{metrics.completedChange}%
                            </Text>
                        </View>
                        <Text style={styles.metricValue}>{metrics.completed}</Text>
                        <Text style={styles.metricLabel}>Đã hoàn thành</Text>
                    </Card>

                    <Card style={styles.metricCard}>
                        <View style={styles.metricHeader}>
                            <Ionicons name="time" size={20} color="#ff9800" />
                            <Text style={[styles.metricChange, { color: "#ff9800" }]}>
                                +{metrics.processingChange}%
                            </Text>
                        </View>
                        <Text style={styles.metricValue}>{metrics.processing}</Text>
                        <Text style={styles.metricLabel}>Đang xử lí</Text>
                    </Card>

                    <Card style={styles.metricCard}>
                        <View style={styles.metricHeader}>
                            <Ionicons name="close-circle" size={20} color="red" />
                            <Text style={[styles.metricChange, { color: "red" }]}>
                                {metrics.canceledChange}%
                            </Text>
                        </View>
                        <Text style={styles.metricValue}>{metrics.canceled}</Text>
                        <Text style={styles.metricLabel}>Đã từ chối</Text>
                    </Card>

                    <Card style={styles.metricCard}>
                        <View style={styles.metricHeader}>
                            <Ionicons name="cash" size={20} color="green" />
                            <Text style={[styles.metricChange, { color: "green" }]}>
                                +{metrics.revenueChange}%
                            </Text>
                        </View>
                        <Text style={styles.metricValue}>VND {metrics.revenue}TR</Text>
                        <Text style={styles.metricLabel}>Doanh thu</Text>
                    </Card>
                </View>


                {/* REVENUE LINE CHART */}
                <Card style={styles.card}>
                    <Text style={styles.cardTitle}>Doanh thu tháng</Text>
                    <LineChart
                        data={revenueChart}
                        width={screenWidth - 60}
                        height={200}
                        chartConfig={{
                            backgroundColor: "#fff",
                            backgroundGradientFrom: "#fff",
                            backgroundGradientTo: "#fff",
                            color: () => "#e53935",
                        }}
                        bezier
                        style={{ marginVertical: 10, borderRadius: 8 }}
                    />
                </Card>

                {/* STATUS PIE CHART */}
                <Card style={styles.card}>
                    <Text style={styles.cardTitle}>Trạng thái</Text>
                    <PieChart
                        data={[
                            { name: "Đã hoàn thành", population: statusPie.completed, color: "#4caf50", legendFontColor: "#333" },
                            { name: "Đang xử lí", population: statusPie.processing, color: "#ff9800", legendFontColor: "#333" },
                            { name: "Đã từ chối", population: statusPie.canceled, color: "#f44336", legendFontColor: "#333" },
                        ]}
                        width={screenWidth - 60}
                        height={200}
                        chartConfig={{ color: () => "#000" }}
                        accessor={"population"}
                        backgroundColor={"transparent"}
                        paddingLeft={"15"}
                        absolute
                    />
                </Card>

                {/* FILTER */}
                <Card style={styles.card}>
                    <Text style={styles.cardTitle}>Lọc</Text>
                    <View style={styles.filterRow}>
                        <Text>Toàn bộ</Text>
                        <MaterialIcons name="filter-list" size={26} color="red" />
                    </View>
                </Card>

                {/* JOB LIST */}
                {jobs.map((job) => (
                    <Card key={job.id} style={styles.jobCard}>
                        <View style={styles.jobHeader}>
                            <Text style={[
                                styles.jobStatus,
                                job.statusType === "done" && styles.done,
                                job.statusType === "process" && styles.process,
                                job.statusType === "cancel" && styles.cancel
                            ]}>
                                {job.statusType === "done" ? "Hoàn thành" :
                                    job.statusType === "process" ? "Đang xử lí" :
                                        "Hủy"}
                            </Text>
                            <Text style={styles.jobTime}>{job.time}</Text>
                        </View>
                        <Text style={styles.jobTitle}>{job.title}</Text>
                        <Text style={styles.jobSub}>{job.car}</Text>
                        <Text style={styles.jobPrice}>
                            {job.price.toLocaleString("vi-VN")} VND
                        </Text>
                        <Text style={styles.jobId}>{job.id}</Text>
                    </Card>
                ))}
            </ScrollView>

            {/* Floating Bottom Navigation */}
            <View style={styles.bottomNav}>
                <BottomNavigation activeTab="home" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#c2bdbdff", paddingTop: 15 },
    header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", margin: 10 },
    headerTitle: { fontSize: 20, fontWeight: "bold" },
    card: { padding: 15, borderRadius: 12, marginVertical: 8, marginHorizontal: 10 },
    cardTitle: { fontSize: 16, fontWeight: "600", marginBottom: 10 },
    dateRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    dateBox: { borderWidth: 1, borderColor: "#ddd", borderRadius: 8, padding: 10, flex: 1, marginHorizontal: 4 },

    metricGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginHorizontal: 10,
    },

    metricCard: {
        width: "48%",
        marginBottom: 12,
        padding: 12,
        borderRadius: 12,
        backgroundColor: "#fff",
        elevation: 2, // shadow for Android
        shadowColor: "#000", // shadow for iOS
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },

    metricHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    metricValue: {
        fontSize: 22,
        fontWeight: "bold",
        marginVertical: 8,
        textAlign: "left",
    },

    metricLabel: {
        fontSize: 13,
        color: "#555",
    },

    metricChange: {
        fontSize: 12,
        fontWeight: "500",
    },

    filterRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
    jobCard: { padding: 15, borderRadius: 12, marginVertical: 6, marginHorizontal: 10 },
    jobHeader: { flexDirection: "row", justifyContent: "space-between" },
    jobStatus: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    done: { backgroundColor: "#c8e6c9", color: "#2e7d32" },
    process: { backgroundColor: "#ffe0b2", color: "#e65100" },
    cancel: { backgroundColor: "#ffcdd2", color: "#b71c1c" },
    jobTime: { fontSize: 12, color: "#777" },
    jobTitle: { fontSize: 16, fontWeight: "bold", marginVertical: 4 },
    jobSub: { fontSize: 14, color: "#555" },
    jobPrice: { fontSize: 15, fontWeight: "bold", color: "green", marginTop: 4 },
    jobId: { fontSize: 12, color: "#888", marginTop: 4 },
    bottomNav: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#fff", elevation: 5 },
});
