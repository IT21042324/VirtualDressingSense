import {
  FlatList,
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useState, useEffect } from "react";
import { CustomModal } from "../../components/storeManagement/customModal";
import axios from "axios";
import Toast from "react-native-toast-message";

export default function StoreSelection({ navigation }) {
  const [selectedStore, setSelectedStore] = useState("");
  const [modalVisibility, setModalVisibility] = useState(false);
  const [storeDataSet, setStoreDataSet] = useState([]);

  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Zjc0M2UwNDAzNzQxZDQzNmMxZTZiZSIsImlhdCI6MTY5MzkyNjM2OCwiZXhwIjoxNjk0MTg1NTY4fQ.S5gfmagFa3zWtUlTyMbTpxEum8JfMLg8ufEJC0rRroU";

    const _id = "64f8754e1cd2fd7cda7d8725";

    async function getDataSet() {
      try {
        const { data } = await axios.get(
          `http://192.168.1.3:8084/api/stores/owner/${_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setStoreDataSet(data);
      } catch (err) {
        Toast.show({
          type: "error",
          text1: "Unable to fetch data",
          text2: "Please restart the application",
        });
      }
    }
    getDataSet();
  }, []);

  const changeModalVisibility = (status) => {
    setModalVisibility(status);
  };

  return (
    <View style={styles.container}>
      {(storeDataSet?.length || [].length <= 7) && (
        <View style={{ zIndex: 100 }}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.actionBtn}
            onPress={() => changeModalVisibility(true)}
          >
            <Text style={{ color: "white", fontSize: 50, fontWeight: "bold" }}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {modalVisibility && (
        <CustomModal changeModalVisibility={changeModalVisibility} />
      )}

      {(storeDataSet?.length === 0 || [].length === 0) && (
        <View style={styles.emptyStoreListContainer}>
          <Text style={{ fontWeight: "bold" }}>No Stores To Display</Text>
        </View>
      )}

      <FlatList
        keyExtractor={(item) => item.id}
        data={storeDataSet}
        renderItem={({ item }) => {
          return (
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
                <Text style={styles.storeName} numberOfLines={1}>
                  {item.storeName}
                </Text>
                <Text style={styles.location}>{item.address}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      {(storeDataSet?.length > 0 || [].length > 0) && (
        <View style={styles.proceedButton}>
          <Button title="Proceed" disabled={!selectedStore} />
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
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  actionBtn: {
    alignItems: "center",
    width: 70,
    position: "absolute",
    top: 450,
    right: 5,
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
});