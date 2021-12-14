import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import salesBtnReducer from "./slices/salesBtnSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    salesBtn: salesBtnReducer,
  },
});
