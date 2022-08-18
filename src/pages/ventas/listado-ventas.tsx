import { SaleRow } from '@/components/Sales/SalesList/SaleRow';
import { CustomTable, LargeSpinner, TableSkeleton, Layout } from '@/components/Shared';
import { useGetSalesQuery } from '@/redux/services';
import { Box, Th } from '@chakra-ui/react';
import React, { ReactElement } from 'react';

export default function SalesListPage(): ReactElement {
  const { data: salesList, isLoading, isError } = useGetSalesQuery();

  const headers = [
    { name: 'doc', label: 'Remisión' },
    { name: 'invoice', label: 'Factura' },
    { name: 'client', label: 'Cliente' },
    { name: 'total', label: 'Total' },
    { name: 'createdAt', label: 'Fecha' },
    { name: 'status', label: 'Status' },
    { name: 'actions', label: '' },
  ];

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (isError) {
    return <LargeSpinner />;
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
