import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Dimensions,
} from "react-native";
import { Container, Header, Icon, Item, Input, Text } from "native-base";
import { useFocusEffect } from "@react-navigation/native";
import CourseList from "./CourseList.js";
import SearchedCourses from "./SearchedCourses.js";
import CategoryFilter from "./CategoryFilter";

import baseUrl from "../../assets/common/baseUrl";
import axios from "axios";

var { height } = Dimensions.get("window");

const CourseContainer = (props) => {
  // Variables
  const [courses, setCourses] = useState([]);
  const [coursesFiltered, setCoursesFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [categories, setCategories] = useState([]);
  const [coursesCtg, setCoursesCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setinitialState] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      setFocus(false);
      setActive(-1);

      // Products
      axios
        .get(`${baseUrl}courses`)
        .then((res) => {
          setCourses(res.data);
          setCoursesFiltered(res.data);
          setCoursesCtg(res.data);
          setinitialState(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Api call error");
        });
      // Categories

      axios
        .get(`${baseUrl}categories`)
        .then((res) => {
          setCategories(res.data);
        })
        .catch((error) => {
          console.log("Api call error");
        });

      return () => {
        setCourses([]);
        setCoursesFiltered([]);
        setFocus();
        setCategories([]);
        setActive();
        setinitialState();
      };
    }, [])
  );

  // Courses Methods
  const searchCourses = (text) => {
    setCoursesFiltered(
      courses.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  // Categories
  const changeCtg = (ctg) => {
    {
      console.log(courses);
      ctg === "all"
        ? [setCoursesCtg(initialState), setActive(true)]
        : [
            setCoursesCtg(
              courses.filter((i) => i.category._id === ctg),
              setActive(true)
            ),
          ];
    }
  };
  return (
    <>
      {loading == false ? (
        <Container>
          <Header searchBar rounder>
            <Item>
              <Icon name="ios-search" />
              <Input
                placeholder="Search"
                onFocus={openList}
                onChangeText={(text) => searchCourses(text)}
              />
              {focus == true ? (
                <Icon onPress={onBlur} name="ios-close" />
              ) : null}
            </Item>
          </Header>
          {focus == true ? (
            <SearchedCourses
              navigation={props.navigation}
              coursesFiltered={coursesFiltered}
            />
          ) : (
            <ScrollView>
              <View>
                <View>
                  <CategoryFilter
                    categories={categories}
                    categoryFilter={changeCtg}
                    coursesCtg={coursesCtg}
                    active={active}
                    setActive={setActive}
                  />
                </View>
                {coursesCtg.length > 0 ? (
                  <View style={styles.listContainer}>
                    {coursesCtg.map((item) => {
                      return (
                        <CourseList
                          navigation={props.navigation}
                          key={item.name}
                          item={item}
                        />
                      );
                    })}
                  </View>
                ) : (
                  <View style={[styles.center, { height: height / 2 }]}>
                    <Text>No products found</Text>
                  </View>
                )}
              </View>
            </ScrollView>
          )}
        </Container>
      ) : (
        // Loading
        <Container style={[styles.center, { backgroundColor: "#f2f2f2" }]}>
          <ActivityIndicator size="large" color="red" />
        </Container>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  listContainer: {
    height: height * 2 - 100,
    paddingBottom: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "gainsboro",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CourseContainer;
