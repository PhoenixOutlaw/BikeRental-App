import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
const dir = "../../assets/fonts/";


export default async function loadfonts({load}) {
  await Font.loadAsync(fonts);
  await SplashScreen.hideAsync();
  load(true);
}

export const fonts = {
  "RubikDistressed-Regular": require(dir + "RubikDistressed-Regular.ttf"),
  "FiraSans-Light": require(dir + "FiraSans-Light.ttf"),
  "FiraSans-Black": require(dir + "FiraSans-Black.ttf"),
  "PTSerif-Regular": require(dir + "PTSerif-Regular.ttf"),
}