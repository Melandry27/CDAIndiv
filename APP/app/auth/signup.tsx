import BackHeader from "@/components/BackHeader";
import { API_URL } from "@/config";
import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

export default function Signup() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert("Veuillez entrer une adresse email valide");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/auth/signup`, {
        email: form.email,
        password: form.password,
        name: form.name,
      });

      if (res.status !== 201) {
        alert("Erreur lors de la création du compte");
        return;
      }

      alert("Compte créé avec succès ! Vous pouvez vous connecter.");
      router.replace("/login");
    } catch (err) {
      console.error("Signup failed", err);
      alert("Erreur lors de la création du compte");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <BackHeader />
      <Image
        source={require("@/assets/images/CESIZEN.png")}
        style={styles.logo}
      />

      <Text style={styles.subtitle}>
        Créez votre compte pour commencer vos exercices de respiration.
      </Text>

      <TextInput
        label="Adresse email"
        value={form.email}
        textColor="#1F2128"
        onChangeText={(text) => setForm({ ...form, email: text })}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
        theme={{
          colors: {
            primary: "#256B5E",
            placeholder: "#62745B",
          },
        }}
      />

      <TextInput
        label="Nom"
        value={form.name}
        textColor="#1F2128"
        onChangeText={(text) => setForm({ ...form, name: text })}
        autoCapitalize="none"
        style={styles.input}
        theme={{
          colors: {
            primary: "#256B5E",
            placeholder: "#62745B",
          },
        }}
      />

      <TextInput
        label="Mot de passe"
        textColor="#1F2128"
        value={form.password}
        onChangeText={(text) => setForm({ ...form, password: text })}
        secureTextEntry
        style={styles.input}
        theme={{
          colors: {
            primary: "#256B5E",
            placeholder: "#62745B",
          },
        }}
      />

      <TextInput
        label="Confirmer le mot de passe"
        textColor="#1F2128"
        value={form.confirmPassword}
        onChangeText={(text) => setForm({ ...form, confirmPassword: text })}
        secureTextEntry
        style={styles.input}
        theme={{
          colors: {
            primary: "#256B5E",
            placeholder: "#62745B",
          },
        }}
      />

      <Button
        mode="contained"
        onPress={handleSignup}
        loading={loading}
        disabled={loading}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        S’inscrire
      </Button>

      <Button
        onPress={() => router.replace("/login")}
        style={(styles.secondaryButton, { zIndex: 50 })}
        labelStyle={styles.secondaryButtonLabel}
      >
        Déjà un compte ? <Text style={styles.link}>Se connecter</Text>
      </Button>

      <Image
        source={require("@/assets/images/leaf-bg.png")}
        style={styles.decor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "#F8FBF4",
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 16,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: "#256B5E",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#1F2128",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    color: "#62745B",
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#E9F0E6",
  },
  inputLabel: {
    color: "#256B5E",
  },
  button: {
    marginTop: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: "#256B5E",
    color: "#E9F0E6",
  },
  buttonLabel: {
    color: "#E9F0E6",
    fontWeight: "bold",
  },
  secondaryButton: {
    marginTop: 8,
    backgroundColor: "transparent",
  },
  secondaryButtonLabel: {
    color: "#256B5E",
  },
  link: {
    color: "#54A478",
    fontWeight: "bold",
  },
  decor: {
    width: 400,
    height: 150,
    zIndex: 0,
    position: "absolute",
    bottom: 0,
    left: 0,
  },
});
