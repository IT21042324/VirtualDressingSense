import { Image, Text, View, Alert } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import Ionicons from "@expo/vector-icons/Ionicons";

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
      <Menu
        style={{
          flex: 1,
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Image
          source={require("../../assets/adaptive-icon.png")}
          style={{ height: 40, width: 40, tintColor: "white" }}
        />
        <MenuTrigger>
          <Ionicons name="md-checkmark-circle" size={32} color="green" />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption
            onSelect={() => updateModalVisibility(true)}
            style={{
              backgroundColor: "#e0e4f3",
              padding: 10,
            }}
          >
            <Text style={{ color: "black", fontWeight: "bold" }}>Update</Text>
          </MenuOption>
          <MenuOption
            onSelect={handleDelete}
            style={{
              backgroundColor: "#e0e4f3",
              padding: 10,
              borderTopWidth: 1,
              borderTopColor: "white",
            }}
          >
            <Text style={{ color: "black", fontWeight: "bold" }}>Delete</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
};
