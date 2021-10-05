import React from "react";
import { Flex } from "@chakra-ui/react";
import Card from "./Card";

const CardsContainer = () => {
  return (
    <Flex m='1rem' w='100%'>
      <Card />
      <Card />
      <Card />
    </Flex>
  );
};

export default CardsContainer;
