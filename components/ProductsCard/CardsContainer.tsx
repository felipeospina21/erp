import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { Flex } from "@chakra-ui/react";
import Card from "./Card";

export default function CardsContainer(): JSX.Element {
  const products = useAppSelector(state => state.products.list);
  return (
    <Flex m='1rem' w='100%' wrap='wrap'>
      {products.map(product => (
        <Card key={product.id} product={product} />
      ))}
    </Flex>
  );
}
