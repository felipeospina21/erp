import React, { ReactElement } from 'react';
import { Layout } from '@/components/Shared';
import { Box } from '@chakra-ui/react';

export default function CostosPage(): JSX.Element {
  return <Box overflow={'auto'} fontSize="0.85rem"></Box>;
}

CostosPage.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <Layout>{page}</Layout>;
};
