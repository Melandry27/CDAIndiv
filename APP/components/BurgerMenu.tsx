import { useAuth } from "@/context/AuthContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  side?: "left" | "right";
};

export default function BurgerMenu({
  visible,
  onClose,
  side = "right",
}: Props) {
  const { logout } = useAuth();
  const router = useRouter();

  return (
    <Modal animationType="slide" transparent visible={visible}>
      <View style={styles.overlay}>
        {side === "right" && (
          <TouchableOpacity style={styles.backdrop} onPress={onClose} />
        )}

        <View
          style={[styles.menu, side === "right" ? { right: 0 } : { left: 0 }]}
        >
          <SafeAreaView>
            <Text style={styles.title}>Menu</Text>

            <MenuItem
              icon="home-outline"
              label="Accueil"
              onPress={() => {
                router.replace("/");
                onClose();
              }}
            />
            <MenuItem
              icon="heart-outline"
              label="Favoris"
              onPress={() => {
                router.push("/favorites");
                onClose();
              }}
            />
            <MenuItem
              icon="account-outline"
              label="Mon profil"
              onPress={() => console.log("Profil")}
            />
            <MenuItem
              icon="cog-outline"
              label="Paramètres"
              onPress={() => console.log("Paramètres")}
            />
            <MenuItem
              icon="logout"
              label="Déconnexion"
              onPress={() => logout()}
            />
          </SafeAreaView>
        </View>

        {side === "left" && (
          <TouchableOpacity style={styles.backdrop} onPress={onClose} />
        )}
      </View>
    </Modal>
  );
}

function MenuItem({
  icon,
  label,
  onPress,
}: {
  icon: string;
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <MaterialCommunityIcons name={icon} size={22} color="#256B5E" />
      <Text style={styles.menuLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: "row",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "transparent",
  },
  menu: {
    width: 260,
    backgroundColor: "#F8FBF4",
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    position: "absolute",
    top: 0,
    bottom: 0,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#256B5E",
    marginBottom: 24,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  menuLabel: {
    fontSize: 16,
    color: "#1F2128",
    marginLeft: 12,
  },
});
