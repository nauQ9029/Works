import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { LoginResponse, UserRole } from "../types/auth";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  birthday?: string;
  language?: string;
  avatar?: string; 
  rating?: number; 
  token: string;
  role: UserRole;
}

type UserContextType = {
  user: User | null;
  setUser: (loginData: LoginResponse | null) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      const savedUser = await AsyncStorage.getItem("user");
      if (savedUser) {
        setUserState(JSON.parse(savedUser));
      }
    };
    loadUser();
  }, []);

  const setUser = async (loginData: LoginResponse | null) => {
    if (loginData) {
      const newUser: User = {
        id: loginData.id,
        name: loginData.name,
        email: loginData.email,
        phone: loginData.phone,
        birthday: loginData.birthday ?? "",
        language: loginData.language ?? "Việt Nam",
        avatar: loginData.avatar ?? "",
        rating: loginData.rating ?? 0,
        token: loginData.token,
        role: loginData.role,
      };
      setUserState(newUser);
      await AsyncStorage.setItem("user", JSON.stringify(newUser));
    } else {
      setUserState(null);
      await AsyncStorage.removeItem("user");
    }
  };

  const logout = async () => {
    setUserState(null);
    await AsyncStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser phải được dùng trong UserProvider");
  }
  return context;
};
