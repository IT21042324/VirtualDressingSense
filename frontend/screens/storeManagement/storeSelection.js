import {
  FlatList,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import { AddStoreModal } from "../../components/storeManagement/modals/addStore";
import { UpdateStoreModal } from "../../components/storeManagement/modals/updateStore";
import Toast from "react-native-toast-message";
import { UseStoreContext } from "../../hooks/useStoreContext";
import { ActivityIndicator } from "react-native-paper";
import { StoreCard } from "../../components/storeManagement/storeCard";
import { UseBackEndApi } from "../../services/api";
import { UseHelperContext } from "../../hooks/useHelperContextProvider";
import { colorVariants } from "../../global/string";
import { storeImage } from "../../assets";
import { MaterialIcons } from "@expo/vector-icons";

export default function StoreSelection({ navigation }) {
  const [updateVisibility, setUpdateModalVisibility] = useState(false);

  const { getAllStoresForAnOwner } = UseBackEndApi();

  const [storeDataSet, setStoreDataSet] = useState([]);

  const { dispatch } = UseStoreContext();

  const [selectedStore, setSelectedStore] = useState({});

  const [isStoreListUpdated, setIsStoreListUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [proceedBtnColor, setProceedBtnColor] = useState(
    colorVariants.babyBlue
  );

  useEffect(() => {
    async function getDataSet() {
      const { data } = await getAllStoresForAnOwner();

      console.log(data);

      if (data?.length >= 0) {
        setStoreDataSet(data);
        dispatch({ type: "SetStores", payload: data });
        setIsStoreListUpdated(false);
        setIsLoading(false);
      } else {
        Toast.show({
          type: "error",
          text1: "Unable to fetch data",
        });

        setIsLoading(false);
      }
    }
    getDataSet();
  }, [isStoreListUpdated]);

  const storeUpdateStatus = () => {
    setIsStoreListUpdated(true);
  };

  const { helperContext } = UseHelperContext();
  const helperDispath = UseHelperContext().dispatch;

  const { showAddStoreForm } = helperContext;

  const changeModalVisibility = (status) => {
    helperDispath({
      type: "showAddStoreFormStatus",
      status,
    });
  };

  const updateModalVisibility = (status) => {
    setUpdateModalVisibility(status);
  };

  const navigateToStorePage = () => {
    navigation.navigate("Store", selectedStore);
  };

  const setStoreToNavigate = (store) => {
    setSelectedStore(store);
  };

  return (
    <View style={styles.container}>
      {showAddStoreForm && (
        <AddStoreModal
          changeModalVisibility={changeModalVisibility}
          storeUpdateStatus={storeUpdateStatus}
        />
      )}
      {updateVisibility && (
        <UpdateStoreModal
          changeModalVisibility={updateModalVisibility}
          storeDetails={selectedStore}
          storeUpdateStatus={storeUpdateStatus}
        />
      )}
      {storeDataSet?.length === 0 && !isLoading && (
        <View style={styles.emptyStoreListContainer}>
          <Text style={styles.emptyStoreListText}>No Stores To Display</Text>
        </View>
      )}
      {isLoading && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            height: "80%",
          }}
        >
          <ActivityIndicator size="large" color={"dodgerblue"} />
          <Text style={{ padding: 20, fontSize: 20 }}>Loading...</Text>
        </View>
      )}

      <View>
        <Image source={storeImage} style={styles.storeImage} />
      </View>

      <View style={styles.listContainer}>
        <FlatList
          keyExtractor={(store) => store._id}
          data={storeDataSet}
          renderItem={({ item }) => (
            <StoreCard
              store={item}
              selectedStore={selectedStore}
              setStoreToNavigate={setStoreToNavigate}
              updateModalVisibility={updateModalVisibility}
              storeUpdateStatus={storeUpdateStatus}
            />
          )}
        />
      </View>

      {storeDataSet?.length > 0 && (
        <TouchableOpacity
          style={[
            styles.proceedButton,
            {
              backgroundColor: selectedStore._id
                ? colorVariants.dodgerblue
                : colorVariants.babyBlue,
            },
          ]}
          onPress={navigateToStorePage}
        >
          <MaterialIcons
            name="navigate-next"
            size={44}
            color="black"
            style={{
              color: "white",
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f4ff",
  },
  proceedButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 50,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    zIndex: 22,
    borderColor: "white",
    borderWidth: 2,
  },
  actionBtn: {
    alignItems: "center",
    width: 70,
    height: 70,
    backgroundColor: "dodgerblue",
    borderRadius: 100,
  },
  emptyStoreListContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    top: 20,
  },
  emptyStoreListText: {
    fontWeight: "bold",
  },
  storeImage: {
    width: "100%",
    height: 200,
  },
  listContainer: {
    flex: 1,
    margin: 10,
  },
});
