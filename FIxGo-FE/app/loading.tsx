import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Loading() {
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken'); // giả sử bạn lưu token ở đây
        if (token) {
          // đã đăng nhập
          router.replace('/(tabs)/home');
        } else {
          // chưa đăng nhập -> hiện onboarding
          router.replace('/onboarding');
        }
      } catch (err) {
        console.error("Error checking login:", err);
        router.replace('/onboarding'); 
      }
    };

    const timer = setTimeout(() => {
      checkLoginStatus();
    }, 1500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/FixGo_Logo.jpg')}
        style={styles.reactLogo}
      />
      <View style={styles.loadingText}>
        <Text style={styles.loadingTextHead}>Made by</Text>
        <Text style={styles.loadingTextFoot}>FixGo</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  reactLogo: { width: 350, height: 350, alignSelf: 'center', marginTop: 32 },
  loadingText: { position: 'absolute', bottom: 20 },
  loadingTextHead: { fontSize: 20, color: '#646464ff', textAlign: 'center' },
  loadingTextFoot: { fontSize: 24, color: '#333', fontWeight: 'bold', textAlign: 'center' },
});
