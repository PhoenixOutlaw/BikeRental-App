import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../../axios/axiosconfig";

export const getalluser = createAsyncThunk(
  "admin/alluser",
  async (payload, { rejectWithValue }) => {
    try {
      const query = `${payload?.search ? `&search=${payload.search}` : ""}`;
      const res = (
        await api.get(
          `/user?page=${1}&limit=${10}${query}`
        )
      ).data;
      return res; 
    } catch (err) {
      console.log(err)
      return rejectWithValue(err.response.data);
    }
  }
);
export const registeruser = createAsyncThunk(
  "admin/register_admin",
  async (payload, { rejectWithValue,dispatch }) => {
    delete payload.data.repassword;
    try {
      const res = (await api.post("/register", payload.data)).data;
      dispatch(getalluser())
      return res;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateuser = createAsyncThunk(
  "admin/user_update",
  async (payload, { rejectWithValue, dispatch, getState }) => {
    const role = getState().login.user.role;
    try {
      const res = (await api.patch(`/user/${payload.id}`, payload.updates,{
        headers: { "Content-Type": "multipart/form-data" },
      }))
        .data;
      if (role === "admin") dispatch(getalluser({}));
      if (payload.success) payload.success();
      return res;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteuser = createAsyncThunk(
  "admin/user_delete",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const res = (await api.delete(`/user/${id}`)).data;
      dispatch(getalluser({}));
      return res;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getuser = createAsyncThunk(
  "admin/getuser",
  async (payload, { rejectWithValue}) => {
    try {
      const res = (await api.get(`/user/${payload.id}`)).data;
      payload.success(res);
      return res;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
