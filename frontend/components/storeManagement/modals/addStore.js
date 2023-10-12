import React from "react";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { AddStoreForm } from "../addStoreForm";

const ModalContent = ({ changeVisibility, storeUpdateStatus }) => {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>Add Store</Text>
      <AddStoreForm
        changeVisibility={changeVisibility}
        storeUpdateStatus={storeUpdateStatus}
      />
      <Pressable style={styles.buttonClose} onPress={changeVisibility}>
        <Text style={styles.textStyle}>Close</Text>
      </Pressable>
    </View>
  );
};

export const AddStoreModal = ({
  changeModalVisibility,
  storeId,
  storeUpdateStatus,
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
              storeUpdateStatus={storeUpdateStatus}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: "100%",
    marginTop: "40%",
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
    marginTop: 15,
    backgroundColor: "crimson",
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "dodgerblue",
    textAlign: "center",
  },
});
