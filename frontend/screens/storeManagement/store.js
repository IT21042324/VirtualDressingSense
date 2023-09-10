import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { ItemCard } from "../../components/storeManagement/ItemCard";
import { useEffect, useState } from "react";
import { AddItemModal } from "../../components/storeManagement/modals/addItem";
import { UseStoreContext } from "../../hooks/useStoreContext";

export default function Store({ navigation }) {
  const { stores } = UseStoreContext();
  const [isItemsUpdated, setIsItemUpdated] = useState(false);

  const storeId = navigation.getParam("_id");

  const [items, setItems] = useState([]);

  useEffect(() => {
    const itemToSet = stores.filter((store) => store._id === storeId)[0]?.items;

    setItems(itemToSet);
  }, []);

  const [modalVisibility, setModalVisibility] = useState(false);

  const changeModalVisibility = (status) => {
    setModalVisibility(status);
  };

  const itemUpdationStatus = (status) => {
    setIsItemUpdated(status);
  };

  console.log(items, storeId);

  return (
    <View style={styles.container}>
      <View style={{ zIndex: 100 }}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.actionBtn}
          onPress={() => changeModalVisibility(true)}
        >
          <Text style={styles.floatingBtnInline}>+</Text>
        </TouchableOpacity>
      </View>
      {modalVisibility && (
        <AddItemModal
          changeModalVisibility={changeModalVisibility}
          storeId={storeId}
          itemUpdationStatus={itemUpdationStatus}
        />
      )}
      {items?.length !== 0 ? (
        <FlatList
          data={items}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <ItemCard itemId={item} storeId={storeId} />
          )}
        />
      ) : (
        <View style={styles.emptyListView}>
          <Text>No Items To Display</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
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
  floatingBtnInline: { color: "white", fontSize: 50, fontWeight: "bold" },
  emptyListView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
