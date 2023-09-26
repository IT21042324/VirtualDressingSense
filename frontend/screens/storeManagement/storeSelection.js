import {
  FlatList,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button } from "react-native-rapi-ui";
import { useState, useEffect } from "react";
import { AddStoreModal } from "../../components/storeManagement/modals/addStore";
import { UpdateStoreModal } from "../../components/storeManagement/modals/updateStore";
import Toast from "react-native-toast-message";
import { UseStoreContext } from "../../hooks/useStoreContext";
import { ActivityIndicator } from "react-native-paper";
import { StoreCard } from "../../components/storeManagement/storeCard";
import { getAllStoresForAnOwner } from "../../services/api";
import { UseHelperContext } from "../../hooks/useHelperContextProvider";
import { NearbyJobCard } from "../../components/storeManagement/storeCardRedesigned";

export default function StoreSelection({ navigation }) {
  const [updateVisibility, setUpdateModalVisibility] = useState(false);

  const [storeDataSet, setStoreDataSet] = useState([]);

  const { dispatch } = UseStoreContext();

  const [selectedStore, setSelectedStore] = useState({});

  const [isStoreListUpdated, setIsStoreListUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getDataSet() {
      const { data } = await getAllStoresForAnOwner();

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

      <FlatList
        keyExtractor={(store) => store._id}
        data={storeDataSet}
        renderItem={({ item }) => (
          <StoreCard
            key={item}
            store={item}
            selectedStore={selectedStore}
            setStoreToNavigate={setStoreToNavigate}
            updateModalVisibility={updateModalVisibility}
            storeUpdateStatus={storeUpdateStatus}
          />
        )}
      />

      {storeDataSet?.length > 0 && (
        <View style={styles.proceedButton}>
          <Button
            text="Continue"
            color={"dodgerblue"}
            status="primary"
            disabled={Object.keys(selectedStore)?.length === 0}
            style={{ borderRadius: 10000 }}
            textStyle={{ color: "white", fontWeight: "bold", fontSize: 18 }}
            type="TouchableOpacity"
            onPress={navigateToStorePage}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  proceedButton: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
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
});
