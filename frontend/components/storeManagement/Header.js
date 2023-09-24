import { View, StyleSheet, Text } from "react-native";
import { HeaderMenuOptions } from "../menus/HeaderMenu";

export const Header = ({ title }) => {
  const onPressHandler = () => {};

  return (
    <View style={styles.header}>
      <View style={styles.icon}>
        <HeaderMenuOptions title={title} />
      </View>
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
    color: "white",
  },
});
