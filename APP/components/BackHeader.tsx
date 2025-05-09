import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";

export default function BackHeader() {
  const router = useRouter();

  return (
    <IconButton
      icon="arrow-left"
      size={24}
      onPress={() => router.back()}
      style={styles.backButton}
    />
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 40,
    left: 16,
    zIndex: 2,
    backgroundColor: "#F8FBF4",
  },
});
