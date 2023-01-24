import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";

import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import {
  deleteuser,
  updateuser,
} from "../../redux/features/admin/apis/userapi";
import PopupModel from "../PopupModel";
import { useState } from "react";
import form from "../../utils/form";
import Notify from "../../utils/notification";
import isEmail from "validator/lib/isEmail";
import { useNavigation } from "@react-navigation/native";

export function UserCard({ data }) {
  const role = useSelector((state) => state.login.user.role);
  const [editmodel, seteditmodel] = useState(false);
  const nav = useNavigation();
  const dispatch = useDispatch();
  const userimage = data.image
    ? "http://192.168.0.196:5000/" + data.image
    : null;

  return (
    <TouchableOpacity onPress={() => nav.navigate("Profile", { id: data.id })}>
      <View>
        <PopupModel
          animationType="fade"
          setmodalvisible={seteditmodel}
          bg_opacity={40}
          modalvisible={editmodel}
        >
          <Editform user={data} close={() => seteditmodel(false)} />
        </PopupModel>
      </View>
      <View className="bg-red-300 rounded-lg p-5 mb-5">
        <View className=" relative flex-row  place-items-center justify-center space-x-10 mb-4">
          {userimage ? (
            <Image
              className="h-28 w-28 rounded-full"
              source={{ uri: userimage }}
            />
          ) : (
            <Image
              className="h-28 w-28 rounded-full"
              source={require("../../../assets/images/avatar.webp")}
            />
          )}
          {["admin"].includes(role) ? (
            <View className=" absolute flex h-full justify-center items-center space-y-6 right-0">
              <FontAwesome5
                name="edit"
                size={24}
                color="black"
                onPress={() => {
                  seteditmodel(true);
                }}
              />
              <MaterialCommunityIcons
                name="delete-empty-outline"
                size={30}
                color="black"
                onPress={() => dispatch(deleteuser(data.id))}
              />
            </View>
          ) : null}
        </View>
        <View className="">
          <Text className="text-base capitalize" numberOfLines={1}>
            id: {data?.id}
          </Text>
          <Text className="text-base capitalize">email: {data?.email}</Text>
          <Text className="text-base capitalize">role: {data?.role}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export function Editform({ user, close }) {
  const [updates, setupdates] = useState();
  const dispatch = useDispatch();
  function Submit() {
    if (Object.keys(updates).includes("email")) {
      if (!isEmail(updates.email)) {
        Notify.error("Email invalid");
        close();
        return null;
      }
    }
    dispatch(updateuser({ id: user.id, updates }));
    close();
  }

  return (
    <View className="bg-red-100 px-4 py-16 mx-6 rounded-lg flex items-center">
      <Text className="text-2xl mb-7 capitalize">Update user</Text>
      {["firstName", "lastName", "email"].map((value, i) => (
        <TextInput
          key={i}
          defaultValue={user[value]}
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
