import React from "react";
import { Heading } from "@chakra-ui/react";
import { createPdf } from "../utils";
import { Button } from "@chakra-ui/react";
import { salesData } from "../mocks/salesData";

const costos = () => {
  function handleClick() {
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
