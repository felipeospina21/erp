import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import salesBtnReducer from "./slices/salesBtnSlice";
import clientsReducer from "./slices/clientsSlice";
import salesReducer from "./slices/salesSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    salesBtn: salesBtnReducer,
    sales: salesReducer,
    clients: clientsReducer,
  },
});
