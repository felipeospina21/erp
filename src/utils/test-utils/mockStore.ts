import { configureStore } from '@reduxjs/toolkit';
import { reducer, middlewares } from '@/redux/store';

export const mockStore = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
});
export type RootState = ReturnType<typeof mockStore.getState>;
export type AppDispatch = typeof mockStore.dispatch;
