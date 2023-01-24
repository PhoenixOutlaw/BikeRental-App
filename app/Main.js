import { getloggeduser } from "./redux/features/login/loginAPI";
import RootNavigation from "./navigation/RootNavigation";
import { useDispatch, useSelector } from "react-redux";
import { getAppstore } from "./utils/appstore";
import Loading from "./components/Loading";
import api from "./axios/axiosconfig";
import { View } from "react-native";
import { useEffect } from "react";
import { useState } from "react";
import 'react-native-gesture-handler';

export default function Main() {
  const [loading, setloading] = useState(true);
  const apiloading = useSelector((state) => state.login.status);

  const dispatch = useDispatch();
  useEffect(() => {
    getAppstore("token").then((res) => {
      const token = res;
      if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        dispatch(getloggeduser());
      }
      setloading(false);
    });
  }, [dispatch]);
  return apiloading === "loading" || loading ? <Loading /> : <RootNavigation />;
}
