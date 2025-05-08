import { jwtDecode } from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";

type DecodedToken = {
  id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
  adminId: string;
};

type AuthContextType = {
  adminId: string | null;
  token: string | null;
  user: DecodedToken | null;
  login: (token: string) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("auth_token");
    if (stored) {
      try {
        const decoded = jwtDecode<DecodedToken>(stored);
        if (decoded.exp * 1000 > Date.now()) {
          setToken(stored);
          setUser(decoded);
        } else {
          localStorage.removeItem("auth_token");
        }
      } catch (err) {
        console.error("Invalid token");
        localStorage.removeItem("auth_token");
      }
    }
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem("auth_token", newToken);
    const decoded = jwtDecode<DecodedToken>(newToken);
    setToken(newToken);
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
