import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    flex: 1,
  },
  titleText: {
    fontFamily: "ubuntu-bold",
    fontSize: 18,
    color: "#333",
  },
  subTitleText: {
    fontFamily: "ubuntu-regular",
    fontSize: 14,
    color: "#333",
  },
  errorText: {
    fontFamily: "ubuntu-regular",
    fontSize: 14,
    color: "crimson",
    fontWeight: "bold",
    marginTop: 2,
  },
});
