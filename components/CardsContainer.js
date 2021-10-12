import React from "react";
import { Flex } from "@chakra-ui/react";
import Card from "./Card";

const CardsContainer = props => {
  return (
    <Flex m='1rem' w='100%' wrap='wrap'>
      {props.products.map(product => (
        <Card key={product.id} product={product} />
      ))}
    </Flex>
  );
};

export default CardsContainer;
