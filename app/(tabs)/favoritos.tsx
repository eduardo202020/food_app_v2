import { View, Text, ImageBackground } from "react-native";
import React from "react";

type Props = {};

const favoritos = (props: Props) => {
  return (
    <ImageBackground
      source={require("@/assets/images/madera4.jpg")}
      style={{ flex: 1 }}
      width={100}
    ></ImageBackground>
  );
};

export default favoritos;
