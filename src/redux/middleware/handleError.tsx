import { MiddlewareAPI, isRejectedWithValue, Middleware } from '@reduxjs/toolkit';

export const rtkQueryErrorLogger: Middleware =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      if (action.payload.status === 401) {
        setTimeout(() => {
          window.sessionStorage.removeItem('isAuth');
          window.location.href = '/login';
        }, 1000);
      }
    }

    return next(action);
  };
