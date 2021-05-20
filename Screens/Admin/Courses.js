import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
} from "react-native";

import baseURL from "../../assets/common/baseUrl";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFocusEffect } from "@react-navigation/native";
import { Header, Item, Input } from "native-base";
import ListItem from "./ListItem";
import EasyButton from "../../Shared/StyledComponents/EasyButton";

var { height, width } = Dimensions.get("window");
const ListHeader = () => {
  return (
    <View elevation={1} style={styles.listHeader}>
      <View style={styles.headerItem}></View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "bold" }}>Teacher</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "bold" }}>Name</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "bold" }}>Category</Text>
      </View>
      <View style={styles.headerItem}>
        <Text style={{ fontWeight: "bold" }}>Price</Text>
      </View>
    </View>
  );
};

const Courses = (props) => {
  console.log("Course " + JSON.stringify(props));
  const [courseList, setCourseList] = useState();
  const [courseFilter, setCourseFilter] = useState();
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState();

  useFocusEffect(
    useCallback(() => {
      // Get Token
      AsyncStorage.getItem("jwt")
        .then((res) => {
          setToken(res);
        })
        .catch((error) => console.log(error));

      axios.get(`${baseURL}courses`).then((res) => {
        setCourseList(res.data);
        setCourseFilter(res.data);
        setLoading(false);
      });

      return () => {
        setCourseList();
        setCourseFilter();
        setLoading(true);
      };
    }, [])
  );
  const searchCourse = (text) => {
    if (text == "") {
      setCourseFilter(courseList);
    }
    setCourseFilter(
      courseList.filter((i) =>
        i.name.toLowerCase().includes(text.toLowerCase())
      )
    );
  };

  const deleteCourse = (id) => {
    axios
      .delete(`${baseURL}courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        const courses = courseFilter.filter((item) => item.id !== id);
        setCourseFilter(courses);
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <EasyButton
          secondary
          medium
          style={{ width: 100 }}
          onPress={() => props.navigation.navigate("CourseForm")}
        >
          <Icon name="plus" size={18} color="white" />
          <Text style={styles.buttonText}> New Course</Text>
        </EasyButton>
      </View>
      <Header searchBar rounded>
        <Item style={{ padding: 5 }}>
          <Icon name="search" />
          <Input
            placeholder="Search"
            onChangeText={(text) => searchCourse(text)}
          />
        </Item>
      </Header>
      {loading ? (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <FlatList
          data={courseFilter}
          ListHeaderComponent={ListHeader}
          renderItem={({ item, index }) => (
            <ListItem
              {...item}
              navigation={props.navigation}
              index={index}
              delete={deleteCourse}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  listHeader: {
    flexDirection: "row",
    padding: 5,
    backgroundColor: "gainsboro",
  },
  headerItem: {
    margin: 3,
    width: width / 6,
  },
  spinner: {
    height: height / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    marginBottom: 160,
    backgroundColor: "white",
  },
  buttonContainer: {
    margin: 20,
    alignSelf: "center",
    flexDirection: "row",
  },
  buttonText: {
    marginLeft: 4,
    color: "white",
  },
});

export default Courses;
