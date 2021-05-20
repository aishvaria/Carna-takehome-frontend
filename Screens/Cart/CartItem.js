import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, Left, Right, ListItem, Thumbnail, Body } from "native-base";

const CartItem = (props) => {
  //Variables
  const data = props.item;

  return (
    <ListItem style={styles.listItem} key={Math.random()} avatar>
      <Left>
        <Thumbnail
          source={{
            uri: data.item.course.image
              ? data.item.course.image
              : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
          }}
        />
      </Left>
      <Body style={styles.body}>
        <Left>
          <Text>{data.item.course.name}</Text>
        </Left>
        <Right>
          <Text>$ {data.item.course.price}</Text>
        </Right>
      </Body>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  listItem: {
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center",
  },
  body: {
    margin: 10,
    alignItems: "center",
    flexDirection: "row",
  },
});

export default CartItem;
