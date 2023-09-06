import { StyleSheet, StatusBar } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  titleText: {
    fontFamily: "nunito-Bold",
    fontSize: 18,
    color: "#333",
  },
});
