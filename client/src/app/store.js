import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import sgReducer from "../features/sg/sgSlice";
import noReducer from "../features/no/noSlice";
import poReducer from "../features/po/poSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sg: sgReducer,
    no: noReducer,
    po: poReducer,
  },
});
