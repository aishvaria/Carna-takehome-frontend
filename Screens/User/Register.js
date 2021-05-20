import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import EasyButton from "../../Shared/StyledComponents/EasyButton";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = (props) => {
  //Variables
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [zip, setZip] = useState("");
  const [type, setType] = useState("");
  const [county, setCounty] = useState("");
  const [city, setCity] = useState("");
  const [school, setSchool] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [item, setItem] = useState("");
  const [token, setToken] = useState();

  // On Load data
  useEffect(() => {
    if (!props.route.params) {
      setItem(null);
    } else {
      setItem(props.route.params.item);
      setName(props.route.params.item.name);
      setEmail(props.route.params.item.email);
      setPhone(props.route.params.item.phone);
      setSchool(props.route.params.item.school);
      setZip(props.route.params.item.zip);
      setType(props.route.params.item.type);
      setCity(props.route.params.item.City);
      setCounty(props.route.params.item.County);
    }

    // Token for Authentication
    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    return () => {};
  }, []);

  // Add new user
  const register = () => {
    if (email === "" || name === "" || phone === "" || password === "") {
      setError("Please fill in the form correctly");
    }

    let user = {
      name: name,
      email: email,
      passwordHash: password,
      phone: phone,
      isAdmin: false,
    };

    let formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("type", type);
    formData.append("school", school);
    formData.append("zip", zip);
    formData.append("city", city);
    formData.append("county", county);
    formData.append("type", type);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    // posting user data to backend
    axios
      .post(`${baseURL}users/`, user)
      .then((res) => {
        if (res.status == 200) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Registration Succeeded",
            text2: "Please Login into your account",
          });
          setTimeout(() => {
            props.navigation.navigate("Login");
          }, 500);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "error",
          text1: "Something went wrong",
          text2: "Please try again",
        });
      });
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Register"}>
        <Input
          placeholder={"Email"}
          name={"email"}
          id={"email"}
          value={email}
          onChangeText={(text) => setEmail(text.toLowerCase())}
        />
        <Input
          placeholder={"Name"}
          name={"name"}
          id={"name"}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder={"School"}
          name={"school"}
          id={"school"}
          value={school}
          onChangeText={(text) => setSchool(text)}
        />
        <Input
          placeholder={"Zip"}
          name={"zip"}
          id={"zip"}
          keyboardType={"numeric"}
          value={zip}
          onChangeText={(text) => setZip(text)}
        />
        <Input
          placeholder={"City"}
          name={"city"}
          id={"city"}
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <Input
          placeholder={"County"}
          name={"county"}
          id={"county"}
          value={county}
          onChangeText={(text) => setCounty(text)}
        />
        <Input
          placeholder={"Phone Number"}
          name={"phone"}
          id={"phone"}
          value={phone}
          keyboardType={"numeric"}
          onChangeText={(text) => setPhone(text)}
        />
        <Input
          placeholder={"Password"}
          name={"passwordHash"}
          id={"passwordHash"}
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
        </View>
        <View>
          <EasyButton large primary onPress={() => register()}>
            <Text style={{ color: "white" }}>Register</Text>
          </EasyButton>
        </View>
        <View>
          <EasyButton
            large
            secondary
            onPress={() => props.navigation.navigate("Login")}
          >
            <Text style={{ color: "white" }}>Back to Login</Text>
          </EasyButton>
        </View>
      </FormContainer>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    margin: 10,
    alignItems: "center",
  },
});

export default Register;
