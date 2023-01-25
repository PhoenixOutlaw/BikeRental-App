import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import DrawerNavigation from "./DrawerNavigation";
import AuthNavigation from "./AuthNavigation";

export default function RootNavigation() {
  const login = useSelector((state) => state.login.signedIn);

  return (
    <NavigationContainer>
      {!login ? <AuthNavigation /> : <DrawerNavigation />}
    </NavigationContainer>
  );
}
