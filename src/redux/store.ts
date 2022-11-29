import { configureStore } from '@reduxjs/toolkit';
import { citiesApi, api } from './services';
import clientsReducer from './slices/clientsSlice';
import salesReducer from './slices/salesSlice';
import userReducer from './slices/userSlice';
import shippingReducer from './slices/shippingSlice';
import { rtkQueryErrorLogger } from './middleware/handleError';

export const reducer = {
  sales: salesReducer,
  clients: clientsReducer,
  user: userReducer,
  shipping: shippingReducer,
  [api.reducerPath]: api.reducer,
  [citiesApi.reducerPath]: citiesApi.reducer,
};

export const middlewares = [api.middleware, citiesApi.middleware];

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(...middlewares)
      .concat(rtkQueryErrorLogger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
