import React, { useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getbike } from "../redux/features/bikes/bikeAPI";
import { AirbnbRating } from "react-native-ratings";
import { Ionicons } from "@expo/vector-icons";
import { currentbike } from "../redux/features/bikes/bikeSlice";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import ReservationCard from "../components/reservation/ReservationCard";
import PopupModel from "../components/PopupModel";
import form from "../utils/form";
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Notify from "../utils/notification";
import { useCallback } from "react";

export default function Bike({ route }) {
  const bike = useSelector((state) => state.bike.currentbike);
  const role = useSelector((state) => state.login.user.role);
  const [content, setcontent] = useState("reviews");
  const [addreview, setaddreview] = useState(false);
  const dispatch = useDispatch();
  const bikeid = route.params.id;
  const nav = useNavigation();

  useFocusEffect(
    useCallback(() => {
      dispatch(getbike(bikeid));

      return () => {
        setcontent("reviews");
        dispatch(currentbike(undefined));
      };
    }, [bikeid])
  );

  return (
    <ScrollView className="relative">
      <PopupModel
        setmodalvisible={setaddreview}
        animationType="fade"
        modalvisible={addreview}
        bg_opacity={60}
      >
        <Addreview bikeid={bikeid} close={() => setaddreview(false)} />
      </PopupModel>
      <View className="flex-row bg-red-400 px-3 py-2 justify-between">
        <Ionicons
          name="chevron-back-outline"
          size={24}
          color="white"
          onPress={nav.goBack}
        />
        <Text className="text-xl text-center capitalize">{bike?.name}</Text>
        {["admin", "manager"].includes(role) ? (
          ["reviews"].includes(content) ? (
            <AntDesign
              name="linechart"
              size={24}
              color="white"
              onPress={() => setcontent("reservations")}
            />
          ) : (
            <MaterialIcons
              name="preview"
              size={26}
              color="white"
              onPress={() => setcontent("reviews")}
            />
          )
        ) : (
          <View />
        )}
      </View>
      <View className="p-5">
        <AirbnbRating
          count={5}
          reviewSize={0}
          reviews={false}
          defaultRating={bike?.avgrating}
          size={28}
          ratingContainerStyle={{ marginTop: -30, alignSelf: "flex-start" }}
          isDisabled={true}
        />
        <View>
          <Image
            className="w-full object-center rounded-lg mt-2"
            source={require("../../assets/images/bike3.jpg")}
          />
        </View>
        <Text className="capitalize text-base mt-3">model: {bike?.model}</Text>
        <Text className="capitalize text-base">location: {bike?.location}</Text>
        <Text className="capitalize text-base">color: {bike?.color}</Text>
        <TouchableOpacity onPress={() => setaddreview(true)}>
          <View className="flex-row items-center mt-6 space-x-2">
            <Ionicons name="add-circle" size={30} color="black" />
            <Text className="capitalize text-base">Add Review</Text>
          </View>
        </TouchableOpacity>
        <Text className="capitalize text-center text-xl my-6 p-2 border-b-2 border-b-gray-300">
          {content}
        </Text>
        {["reviews"].includes(content)
          ? bike?.reviews.map((data, i) => <ReviewCard data={data} key={i} />)
          : bike?.reservations.map((data, i) => (
              <ReservationCard data={data} key={i} />
            ))}
        {(["reviews"].includes(content)
          ? bike?.reviews.length
          : bike?.reservations.length) === 0 ? (
          <Text className="py-16 mb-20 text-center text-xl capitalize ">
            -----no {content}-----
          </Text>
        ) : null}
      </View>
    </ScrollView>
  );
}

function ReviewCard({ data }) {
  return (
    <View className="flex-row space-x-5 px-4 pt-5 pb-3 bg-gray-200 rounded-xl">
      <View>
        <Image
          source={require("../../assets/images/avatar.webp")}
          className="rounded-full w-14 h-14"
        />
      </View>
      <View className="flex-grow">
        <Text className="capitalize bg-gray-300 self-start px-2 py-0.5 rounded-lg">
          {data.from}
        </Text>
        <AirbnbRating
          count={5}
          reviewSize={0}
          reviews={false}
          defaultRating={data.rating}
          size={24}
          ratingContainerStyle={{ marginTop: -20, alignSelf: "flex-start" }}
          isDisabled={true}
        />
        <Text className="mt-2 text-base">{data.review}</Text>
        <Text className="text-right text-gray-400">
          {data.created_at.split("T")[0]}
        </Text>
      </View>
    </View>
  );
}

function Addreview({ close }) {
  const [review, setreview] = useState(null);
  const [error, seterror] = useState(undefined);
  const dispatch = useDispatch();
  function submit() {
    if (review === null || Object.keys(review).length !== 0) {
      Notify.error("all fields are required");
    }
    if (review.rating === 0) {
      Notify.error("Rating cant be 0");
    }
    if (review.review === "") {
      Notify.error("review cant be empty");
    }
    console.log(review);
    close();
    return null;
  }

  return (
    <View className="mt-6 bg-white mx-5 p-5 pb-9 rounded-lg">
      <Text className="mb-7 capitalize text-xl text-center">add review</Text>
      <AirbnbRating
        count={5}
        reviewSize={0}
        reviews={false}
        defaultRating={0}
        size={28}
        ratingContainerStyle={{ marginTop: -10, alignSelf: "flex-start" }}
        onFinishRating={(value) =>
          form({ value: value, setvalues: setreview, field: "rating" })
        }
      />
      <TextInput
        className="text-lg p-2 px-2 mt-3 bg-slate-200 rounded-xl"
        placeholder="enter review"
        onChangeText={(value) =>
          form({ value: value, setvalues: setreview, field: "review" })
        }
      />

      <TouchableOpacity
        className="bg-red-300 rounded-xl self-center p-1 px-8 mt-8"
        onPress={submit}
      >
        <Text className="text-base capitalize">submit</Text>
      </TouchableOpacity>
    </View>
  );
}
