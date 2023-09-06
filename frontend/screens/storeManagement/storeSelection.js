import {
  FlatList,
  View,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";

export default function StoreSelection({ navigation, storeDataSet }) {
  const [selectedStore, setSelectedStore] = useState("");

  const navigateToAddStore = () => {
    navigation.navigate("Add Store");
  };

  return (
    <View style={styles.container}>
      {(storeDataSet?.length || [].length <= 7) && (
        <View style={{ zIndex: 100 }}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.actionBtn}
            onPress={() => {
              navigateToAddStore();
            }}
          >
            <Text style={{ color: "white", fontSize: 50, fontWeight: "bold" }}>
              +
            </Text>
          </TouchableOpacity>
        </View>
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
                      selectedStore?.name === item.name ? "dodgerblue" : "grey",
                  },
                ]}
              >
                <Text style={styles.storeName}>{item.name}</Text>
                <Text style={styles.location}>{item.name}</Text>
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
    paddingTop: 5,
    paddingBottom: 15,
    paddingLeft: 5,
    fontSize: 24,
  },
  storeName: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  location: {
    fontSize: 26,
    color: "white",
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
