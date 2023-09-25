import * as React from "react";
import { FlatList, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { UseStoreContext } from "../../hooks/useStoreContext";
import { deleteItemFromStore, loadItemForItemCard } from "../../services/api";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

export const ItemCard = ({ itemId, storeId, itemUpdationStatus }) => {
  const [item, setItem] = useState({});
  const [showDeleteActivityHandler, setShowDeleteActivityHandler] =
    useState(false);

  const { dispatch, stores } = UseStoreContext();

  const onDeletePressHandler = () => {
    Alert.alert("Delete Item", "Are you sure you want to delete this item?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          setShowDeleteActivityHandler(true);

          const response = await deleteItemFromStore(storeId, itemId);

          if (response.data) {
            dispatch({
              type: "RemoveItemFromStore",
              payload: { itemId, storeId },
            });

            itemUpdationStatus(true);

            Toast.show({
              type: "success",
              text1: "Item Deleted",
            });
          } else {
            Toast.show({
              type: "error",
              text1: "Unable To Delete Item",
            });
            itemUpdationStatus(false);
          }

          setShowDeleteActivityHandler(false);
        },
      },
    ]);
  };

  useEffect(() => {
    const loadItem = async () => {
      const res = await loadItemForItemCard(itemId);
      setItem(res);
    };
    loadItem();
  }, []);

  return (
    <>
      <Card style={styles.cardContiner}>
        <Card.Title
          title={`Name: ${item.itemName}`}
          subtitle={`Brand: ${item.brandName}`}
          left={LeftContent}
        />
        <Card.Cover source={{ uri: "data:image/jpeg;base64," + item.image }} />

        <Card.Content>
          <Text
            variant="titleMedium"
            style={{ marginTop: 20 }}
          >{`Gender: ${item.gender}`}</Text>
          <FlatList
            data={item.subType}
            keyExtractor={(item) => item}
            renderItem={(item) => {
              return <Text variant="bodyMedium">{`#${item.item}`}</Text>;
            }}
          />
        </Card.Content>
        <Card.Actions>
          {!showDeleteActivityHandler ? (
            <Button
              style={styles.deleteButtonBackground}
              onPress={onDeletePressHandler}
            >
              <Text style={styles.deleteBtnTextFormat}>Delete</Text>
            </Button>
          ) : (
            <ActivityIndicator size="small" color="red" />
          )}
        </Card.Actions>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  deleteButtonBackground: { backgroundColor: "red", borderColor: "red" },
  deleteBtnTextFormat: { fontWeight: "bold", color: "white" },
  cardContiner: { margin: 10 },
});
