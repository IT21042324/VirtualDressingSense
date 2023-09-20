import { StyleSheet, StatusBar } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  titleText: {
    fontFamily: "nunito-Bold",
    fontSize: 18,
    color: "#333",
  },
  errorText: {
    color: "crimson",
    fontWeight: "bold",
    marginTop: 2,
  },
});
