import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slices/productsSlice";
import clientsReducer from "./slices/clientsSlice";
import salesReducer from "./slices/salesSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    sales: salesReducer,
    clients: clientsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
