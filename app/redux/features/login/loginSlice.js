import { createSlice } from "@reduxjs/toolkit";
import { delAppstore } from "../../../utils/appstore";
import Notify from "../../../utils/notification";
import { getloggeduser, login, register, registeruser } from "./loginAPI";

const initialState = {
  user: undefined,
  accessToken: undefined,
  reservations: undefined,
  signedIn: false,
  status: "idle",
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    updateuserinfo:(state,action)=>{
      state.user= action.payload
    },
    reservation:(state, action)=>{
      state.reservations= action.payload
    },
    signin(state) {
      state.signedIn = true;
    },
    signout(state) {
      state.signedIn = false;
      state.user = undefined;
      state.accessToken = undefined;
      delAppstore("token")
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "idle";
        Notify.success("Login successful");
        state.user = action.payload.user;
        state.signedIn = true;
        state.accessToken = action.payload.jwttoken;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        Notify.error(action?.payload?.message);
      });

    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "idle";
        state.signedIn = true;
        Notify.success("Login successful");
        state.user = action.payload.user;
        state.accessToken = action.payload.jwttoken;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        Notify.error(action?.payload.message);
      });

    builder
      .addCase(getloggeduser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getloggeduser.fulfilled, (state, action) => {
        state.status = "idle";
        state.signedIn = true;
        state.user = action.payload;
      })
      .addCase(getloggeduser.rejected, (state, action) => {
        state.status = "failed";
        Notify.error(action?.payload.message);
      });
  },
});

export const { signin, signout,reservation,updateuserinfo } = loginSlice.actions;
export const selectCount = (state) => state.counter.value;
export default loginSlice.reducer;
