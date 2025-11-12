import FeedbackForm from "@/components/FeedBackForm";
import { FeedbackProvider } from "@/contexts/FeedbackContext";
import { MechanicStatusProvider } from "@/contexts/MechanicStatusContext";
import { UserProvider } from "@/contexts/userContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import "react-native-reanimated";
import Onboarding from "./common/onboarding/onboarding";
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const [firstLaunch, setFirstLaunch] = useState<boolean | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  // check first launch
  useEffect(() => {
    const checkLaunchAndLogin = async () => {
      const launchFlag = await AsyncStorage.getItem("alreadyLaunched");
      if (launchFlag == null) {
        await AsyncStorage.setItem("alreadyLaunched", "true");
        setFirstLaunch(true);
      } else {
        setFirstLaunch(false);
      }

      // simulate login flag
      const userToken = await AsyncStorage.getItem("userToken");
      setIsLoggedIn(userToken ? true : false);
    };

    checkLaunchAndLogin();
  }, []);

  if (!loaded || firstLaunch === null || isLoggedIn === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // show onboarding screen on very first launch
  if (firstLaunch) {
    return <Onboarding />

  }

  // normal app screen flow - starts with welcomeScreen
  // App Launch → Onboarding (first time only) → Welcome Screen → Greetings Screen → Auth/Home
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <PaperProvider>
       <UserProvider>
      <MechanicStatusProvider>
 <FeedbackProvider>
        <Stack initialRouteName="common/welcomeScreen/welcomeScreen">

          {/* welcome / auth flow - welcomeScreen now first */}
          <Stack.Screen name="common/welcomeScreen/welcomeScreen" options={{ headerShown: false }} />
          <Stack.Screen name="common/greetings/greetings" options={{ headerShown: false }} />
          <Stack.Screen name="auth/login/login" options={{ headerShown: false }} />
          <Stack.Screen name="auth/register/register-role" options={{ headerShown: false }} />
          <Stack.Screen name="auth/register/register-cus" options={{ headerShown: false }} />
          <Stack.Screen name="auth/register/register-mec" options={{ headerShown: false }} />

          {/* common screens */}
          <Stack.Screen name="common/onboarding/onboarding" options={{ headerShown: false }} />
          <Stack.Screen name="common/chat/chat" options={{ title: 'Chat', headerShown: false }} />
          <Stack.Screen name="common/videoCall/videoCall" options={{ title: 'Video Call', headerShown: false }} />
          <Stack.Screen name="common/settingProfile/settingProfile" options={{ title: "Cài đặt", headerShown: true }} />
          <Stack.Screen name="common/editProfile/editProfile" options={{ title: "Hồ sơ cá nhân", headerShown: true }} />

          {/* customer screens */}
          <Stack.Screen name="customer/homePage/homePage" options={{ title: 'Customer Home', headerShown: false }} />
          <Stack.Screen name="customer/nearbyMechanics/nearbyMechanics" options={{ title: 'Nearby Mechanics', headerShown: false }} />
          <Stack.Screen name="customer/mechanicDetails/mechanicDetails" options={{ title: 'Mechanic Details', headerShown: false }} />
          <Stack.Screen name="customer/chooseLocation/chooseLocation" options={{ title: 'Choose Location', headerShown: false }} />
          <Stack.Screen name="customer/customerFeedback/customerFeedback" options={{ title: 'Customer Feedback', headerShown: false }} />
          <Stack.Screen name="customer/sparePartsList/sparePartsList" options={{ title: 'Spare Parts List', headerShown: false }} />
          <Stack.Screen name="customer/trackingLocation/trackingLocation" options={{ title: 'Tracking Location', headerShown: false }} />
          <Stack.Screen name="customer/feedback/feedback" options={{ title: 'Feedback', headerShown: false }} />
          <Stack.Screen name="customer/bookingManage/bookingManage" options={{ title: 'Đơn hàng và Thanh Toán', headerShown: true }} />
          {/* mechanic screens */}
          <Stack.Screen name="mechanic/homePage/homePage" options={{ title: 'Mechanic Home', headerShown: false }} />
          <Stack.Screen name="mechanic/workingStatus/workingStatus" options={{ title: 'Mechanic Working Status', headerShown: false }} />
          <Stack.Screen name="mechanic/bookRepairList/bookRepairList" options={{ title: 'Mechanic Book Repair List', headerShown: false }} />
          <Stack.Screen name="mechanic/dashboard/dashboard" options={{ title: 'Mechanic Dashboard', headerShown: false }} />
          <Stack.Screen name="mechanic/subscription/subscription" options={{ title: 'Mechanic Subscription', headerShown: false }} />
          <Stack.Screen name="mechanic/schedule/schedule" options={{title:"Lịch hẹn",headerShown:true}}/>
          <Stack.Screen name="mechanic/reviews/reviews" options={{title:"Đánh giá từ khách hàng", headerShown:true}}/>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
         <FeedbackForm />
        </FeedbackProvider>
      </MechanicStatusProvider>
      </UserProvider>
      </PaperProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}