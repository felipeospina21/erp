import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import {
  clientApi,
  productApi,
  saleApi,
  userApi,
  invoiceApi,
  categoryApi,
  citiesApi,
  taxApi,
} from './services';
import productsReducer from './slices/productsSlice';
import clientsReducer from './slices/clientsSlice';
import salesReducer from './slices/salesSlice';
import userReducer from './slices/userSlice';
import shippingReducer from './slices/shippingSlice';

export const reducer = {
  products: productsReducer,
  sales: salesReducer,
  clients: clientsReducer,
  user: userReducer,
  shipping: shippingReducer,
  [clientApi.reducerPath]: clientApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [saleApi.reducerPath]: saleApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [invoiceApi.reducerPath]: invoiceApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [citiesApi.reducerPath]: citiesApi.reducer,
  [taxApi.reducerPath]: taxApi.reducer,
};

export const middlewares = [
  clientApi.middleware,
  productApi.middleware,
  saleApi.middleware,
  userApi.middleware,
  invoiceApi.middleware,
  categoryApi.middleware,
  citiesApi.middleware,
  taxApi.middleware,
];

export const store = () =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middlewares),
  });

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(store);

// export const store = configureStore({
//   reducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(
//       clientApi.middleware,
//       productApi.middleware,
//       saleApi.middleware,
//       userApi.middleware,
//       invoiceApi.middleware
//     ),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
