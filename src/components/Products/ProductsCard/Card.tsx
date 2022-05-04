import React from 'react';
import { Heading, Text, Flex } from '@chakra-ui/react';
import { numberToCurrency } from '@/utils/index';
import { Product, useDeleteProductMutation } from '@/redux/services';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';
import { DeleteButton, EditButton } from '@/components/Shared/Buttons';

export interface CardProps {
  product: Product;
  locale?: string;
}

export function Card({ product, locale }: CardProps): JSX.Element {
  const [deleteProduct, { isLoading: isDeleteLoading }] = useDeleteProductMutation();

  async function handleDelete(): Promise<
    { data: Product } | { error: FetchBaseQueryError | SerializedError }
  > {
    return await deleteProduct({ _id: product._id ?? '' });
  }

  async function handleUpdate() {
    return;
  }
  return (
    <Flex
      flexDir="column"
      align="center"
      justify="space-between"
      border="var(--border-100)"
      borderRadius="2xl"
      boxShadow={'var(--boxShadow)'}
      h="300px"
      w="300px"
      m="1rem"
      p="1rem"
    >
      <Heading as="h1" size="md">
        {product.name.toLocaleUpperCase(locale)}
      </Heading>
      <Flex flexDir="column" align="flex-start" width="100%">
        <Text mt="1rem" ml="1rem">{`Stock: ${numberToCurrency(product.stock)}`}</Text>
        <Text mt="1rem" ml="1rem">{`Precio: ${numberToCurrency(product.price)}`}</Text>
      </Flex>
      <Flex
        w="100%"
        borderRadius="2xl"
        justify={'space-evenly'}
        align="flex-end"
        bg="brand.grey.50"
      >
        <EditButton onClick={handleUpdate} />
        <DeleteButton isLoading={isDeleteLoading} onClick={handleDelete} />
      </Flex>
    </Flex>
  );
}

export default Card;
