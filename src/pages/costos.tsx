import React, { ReactElement } from 'react';
import { Layout } from '@/components/Shared';
import { Box } from '@chakra-ui/react';
import { salesData } from '@/utils/test-utils';
import { createInvoice } from '../utils';

export default function CostosPage(): JSX.Element {
  return (
    <Box overflow={'auto'} fontSize="0.85rem">
      <button onClick={() => createInvoice(salesData, salesData.clientInfo, 14, '')}>
        factura
      </button>
    </Box>
  );
}

CostosPage.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <Layout>{page}</Layout>;
};
