import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../axios/axiosconfig";
import { setAppstore } from "../../../utils/appstore";

export const login = createAsyncThunk(
  "log/signin",
  async (payload, { rejectWithValue }) => {
    try {
      const res = (await api.post("/signin", payload.data)).data;
      setAppstore("token", res.jwttoken);
      if (payload?.success) payload.success();
      return res;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "log/register",
  async (payload, { rejectWithValue }) => {
    delete payload.data.repassword;
    payload.data.role = "regular";
    try {
      const res = (await api.post("/register", payload.data)).data;
      setAppstore("token", res.jwttoken);
      payload.success();
      return res;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getloggeduser = createAsyncThunk(
  "log/getloggeduser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = (await api.get("/logged")).data;
      if(payload?.success) {
        payload.success()
      }
      return res;
    } catch (err) {
      console.log(err)
      return rejectWithValue(err.response.data);
    }
  }
);
