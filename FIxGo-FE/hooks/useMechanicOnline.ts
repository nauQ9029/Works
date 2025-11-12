import { updateMechanicLocation, updateOnlineStatus } from "@/services/mechanicServices";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { AppState } from "react-native";

export function useMechanicOnline(userId: string | null, isOnline: boolean) {
  const [location, setLocation] = useState<{ latitude: number; longitude: number }>({
    latitude: 15.9689,
    longitude: 108.2608,
  });

  useEffect(() => {
    if (!userId) return;

    // khi app background/thoát, tự offline
    const subscriptionAppState = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState.match(/inactive|background/)) {
        updateOnlineStatus(userId, false);
      }
    });

    return () => subscriptionAppState.remove();
  }, [userId]);

  useEffect(() => {
    let locSubscription: Location.LocationSubscription;

    if (!isOnline || !userId) return;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Ứng dụng cần quyền truy cập vị trí!");
        return;
      }

      locSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 10,
        },
        async (loc) => {
          const { latitude, longitude } = loc.coords;
          setLocation({ latitude, longitude });

          try {
            await updateMechanicLocation(userId, latitude, longitude);
            console.log("✔ Vị trí gửi lên server:", latitude, longitude);
          } catch (err) {
            console.error("✖ Lỗi gửi vị trí:", err);
          }
        }
      );

      // Cập nhật online status khi bật
      updateOnlineStatus(userId, true);
    })();

    return () => {
      if (locSubscription) locSubscription.remove();
      if (userId) updateOnlineStatus(userId, false); // offline khi unmount
    };
  }, [isOnline, userId]);

  return location;
}
