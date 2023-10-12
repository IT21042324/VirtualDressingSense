import { View, StyleSheet, Text } from "react-native";
import { HeaderMenuOptions } from "../menus/HeaderMenu";
import { fontFamily } from "../../global/string";
import { TouchableOpacity } from "react-native-gesture-handler";

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
    color: "black",
    letterSpacing: 1,
    fontFamily: fontFamily.titleText,
  },
  icon: {
    position: "absolute",
    right: 0,
    color: "black",
  },
});
