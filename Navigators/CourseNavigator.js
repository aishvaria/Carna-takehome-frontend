import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Orders from "../Screens/Admin/Order";
import Courses from "../Screens/Admin/Courses";
import CourseForm from "../Screens/Admin/CourseForm";
import Categories from "../Screens/Admin/Categories";

const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Courses"
        component={Courses}
        options={{
          title: "Courses",
        }}
      />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="CourseForm" component={CourseForm} />
    </Stack.Navigator>
  );
}
export default function CourseNavigator() {
  return <MyStack />;
}
