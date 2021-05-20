import React from "react";
import { TouchableOpacity, View, Dimensions } from "react-native";

var { width } = Dimensions.get("window");
import CourseCard from "./CourseCard";

const CourseList = (props) => {
  //Variables
  const { item } = props;

  return (
    <TouchableOpacity
      style={{ width: "50%" }}
      onPress={() => props.navigation.navigate("Course Detail", { item: item })}
    >
      <View style={{ width: width / 2, backgroundColor: "gainsboro" }}>
        <CourseCard {...item} />
      </View>
    </TouchableOpacity>
  );
};

export default CourseList;
