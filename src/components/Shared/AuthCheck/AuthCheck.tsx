import { useGetSession } from '@/hooks/useGetSession';
import React, { ReactElement } from 'react';
import { LargeSpinner } from '../Loaders';

interface AuthCheckProps {
  children: JSX.Element | ReactElement;
}

export function AuthCheck({ children }: AuthCheckProps): ReactElement {
  const session = useGetSession();

  if (session.isLoading || session.isError) {
    return <LargeSpinner />;
  }

  return children;
}
