import React from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { AddItemForm } from "../addItemForm";
import { colorVariants } from "../../../global/string";

export const AddItemModal = ({
  changeModalVisibility,
  storeId,
  itemUpdationStatus,
}) => {
  const changeVisibility = () => {
    changeModalVisibility(false);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={changeVisibility}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ModalContent
              changeVisibility={changeVisibility}
              storeId={storeId}
              itemUpdationStatus={itemUpdationStatus}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const ModalContent = ({ changeVisibility, storeId, itemUpdationStatus }) => {
  return (
    <View style={styles.content}>
      <AddItemForm
        changeVisibility={changeVisibility}
        storeId={storeId}
        itemUpdationStatus={itemUpdationStatus}
      />
      <Pressable style={styles.buttonClose} onPress={changeVisibility}>
        <Text style={styles.textStyle}>Close</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    width: "100%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "dodgerblue",
    padding: 35,
    alignItems: "center",
    shadowColor: "red",
    shadowOffset: {
      width: 20,
      height: 20,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    marginTop: 5,
    backgroundColor: colorVariants.red,
    padding: 10,
    elevation: 2,
    width: "100%",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  // Add styles for the modal content
  content: {
    width: "100%",
    justifyContent: "center",
  },
});
