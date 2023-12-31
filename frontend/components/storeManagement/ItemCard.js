import * as React from "react";
import { FlatList, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { UseStoreContext } from "../../hooks/useStoreContext";
import { UseBackEndApi } from "../../services/api";
import { colorVariants, fontFamily, fontStyle } from "../../global/string";

const LeftContent = (props) => <Avatar.Icon {...props} icon="tshirt-crew" />;

export const ItemCard = ({ itemId, storeId, itemUpdationStatus }) => {
  const [item, setItem] = useState({});
  const [showDeleteActivityHandler, setShowDeleteActivityHandler] =
    useState(false);

  const { dispatch } = UseStoreContext();

  const { deleteItemFromStore, loadItemForItemCard } = UseBackEndApi();

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
      <Card style={styles.cardContiner} elevated elevation={1}>
        <Card.Title
          title={`Name: ${
            item.itemName && typeof item.itemName === "string"
              ? item.itemName.charAt(0).toUpperCase() + item.itemName.slice(1)
              : ""
          }`}
          subtitle={`Brand: ${
            item.brandName && typeof item.brandName === "string"
              ? item.brandName.charAt(0).toUpperCase() + item.brandName.slice(1)
              : ""
          }`}
          style={{
            fontFamily: fontFamily.titleText,
          }}
          left={LeftContent}
        />
        <Card.Cover source={{ uri: "data:image/jpeg;base64," + item.image }} />

        <Card.Content>
          <Text
            variant="titleMedium"
            style={{
              marginTop: 20,
              fontWeight: "normal",
              fontFamily: fontFamily.subTitleText,
            }}
          >{`Gender: ${item.gender}`}</Text>

          <Text
            variant="titleMedium"
            style={{
              fontWeight: "normal",
              fontFamily: fontFamily.subTitleText,
            }}
          >{`Price: $${item.price}`}</Text>

          <Text
            variant="titleMedium"
            style={{
              fontWeight: "normal",
              fontFamily: fontFamily.subTitleText,
            }}
          >
            {`Color: ${
              item.color && typeof item.color === "string"
                ? item.color.charAt(0).toUpperCase() + item.color.slice(1)
                : ""
            }`}
          </Text>

          <FlatList
            data={item.subType}
            keyExtractor={(item) => item}
            style={{
              marginTop: 20,
            }}
            renderItem={(item) => {
              return (
                <Text
                  variant="bodyMedium"
                  style={{
                    fontFamily: fontFamily.subTitleText,
                  }}
                >{`#${item.item}`}</Text>
              );
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
  deleteButtonBackground: {
    backgroundColor: "crimson",
    borderWidth: 0,
  },
  deleteBtnTextFormat: {
    fontWeight: "bold",
    color: "white",
    fontStyle: fontStyle.normal,
  },
  cardContiner: { margin: 10 },
});
