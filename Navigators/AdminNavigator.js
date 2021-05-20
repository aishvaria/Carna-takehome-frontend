import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Users from "../Screens/Admin/Users";
import Admin from "../Screens/Admin/Admin";
import Courses from "../Screens/Admin/Courses";
import Categories from "../Screens/Admin/Categories";
import CourseForm from "../Screens/Admin/CourseForm";

const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Admin"
        component={Admin}
        options={{
          title: "Admin",
        }}
      />
      <Stack.Screen name="Categories" component={Categories} />
      <Stack.Screen name="Users" component={Users} />
      <Stack.Screen name="Courses" component={Courses} />
      <Stack.Screen name="CourseForm" component={CourseForm} />
    </Stack.Navigator>
  );
}
export default function AdminNavigator() {
  return <MyStack />;
}
