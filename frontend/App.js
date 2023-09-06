import { Button, SafeAreaView, StyleSheet, Platform } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";

import { globalStyles } from "./styles/global";
import { Login } from "./screens/Login";
export default function App() {
  const getFonts = () => {};

  return (
    <SafeAreaView style={globalStyles.container}>
      <Login />
    </SafeAreaView>
  );
}
