import axios from "axios";
import * as React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { useEffect, useState } from "react";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const ItemCard = ({ itemId }) => {
  const [item, setItem] = useState({});
  useEffect(() => {
    console.log(itemId);
    const loadItem = async () => {
      try {
        const { data } = await axios.get(`${backendUrl}/api/items/${itemId}`);
        console.log(data);
        const brandData = await axios.get(
          `${backendUrl}/api/brands/${data.brand}`
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
        <Card.Cover source={{ uri: item.image }} />
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
