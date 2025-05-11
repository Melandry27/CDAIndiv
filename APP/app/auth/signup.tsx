import BackHeader from "@/components/BackHeader";
import { API_URL } from "@/config";
import axios from "axios";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import {
  Button,
  Modal,
  Portal,
  Provider,
  Text,
  TextInput,
} from "react-native-paper";

export default function Signup() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [acceptedPolicy, setAcceptedPolicy] = useState(false);

  const rgpdMessage = `🔒 Protection des données personnelles

En créant un compte sur CESIZen, vous consentez à la collecte et au traitement de vos données personnelles (nom, adresse email, données de sessions) à des fins de suivi de vos activités de bien-être et de personnalisation de votre expérience.

👉 Ces données sont :
- Strictement confidentielles
- Conservées de manière sécurisée dans nos bases de données hébergées en Europe
- Jamais transmises à des tiers sans votre consentement explicite

⏳ Durée de conservation :
Vos données sont conservées pendant la durée de votre utilisation du service, puis supprimées 12 mois après votre dernière activité.

📝 Conformément au Règlement Général sur la Protection des Données (UE 2016/679), vous disposez à tout moment d’un droit :
- d’accès à vos données
- de rectification
- de suppression
- d’opposition

Vous pouvez exercer ces droits en nous contactant à : support@cesizen.app

✅ En cliquant sur « J’accepte », vous confirmez avoir lu et compris ces conditions.`;

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

    if (!acceptedPolicy) {
      setShowPolicyModal(true);
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
    <Provider>
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
          theme={{ colors: { primary: "#256B5E", placeholder: "#62745B" } }}
        />

        <TextInput
          label="Nom"
          value={form.name}
          textColor="#1F2128"
          onChangeText={(text) => setForm({ ...form, name: text })}
          style={styles.input}
          theme={{ colors: { primary: "#256B5E", placeholder: "#62745B" } }}
        />

        <TextInput
          label="Mot de passe"
          value={form.password}
          textColor="#1F2128"
          onChangeText={(text) => setForm({ ...form, password: text })}
          secureTextEntry
          style={styles.input}
          theme={{ colors: { primary: "#256B5E", placeholder: "#62745B" } }}
        />

        <TextInput
          label="Confirmer le mot de passe"
          value={form.confirmPassword}
          textColor="#1F2128"
          onChangeText={(text) => setForm({ ...form, confirmPassword: text })}
          secureTextEntry
          style={styles.input}
          theme={{ colors: { primary: "#256B5E", placeholder: "#62745B" } }}
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
          style={{ marginTop: 8 }}
          labelStyle={styles.secondaryButtonLabel}
        >
          Déjà un compte ? <Text style={styles.link}>Se connecter</Text>
        </Button>

        <Image
          source={require("@/assets/images/leaf-bg.png")}
          style={styles.decor}
        />

        <Portal>
          <Modal
            visible={showPolicyModal}
            onDismiss={() => setShowPolicyModal(false)}
            contentContainerStyle={{
              backgroundColor: "white",
              padding: 20,
              margin: 20,
              borderRadius: 8,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
                marginBottom: 10,
                color: "#1F2128",
              }}
            >
              Protection des données personnelles
            </Text>
            <Text style={{ marginBottom: 10, fontSize: 14, color: "#1F2128" }}>
              {rgpdMessage}
            </Text>
            <Button
              mode="contained"
              onPress={() => {
                setAcceptedPolicy(true);
                setShowPolicyModal(false);
                handleSignup();
              }}
              style={{
                marginTop: 10,
                backgroundColor: "#256B5E",
              }}
            >
              J’accepte
            </Button>
          </Modal>
        </Portal>
      </View>
    </Provider>
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
  subtitle: {
    textAlign: "center",
    color: "#62745B",
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#E9F0E6",
  },
  button: {
    marginTop: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: "#256B5E",
  },
  buttonLabel: {
    color: "#E9F0E6",
    fontWeight: "bold",
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
