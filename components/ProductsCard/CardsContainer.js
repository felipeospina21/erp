import React from "react";
import { useSelector } from "react-redux";
import { Flex } from "@chakra-ui/react";
import Card from "./Card";

const CardsContainer = () => {
  const products = useSelector(state => state.products.list);

  return (
    <Flex m='1rem' w='100%' wrap='wrap'>
      {products.map(product => (
        <Card key={product.id} product={product} />
      ))}
    </Flex>
  );
};

export default CardsContainer;
