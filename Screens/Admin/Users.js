import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TextInput,
  StyleSheet,
} from "react-native";
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import baseURL from "../../assets/common/baseUrl";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { add } from "react-native-reanimated";
import Icon from "react-native-vector-icons/FontAwesome";
var { width } = Dimensions.get("window");

// User Data Container
const Item = (props) => {
  return (
    <View style={styles.item}>
      <Text>Name: {props.item.name}</Text>
      <Text>Email: {props.item.email}</Text>
      <Text>Phone: {props.item.phone}</Text>
      <Text>Type:{props.item.type}</Text>
      <Text>School:{props.item.school}</Text>
      <Text>Zip:{props.item.zip}</Text>
      <Text>City:{props.item.city}</Text>
      <View style={{ flexDirection: "row" }}>
        <EasyButton
          primary
          medium
          onPress={() => {
            console.log(props.item);
            props.edit(props.item);
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Edit</Text>
        </EasyButton>
        <EasyButton danger medium onPress={() => props.delete(props.item._id)}>
          <Text style={{ color: "white", fontWeight: "bold" }}>Delete</Text>
        </EasyButton>
      </View>
    </View>
  );
};

const Users = (props) => {
  //Variables
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState();
  const [token, setToken] = useState();

  // On Load data
  useEffect(() => {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    axios
      .get(`${baseURL}users`)
      .then((res) => setCategories(res.data))
      .catch((error) => alert("Error to load categories"));

    return () => {
      setCategories();
      setToken();
    };
  }, []);

  const addCategory = () => {
    const category = {
      name: categoryName,
    };

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${baseURL}users`, category, config)
      .then((res) => setCategories([...categories, res.data]))
      .catch((error) => alert("Error to load categories"));

    setCategoryName("");
  };

  const deleteCategory = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`${baseURL}users/${id}`, config)
      .then((res) => {
        const newCategories = categories.filter((item) => item.id !== id);
        setCategories(newCategories);
      })
      .catch((error) => alert("Error to load categories"));
  };

  const editUser = (id) => {
    props.navigation.navigate("Register", { item: id });
  };

  return (
    <View style={{ position: "relative", height: "100%" }}>
      <View style={{ marginBottom: 60 }}>
        <FlatList
          data={categories}
          renderItem={({ item, index }) => (
            <Item
              item={item}
              index={index}
              edit={editUser}
              delete={deleteCategory}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.bottomBar}>
        <View style={{ flexDirection: "row" }}>
          <EasyButton
            secondary
            medium
            onPress={() => props.navigation.navigate("Register")}
          >
            <Icon name="plus" size={18} color="white" />
            <Text style={{ fontWeight: "bold" }}>New User</Text>
          </EasyButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    backgroundColor: "white",
    width: width,
    height: 60,
    paddingLeft: 150,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },
  item: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
    padding: 5,
    margin: 5,
    backgroundColor: "white",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
});

export default Users;
