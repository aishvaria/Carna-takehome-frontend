import React, {  } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import EasyButton from "../../Shared/StyledComponents/EasyButton";

var { height, width } = Dimensions.get("window");
const Admin = (props) => {
  return (
    <View style={styles.container}>
      
          <Text style = {{alignSelf: "center", fontWeight:'bold', margin:20}}>WELCOME TO ADMIN PANEL</Text>
          <Text style = {{alignSelf: "center"}}>Please click below to add users</Text>
          <View style={styles.buttonContainer}>
          <EasyButton
          primary
          large
          onPress={() => props.navigation.navigate("Users", { item: props })}
        >
          <Icon name="user" size={18} color="white" />
          <Text style={styles.buttonText}>Users</Text>
        </EasyButton>
              </View>
              <Text style = {{alignSelf: "center"}}>Please click below to add/browse courses</Text>
              <View style={styles.buttonContainer}>
              <EasyButton
          primary
          large
          onPress={() => props.navigation.navigate("Courses")}
        >
          <Icon name="plus" size={18} color="white" />
          <Text style={styles.buttonText}>Course</Text>
        </EasyButton>
                  </View>
       
        
        <Text style = {{alignSelf: "center"}}>Please click below to add/browse categories </Text>

        <View style={styles.buttonContainer}>
        <EasyButton
          primary
          large
          onPress={() => props.navigation.navigate("Categories")}
        >
          <Icon name="plus" size={18} color="white" />
          <Text style={styles.buttonText}>Category</Text>
        </EasyButton>
        </View>
        
      </View>
    
  );
};

const styles = StyleSheet.create({
  listHeader: {
    flexDirection: "column",
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
    marginBottom: 100,
    backgroundColor: "white",
  },
  buttonContainer: {
    margin: 20,
    alignSelf: "center",
    flexDirection: "column",
  },
  buttonText: {
    marginLeft: 4,
    color: "white",
  },
});

export default Admin;
