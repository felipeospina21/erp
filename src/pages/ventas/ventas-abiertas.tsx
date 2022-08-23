import { SaleStatusRow } from '@/components/Sales';
import { Layout } from '@/components/Shared';
import { Box, Flex, HStack } from '@chakra-ui/react';
import React, { ReactElement } from 'react';

export default function OpenSalesPage(): JSX.Element {
  const statuses = [
    '',
    'produccion',
    'alistamiento',
    'despacho',
    'entregado',
    'facturado',
    'pagado',
  ];
  const ventas = [
    { _id: '1', status: 'alistamiento' },
    { _id: '2', status: 'entregado' },
  ];

  return (
    <Box overflow={'auto'} fontSize="0.85rem">
      <HStack>
        {statuses.map((status) => (
          <Flex key={status} w="auto" minW="100px" justify="center">
            {status}
          </Flex>
        ))}
      </HStack>

      {ventas.map((venta) => {
        return <SaleStatusRow key={venta._id} venta={venta} statuses={statuses} />;
      })}
    </Box>
  );
}

OpenSalesPage.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <Layout>{page}</Layout>;
};
