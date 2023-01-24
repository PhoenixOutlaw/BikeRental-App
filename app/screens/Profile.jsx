import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { getuser } from "../redux/features/admin/apis/userapi";
import ReservationCard from "../components/reservation/ReservationCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import { useCallback } from "react";
import { useDrawerStatus } from "@react-navigation/drawer";

export default function Profile({ route }) {
  const userid = useSelector((state) => state.login.user.id);
  const profileid = route.params?.id ? route.params.id : userid;
  const dispatch = useDispatch();
  const nav = useNavigation();
  const [profile, setprofile] = useState(undefined);
  const userimage = "http://192.168.0.196:5000/" + profile?.image;
  const [userprofile, setuserprofile] = useState(false);
  const drawer = useDrawerStatus();
  console.log(drawer);

  useFocusEffect(
    useCallback(() => {
      dispatch(getuser({ id: profileid, success: (data) => setprofile(data) }));
      if (profileid === userid) setuserprofile(true);
      return () => {
        setuserprofile(false);
      };
    }, [profileid])
  );

  return (
    <>
      <View className="relative ">
        <ScrollView>
          <View className=" flex-row justify-between py-4 px-4 backdrop-blur-lg w-full ">
            {!userprofile ? (
              <View className=" rounded-full p-2 bg-red-300 self-start ">
                <Ionicons
                  name="chevron-back-outline"
                  size={20}
                  color="black"
                  onPress={() => nav.navigate("Dashboard")}
                />
              </View>
            ) : (
              <View />
            )}
            <TouchableOpacity
              className="rounded-full bg-red-300 p-2"
              onPress={nav.openDrawer}
            >
              <Feather name="menu" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <View className="flex items-center">
            <View className="relative">
              <Image
                source={
                  profile?.image
                    ? { uri: userimage }
                    : require("../../assets/images/avatar.webp")
                }
                className="rounded-full w-36 h-36"
              />
              {userprofile ? (
                <View className="rounded-full absolute right-2 bg-red-200 p-2">
                  <MaterialIcons
                    name="edit"
                    size={20}
                    color="black"
                    onPress={() => {
                      dispatch(currentbike(data));
                      seteditmodel(true);
                    }}
                  />
                </View>
              ) : null}
            </View>
            <View className="border-b-2 border-b-red-400 w-full p-5 rounded-xl my-5">
              <Text className="text-sm capitalize" numberOfLines={1}>
                id: {profileid}
              </Text>
              <Text className="text-sm capitalize" numberOfLines={1}>
                name: {profile?.firstName + " " + profile?.lastName}
              </Text>
              <Text className="text-sm capitalize" numberOfLines={1}>
                email: {profile?.email}
              </Text>
            </View>

            <View className="w-full p-3">
              <Text className="text-base text-center capitalize mb-4">
                Reservations
              </Text>
              {profile?.reservations.length !== 0 ? (
                profile?.reservations.map((data, i) => (
                  <ReservationCard data={data} key={i} owner={true} />
                ))
              ) : (
                <Text className="capitalize text-base text-center">
                  ---- no reservation ----
                </Text>
              )}
              {profile?.reservations.length !== 0 ? (
                <Text className="py-16 mb-20 text-center text-xl capitalize ">
                  -----End-----
                </Text>
              ) : null}
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
}
