import {
  FlatList,
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { AddStoreModal } from "../../components/storeManagement/modals/addStore";
import { UpdateStoreModal } from "../../components/storeManagement/modals/updateStore";
import axios from "axios";
import Toast from "react-native-toast-message";
import { UseStoreContext } from "../../hooks/useStoreContext";

export default function StoreSelection({ navigation }) {
  const REACT_APP_BACKEND_URL = "https://virtualdressingsense.onrender.com";
  const [selectedStore, setSelectedStore] = useState("");
  const [modalVisibility, setModalVisibility] = useState(false);
  const [updateVisibility, setUpdateModalVisibility] = useState(false);

  const [storeDataSet, setStoreDataSet] = useState([]);

  const { stores, dispatch } = UseStoreContext();

  const [showOptions, setShowOptions] = useState(false);

  const deleteStoreHandler = async (_id) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Zjc0M2UwNDAzNzQxZDQzNmMxZTZiZSIsImlhdCI6MTY5MzkyNjM2OCwiZXhwIjoxNjk0MTg1NTY4fQ.S5gfmagFa3zWtUlTyMbTpxEum8JfMLg8ufEJC0rRroU";
    try {
      const { data } = await axios.delete(
        `${REACT_APP_BACKEND_URL}/api/stores/delete/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Toast.show({
        type: "success",
        text1: "Successfully deleted store",
        text2: data,
      });
    } catch (err) {
      console.log(err);
      Toast.show({
        type: "error",
        text1: "Unable to delete data",
        text2: err,
      });
    }
  };

  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Zjc0M2UwNDAzNzQxZDQzNmMxZTZiZSIsImlhdCI6MTY5MzkyNjM2OCwiZXhwIjoxNjk0MTg1NTY4fQ.S5gfmagFa3zWtUlTyMbTpxEum8JfMLg8ufEJC0rRroU";

    const _id = "64f8754e1cd2fd7cda7d8725";

    async function getDataSet() {
      try {
        const { data } = await axios.get(
          `${REACT_APP_BACKEND_URL}/api/stores/owner/${_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStoreDataSet(data);
        dispatch({ type: "SetStores", payload: data });
      } catch (err) {
        console.log(err);
        Toast.show({
          type: "error",
          text1: "Unable to fetch data",
          text2: err,
        });
      }
    }
    getDataSet();
  }, []);

  const changeModalVisibility = (status) => {
    setModalVisibility(status);
  };

  const updateModalVisibility = (status) => {
    setUpdateModalVisibility(status);
  };

  const navigateToStorePage = () => {
    const relevantStoreList = stores.filter((stor) => {
      return stor._id === selectedStore._id;
    });

    relevantStoreList?.length > 0 &&
      navigation.navigate("Store", relevantStoreList[0]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.actionBtnContainer}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.actionBtn}
          onPress={() => changeModalVisibility(true)}
        >
          <Text style={styles.actionBtnText}>+</Text>
        </TouchableOpacity>
      </View>

      {modalVisibility && (
        <AddStoreModal changeModalVisibility={changeModalVisibility} />
      )}

      {updateVisibility && (
        <UpdateStoreModal
          changeModalVisibility={updateModalVisibility}
          storeDetails={storeDataSet[0]}
        />
      )}

      {storeDataSet?.length === 0 && (
        <View style={styles.emptyStoreListContainer}>
          <Text style={styles.emptyStoreListText}>No Stores To Display</Text>
        </View>
      )}

      <FlatList
        keyExtractor={(item) => item._id}
        data={storeDataSet}
        renderItem={({ item }) => {
          return (
            <>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setSelectedStore(item);
                }}
              >
                <View
                  style={[
                    styles.item,
                    {
                      backgroundColor:
                        selectedStore?.storeName === item.storeName
                          ? "dodgerblue"
                          : "grey",
                    },
                  ]}
                >
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      marginRight: 10,
                    }}
                    onPress={() => {
                      setShowOptions(!showOptions);
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        marginBottom: 10,
                      }}
                    >
                      {showOptions ? "Hide Options" : "Show Options"}
                    </Text>
                  </TouchableOpacity>

                  <Text style={styles.storeName} numberOfLines={1}>
                    {item.storeName}
                  </Text>
                  <Text style={styles.location}>{item.address}</Text>

                  {showOptions && (
                    <View
                      style={{
                        justifyContent: "space-around",
                        marginRight: 10,
                        marginTop: 40,
                        fontWeight: "bold",
                        flexDirection: "row",
                      }}
                    >
                      <Button
                        title="Update Store"
                        color={"purple"}
                        backgroundColor="white"
                        onPress={() => updateModalVisibility(true)}
                        disabled={
                          selectedStore?.storeName === item.storeName
                            ? false
                            : true
                        }
                      />
                      <Button
                        title="Delete Store"
                        color={"red"}
                        backgroundColor="red"
                        onPress={() => deleteStoreHandler(item._id)}
                        disabled={
                          selectedStore?.storeName === item.storeName
                            ? false
                            : true
                        }
                      />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </>
          );
        }}
      />
      {storeDataSet?.length > 0 && (
        <View style={styles.proceedButton}>
          <Button
            title="Proceed"
            disabled={!selectedStore}
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
  item: {
    flex: 1,
    marginTop: 5,
    marginBottom: 10,
    paddingTop: 5,
    paddingBottom: 15,
    paddingLeft: 5,
    fontSize: 24,
  },
  storeName: {
    fontSize: 30,
    fontWeight: "bold",
    margin: 5,
    color: "white",
  },
  location: {
    fontSize: 20,
    color: "white",
    marginLeft: 5,
  },
  proceedButton: {
    marginBottom: 40,
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
