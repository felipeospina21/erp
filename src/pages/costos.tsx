import React, { ReactElement, useEffect, useState } from 'react';
import { checkAuth, createPdf, IsAuth } from '../utils';
import { salesData } from '@/mockData/salesData';
import { Layout } from '@/components/Shared';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import ClientForm from '@/components/Clients/ClientForm/ClientForm';
const LoginPage = dynamic(() => import('@/pages/login'));

export default function CostosPage({ isAuth }: IsAuth): JSX.Element {
  const [, setDisplayModal] = useState(false);

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
      {/* <ConditionalSelect handleChange={handleChange} departmentOptions={departments} cityOptions={cities} defaultValues={inputVals}/> */}

      <ClientForm
        // onSubmit={onSubmit}
        setDisplayModal={setDisplayModal}
        buttonText="enviar"
        idTypes={[
          { _id: 'cc', name: 'CC' },
          { _id: 'nit', name: 'NIT' },
          { _id: 'passport', name: 'Pasaporte' },
          { _id: 'other', name: 'Otro' },
        ]}
        paymentTerm={[
          { _id: 'contado', name: 'contado' },
          { _id: '15', name: '15' },
          { _id: '30', name: '30' },
          { _id: '60', name: '60' },
        ]}
        // departments={departments ?? []}
        // cities={cities ?? []}
      />
    </div>
  );
}

CostosPage.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <Layout>{page}</Layout>;
};

CostosPage.getInitialProps = checkAuth;
