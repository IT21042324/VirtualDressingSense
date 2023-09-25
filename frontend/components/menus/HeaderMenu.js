import { Text, View } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { SimpleLineIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { UseHelperContext } from "../../hooks/useHelperContextProvider";
import { CreateReport } from "../storeManagement/createReport";
import { UseStoreContext } from "../../hooks/useStoreContext";

export const HeaderMenuOptions = ({ title }) => {
  const { dispatch } = UseHelperContext();

  const [newComponentLabel, setNewComponentLabel] = useState("Store");

  useEffect(() => {
    title === "Store Selection"
      ? setNewComponentLabel("Store")
      : setNewComponentLabel("Item");
  }, [title]);

  const onSelectHandler = async () => {
    newComponentLabel === "Store"
      ? dispatch({ type: "showAddStoreFormStatus", status: true })
      : dispatch({ type: "showAddItemFormStatus", status: true });
  };
  const { stores } = UseStoreContext();
  const onReportSelectHandler = async () => {
    await CreateReport(stores);
  };

  return (
    <View>
      <Menu style={styles.menuContainer}>
        <MenuTrigger>
          <SimpleLineIcons name="options-vertical" size={24} color="white" />
        </MenuTrigger>

        <MenuOptions>
          <View style={styles.menuOptionsContainer}>
            <MenuOption
              onSelect={onSelectHandler}
              style={styles.menuOptionUpdate}
            >
              <Text style={styles.menuOptionText}>
                Add New {newComponentLabel}
              </Text>
            </MenuOption>
            {newComponentLabel === "Item" && (
              <MenuOption
                onSelect={onReportSelectHandler}
                style={styles.menuOptionUpdate}
              >
                <Text style={styles.menuOptionText}>Report</Text>
              </MenuOption>
            )}
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
  },
  menuContainer: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  menuOptionUpdate: {
    backgroundColor: "#e0e4f3",
    padding: 10,
  },
  menuOptionText: {
    color: "black",
    fontWeight: "bold",
  },
  menuOptionDelete: {
    backgroundColor: "#e0e4f3",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "white",
  },
  selectionImage: {
    height: 40,
    width: 40,
    tintColor: "white",
  },
});
