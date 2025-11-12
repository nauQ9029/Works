import BottomNavigationCus from "@/components/BottomNavigation-Cus";
import BottomNavigationMec from "@/components/BottomNavigation-Mec";
import { useUser } from "@/contexts/userContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ChatScreen() {
    const router = useRouter();
    const { user } = useUser();

    const [messages, setMessages] = useState([
        { id: "1", text: "Bạn có nhìn thấy xe của tôi không?", from: "other" },
        { id: "2", text: "Vâng, động cơ xe của bạn có vấn đề gì vậy?", from: "me" },
        { id: "3", text: "Có một số vấn đề nhưng tôi không biết...", from: "other" },
        { id: "4", text: "Được thôi, bạn có thể gửi hình ảnh động cơ không?", from: "me" },
        { id: "5", image: "https://img.autotrader.co.za/30839786", from: "other" },
    ]);
    const [input, setInput] = useState("");

    const sendMessage = () => {
        if (!input.trim()) return;
        setMessages([...messages, { id: Date.now().toString(), text: input, from: "me" }]);
        setInput("");
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={26} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Bùi Lê Việt Anh</Text>
                <TouchableOpacity onPress={() => router.push('/common/videoCall/videoCall')}>
                    <Ionicons name="call" size={24} color="#000" />
                </TouchableOpacity>
            </View>

            {/* Messages */}
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View
                        style={[
                            styles.messageContainer,
                            item.from === "me" ? styles.myMessage : styles.otherMessage
                        ]}
                    >
                        {item.text && (
                            <Text style={item.from === "me" ? styles.myMessageText : styles.otherMessageText}>
                                {item.text}
                            </Text>
                        )}
                        {item.image && (
                            <Image source={{ uri: item.image }} style={styles.messageImage} />
                        )}
                    </View>
                )}
            />

            {/* Input */}
            <View style={styles.inputContainer}>
                <TextInput
                    value={input}
                    onChangeText={setInput}
                    placeholder="Tin nhắn"
                    style={styles.textInput}
                />
                <TouchableOpacity onPress={sendMessage}>
                    <Ionicons name="send" size={24} color="gray" />
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
        paddingTop: 30
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
    messageContainer: {
        padding: 10,
        borderRadius: 10,
        margin: 6,
        maxWidth: "70%",
    },
    myMessage: {
        alignSelf: "flex-end",
        backgroundColor: "black",
    },
    otherMessage: {
        alignSelf: "flex-start",
        backgroundColor: "white",
    },
    myMessageText: {
        color: "white",
    },
    otherMessageText: {
        color: "black",
    },
    messageImage: {
        width: 150,
        height: 250,
        borderRadius: 8,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
        backgroundColor: "white",
    },
    textInput: {
        flex: 1,
        padding: 10,
    },
});