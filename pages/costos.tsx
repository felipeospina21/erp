import React from "react";
import { Button } from "@chakra-ui/react";
import { createPdf } from "../utils/utils";
import { salesData } from "../mocks/salesData";

const costos = ():JSX.Element => {
  function handleClick():void {
    createPdf(salesData);
  }

  return (
    <>
      {/* <Heading as='h1'>Costos</Heading>
      <CardsContainer /> */}
      <Button onClick={handleClick}>PDF</Button>
    </>
  );
};

export default costos;
