import { useAuth } from "@/context/AuthContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export default function Header({
  onMenuPress,
  onProfilePress,
}: {
  onMenuPress?: () => void;
  onProfilePress?: () => void;
}) {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onMenuPress}>
        <MaterialCommunityIcons name="menu" size={28} color="#1F2128" />
      </TouchableOpacity>

      <Image
        source={require("@/assets/images/CESIZEN.png")}
        accessibilityLabel="Logo CESIZEN"
        style={styles.logo}
      />

      {user && (
        <TouchableOpacity onPress={onProfilePress}>
          <Image
            source={require("../assets/images/avatar-placeholder.jpg")}
            style={styles.avatar}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 48,
    paddingBottom: 16,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F8FBF4",
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 999,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#256B5E",
  },
});
