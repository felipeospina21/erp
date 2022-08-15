import { useEffect } from 'react';
import Router from 'next/router';

export function useAuth(isAuth: boolean, path: string): void {
  useEffect(() => {
    if (isAuth) return; // do nothing if the user is logged in
    Router.replace(path, '/login', { shallow: true });
  }, [isAuth, path]);
}
