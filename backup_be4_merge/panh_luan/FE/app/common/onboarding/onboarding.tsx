import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  ImageBackground,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

type Slide = {
  id: string;
  title: string;
  description: string;
  image?: any; // optional, cho trường hợp bạn chưa có ảnh
};

const slides: Slide[] = [
  {
    id: "1",
    title: "Sửa Xe Mọi Nơi",
    description:
      "Dịch vụ sửa xe máy lưu động gần bạn, nhanh chóng, đơn giản chỉ vài thao tác.",
    image: require("../../../assets/images/onboarding1.png"), 
  },
  {
    id: "2",
    title: "Tìm Thợ Gần Bạn",
    description:
      "Tự động định vị thợ sửa xe gần nhất. Không còn lo lắng khi xe hỏng giữa đường!",
    image: require("../../../assets/images/onboarding2.png"),
  },
  {
    id: "3",
    title: "Đặt Lịch Sửa Xe Dễ Dàng",
    description:
      "Chọn dịch vụ, chọn thời gian – thợ đến tận nơi sửa xe cho bạn nhanh chóng.",
    image: require("../../../assets/images/onboarding3.png"),
  },
  {
    id: "4",
    title: "Chất Lượng - Tận Tâm",
    description:
      "Đội ngũ thợ chuyên nghiệp, được đánh giá cao. Bạn chỉ cần nghỉ ngơi, chúng tôi lo phần còn lại.",
    image: require("../../../assets/images/onboarding4.png"),
  },
];

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList<Slide> | null>(null);
  const router = useRouter();

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    } else {
      // khi kết thúc onboarding -> vào tab home
      router.replace("/common/greetings/greetings");
    }
  };

  const renderItem: ListRenderItem<Slide> = ({ item, index }) => {
    const isFirst = index === 0;
    const isLast = index === slides.length - 1;

    const content = (
      <View style={styles.overlay}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>

        {isFirst ? (
          // nút to giữa dành cho slide đầu
          <TouchableOpacity style={styles.bigButton} onPress={handleNext}>
            <Text style={styles.bigButtonText}>Bắt đầu</Text>
          </TouchableOpacity>
        ) : (
          // nút nhỏ bên phải dưới cho các slide sau
          <View style={styles.smallButtonContainer}>
            <TouchableOpacity style={styles.smallButton} onPress={handleNext}>
              <Text style={styles.smallButtonText}>{isLast ? "Bắt đầu" : "Tiếp tục"}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );

    // nếu không có ảnh, hiển thị background màu, còn có ảnh thì dùng ImageBackground
    if (item.image) {
      return (
        <ImageBackground source={item.image} style={styles.image} resizeMode="cover">
          {content}
          {/* dot indicator ở giữa trên cùng nội dung overlay */}
          <View style={styles.dotsContainer}>
            {slides.map((_, i) => (
              <View key={i} style={[styles.dot, currentIndex === i && styles.activeDot]} />
            ))}
          </View>
        </ImageBackground>
      );
    }

    return (
      <View style={[styles.image, { backgroundColor: "#222" }]}>
        {content}
      </View>
    );
  };

  return (
    <FlatList
      ref={flatListRef}
      data={slides}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      onMomentumScrollEnd={(e) => {
        const idx = Math.round(e.nativeEvent.contentOffset.x / width);
        setCurrentIndex(idx);
      }}
      getItemLayout={(_, index) => ({ length: width, offset: width * index, index })}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width,
    height,
    justifyContent: "flex-end",
  },
  overlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 24,
    paddingBottom: 48,
    // phần overlay mờ phía dưới
    backgroundColor: "rgba(0,0,0,0.28)",
    minHeight: 220,
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
    marginBottom: 18,
    lineHeight: 20,
  },

  // nút to slide 1
  bigButton: {
    backgroundColor: "#c0392b",
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: "center",
    marginHorizontal: 40,
  },
  bigButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  // nút nhỏ slide 2..n (ở phải dưới)
  smallButtonContainer: {
    alignItems: "flex-end",
  },
  smallButton: {
    backgroundColor: "#c0392b",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  smallButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  // dots
  dotsContainer: {
    position: "absolute",
    top: 24,
    alignSelf: "center",
    flexDirection: "row",
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.5)",
    marginHorizontal: 4,
  },
  activeDot: {
    width: 10,
    height: 10,
    backgroundColor: "#c0392b",
  },
});
