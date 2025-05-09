// app/(tabs)/exercise/[id].tsx
import { API_URL } from "@/config";
import { useAuth } from "@/context/AuthContext";
import { getBreathingExerciseById } from "@/services/exercises";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import { Audio } from "expo-av";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ExerciseScreen() {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();

  const [exercise, setExercise] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [timer, setTimer] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const intervalRef = useRef<number | null>(null);
  const soundRef = useRef<Audio.Sound | null>(null);

  const loadExercise = async () => {
    try {
      setLoading(true);
      if (!id) return;
      if (typeof id === "string") {
        const res = await getBreathingExerciseById(id);
        setExercise(res);

        // Vérifie si c'est en favori
        const favRes = await axios.get(
          `${API_URL}/favorites/user/${user?.userId}`
        );
        const isFav = favRes.data.some((f: any) => f.exerciseId === id);
        setIsFavorite(isFav);
      }
    } catch (err) {
      console.error("Erreur chargement exercice", err);
      Alert.alert("Erreur", "Impossible de charger l'exercice");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExercise();

    const setupAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
      } catch (err) {
        console.error("Erreur configuration audio", err);
      }
    };

    setupAudio();

    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        // Supprimer
        const res = await axios.get(
          `${API_URL}/favorites/user/${user?.userId}`
        );
        const favorite = res.data.find((f: any) => f.exerciseId === id);
        if (favorite) {
          await axios.delete(`${API_URL}/favorites/${favorite.id}`);
          setIsFavorite(false);
        }
      } else {
        // Ajouter
        await axios.post(`${API_URL}/favorites`, {
          userId: user?.userId,
          exerciseId: id,
        });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Erreur favoris", error);
    }
  };

  const startSession = async () => {
    const sessionDateTime = new Date().toISOString();
    try {
      const res = await axios.post(`${API_URL}/sessions`, {
        sessionDateTime,
        performedDuration: 0,
        userId: user?.userId,
        exerciseId: id,
      });
      setSessionId(res.data.id);
      setStartTime(new Date());
    } catch (err) {
      console.error("Erreur création session", err);
    }
  };

  const updateSession = async () => {
    if (!sessionId || !startTime) return;
    const now = new Date();
    const diffInMinutes = Math.round(
      (now.getTime() - startTime.getTime()) / 60000
    );
    try {
      await axios.put(`${API_URL}/sessions/${sessionId}`, {
        performedDuration: diffInMinutes,
      });
    } catch (err) {
      console.error("Erreur mise à jour session", err);
    }
  };

  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000) as unknown as number;
  };

  const stopTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const loadSound = async () => {
    if (!exercise?.audioUrl) {
      Alert.alert("Erreur", "Aucun fichier audio disponible pour cet exercice");
      return null;
    }

    setIsLoading(true);

    try {
      const audioUrl = `${API_URL}/${exercise.audioUrl.replace(/\\/g, "/")}`;
      if (soundRef.current) await soundRef.current.unloadAsync();

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: false },
        onPlaybackStatusUpdate
      );

      soundRef.current = newSound;
      setSound(newSound);
      return newSound;
    } catch (err) {
      console.error("Erreur chargement audio", err);
      Alert.alert("Erreur", "Impossible de charger le fichier audio");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const onPlaybackStatusUpdate = (status: Audio.PlaybackStatus) => {
    if (status.isLoaded) {
      setIsPlaying(status.isPlaying);
      if (status.didJustFinish) {
        stopTimer();
        updateSession();
        setIsPlaying(false);
      }
    } else if (status.error) {
      console.error(`Erreur de lecture: ${status.error}`);
    }
  };

  const handlePlayPause = async () => {
    if (isLoading) return;

    try {
      if (!sound) {
        const newSound = await loadSound();
        if (newSound) {
          await newSound.playAsync();
          setIsPlaying(true);
          setTimer(0);
          startTimer();
          startSession();
        }
      } else {
        if (isPlaying) {
          await sound.pauseAsync();
          stopTimer();
          updateSession();
        } else {
          await sound.playAsync();
          startTimer();
        }
      }
    } catch (err) {
      console.error("Erreur lecture/pause audio", err);
      Alert.alert("Erreur", "Problème lors de la lecture audio");
    }
  };

  if (loading || !exercise) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#256B5E" />
        <Text style={styles.loadingText}>Chargement de l'exercice...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FBF4" />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{exercise.name}</Text>
          <TouchableOpacity onPress={toggleFavorite}>
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={28}
              color={isFavorite ? "#FF6B81" : "#256B5E"}
              style={{ marginLeft: 10 }}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <Text style={styles.descTitle}>Description</Text>
          <Text style={styles.desc}>{exercise.description}</Text>
        </View>

        <View style={styles.timerCard}>
          <View style={styles.timerContainer}>
            <Ionicons name="time-outline" size={24} color="#256B5E" />
            <Text style={styles.timer}>
              {`${Math.floor(timer / 60)
                .toString()
                .padStart(2, "0")}:${(timer % 60).toString().padStart(2, "0")}`}
            </Text>
          </View>
        </View>

        <View style={styles.controlsContainer}>
          <TouchableOpacity
            style={[
              styles.playButton,
              isLoading ? styles.buttonDisabled : null,
            ]}
            onPress={handlePlayPause}
            disabled={isLoading}
          >
            <Ionicons
              name={
                isLoading ? "hourglass-outline" : isPlaying ? "pause" : "play"
              }
              size={32}
              color="white"
            />
            <Text style={styles.buttonText}>
              {isLoading
                ? "Chargement..."
                : isPlaying
                ? "Pause"
                : "Lancer l'exercice"}
            </Text>
          </TouchableOpacity>

          {isPlaying && (
            <View style={styles.breathAnimationContainer}>
              <View
                style={[
                  styles.breathCircle,
                  isPlaying && styles.breathAnimation,
                ]}
              />
            </View>
          )}
        </View>

        <View style={styles.tipsCard}>
          <Ionicons name="bulb-outline" size={20} color="#256B5E" />
          <Text style={styles.tipsText}>
            Installez-vous confortablement et dans un endroit calme pour
            profiter pleinement de cet exercice.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FBF4",
  },
  container: {
    flex: 1,
    backgroundColor: "#F8FBF4",
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#F8FBF4",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#256B5E",
    fontWeight: "500",
  },
  header: {
    marginTop: 10,
    marginBottom: 24,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#256B5E",
    flex: 1,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  descTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#256B5E",
    marginBottom: 8,
  },
  desc: {
    fontSize: 16,
    lineHeight: 24,
    color: "#62745B",
  },
  timerCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 15,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: "center",
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  timer: {
    fontSize: 28,
    fontWeight: "600",
    color: "#256B5E",
    marginLeft: 10,
    fontVariant: ["tabular-nums"],
  },
  controlsContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  playButton: {
    backgroundColor: "#256B5E",
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingHorizontal: 30,
    shadowColor: "#256B5E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    minWidth: width * 0.7,
  },
  buttonDisabled: {
    backgroundColor: "#a0bbb5",
    shadowOpacity: 0.1,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 10,
  },
  breathAnimationContainer: {
    marginTop: 30,
    alignItems: "center",
  },
  breathCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "rgba(37, 107, 94, 0.2)",
  },
  breathAnimation: {
    opacity: 0.8,
    transform: [{ scale: 1 }],
    animation: "pulse",
  },
  tipsCard: {
    backgroundColor: "#E8F3ED",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  tipsText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#3D5A4E",
    lineHeight: 20,
  },
});
