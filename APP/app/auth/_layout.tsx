import { Stack } from "expo-router";

export const unstable_settings = {
  initialRouteName: "login",
  hideFromTabs: true,
};

export default function AuthLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
