import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { citiesApi, api } from './services';
import productsReducer from './slices/productsSlice';
import clientsReducer from './slices/clientsSlice';
import salesReducer from './slices/salesSlice';
import userReducer from './slices/userSlice';
import shippingReducer from './slices/shippingSlice';
import { rtkQueryErrorLogger } from './middleware/handleError';

export const reducer = {
  products: productsReducer,
  sales: salesReducer,
  clients: clientsReducer,
  user: userReducer,
  shipping: shippingReducer,
  [api.reducerPath]: api.reducer,
  [citiesApi.reducerPath]: citiesApi.reducer,
};

export const middlewares = [
  api.middleware,
  citiesApi.middleware,
  // rtkQueryErrorLogger,
];

export const store = () =>
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(...middlewares)
        .concat(rtkQueryErrorLogger),
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
