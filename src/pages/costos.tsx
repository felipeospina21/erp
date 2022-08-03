import React, { ReactElement } from 'react';
import { checkAuth, createPdf, IsAuth, useAuth } from '../utils';
import { salesData } from '@/mockData/salesData';
import { Layout } from '@/components/Shared';
import dynamic from 'next/dynamic';
const LoginPage = dynamic(() => import('@/pages/login'));

export default function CostosPage({ isAuth }: IsAuth): JSX.Element {
  useAuth(isAuth, '/costos');

  if (!isAuth) {
    return <LoginPage />;
  }

  return (
    <div>
      <button onClick={() => createPdf(salesData, 100)}>pdf</button>
    </div>
  );
}

CostosPage.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <Layout>{page}</Layout>;
};

CostosPage.getInitialProps = checkAuth;
