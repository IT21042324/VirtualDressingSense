import * as React from "react";
import { StyleSheet } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";

const LeftContent = (props) => <Avatar.Icon {...props} icon="disc" />;

export const ItemCard = (props) => (
  <Card>
    <Card.Title
      title={props.cardTopTitle}
      subtitle={props.cardTopSubtitle}
      left={LeftContent}
    />
    <Card.Cover source={props.cardImage} />
    <Card.Content>
      <Text variant="titleLarge">{props.cardEndTitle}</Text>
      <Text variant="bodyMedium">{props.cardEndDesc}</Text>
    </Card.Content>
    <Card.Actions>
      <Button>Edit</Button>
      <Button style={styles.deleteButtonBackground}>
        <Text style={styles.deleteBtnTextFormat}>Delete</Text>
      </Button>
    </Card.Actions>
  </Card>
);

const styles = StyleSheet.create({
  deleteButtonBackground: { backgroundColor: "red" },
  deleteBtnTextFormat: { fontWeight: "bold", color: "white" },
});
