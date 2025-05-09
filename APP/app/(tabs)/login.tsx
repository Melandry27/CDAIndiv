import { useAuth } from "@/context/AuthContext";
import LoginScreen from "../auth/login";
import ProfileScreen from "./profile";

export default function LoginOrProfile() {
  const { isConnected } = useAuth();

  return isConnected ? <ProfileScreen /> : <LoginScreen />;
}
