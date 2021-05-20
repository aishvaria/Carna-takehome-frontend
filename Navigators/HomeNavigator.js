import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CourseContainer from "../Screens/Courses/CourseContainer";
import SingleCourse from "../Screens/Courses/SingleCourse";
import Content from "../Screens/Courses/Content";

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={CourseContainer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Course Detail"
        component={SingleCourse}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Content Detail"
        component={Content}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function HomeNavigator() {
  return <MyStack />;
}
