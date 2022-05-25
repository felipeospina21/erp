import { configureStore } from '@reduxjs/toolkit';
import { clientApi, productApi, saleApi, userApi, invoiceApi } from '@/redux/services';
import productsReducer from '@/redux/slices/productsSlice';
import clientsReducer from '@/redux/slices/clientsSlice';
import salesReducer from '@/redux/slices/salesSlice';
import userReducer from '@/redux/slices/userSlice';

export const reducer = {
  products: productsReducer,
  sales: salesReducer,
  clients: clientsReducer,
  user: userReducer,
  [clientApi.reducerPath]: clientApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [saleApi.reducerPath]: saleApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [invoiceApi.reducerPath]: invoiceApi.reducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      clientApi.middleware,
      productApi.middleware,
      saleApi.middleware,
      userApi.middleware
    ),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
