import { useGetUserQuery } from '@/redux/services';

export function useGetSession() {
  const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : '1';
  const response = useGetUserQuery(userId ?? '1');

  return response;
}
