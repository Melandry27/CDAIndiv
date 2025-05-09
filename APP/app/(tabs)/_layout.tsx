import { useAuth } from "@/context/AuthContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  const { isConnected } = useAuth();

  return (
    <Tabs
      key={isConnected ? "user" : "guest"}
      screenOptions={{
        tabBarActiveTintColor: "#256B5E",
        tabBarInactiveTintColor: "#62745B",
        tabBarStyle: {
          backgroundColor: "#F8FBF4",
          borderTopColor: "#E9F0E6",
          height: 60,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Accueil",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="login"
        options={{
          title: isConnected ? "Profil" : "Connexion",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name={isConnected ? "account" : "login"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="signup"
        options={{
          title: "S’inscrire",
          href: isConnected ? null : undefined,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-plus"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
