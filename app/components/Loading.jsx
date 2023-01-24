import React from "react";
import {  Image, View } from "react-native";


export default function Loading({ loading }) {
  return (
    <View className="h-screen w-screen justify-center items-center bg-black absolute z-10 ">
      <Image
        className=" opacity-40"
        source={require("../../assets/gif/loading.gif")}
      ></Image>
    </View>
  );
}
