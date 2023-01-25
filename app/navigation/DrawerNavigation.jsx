import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "../components/CustomDrawerContent";
import { TabNavigator } from "./TabNavigator";
import { Text ,View} from "react-native";

function Feed() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
    </View>
  );
}

function Article() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Article Screen</Text>
    </View>
  );
}

const DrawerNav = createDrawerNavigator();
const DrawerNavigation = () => {
  return (
    
    <DrawerNav.Navigator>
      <DrawerNav.Screen name="Feed" component={Feed} />
      <DrawerNav.Screen name="Article" component={Article} />
    </DrawerNav.Navigator>
 
  );
};

export default DrawerNavigation;
 

function DD (){
  return (
    <Text>fghjdsfh</Text>
  )
}