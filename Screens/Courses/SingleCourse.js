import React, { useState, useEffect, useContext } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import { Left, Right, Container, H1 } from "native-base";

import Toast from "react-native-toast-message";
import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";
import EasyButton from "../../Shared/StyledComponents/EasyButton";

import AuthGlobal from "../../Context/store/AuthGlobal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import baseURL from "../../assets/common/baseUrl";
import axios from "axios";

var { width } = Dimensions.get("window");

// Content Container
const Item = (props) => { 
const context = useContext(AuthGlobal);
  return (
    <View style={styles.item}>
      <Text>Title: {props.item.title} </Text>
      <Text>Description: {props.item.description}</Text>
    
    
        <View style={{ flexDirection: "row" }}>
            <EasyButton
            primary
            medium
            onPress={() => {
              props.edit(props.item);
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Edit</Text>
          </EasyButton>
          <EasyButton danger medium onPress={() => props.delete(props.item._id)}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Delete</Text>
          </EasyButton>
        </View>
   </View>
          
       
  
  )
        }

const SingleCourse = (props) => {
  //Authentication Context
  const context = useContext(AuthGlobal);

  //Variables
  const [course, setCourse] = useState([]);
  const [content, setContent] = useState();
  const [token, setToken] = useState();
  const [itemid, setItemId] = useState(props.route.params.item.id);
  const [item, setItem] = useState(props.route.params.item);
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);

  // On Load data
  useEffect(() => {
    AsyncStorage.getItem("jwt")
      .then((res) => {
        setToken(res);
      })
      .catch((error) => console.log(error));

    axios
      .get(`${baseURL}courses/${itemid}`)
      .then((res) => {
        setCourse(res.data);
        setItemId(res.data._id);
        setItem(res.data.content);
        setContent(res.data.content);
      })
      .catch((error) => alert("Error to load course"));

    return () => {
      setCourse();
      setToken();
      setContent();
      setItemId();
    };
  }, []);

  // Delete Content
  const deleteContent = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`${baseURL}content/${id}`, config)
      .then((res) => {
        const updatedContent = content.filter((item) => item.id !== id);
        setContent(updatedContent);
      })
      .catch((error) => alert(error));
  };

  // Edit Content
  const editContent = (id) => {
    props.navigation.navigate("Content Detail", {
      item: {
        courseid: course.id,
        contentid: id,
        title: title,
        description: description,
      },
    });
  };

  //Add Content
  const addContent = () => {
      console.log("course "+course.id)
    props.navigation.navigate("Content Detail", {
      item: { courseid: course.id },
    });
  };

  return (
    <Container style={styles.container}>
      <ScrollView style={{ marginBottom: 80, padding: 5 }}>
        <View>
          <Image
            source={{
              uri: item.image,
            }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.contentContainer}>
          <H1 style={styles.contentHeader}>{course.name}</H1>
          <Text style={styles.contentText}>{course.description}</Text>
          <View style={{ width: "100%", position: "relative", height: "100%" }}>
            <View style={{ marginBottom: 60 }}>
              <FlatList
                data={content}
                renderItem={({ item, index }) => (
                  <Item
                    item={item}
                    index={index}
                    title={item.title}
                    description={item.description}
                    edit={editContent}
                    delete={deleteContent}
                  />
                )}
                keyExtractor={(item) => {
                  item.id;
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.bottomContainer}>
        <Left>
          <Text style={styles.price}>$ {course.price}</Text>
        </Left>
        <Right>
          {context.stateUser.isAuthenticated ? (
            <EasyButton 
            secondary 
            medium 
            onPress={addContent}>
              <Text style={{ color: "white" }}>Add Content</Text>
            </EasyButton>
          ) : (
            <EasyButton
              primary
              medium
              onPress={() => {
                props.addItemToCart(course),
                  Toast.show({
                    topOffset: 60,
                    type: "success",
                    text1: `${course.name} added to Cart`,
                    text2: "Go to your cart to complete order",
                  });
              }}
            >
              <Text style={{ color: "white" }}>Add to Cart</Text>
            </EasyButton>
          )}
        </Right>
      </View>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (course) =>
      dispatch(actions.addToCart({ quantity: 1, course })),
  };
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    height: "100%",
  },
  imageContainer: {
    backgroundColor: "white",
    padding: 0,
    margin: 0,
  },
  image: {
    width: "100%",
    height: 250,
  },
  contentContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  contentHeader: {
    fontWeight: "bold",
    marginBottom: 20,
  },
  contentText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  bottomContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white",
  },
  price: {
    fontSize: 24,
    margin: 20,
    color: "red",
  },
  availabilityContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  availability: {
    flexDirection: "row",
    marginBottom: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  icontainer: {
    flexDirection: "row",
    padding: 5,
    width: width,
  },
  image: {
    borderRadius: 50,
    width: width / 6,
    height: 20,
    margin: 2,
  },
  item: {
    flexWrap: "wrap",
    margin: 3,
    width: width / 6,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
  },
  bottomBar: {
    backgroundColor: "white",
    width: width,
    height: 60,
    padding: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
  },
  item: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
    padding: 5,
    margin: 5,
    backgroundColor: "white",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 5,
  },
});

export default connect(null, mapDispatchToProps)(SingleCourse);
