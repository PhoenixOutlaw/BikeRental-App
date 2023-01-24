import { signout } from "../redux/features/login/loginSlice";
 import { getAppstore } from "./appstore";
import { store } from "../redux/store";
import jwt_decode from "jwt-decode";
import Notify from "./notification";

export default async function validjwt(fnc) {
  const token = await  getAppstore("token");
  const utoken = store.getState().login.accessToken;
  const exp = jwt_decode(utoken ? utoken : token).exp;
  const now = new Date().getTime() / 1000;
  if (!utoken && !token) return null;
  if (exp > now) {
    fnc();
    return null;
  }
  Notify.error("Access expired login again");
  store.dispatch(signout());
  return null;
}
