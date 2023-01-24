import { useNavigation } from "@react-navigation/native";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function ReservationCard({ data, owner }) {
  const { bike, active, ...reservation } = data;
  const nav = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => (bike ? nav.navigate("Bike", { id: bike.id }) : null)}
    >
      <View
        className={`bg-gray-200 w-full px-3 py-5 mb-4 rounded-3xl flex-row space-x-5 border-r-8 ${
          active ? "border-r-green-400" : "border-r-red-400"
        }`}
      >
        <View className="relative">
          <Image
            className="h-28 w-28 rounded-full"
            source={require("../../../assets/images/bike2.jpg")}
          />
        </View>
        <View className="flex-grow">
          {bike ? (
            <>
              <Text className="text-sm capitalize w-4/6" numberOfLines={1}>
                id: {bike.id}
              </Text>
              <Text className="text-sm capitalize" numberOfLines={1}>
                bike: {bike.name}
              </Text>
            </>
          ) : null}
          <Text className="text-sm capitalize" numberOfLines={1}>
            from: {reservation.from.split("T")[0]}
          </Text>
          <Text className="text-sm capitalize" numberOfLines={1}>
            to: {reservation.to.split("T")[0]}
          </Text>
          <Text
            className={`text-sm capitalize ${
              active ? "text-green-500" : "text-red-500"
            }`}
            numberOfLines={1}
          >
            {active ? "active" : "inactive"}
          </Text>
          {active && owner ? (
            <TouchableOpacity>
              <Text className="text-base capitalize bg-green-400 self-start text-right rounded-xl px-3 py-1 mt-2 text-white">
                Cancel Reservation
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}
