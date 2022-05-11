import { configureStore } from '@reduxjs/toolkit';
import { clientApi, productApi, saleApi } from './services';
import productsReducer from './slices/productsSlice';
import clientsReducer from './slices/clientsSlice';
import salesReducer from './slices/salesSlice';

export const reducer = {
  products: productsReducer,
  sales: salesReducer,
  clients: clientsReducer,
  [clientApi.reducerPath]: clientApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [saleApi.reducerPath]: saleApi.reducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      clientApi.middleware,
      productApi.middleware,
      saleApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
