import axios from "axios";
import * as React from "react";
import { FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

export const ItemCard = ({ itemId, storeId }) => {
  const REACT_APP_BACKEND_URL = "https://virtualdressingsense.onrender.com";

  const [item, setItem] = useState({});

  const [showDeleteActivityHandler, setShowDeleteActivityHandler] =
    useState(false);

  const onDeletePressHandler = async () => {
    setShowDeleteActivityHandler(true);
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Zjc0M2UwNDAzNzQxZDQzNmMxZTZiZSIsImlhdCI6MTY5MzkyNjM2OCwiZXhwIjoxNjk0MTg1NTY4fQ.S5gfmagFa3zWtUlTyMbTpxEum8JfMLg8ufEJC0rRroU";

      const { data } = await axios.patch(
        `${REACT_APP_BACKEND_URL}/api/stores/delete/item/${storeId}`,
        { itemId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Toast.show({
        type: "success",
        text1: "Item Deleted",
      });
      console.log(data);
    } catch (err) {
      Toast.show({
        type: "error",
        text1: "Unable To Delete Item",
        text2: err,
      });
    }
    setShowDeleteActivityHandler(false);
  };

  useEffect(() => {
    const loadItem = async () => {
      try {
        const { data } = await axios.get(
          `${REACT_APP_BACKEND_URL}/api/items/${itemId}`
        );
        const brandData = await axios.get(
          `${REACT_APP_BACKEND_URL}/api/brands/${data.brand}`
        );

        setItem({ ...data, brandName: brandData.data.brandName });
      } catch (err) {
        console.error(err.message);
      }
    };
    loadItem();
  }, []);

  return (
    <>
      <Card>
        <Card.Title
          title={item.itemName}
          subtitle={item.brandName}
          left={LeftContent}
        />
        <Card.Cover source={{ uri: "data:image/jpeg;base64," + item.image }} />

        <Card.Content>
          <Text variant="titleLarge">{`Gender : ${item.gender}`}</Text>
          <FlatList
            data={item.subType}
            keyExtractor={(item) => item}
            renderItem={(item) => {
              return <Text variant="bodyMedium">{`#${item.item}`}</Text>;
            }}
          />
        </Card.Content>
        <Card.Actions>
          <Button>Edit</Button>

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
  deleteButtonBackground: { backgroundColor: "red" },
  deleteBtnTextFormat: { fontWeight: "bold", color: "white" },
});
