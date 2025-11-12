import { useRouter } from "expo-router";
import React from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

const slides = [
  {
    key: "one",
    title: "Sửa Xe Mọi Nơi",
    text: "Dịch vụ sửa xe máy lưu động gần bạn nhanh chóng, đáng tin cậy, chỉ vài thao tác.",
    image: require("../../../assets/images/onboarding/ob1.jpg"),
  },
  {
    key: "two",
    title: "Tìm Thợ Gần Bạn",
    text: "Tự động định vị thợ sửa xe gần nhất. Không còn lo lắng khi xe hỏng giữa đường!",
    image: require("../../../assets/images/onboarding/ob2.jpg"),
  },
  {
    key: "three",
    title: "Đặt Lịch Sửa Xe Dễ Dàng",
    text: "Chọn dịch vụ, chọn thời gian – thợ đến tận nơi sửa xe cho bạn nhanh chóng.",
    image: require("../../../assets/images/onboarding/ob3.jpg"),
  },
  {
    key: "four",
    title: "Chất Lượng - Tận Tâm",
    text: "Đội ngũ thợ chuyên nghiệp, được đánh giá cao. Bạn chỉ cần nghỉ ngơi – chúng tôi lo phần còn lại.",
    image: require("../../../assets/images/onboarding/ob4.jpg"),
  },
];

export default function Onboarding({ onFinish }: { onFinish: () => void }) {
  const router = useRouter();

  const renderItem = ({ item, index }: any) => (
    <ImageBackground source={item.image} style={styles.image}>
      <View style={styles.overlay}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.text}</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (index === slides.length - 1) {
              // last slide -> go straight to home page
              onFinish();
              router.replace("/customer/homePage/homePage");
            }
          }}
        >
          <Text style={styles.buttonText}>
            {index === slides.length - 1 ? "Bắt đầu" : "Tiếp tục"}
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      onSlideChange={() => { }} // no-op
      showNextButton={false}
      showDoneButton={false}
      dotStyle={{ backgroundColor: "white" }}
      activeDotStyle={{ backgroundColor: "red" }}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 20,
    borderRadius: 12,
  },
  title: {
    color: "red",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  text: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#a71916",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});