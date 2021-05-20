import React from "react";
import { StyleSheet, View, Dimensions, Image, Text } from "react-native";

import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";
import Toast from "react-native-toast-message";
import EasyButton from "../../Shared/StyledComponents/EasyButton";

var { width } = Dimensions.get("window");

const CourseCard = (props) => {
  //Variables
  const { name, price, image } = props;

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{
          uri: image,
        }}
      />
      <View style={styles.card} />
      <Text style={styles.title}></Text>
      <Text style={styles.price}>${price}</Text>
      <View style={{ marginTop: 20 }}>
        <EasyButton
          primary
          medium
          onPress={() => {
            props.addItemToCart(props),
              Toast.show({
                topOffset: 60,
                type: "success",
                text1: `${name} added to Cart`,
                text2: "Go to your cart to complete order",
              });
          }}
        >
          <Text style={{ color: "white" }}>Add</Text>
        </EasyButton>
      </View>
    </View>
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
    width: width / 2 - 20,
    height: width / 1.7,
    padding: 10,
    borderRadius: 10,
    marginTop: 55,
    marginBottom: 5,
    marginLeft: 10,
    alignItems: "center",
    elevation: 8,
    backgroundColor: "white",
  },
  image: {
    width: width / 2 - 20 - 10,
    height: width / 2 - 20 - 30,
    backgroundColor: "transparent",
    position: "absolute",
    top: -45,
  },
  card: {
    marginBottom: 10,
    height: width / 2 - 20 - 90,
    backgroundColor: "transparent",
    width: width / 2 - 20 - 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  price: {
    fontSize: 20,
    color: "orange",
    marginTop: 10,
  },
});

export default connect(null, mapDispatchToProps)(CourseCard);
