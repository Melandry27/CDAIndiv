import BackHeader from "@/components/BackHeader";
import { API_URL } from "@/config";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/auth/login`, form);
      const token = res.data.token;
      await login(token);

      if (res.status !== 200) {
        alert("Erreur lors de la connexion");
        return;
      }

      alert("Connexion réussie !");
      router.replace("/");
    } catch (err) {
      console.error("Login failed", err);
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
        Connectez-vous maintenant pour accéder à vos exercices et les
        sauvegarder.
      </Text>

      <TextInput
        label="Adresse email"
        value={form.email}
        onChangeText={(text) => setForm({ ...form, email: text })}
        autoCapitalize="none"
        keyboardType="email-address"
        textColor="#1F2128"
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
      <Button
        mode="contained"
        onPress={handleLogin}
        loading={loading}
        disabled={loading}
        style={styles.button}
        labelStyle={styles.buttonLabel}
      >
        Connexion
      </Button>

      <Button
        onPress={() => router.push("/signup")}
        style={(styles.secondaryButton, { zIndex: 1 })}
        labelStyle={styles.secondaryButtonLabel}
      >
        Vous n&apos;avez pas de compte ?{" "}
        <Text style={styles.link}>S’inscrire</Text>
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
    color: "#1F2128",
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
    height: 200,
    position: "absolute",
    bottom: 0,
    left: 0,
  },
});
