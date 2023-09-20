import { View, StyleSheet, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export const Header = ({ title }) => {
  const onPressHandler = () => {
    console.log("Hello");
  };

  return (
    <View style={styles.header}>
      <MaterialIcons
        name="menu"
        size={28}
        onPress={onPressHandler}
        style={styles.icon}
      />
      <View>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
    letterSpacing: 1,
  },
  icon: {
    position: "absolute",
    right: 0,
  },
});
