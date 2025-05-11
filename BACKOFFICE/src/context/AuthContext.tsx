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
    const storedToken = localStorage.getItem("auth_token");
    console.log("Stored token:", storedToken);
    if (storedToken) {
      try {
        const decoded = jwtDecode<DecodedToken>(storedToken);
        console.log("Decoded token:", decoded);
        if (decoded.exp * 1000 > Date.now()) {
          setToken(storedToken);
          setUser(decoded);
        } else {
          localStorage.removeItem("auth_token");
        }
      } catch (err) {
        console.error("Token invalide:", err);
        localStorage.removeItem("auth_token");
      }
    }
  }, []);

  const login = (newToken: string) => {
    try {
      const decoded = jwtDecode<DecodedToken>(newToken);
      localStorage.setItem("auth_token", newToken);
      setToken(newToken);
      setUser(decoded);
    } catch (err) {
      console.error("Erreur décodage token:", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        adminId: user?.adminId || null,
        login,
        logout,
      }}
    >
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
