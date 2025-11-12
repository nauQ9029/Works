import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();

  // auto navigate to homepage after 3s
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/common/greetings/greetings");
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/images/logo/fixgo.png")} style={styles.logo} resizeMode="contain" />
      <Text style={styles.madeBy}>Made By</Text>
      <Text style={styles.brand}>FIXGO</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 350,
    height: 350,
    marginBottom: 100,
  },
  madeBy: {
    fontFamily: "Montserrat",
    fontSize: 14,
    color: "#777",
    position: "absolute",
    bottom: 90,
    fontWeight: "600",
  },
  brand: {
    fontFamily: "Montserrat",
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    position: "absolute",
    bottom: 70,
  },
});