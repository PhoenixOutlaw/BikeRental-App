import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../screens/Dashboard";
import BottomNavigation from "../components/BottomNavigation";
import Bike from "../screens/Bike";
import Bikes from "../screens/Bikes";
import Profile from "../screens/Profile";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  return (
    <>
      <Tab.Navigator
        tabBar={(props) => <BottomNavigation {...props} />}
        initialRouteName='Profile'
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="Home" component={Bikes} />
        <Tab.Screen name="Bike" component={Bike} />
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </>
  );
};
