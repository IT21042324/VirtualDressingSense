import { View, Text, StyleSheet, FlatList } from "react-native";
import { ItemCard } from "../../components/storeManagement/ItemCard";
import { useEffect, useState } from "react";
import { AddItemModal } from "../../components/storeManagement/modals/addItem";
import { UseStoreContext } from "../../hooks/useStoreContext";
import { UseHelperContext } from "../../hooks/useHelperContextProvider";

export default function Store({ navigation }) {
  const { stores } = UseStoreContext();
  const [isItemsUpdated, setIsItemUpdated] = useState(false);

  const storeId = navigation.getParam("_id");

  const [items, setItems] = useState([]);

  useEffect(() => {
    const itemToSet = stores.filter((store) => store._id === storeId)[0]?.items;

    setItems(itemToSet);

    console.log(itemToSet);

    setIsItemUpdated(false);
  }, [isItemsUpdated]);

  const { helperContext, dispatch } = UseHelperContext();

  const { showAddItemForm } = helperContext;

  const changeModalVisibility = (status) => {
    dispatch({
      type: "showAddItemFormStatus",
      status,
    });
  };

  const itemUpdationStatus = (status) => {
    setIsItemUpdated(status);
  };

  return (
    <View style={styles.container}>
      {showAddItemForm && (
        <AddItemModal
          changeModalVisibility={changeModalVisibility}
          storeId={storeId}
          itemUpdationStatus={itemUpdationStatus}
        />
      )}
      {items?.length !== 0 ? (
        <FlatList
          data={items}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <ItemCard
              itemId={item}
              storeId={storeId}
              itemUpdationStatus={itemUpdationStatus}
            />
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
  emptyListView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
