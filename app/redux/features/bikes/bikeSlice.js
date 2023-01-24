import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import Notify from "../../../utils/notification";
import { getallbikes, getbike } from "./bikeAPI";

const dateFormat = "YYYY-MM-DD HH:mm";

const initialState = {
  availablebikes: undefined,
  unavailablebikes: undefined,
  filter: {
    from: moment(new Date()).format(dateFormat),
    to: moment(new Date()).format(dateFormat),
    rating: 0,
    page: 1,
    limit: 10,
  },
  total: 0,
  currentbike: undefined,
  status: "idle",
};

export const bikeSlice = createSlice({
  name: "bike",
  initialState,
  reducers: {
    currentbike: (state, action) => {
      state.currentbike = action.payload;
    },
    newfilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    resetfilter: (state) => {
      state.filter = {
        from: new Date(),
        to: new Date(),
        rating: 0,
        page: 1,
        limit: 10,
      };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getallbikes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getallbikes.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload.data?.available)
          state.availablebikes = action.payload.data.available[0];
        if (action.payload.data?.unavailable)
          state.unavailablebikes = action.payload.data.unavailable;
        state.total = action.payload.total;
      })
      .addCase(getallbikes.rejected, (state, action) => {
        state.status = "failed";
        Notify.error(action?.payload?.message);
      });

    builder
      .addCase(getbike.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getbike.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(getbike.rejected, (state, action) => {
        state.status = "failed";
        Notify.error(action?.payload.message);
      });
  },
});

export const { currentbike, newfilter, resetfilter } = bikeSlice.actions;
export const selectCount = (state) => state.counter.value;
export default bikeSlice.reducer;
