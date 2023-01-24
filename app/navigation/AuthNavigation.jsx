import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Auth } from "../screens/Auth";

const NavStack = createNativeStackNavigator();

export default function AuthNavigation() {
  return (
    <NavStack.Navigator
      initialRouteName="Signin"
      screenOptions={{
        headerShown: false,
      }}
    >
      <NavStack.Screen name="Signin">
        {(props) => <Auth {...props} type="signin" />}
      </NavStack.Screen>
      <NavStack.Screen name="Register">
        {(props) => <Auth {...props} type="register" />}
      </NavStack.Screen>
    </NavStack.Navigator>
  );
}
