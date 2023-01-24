import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  SafeAreaView,
} from "react-native";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getalluser, registeruser } from "../redux/features/admin/apis/userapi";
import { UserCard } from "../components/dashboard/UserCard";
import form from "../utils/form";
import PopupModel from "../components/PopupModel";
import { useState } from "react";
import Notify from "../utils/notification";
import { isEmail, isStrongPassword } from "validator";
import { strongPasswordOpt } from "../constants";

export default function Dashboard() {
  const users = useSelector((state) => state.admin.users);
  const [addform, setaddform] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getalluser());
  }, []);

  return (
    <View>
      <PopupModel
        setmodalvisible={setaddform}
        animationType="fade"
        modalvisible={addform}
        bg_opacity={20}
      >
        <Addform close={() => setaddform(false)} />
      </PopupModel>
      <View>
        <View className=" bg-red-400 flex-row justify-between px-5 py-2">
          <TouchableOpacity onPress={() => setaddform(true)}>
            <Ionicons name="add-circle" size={28} color="black" />
          </TouchableOpacity>
          <Text className=" capitalize text-center text-xl">Users</Text>
          <TouchableOpacity onPress={() => console.log("pressed")}>
            <Octicons name="filter" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View className="px-5 my-7">
          <FlatList
            data={users}
            keyExtractor={(item) => item.id}
            renderItem={(item) => <UserCard data={item.item} />}
            ListFooterComponent={() => (
              <Text className="py-16 mb-20 text-center text-xl capitalize ">
                -----End-----
              </Text>
            )}
            ListEmptyComponent={() => <Text> no user</Text>}
          />
        </View>
      </View>
    </View>
  );
}

function Addform({ close }) {
  const [values, setvalues] = useState(null);
  const [errors, seterrors] = useState();
  const dispatch = useDispatch();
  function Submit() {
    if (values === null || Object.keys(values).length < 5) {
      Notify.error("All fields are required");
      return null;
    }
    if (!isEmail(values.email)) {
      form({
        value: "Please Enter a Valid Email",
        setvalues: seterrors,
        field: "e2",
      });
      return null;
    }
    form({ value: "", setvalues: seterrors, field: "e2" });
    if (!isStrongPassword(values.password, strongPasswordOpt)) {
      form({
        value:
          "Password must contain 1lowercase, 1uppercase, 1number, 1alphanum and min of 6ch",
        setvalues: seterrors,
        field: "e3",
      });
      return null;
    }
    form({ value: "", setvalues: seterrors, field: "e3" });
    if (values.password !== values.repassword) {
      form({
        value: "Password does not match",
        setvalues: seterrors,
        field: "e4",
      });
      return null;
    }
    form({ value: "", setvalues: seterrors, field: "e4" });
    console.log(values);
    dispatch(registeruser({ data: values }));
    close();
  }
  return (
    <View className="bg-red-100 px-4 py-16 mx-6 rounded-lg flex items-center">
      <Text className="text-2xl mb-7 capitalize">add user</Text>
      {["firstName", "lastName", "email", "password", "repassword"].map(
        (value, i) => (
          <View className="mb-4 w-full">
            <TextInput
              key={i}
              placeholder={value}
              className="bg-white p-3 text-base "
              onChangeText={(text) =>
                form({ value: text, setvalues: setvalues, field: value })
              }
            />
            {errors != null && Object.keys(errors).includes(`e${i}`) ? (
              <Text className="bg-red-500 rounded-b-3xl px-6 py-1 capitalize text-sm">
                {errors[`e${i}`]}
              </Text>
            ) : null}
          </View>
        )
      )}
      <TouchableOpacity
        className="flex-row justify-center w-2/4 px-5 py-3 text-base bg-blue-400 rounded-xl mt-4"
        onPress={Submit}
      >
        <Text className="text-base capitalize">add user</Text>
      </TouchableOpacity>
    </View>
  );
}
