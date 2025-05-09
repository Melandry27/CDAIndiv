import { API_URL } from "@/config";
import { useAuth } from "@/context/AuthContext";
import { getAllBreathingExercises } from "@/services/exercises";
import { BreathingExercise } from "@/types/exercise";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function MainContent({
  selectedCategory,
}: {
  selectedCategory: string | null;
}) {
  const { user } = useAuth();
  const router = useRouter();

  const [exercises, setExercises] = useState<BreathingExercise[]>([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const data = await getAllBreathingExercises();
        const filtered = selectedCategory
          ? data.filter((ex) =>
              ex.categories?.some((cat) => cat.id === selectedCategory)
            )
          : data;
        setExercises(filtered);
      } catch (error) {
        console.error("Erreur lors du chargement des exercices :", error);
      }
    };
    fetchExercises();
  }, [selectedCategory]);

  return (
    <View style={styles.mainContent}>
      <Text style={styles.welcome}>
        Bienvenue, {user?.name || "Utilisateur"}
      </Text>
      <Text style={styles.subtitle}>
        Explorez les exercices adaptés à votre état d'esprit.
      </Text>

      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.push({
                pathname: "/exercise/[id]",
                params: { id: item.id },
              })
            }
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
                      .replace(/\\\\/g, "/")
                      .replace(/\\/g, "/")}`,
                  }}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
              )}
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContent: {
    flex: 1,
    paddingHorizontal: 16,
  },
  welcome: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#256B5E",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#62745B",
    textAlign: "center",
    marginBottom: 16,
  },
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
    marginRight: 16,
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
