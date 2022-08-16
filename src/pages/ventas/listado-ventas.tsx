import { SaleRow } from '@/components/Sales/SalesList/SaleRow';
import { CustomTable, Layout } from '@/components/Shared';
import { useGetSalesQuery } from '@/redux/services';
import { checkAuth, IsAuth } from '@/utils/auth';
import { useAuth } from '@/utils/hooks';
import { Box, Th } from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import dynamic from 'next/dynamic';
const LoginPage = dynamic(() => import('@/pages/login'));

export default function SalesListPage({ isAuth }: IsAuth): ReactElement {
  const { data: salesList } = useGetSalesQuery();

  const headers = [
    { name: 'doc', label: 'Numero Documento' },
    { name: 'client', label: 'Cliente' },
    { name: 'total', label: 'Total' },
    { name: 'createdAt', label: 'Fecha' },
    { name: 'status', label: 'Status' },
    { name: 'actions', label: '' },
  ];

  useAuth(isAuth, '/ventas/listado-ventas');

  if (!isAuth) {
    return <LoginPage />;
  }

  return (
    <Box
      maxW="var(--maxPageWitdth)"
      m={['1rem', null, '1rem 2rem']}
      bgColor="brand.bgLight"
      borderRadius="3xl"
      boxShadow={'var(--boxShadow)'}
    >
      <CustomTable
        Headers={headers.map((header) => (
          <Th key={header.name} textAlign="center" p="1rem">
            {header.label}
          </Th>
        ))}
        Rows={salesList?.map((sale) => (
          <SaleRow key={sale._id} saleData={sale} />
        ))}
      />
    </Box>
  );
}

SalesListPage.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <Layout>{page}</Layout>;
};

SalesListPage.getInitialProps = checkAuth;
