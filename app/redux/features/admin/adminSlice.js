import { createSlice } from "@reduxjs/toolkit";
import Notify from "../../../utils/notification";
import { addbike, deletebike, updatebike } from "./apis/bikeAPI";
import { deleteuser, getalluser, registeruser, updateuser } from "./apis/userapi";

const initialState = {
  users: [],
  currentuser: undefined,
  total: 0,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setcurrentuser: (state, action) => {
      state.currentuser = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addbike.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addbike.fulfilled, (state, action) => {
        state.status = "idle";
        Notify.success("Bike Added");
      })
      .addCase(addbike.rejected, (state, action) => {
        state.status = "failed";
        Notify.error(action?.payload?.message);
      });

    builder
      .addCase(deletebike.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletebike.fulfilled, (state, action) => {
        state.status = "idle";
        Notify.success("Bike Deleted");
      })
      .addCase(deletebike.rejected, (state, action) => {
        state.status = "failed";
        Notify.error(action?.payload.message);
      });

    builder
      .addCase(updatebike.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updatebike.fulfilled, (state, action) => {
        state.status = "idle";
        Notify.success("Bike Updated");
      })
      .addCase(updatebike.rejected, (state, action) => {
        state.status = "failed";
        Notify.error(action?.payload.message);
      });

    builder
      .addCase(getalluser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getalluser.fulfilled, (state, action) => {
        state.status = "idle";
        state.users = action.payload.users;
        state.total = action.payload.total;
      })
      .addCase(getalluser.rejected, (state, action) => {
        state.status = "failed";
        Notify.error(action?.payload?.message);
      });

    builder
      .addCase(registeruser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registeruser.fulfilled, (state, action) => {
        state.status = "idle";
        Notify.success("user registered successfully");  
      })
      .addCase(registeruser.rejected, (state, action) => {
        state.status = "failed";
        Notify.error(action?.payload.message);
      });

    builder
      .addCase(deleteuser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteuser.fulfilled, (state, action) => {
        state.status = "idle";
        Notify.success("user Deleted");
      })
      .addCase(deleteuser.rejected, (state, action) => {
        state.status = "failed";
        Notify.error(action?.payload.message);
      });

    builder
      .addCase(updateuser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateuser.fulfilled, (state, action) => {
        state.status = "idle";
        Notify.success("user Updated");
      })
      .addCase(updateuser.rejected, (state, action) => {
        state.status = "failed";
        Notify.error(action?.payload.message);
      });
  },
});

export const { setcurrentuser } = adminSlice.actions;
export default adminSlice.reducer;
