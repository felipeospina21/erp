import React, { ReactElement } from 'react';
import { checkAuth, createInvoice, IsAuth, useAuth } from '../utils';
import { salesData } from '@/mockData/salesData';
import { Layout } from '@/components/Shared';
// import dynamic from 'next/dynamic';
import { createPackingList } from '@/utils/pdf/createPackingList';
import { Button, Flex } from '@chakra-ui/react';
// const LoginPage = dynamic(() => import('@/pages/login'));

export default function CostosPage({ isAuth }: IsAuth): JSX.Element {
  useAuth(isAuth, '/costos');

  // if (!isAuth) {
  //   return <LoginPage />;
  // }

  return (
    <Flex flexDir="column">
      <Button
        variant="solid"
        size="md"
        w="10rem"
        m="1rem"
        onClick={() => createInvoice(salesData, 100)}
      >
        factura
      </Button>
      <Button
        variant="solid"
        size="md"
        w="10rem"
        m="1rem"
        onClick={() => createPackingList(salesData, 100)}
      >
        remision
      </Button>
    </Flex>
  );
}

CostosPage.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <Layout>{page}</Layout>;
};

CostosPage.getInitialProps = checkAuth;
