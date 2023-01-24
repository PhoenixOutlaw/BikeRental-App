import { TouchableOpacity, Image, View, Text } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../redux/features/login/loginSlice";

export default function BottomNavigation(props) {
  const screens = [
    {
      name: "Home",
      icon: <Entypo name="home" size={24} color="black" />,
      action: () => navigation.navigate("Home"),
    },
    {
      name: "Dashboard",
      icon: <MaterialIcons name="dashboard" size={24} color="black" />,
      action: () => navigation.navigate("Dashboard"),
    },
  ];

  const navigation = useNavigation();
  const route =useRoute();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.login.user);
  const userimage = "http://192.168.0.196:5000/" + user.image;

  return (
    <View className="bg-gray-500 flex-row justify-between py-3 px-14 items-center ">
      {screens.map((screen) => (
        <TouchableOpacity key={screen.name} onPress={screen?.action}>
          {screen.icon}
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Image
          source={
            user?.image
              ? { uri: userimage }
              : require("../../assets/images/avatar.webp")
          }
          className="rounded-full w-8 h-8"
        />
      </TouchableOpacity>
    </View>
  );
}
