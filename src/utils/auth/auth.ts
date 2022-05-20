export interface IsAuth {
  isAuth: boolean;
}

// FIXME: Not working on SSR
export function checkAuth() {
  if (typeof window !== 'undefined') {
    const isAuth = sessionStorage.getItem('isAuth');
    if (isAuth) {
      return { isAuth: true };
    } else {
      return { isAuth: false };
    }
  }
  return {};
}
