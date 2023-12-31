import { Alert, Text, View } from "react-native";
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
import { colorVariants } from "../../global/string";
import { UseUserContext } from "../../hooks/useUserContext";
import { StoreReportInfo } from "../../reports/storeReport";

export const HeaderMenuOptions = ({ title }) => {
  const { dispatch } = UseHelperContext();

  const { user } = UseUserContext();

  const { generateReportForStoresWithUserId } = StoreReportInfo();

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
    Alert.alert("Prepare Report?", "This might take some time to complete", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () =>
          await CreateReport(stores, user, generateReportForStoresWithUserId),
      },
    ]);
  };

  return (
    <View>
      <Menu style={styles.menuContainer}>
        <MenuTrigger>
          <SimpleLineIcons
            name="options-vertical"
            size={24}
            color={colorVariants.darkGray}
          />
        </MenuTrigger>

        <MenuOptions>
          <View style={styles.menuOptionsContainer}>
            <MenuOption onSelect={onSelectHandler} style={styles.menuOption}>
              <Text style={styles.menuOptionText}>Add {newComponentLabel}</Text>
            </MenuOption>
            {newComponentLabel === "Store" && (
              <MenuOption
                onSelect={onReportSelectHandler}
                style={styles.menuOption}
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
    borderWidth: 2,
    borderColor: colorVariants.babyBlue,
  },
  menuContainer: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  menuOption: {
    backgroundColor: "#e0e4f3",
    borderBottomWidth: 1,
    borderBottomColor: colorVariants.babyBlue,
    padding: 20,
  },
  menuOptionText: {
    color: "black",
    fontWeight: "bold",
  },
  selectionImage: {
    height: 40,
    width: 40,
    tintColor: "white",
  },
});
