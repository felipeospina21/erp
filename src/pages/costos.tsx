import React, { ReactElement, useEffect } from 'react';
import { checkAuth, createPdf, IsAuth } from '../utils';
import { salesData } from '@/mockData/salesData';
import { Layout } from '@/components/Shared';
import Router from 'next/router';
import dynamic from 'next/dynamic';
const LoginPage = dynamic(() => import('@/pages/login'));

export default function CostosPage({ isAuth }: IsAuth): JSX.Element {
  useEffect(() => {
    if (isAuth) return; // do nothing if the user is logged in
    Router.replace('/productos', '/login', { shallow: true });
  }, [isAuth]);

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
