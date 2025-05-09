import { useRouter } from "expo-router";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text variant="headlineMedium">404 - Page not found</Text>
      <Button
        style={{ marginTop: 20 }}
        mode="contained"
        onPress={() => router.replace("/")}
      >
        Go Home
      </Button>
    </View>
  );
}
