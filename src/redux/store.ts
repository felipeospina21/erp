import { configureStore } from '@reduxjs/toolkit';
// import { createWrapper } from 'next-redux-wrapper';
import { clientApi, productApi, saleApi, userApi, invoiceApi } from './services';
import productsReducer from './slices/productsSlice';
import clientsReducer from './slices/clientsSlice';
import salesReducer from './slices/salesSlice';
import userReducer from './slices/userSlice';

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

// export const store = () =>
//   configureStore({
//     reducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware().concat(
//         clientApi.middleware,
//         productApi.middleware,
//         saleApi.middleware,
//         userApi.middleware
//       ),
//   });

// export type AppStore = ReturnType<typeof store>;
// export type RootState = ReturnType<AppStore['getState']>;
// export type AppDispatch = AppStore['dispatch'];

// export const wrapper = createWrapper<AppStore>(store, { debug: true });

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      clientApi.middleware,
      productApi.middleware,
      saleApi.middleware,
      userApi.middleware,
      invoiceApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
