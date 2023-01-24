import { newfilter, resetfilter } from "../redux/features/bikes/bikeSlice";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Slider } from "@miblanchard/react-native-slider";
import { useEffect, useState } from "react";
import Notify from "../utils/notification";
import { useDispatch, useSelector } from "react-redux";
import form from "../utils/form";
import {
  Pressable,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from "react-native";
import moment from "moment";

export default function Filter({ close }) {
  const [dates, setDates] = useState({ from: new Date(), to: new Date() });
  const [type, settype] = useState("none");
  const [show, setshow] = useState(false);
  const appliedfilter = useSelector((state) => state.bike.filter);
  const [filter, setfilter] = useState(appliedfilter);
  const dateFormat = "YYYY-MM-DD HH:mm";
  const dispatch = useDispatch();

  function confirm(value) {
    const change =
      type === "from"
        ? {
            from: moment(value).format(dateFormat),
            to: moment(value).format(dateFormat),
          }
        : { to: moment(value).format(dateFormat) };
    try {
      setDates({ ...dates, ...change });
      dispatch(newfilter(dates));
    } catch (error) {
      Notify.error(error.message);
    } finally {
      settype("none");
      setshow((e) => !e);
    }
  }
  function cancel() {
    settype("none");
    setshow((e) => !e);
  }
  useEffect(() => {
    dispatch(newfilter(dates));
  }, [dates]);

  return (
    <View className="bg-red-100 h-5/6 p-8 mx-3 rounded-md border-t-8 border-red-600 flex justify-between pb-16">
      <View>
        <DateTimePickerModal
          isVisible={show}
          mode="date"
          minimumDate={type === "from" ? dates.from : dates.to}
          onConfirm={(value) => confirm(value)}
          onCancel={() => cancel()}
        />
        <View className="flex-row space-x-2 py-4">
          {["from", "to"].map((date, i) => (
            <Pressable
              key={i}
              className="flex-1 bg-gray-100 rounded-md px-4 py-4 capitalize"
              onPress={() => {
                setshow(true);
                settype(date);
              }}
            >
              <Text className="text-base" numberOfLines={1}>
                {date} :{dates[date].toLocaleDateString()}
              </Text>
            </Pressable>
          ))}
        </View>
        {["name", "location", "model", "color"].map((value, i) => (
          <TextInput
            key={i}
            placeholder={value.toLocaleUpperCase()}
            className="bg-white mb-3 p-3 text-base"
            value={filter[value]}
            onChangeText={(text) =>
              form({ value: text, setvalues: setfilter, field: value })
            }
          />
        ))}

        <View className="flex-row items-center justify-between mt-3">
          <Text className="text-base">{filter.rating}</Text>
          <View className="w-10/12">
            <Slider
              value={filter.rating}
              minimumValue={0}
              maximumValue={5}
              step={0.5}
              onValueChange={(value) =>
                form({
                  value: value[0],
                  field: "rating",
                  setvalues: setfilter,
                })
              }
            />
          </View>
        </View>
      </View>
      {["filter", "reset"].map((btn, i) => (
        <TouchableOpacity
          key={i}
          className="bg-red-400 p-3 rounded-lg"
          // disabled
          onPress={() => {
            i ? dispatch(resetfilter()) : dispatch(newfilter(filter));
            close();
          }}
        >
          <Text className="text-base capitalize text-center">{btn}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
