import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

type DecodedUser = {
  userId: string;
  email: string;
  name: string;
  exp: number;
};

type AuthContextType = {
  isConnected: boolean;
  user: DecodedUser | null;
  token: string | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<DecodedUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const loadToken = async () => {
      const stored = await AsyncStorage.getItem("auth_token");
      if (stored) {
        try {
          const decoded = jwtDecode<DecodedUser>(stored);
          if (decoded.exp * 1000 > Date.now()) {
            setToken(stored);
            setUser(decoded);
          } else {
            await AsyncStorage.removeItem("auth_token");
          }
        } catch {
          await AsyncStorage.removeItem("auth_token");
        }
      }
    };
    loadToken();
  }, []);

  const login = async (newToken: string) => {
    await AsyncStorage.setItem("auth_token", newToken);
    const decoded = jwtDecode<DecodedUser>(newToken);
    setToken(newToken);
    setUser(decoded);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("auth_token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, isConnected: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext must be used inside AuthProvider");
  return context;
};
