import reservationReducer from "../features/reservation/reservationSlice";
import reviewReducer from "../features/review/reviewSlice";
import loginReducer from "../features/login/loginSlice";
import adminReducer from "../features/admin/adminSlice";
import bikeReducer from "../features/bikes/bikeSlice";
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  reducer: {
    login: loginReducer,
    bike: bikeReducer,
    review: reviewReducer,
    reservation: reservationReducer,
    admin: adminReducer,
  },
},window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
