import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { AddStoreForm } from "./addStoreForm";

export const CustomModal = ({ changeModalVisibility }) => {
  const changeVisibility = () => {
    changeModalVisibility(false);
  };

  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                width: "100%",
                justifyContent: "center",
              }}
            >
              <AddStoreForm changeVisibility={changeVisibility} />
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                position: "fixed",
                marginTop: 20,
                width: "100%",
              }}
            >
              <Pressable style={styles.buttonClose} onPress={changeVisibility}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
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
    backgroundColor: "red",
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
});
