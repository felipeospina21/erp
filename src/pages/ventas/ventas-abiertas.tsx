import { StatusRow, StatusHeader } from '@/components/Sales';
import { Layout } from '@/components/Shared';
import { useGetSalesQuery } from '@/redux/services';
import { Box, Container } from '@chakra-ui/react';
import React, { ReactElement } from 'react';

export default function OpenSalesPage(): JSX.Element {
  const { data: sales } = useGetSalesQuery();

  return (
    <Container maxW="1300px" h="100%" mt="2rem">
      <Box overflow={'auto'} h="100%" fontSize="0.85rem">
        <StatusHeader />

        {sales?.map((sale) => {
          return <StatusRow key={sale._id} sale={sale} />;
        })}
      </Box>
    </Container>
  );
}

OpenSalesPage.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <Layout>{page}</Layout>;
};
