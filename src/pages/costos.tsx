import React, { ReactElement } from 'react';
import { Button } from '@chakra-ui/react';
import { Layout } from '@/components/Shared';
// import { createPdf } from "../utils/utils";
// import { salesData } from "../mocks/salesData";

const Costos = (): ReactElement => {
  function handleClick(): void {
    // createPdf(salesData);
    return;
  }

  return (
    <>
      {/* <Heading as='h1'>Costos</Heading>
      <CardsContainer /> */}
      <Button onClick={handleClick}>PDF</Button>
    </>
  );
};

export default Costos;

Costos.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <Layout>{page}</Layout>;
};
