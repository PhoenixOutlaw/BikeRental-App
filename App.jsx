import loadfonts from "./app/utils/fontload";
import * as SplashScreen from "expo-splash-screen";
import { Gbs } from "./app/styles/Global.style";
import Toast from "react-native-toast-message";
import { store } from "./app/redux/store";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import Main from "./app/Main";
import { SafeAreaView, View } from "react-native";



export default function App() {
  // SplashScreen.preventAutoHideAsync();
  
  
  return (
    <Provider store={store}>
      <SafeAreaView style={Gbs.SafeArea} className=" flex flex-1 relative">
        <Main/>
        
      </SafeAreaView>
    </Provider>
  );
}
