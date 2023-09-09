import axios from "axios";
import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { useEffect, useState } from "react";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

export const ItemCard = ({ itemId }) => {
  const REACT_APP_BACKEND_URL = "https://virtualdressingsense.onrender.com";

  const [item, setItem] = useState({});

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
          <Button style={styles.deleteButtonBackground}>
            <Text style={styles.deleteBtnTextFormat}>Delete</Text>
          </Button>
        </Card.Actions>
      </Card>
    </>
  );
};

const styles = StyleSheet.create({
  deleteButtonBackground: { backgroundColor: "red" },
  deleteBtnTextFormat: { fontWeight: "bold", color: "white" },
});
