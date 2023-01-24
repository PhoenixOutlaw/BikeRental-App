import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "../components/CustomDrawerContent";
import { TabNavigator } from "./TabNavigator";
import { Text ,View} from "react-native";

const DrawerNav = createDrawerNavigator();
const DrawerNavigation = () => {
  return (
    
    <DrawerNav.Navigator
        // drawerContent={(props) => <CustomDrawerContent {...props} />}
        initialRouteName="BottomTabs"
        screenOptions={{
          drawerPosition: "right",
        }}
        >
        <DrawerNav.Screen name="BottomTabs" component={TabNavigator} />
      </DrawerNav.Navigator>
 
  );
};

export default DrawerNavigation;
 

function DD (){
  return (
    <Text>fghjdsfh</Text>
  )
}