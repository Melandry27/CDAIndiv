// pages/login.tsx ou pages/profile.tsx
import { API_URL } from "@/config";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useState } from "react";
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    address: user?.address || "",
    dateOfBirth: user?.dateOfBirth?.split("T")[0] || "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const formattedDate = form.dateOfBirth
        ? new Date(form.dateOfBirth).toISOString()
        : null;

      const res = await axios.put(`${API_URL}/users/${user?.userId}`, {
        ...form,
        dateOfBirth: formattedDate,
      });

      if (res.status !== 200) {
        throw new Error("Erreur lors de la mise à jour du profil");
      }

      logout();
      Alert.alert(
        "Succès",
        "Profil mis à jour avec succès. Veuillez vous reconnecter."
      );
    } catch (err) {
      console.error("Erreur mise à jour profil:", err);
      Alert.alert("Erreur", "Impossible de mettre à jour le profil.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Mon Profil</Text>

        <View style={styles.field}>
          <Text style={styles.label}>Nom complet</Text>
          <Text style={styles.hint}>Exemple : Jean Dupont</Text>
          <TextInput
            value={form.name}
            onChangeText={(text) => handleChange("name", text)}
            style={styles.input}
            placeholder="Votre nom"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Adresse e-mail</Text>
          <Text style={styles.hint}>Exemple : exemple@mail.com</Text>
          <TextInput
            value={form.email}
            onChangeText={(text) => handleChange("email", text)}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholder="Email"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Numéro de téléphone</Text>
          <Text style={styles.hint}>Exemple : 0612345678</Text>
          <TextInput
            value={form.phoneNumber}
            onChangeText={(text) => handleChange("phoneNumber", text)}
            style={styles.input}
            keyboardType="phone-pad"
            placeholder="Téléphone"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Adresse postale</Text>
          <Text style={styles.hint}>Exemple : 12 rue des Lilas, Paris</Text>
          <TextInput
            value={form.address}
            onChangeText={(text) => handleChange("address", text)}
            style={styles.input}
            placeholder="Adresse"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Date de naissance</Text>
          <Text style={styles.hint}>Format attendu : YYYY-MM-DD</Text>
          <TextInput
            value={form.dateOfBirth}
            onChangeText={(text) => handleChange("dateOfBirth", text)}
            style={styles.input}
            placeholder="1990-01-01"
            keyboardType={
              Platform.OS === "ios" ? "numbers-and-punctuation" : "default"
            }
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSave}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Sauvegarde..." : "Enregistrer"}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() =>
          Alert.alert(
            "Confirmer la suppression",
            "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.",
            [
              { text: "Annuler", style: "cancel" },
              {
                text: "Supprimer",
                style: "destructive",
                onPress: async () => {
                  try {
                    await axios.delete(
                      `${API_URL}/auth/full-delete/${user?.userId}`
                    );
                    logout();
                    Alert.alert(
                      "Compte supprimé",
                      "Votre compte a été supprimé."
                    );
                  } catch (err) {
                    console.error("Erreur suppression profil:", err);
                    Alert.alert("Erreur", "Impossible de supprimer le profil.");
                  }
                },
              },
            ]
          )
        }
      >
        <Text style={styles.deleteText}>Supprimer mon compte</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FBF4",
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#256B5E",
    marginBottom: 24,
    textAlign: "center",
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#256B5E",
    marginBottom: 4,
  },
  hint: {
    fontSize: 12,
    color: "#62745B",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  button: {
    backgroundColor: "#256B5E",
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteButton: {
    marginTop: 24,
    alignItems: "center",
    padding: 12,
  },
  deleteText: {
    color: "#C53030",
    fontWeight: "600",
    fontSize: 16,
  },
});
