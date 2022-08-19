import { useGetUserQuery } from '@/redux/services';
// import React from 'react';

// export interface useAuthProps {
// }

export function useGetSession() {
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : '1';
  const response = useGetUserQuery(userId ?? '1');

  return response;
}
