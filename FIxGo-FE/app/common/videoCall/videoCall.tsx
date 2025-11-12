import BottomNavigationCus from "@/components/BottomNavigation-Cus";
import BottomNavigationMec from "@/components/BottomNavigation-Mec";
import { useUser } from "@/contexts/userContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function VideoCallScreen() {
    const router = useRouter();
    const { user } = useUser();
    return (
        <View style={styles.container}>
            {/* Remote video placeholder */}
            <View style={styles.remoteVideo}>
                <Text style={styles.videoText}>Remote Video</Text>
                <Image
                    // source={{ uri: "https://preview.redd.it/xqmyvrvi5ub71.png?auto=webp&s=2a45152168563648616c9a6484faaabb7a7c3ec5" }}
                    style={{ width: "100%", height: "100%" }}
                />
            </View>

            {/* Local video preview */}
            <View style={styles.localVideo}>
                <Text style={styles.videoText}>You</Text>
                <Image
                    // source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1_Sl6tn4nMk1Zd40wSL98Phd4Hbu8ZbkeMdn3_MXzqsurVyau53OX9-EQqydKvOde0OA&usqp=CAU" }}
                    style={{ width: "100%", height: "100%" }}
                />
            </View>

            {/* Controls */}
            <View style={styles.controlsContainer}>
                <TouchableOpacity style={styles.controlButton}>
                    <Ionicons name="mic" size={36} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton}>
                    <Ionicons name="videocam" size={36} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlButton} onPress={() => router.back()}>
                    <Ionicons name="call" size={36} color="red" />
                </TouchableOpacity>
            </View>

            {/* Bottom Navigation */}
            {user?.role === 'mechanic' ? (
                <BottomNavigationMec activeTab="chat" />
            ) : (
                <BottomNavigationCus activeTab="chat" />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
    },
    remoteVideo: {
        width: "100%",
        height: "81%",
        backgroundColor: "#444",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
    },
    localVideo: {
        position: "absolute",
        top: 60,
        right: 20,
        width: 120,
        height: 160,
        backgroundColor: "#777",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
    videoText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        position: "absolute",
        zIndex: 1,
    },
    controlsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 20,
    },
    controlButton: {
        margin: 20,
    },
});
