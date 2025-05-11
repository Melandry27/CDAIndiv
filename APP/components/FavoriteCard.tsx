import { API_URL } from "@/config";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "../context/AuthContext";

export default function FavoriteCard({ item }: { item: any }) {
  const router = useRouter();

  const { user } = useAuth();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        if (!user) {
          return Alert.alert(
            "Connexion requise",
            "Veuillez vous connecter pour accéder à cette fonctionnalité.",
            [
              {
                text: "Annuler",
                style: "cancel",
              },
              {
                text: "Se connecter",
                onPress: () => router.push("/login"),
              },
            ]
          );
        }
        router.push({ pathname: "/exercise/[id]", params: { id: item.id } });
      }}
    >
      <View style={styles.cardContentRow}>
        <View style={styles.cardTextContent}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardDesc} numberOfLines={2}>
            {item.description}
          </Text>
          <TouchableOpacity style={styles.watchButton}>
            <Text style={styles.watchButtonText}>regarder</Text>
            <MaterialCommunityIcons
              name="play-circle"
              color="white"
              size={18}
              style={{ marginLeft: 6 }}
            />
          </TouchableOpacity>
        </View>

        {item.imageUrl && (
          <Image
            source={{
              uri: `${API_URL}/${item.imageUrl
                .replace(/\\/g, "/")
                .replace(/\\/g, "/")}`,
            }}
            style={styles.cardImage}
            resizeMode="cover"
          />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#8BD1AC",
    borderRadius: 20,
    marginBottom: 16,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardContentRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginLeft: 12,
  },
  cardTextContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#3D5A4E",
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 14,
    color: "#5F7161",
    marginBottom: 12,
  },
  watchButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#256B5E",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  watchButtonText: {
    color: "#E9F0E6",
    fontWeight: "600",
    fontSize: 14,
  },
});
