import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";

const SaveButton = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity style={styles.modalButton} onPress={toggleModal}>
        <Ionicons name="bookmarks-outline" size={20} color={"white"} />
        <Text style={styles.modalText}>Saved</Text>
      </TouchableOpacity> */}

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Save to</Text>

          <TouchableOpacity style={styles.listItem}>
            <Text style={styles.listText}>Reading List</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.createList}>
            <Text style={styles.createListText}>Create new list...</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.doneButton} onPress={toggleModal}>
            <Text style={styles.doneText}>Done</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 10,
    borderRadius: 5,
  },
  modalText: {
    color: "white",
    marginLeft: 5,
    fontSize: 16,
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  listItem: {
    paddingVertical: 10,
  },
  listText: {
    fontSize: 16,
  },
  createList: {
    marginTop: 10,
  },
  createListText: {
    color: "green",
    fontSize: 16,
  },
  doneButton: {
    marginTop: 20,
    alignSelf: "flex-end",
  },
  doneText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SaveButton;
