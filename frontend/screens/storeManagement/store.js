import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { ItemCard } from "../../components/storeManagement/ItemCard";
import { useState } from "react";
import { AddItemModal } from "../../components/storeManagement/modals/addItem";

export default function Store({ navigation }) {
  const items = navigation.getParam("items");
  const storeId = navigation.getParam("_id");
  const [modalVisibility, setModalVisibility] = useState(false);

  const changeModalVisibility = (status) => {
    setModalVisibility(status);
  };

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
        />
      )}

      {items.length !== 0 ? (
        <FlatList
          data={items}
          keyExtractor={(item) => item._id}
          renderItem={(item) => <ItemCard />}
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
