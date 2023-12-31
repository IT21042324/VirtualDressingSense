import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import { UseBackEndApi } from "../../services/api";
import { StoreCardMenu } from "../menus/customStoreCardMenu";
import { colorVariants, fontFamily } from "../../global/string";

export const StoreCard = ({
  store,
  setStoreToNavigate,
  updateModalVisibility,
  selectedStore,
  storeUpdateStatus,
}) => {
  const { deleteStoreById } = UseBackEndApi();

  const setCurrentStoreInfo = () => {
    setStoreToNavigate(store);
  };

  const deleteStoreHandler = async () => {
    const { data } = await deleteStoreById(store._id);

    if (data) {
      Toast.show({
        type: "success",
        text1: "Successfully deleted store",
        text2: data,
      });

      storeUpdateStatus();
    } else {
      Toast.show({
        type: "error",
        text1: "Unable to delete data",
        text2: err,
      });
    }
  };

  return (
    <TouchableOpacity onPress={setCurrentStoreInfo}>
      <View
        style={[
          styles.store,
          {
            backgroundColor:
              selectedStore?.storeName === store.storeName
                ? colorVariants.turquesa
                : colorVariants.mediumAquaMarine,
          },
        ]}
      >
        {selectedStore?.storeName === store.storeName && (
          <StoreCardMenu
            updateModalVisibility={updateModalVisibility}
            deleteStoreHandler={deleteStoreHandler}
          />
        )}

        <View style={styles.storeNameContainer}>
          <Text numberOfLines={1} style={styles.storeName}>
            {store.storeName && typeof store.storeName === "string"
              ? store.storeName.charAt(0).toUpperCase() +
                store.storeName.slice(1)
              : ""}
          </Text>
        </View>

        <View style={styles.storeAddressContainer}>
          <Text style={styles.location} numberOfLines={1}>
            {store.address && typeof store.address === "string"
              ? store.address.charAt(0).toUpperCase() + store.address.slice(1)
              : ""}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  store: {
    margin: 10,
    padding: 10,
    paddingBottom: 30,
    borderRadius: 10,
  },
  storeHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  storeImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  storeName: {
    fontWeight: "bold",
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    fontFamily: fontFamily.normalText,
  },
  location: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginLeft: 5,
    fontFamily: fontFamily.normalText,
  },

  actionBtn: {
    alignItems: "center",
    width: 70,
    height: 70,
    backgroundColor: colorVariants.turquesa,
    borderRadius: 100,
  },
  actionBtnContainer: {
    zIndex: 100,
    position: "absolute",
    top: 450,
    right: 5,
  },
  actionBtnText: {
    color: "white",
    fontSize: 50,
    fontWeight: "bold",
  },
  storeNameContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  storeAddressContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    fontWeight: "bold",
  },
});
