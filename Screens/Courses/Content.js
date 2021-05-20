import React, { useEffect, useContext, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import FormContainer from "../../Shared/Form/FormContainer";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import Toast from "react-native-toast-message";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import EasyButton from "../../Shared/StyledComponents/EasyButton";

import axios from "axios";
import baseURL from "../../assets/common/baseUrl";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Content = (props) => {
  //Variables
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [item, setItem] = useState("");
  const [token, setToken] = useState("");
  const [courseId, setCourseId] = useState(props.route.params.item.courseid);
  const [contentId, setContentId] = useState("");

  // On Load data
  useEffect(() => {
    console.log("In content for course id"+JSON.stringify(props))
    if (props.route.params.item.courseid === undefined) {
        console.log("course 1 id" +courseId);
      setItem(null);
    } else {
        setCourseId(props.route.params.item.courseid);
      console.log("prop 2 id" +props.route.params.item.courseid);
      setItem(props.route.params.item);
      console.log("course 2 id" +courseId);

      if(props.route.params.item.contentid){
        setContentId(props.route.params.item.contentid.id);
        setTitle(props.route.params.item.contentid.title);
        setDescription(props.route.params.item.contentid.description);
      }
       
    }

    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    return () => {};
  }, []);

  const addcontent = () => {
    if (title === "" || description === "") {
      setError("Please fill in the content details correctly");
    }

    let content = {
      title: title,
      description: description,
    };

    let formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };
    if (contentId.length > 5) {
      
      axios
        .put(`${baseURL}content/${contentId}`, content)
        .then((res) => {
          if (res.status == 200) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "Content Added",
            });
          }
        })
        .catch((error) => {
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Something went wrong",
          });
        });
    } else {
        const id  = props.route.params.item.courseid;
        console.log( "content" +JSON.stringify(content))
      axios
        .post(`${baseURL}content/${props.route.params.item.courseid}`, content)
        .then((res) => {
          if (res.status == 200) {
            Toast.show({
              topOffset: 60,
              type: "success",
              text1: "Content Added",
            });
          }
        })
        .catch((error) => {
          Toast.show({
            topOffset: 60,
            type: "error",
            text1: "Something went wrong",
          });
        });
    }
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <FormContainer title={"Content"}>
        <Input
          placeholder={"Title"}
          name={"title"}
          id={"title"}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <Input
          placeholder={"Description"}
          name={"description"}
          id={"description"}
          value={description}
          onChangeText={(text) => setDescription(text)}
        />

        <View style={styles.buttonGroup}>
          {error ? <Error message={error} /> : null}
        </View>
        <View>
          <EasyButton large primary onPress={() => addcontent()}>
            <Text style={{ color: "white" }}>Add Content</Text>
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

export default Content;
