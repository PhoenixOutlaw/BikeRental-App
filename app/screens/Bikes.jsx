import { useDispatch, useSelector } from "react-redux";
import { getallbikes } from "../redux/features/bikes/bikeAPI";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { Octicons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import BikeCard from "../components/bike/BikeCard";
import { useState, useEffect } from "react";
import Filter from "./Filter";
import PopupModel from "../components/PopupModel";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { addbike } from "../redux/features/admin/apis/bikeAPI";
import form from "../utils/form";

// import CustomInput from "../components/CustomInput";

export default function Bikes() {
  const unavailable = useSelector((state) => state.bike.unavailablebikes);
  const available = useSelector((state) => state.bike.availablebikes);
  const role = useSelector((state) => state.login.user.role);
  const [availability, setavailability] = useState(true);
  const [addmodelvisible, setaddmodelvisible] = useState(false);
  const filter = useSelector((state) => state.bike.filter);
  const [modalvisible, setmodalvisible] = useState(false);
  const nav = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getallbikes());
  }, [filter]);
  return (
    <View className="relative">
      <View>
        <PopupModel
          animationType="slide"
          setmodalvisible={setmodalvisible}
          modalvisible={modalvisible}
        >
          <Filter close={() => setmodalvisible(false)} />
        </PopupModel>

        <PopupModel
          animationType="fade"
          bg_opacity={60}
          modalvisible={addmodelvisible}
          setmodalvisible={setaddmodelvisible}
        >
          <Addform close={() => setaddmodelvisible(false)} />
        </PopupModel>
      </View>
      <View className="w-min  border-b-4 border-gray-700">
        <View className=" bg-red-400 flex-row justify-between px-5 py-2">
        {["admin", "manager"].includes(role) ? (<TouchableOpacity onPress={() => setaddmodelvisible(true)}>
            <Ionicons name="add-circle" size={28} color="black" />
          </TouchableOpacity>):null}
          <TouchableOpacity onPress={() => setmodalvisible(true)}>
            <Octicons name="filter" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {["admin", "manager"].includes(role) ? (
          <View className="">
            <TouchableOpacity>
              <Picker
                selectedValue={availability ? "available" : "unavailable"}
                onValueChange={(Value) =>
                  setavailability(["available"].includes(Value) ? true : false)
                }
                mode="dialog"
                dropdownIconColor={availability ? "green" : "red"}
                style={{
                  marginLeft: 20,
                  marginRight: 20,
                  color: availability ? "green" : "red",
                }}
              >
                <Picker.Item style={{color:"green"}} label="Available" value="available" />
                <Picker.Item style={{color:"red"}} label="Un-Available" value="unavailable" />
              </Picker>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>

      <View className="px-4 mt-8 box-border">
        {availability ? (
          <FlatList
            data={available}
            ListFooterComponent={() => <View className="mt-60"></View>}
            renderItem={(item) => (
              <BikeCard data={item.item} available={true} />
            )}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={(props) => (
              <NotAvailable {...props} availability={availability} />
            )}
          />
        ) : (
          <FlatList
            data={unavailable}
            ListFooterComponent={() => <View className="mt-60"/>}
            renderItem={(item) => (
              <BikeCard data={item.item} available={false} />
            )}
            keyExtractor={(item) => item.id}
            extraData={availability}
            ListEmptyComponent={(props) => (
              <NotAvailable {...props} availability={availability} />
            )}
          />
        )}
      </View>
    </View>
  );
}

function Addform({ close }) {
  const [values, setvalues] = useState();
  const dispatch = useDispatch();
  function Submit() {
    dispatch(addbike(values));
    close();
  }

  return (
    <View className="bg-red-100 px-4 py-10 mx-6 rounded-lg flex items-center">
      <Text className="text-2xl mb-7">Add Bike</Text>
      {["name", "location", "model", "color"].map((value, i) => (
        <TextInput
          key={i}
          placeholder={value?.toUpperCase()}
          className="bg-white mb-4 p-3 text-base w-full"
          onChangeText={(text) =>
            form({ value: text, setvalues: setvalues, field: value })
          }
        />
      ))}
      <TouchableOpacity
        className="flex-row justify-center w-2/4 px-5 py-3 text-base bg-blue-400 rounded-xl mt-4"
        onPress={Submit}
      >
        <Text className="text-base capitalize">Add Bike</Text>
      </TouchableOpacity>
    </View>
  );
}

function NotAvailable({ availability }) {
  return (
    <View>
      <Text className="text-lg text-center justify-center capitalize mt-10 text-red-600">
        no {availability ? "available" : "un-available"} bikes
      </Text>
    </View>
  );
}
