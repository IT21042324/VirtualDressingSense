import { Text, View, Alert } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { SimpleLineIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { colorVariants } from "../../global/string";

export const StoreCardMenu = ({
  deleteStoreHandler,
  updateModalVisibility,
}) => {
  const handleDelete = () => {
    Alert.alert(
      "Delete Store",
      "Are you sure you want to remove the selected store?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            deleteStoreHandler();
          },
        },
      ]
    );
  };

  return (
    <View>
      <Menu style={styles.menuContainer}>
        <MenuTrigger>
          <SimpleLineIcons name="options-vertical" size={22} color="white" />
        </MenuTrigger>
        <MenuOptions>
          <View style={styles.menuOptionsContainer}>
            <MenuOption
              onSelect={() => updateModalVisibility(true)}
              style={styles.menuOptionUpdate}
            >
              <Text style={styles.menuOptionText}>Update</Text>
            </MenuOption>
            <MenuOption onSelect={handleDelete} style={styles.menuOptionDelete}>
              <Text style={styles.menuOptionText}>Delete</Text>
            </MenuOption>
          </View>
        </MenuOptions>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  menuOptionsContainer: {
    width: "100%",
    position: "absolute",
    top: 30,
    right: 10,
    borderWidth: 3,
    borderColor: colorVariants.babyBlue,
  },
  menuContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  menuOptionUpdate: {
    backgroundColor: "#e0e4f3",
    padding: 20,
    borderBottomColor: colorVariants.babyBlue,
    borderBottomWidth: 1,
  },
  menuOptionText: {
    color: "black",
    fontWeight: "bold",
  },
  menuOptionDelete: {
    backgroundColor: "#e0e4f3",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colorVariants.babyBlue,
  },
  selectionImage: {
    height: 40,
    width: 40,
    tintColor: "white",
  },
});
