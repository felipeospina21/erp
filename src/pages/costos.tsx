import React, { ReactElement } from 'react';
import { checkAuth, createInvoice, IsAuth, useAuth } from '../utils';
import { salesData } from '@/mockData/salesData';
import { Layout } from '@/components/Shared';
// import dynamic from 'next/dynamic';
// import { createPackingList } from '@/utils/pdf/createPackingList';
import { Button, Flex } from '@chakra-ui/react';
import { useUpdateSaleRefCountMutation } from '@/redux/services';
// const LoginPage = dynamic(() => import('@/pages/login'));

export default function CostosPage({ isAuth }: IsAuth): JSX.Element {
  useAuth(isAuth, '/costos');
  const [updateSaleRef] = useUpdateSaleRefCountMutation();

  const list = [1, 2, 3, 4, 5];

  async function newSale(): Promise<void> {
    const res = await updateSaleRef().unwrap();
    console.log(res);
  }

  async function handleSaleRef(): Promise<void> {
    for (let i = 0; i < list.length; i++) {
      await newSale();
    }
  }

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
      <Button variant="solid" size="md" w="10rem" m="1rem" onClick={handleSaleRef}>
        saleRef
      </Button>
    </Flex>
  );
}

CostosPage.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <Layout>{page}</Layout>;
};

CostosPage.getInitialProps = checkAuth;
