import React, { useEffect, useContext, useState, useCallback } from "react";
import { View, Text, ScrollView, StyleSheet, Button } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { Container } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";

import AuthGlobal from "../../Context/store/AuthGlobal";
import { logoutUser } from "../../Context/actions/Auth.action";

const UserProfile = (props) => {
    
  //Authentication Context
  const context = useContext(AuthGlobal);

  // Variables
  const [userProfile, setUserProfile] = useState();
  const [orders, setOrders] = useState();

  // On Load data
  useFocusEffect(
    useCallback(() => {
    
      if (
        context.stateUser.isAuthenticated === false ||
        context.stateUser.isAuthenticated === null
      ) {
        props.navigation.navigate("Login");
      }
    
  AsyncStorage.getItem("jwt")
            .then((res) => {
                axios
                    .get(`${baseURL}users/${context.stateUser.user.userId}`, {
                        headers: { Authorization: `Bearer ${res}` },
                    })
                    .then((user) => setUserProfile(user.data))
            })
            .catch((error) => console.log(error))
        return () => {
            setUserProfile();
            setOrders();
        }

    }, [context.stateUser.isAuthenticated]))

  return (
    <Container style={styles.container}>
      <ScrollView contentContainerStyle={styles.subContainer}>
      <Text style={{ fontSize: 30 }}> Welcome
        </Text>
        <Text style={{ fontSize: 30 }}> 
          {userProfile ? userProfile.name : " "}
        </Text>
        <View style={{ marginTop: 20 }}>
          <Text style={{ margin: 10 }}>
            Email: {userProfile ? userProfile.email : ""}
          </Text>
          <Text style={{ margin: 10 }}>
            Phone: {userProfile ? userProfile.phone : ""}
          </Text>
          <Text style={{ margin: 10 }}>
            Zip: {userProfile ? userProfile.zip : ""}
          </Text>
          <Text style={{ margin: 10 }}>
            City: {userProfile ? userProfile.city : ""}
          </Text>
          <Text style={{ margin: 10 }}>
            County: {userProfile ? userProfile.county : ""}
          </Text>
          <Text style={{ margin: 10 }}>
            School: {userProfile ? userProfile.school : ""}
          </Text>
        </View>
        <View style={{ marginTop: 80 }}>
          <Button
            title={"Sign Out"}
            onPress={() => [
              AsyncStorage.removeItem("jwt"),
              logoutUser(context.dispatch),
            ]}
          />
        </View>
      </ScrollView>
    </Container>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  subContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  order: {
    marginTop: 20,
    alignItems: "center",
    marginBottom: 60,
  },
});

export default UserProfile;
