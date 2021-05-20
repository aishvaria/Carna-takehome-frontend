import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import EasyButton from "../../Shared/StyledComponents/EasyButton";

var { width } = Dimensions.get("window");

const ContentItem = (props) => {
    //Variables
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              underlayColor="#E8E8E8"
              onPress={() => {
                setModalVisible(false);
              }}
              style={{
                alignSelf: "flex-end",
                position: "absolute",
                top: 5,
                right: 10,
              }}
            >
              <Icon name="close" size={20} />
            </TouchableOpacity>
            <EasyButton
              medium
              secondary
              onPress={() => [
                props.navigation.navigate("CourseForm", { item: item }),
                setModalVisible(false),
              ]}
            >
              <Text style={styles.textStyle}>Edit</Text>
            </EasyButton>
            <EasyButton
              medium
              danger
              onPress={() => [item.delete(props.id), setModalVisible(false)]}
            >
              <Text style={styles.textStyle}>Delete</Text>
            </EasyButton>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate("Course Detail", { item: item });
        }}
        onLongPress={() => setModalVisible(true)}
        style={[
          styles.icontainer,
          {
            backgroundColor: props.index % 2 == 0 ? "white" : "gainsboro",
          },
        ]}
      >
        <Text style={styles.item}>{props.name}</Text>
        <Text style={styles.item}>{props.teacher}</Text>
        {props.content.map((x) => {
          return (
            <View>
              <Text style={styles.item} key={x.id} item={x.title}>
                Title: {x.title}
              </Text>
            </View>
          );
        })}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 5,
    width: width,
  },
  image: {
    borderRadius: 50,
    width: width / 6,
    height: 20,
    margin: 2,
  },
  item: {
    flexWrap: "wrap",
    margin: 3,
    width: width / 6,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ContentItem;
