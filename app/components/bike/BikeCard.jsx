import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PopupModel from "../PopupModel";
import { useNavigation } from "@react-navigation/native";
import { currentbike } from "../../redux/features/bikes/bikeSlice";
import form from "../../utils/form";
import {
  deletebike,
  updatebike,
} from "../../redux/features/admin/apis/bikeAPI";
import { update } from "lodash";
import { addreservation } from "../../redux/features/reservation/reservationAPI";

export default function BikeCard({ data, available }) {
  const { name, location, avgrating, color } = data;
  const role = useSelector((state) => state.login.user.role);
  const [editmodel, seteditmodel] = useState(false);
  const nav = useNavigation();
  const dispatch = useDispatch();

  return (
    <>
      <PopupModel
        animationType="fade"
        modalvisible={editmodel}
        setmodalvisible={seteditmodel}
        onclosefn={() => dispatch(currentbike(undefined))}
      >
        <Editform bike={data} close={() => seteditmodel(false)} />
      </PopupModel>
      <TouchableOpacity onPress={() => nav.navigate("Bike", { id: data.id })}>
        <View className="border-2 border-gray-50 mb-6 bg-white flex px-2 pt-2 pb-0 rounded-xl">
          <Image
            className="self-center w-full rounded-xl "
            source={require("../../../assets/images/bike3.jpg")}
          />
          <View className="flex-row justify-between px-2 py-4">
            <View>
              <View className="flex-row items-center space-x-5">
                <Text
                  className={`text-xl font-bold capitalize ${
                    available ? "text-green-600" : "text-red-500"
                  }  opacity-60`}
                >
                  {name}
                </Text>
                <View
                  className={`${
                    available ? "bg-green-600" : "bg-red-500"
                  } rounded-full h-2 w-2`}
                ></View>
              </View>
              <Text className="text-sm font-medium capitalize text-gray-700 mt-1">
                {color}
              </Text>
              <AirbnbRating
                count={5}
                reviewSize={0}
                reviews={false}
                defaultRating={avgrating}
                size={20}
                ratingContainerStyle={{
                  marginTop: -20,
                  alignSelf: "flex-start",
                }}
                isDisabled={true}
              />

              <Text className="text-sm capitalize text-gray-700 mt-1">
                {location}
              </Text>
            </View>
            {["admin"].includes(role) ? (
              <View className="flex space-y-7 mt-2 mb-4 mr-2 items-center justify-center">
                <FontAwesome5
                  name="edit"
                  size={24}
                  color="black"
                  onPress={() => {
                    dispatch(currentbike(data));
                    seteditmodel(true);
                  }}
                />
                <MaterialCommunityIcons
                  name="delete-empty-outline"
                  size={30}
                  color="black"
                  onPress={() => dispatch(deletebike(data.id))}
                />
              </View>
            ) : null}
          </View>
          {["regular", "manager", "admin"].includes(role)&& available ? (
            <TouchableOpacity className="bg-red-400 mb-5 p-3 rounded-lg "
            onPress={()=>dispatch(addreservation({id: data.id}))}
            >
              <Text className="text-lg text-center capitalize ">Reserve</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </TouchableOpacity>
    </>
  );
}

function Editform({ bike, close }) {
  const [updates, setupdates] = useState();
  const dispatch = useDispatch();
  function Submit() {
    dispatch(updatebike({ id: bike.id, updates }));
    close();
  }

  return (
    <View className="bg-red-100 px-4 py-16 mx-6 rounded-lg flex items-center">
      <Text className="text-2xl mb-7">Update Bike</Text>
      {(["name", "location", "model", "color"]).map((value, i) => (
        <TextInput
          key={i}
          defaultValue={bike[value]}
          className="bg-white mb-4 p-3 text-base w-full"
          onChangeText={(text) =>
            form({ value: text, setvalues: setupdates, field: value })
          }
        />
      ))}
      <TouchableOpacity
        className="flex-row justify-center w-2/4 px-5 py-3 text-base bg-blue-400 rounded-xl mt-4"
        onPress={Submit}
      >
        <Text className="text-base">Edit</Text>
      </TouchableOpacity>
    </View>
  );
}
