import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { thousandSeparator } from "../../utils";
import { Product } from "../../redux/slices/productsSlice";

export interface CardProps {
  product: Product;
};

const Card = ({ product }:CardProps): JSX.Element => {
  return (
    <Box border='1px solid black' h='300px' w='300px' m='1rem'>
      <Heading as='h1' size='md'>
        {product.name}
      </Heading>
      <Box>
        <Text>{`Precio: $${thousandSeparator(product.price, 0)}`}</Text>
        <Text>{`Stock: ${thousandSeparator(product.stock, 0)}`}</Text>
        {/* <Text>{`Stock: ${thousandSeparator(product.quantity, 0)}`}</Text> */}
      </Box>
    </Box>
  );
};

export default Card;
