import React from 'react';
import { Heading, Text, Flex, Box } from '@chakra-ui/react';
import { numberToCurrency } from '@/utils/index';
import { Product, useDeleteProductMutation, useGetProductsQuery } from '@/redux/services';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';
import { DeleteButton, EditButton } from '@/components/Shared/IconButtons';
import Image from 'next/image';
import { CardSkeleton } from '@/components/Shared';

export interface CardProps {
  product: Product;
  locale?: string;
}

export function Card({ product, locale }: CardProps): JSX.Element {
  const [deleteProduct, { isLoading: isDeleteLoading }] = useDeleteProductMutation();
  const { isFetching: areProductsFetching } = useGetProductsQuery();

  async function handleDelete(): Promise<
    { data: Product } | { error: FetchBaseQueryError | SerializedError }
  > {
    return await deleteProduct({ _id: product._id ?? '' });
  }

  async function handleUpdate() {
    return;
  }

  if (areProductsFetching) {
    return <CardSkeleton />;
  }

  return (
    <Flex
      flexDir="column"
      align="center"
      justify="space-between"
      border="var(--border-100)"
      borderRadius="2xl"
      boxShadow={'var(--boxShadow)'}
      h="400px"
      w="300px"
      m="1rem"
      p="0.5rem 1rem"
    >
      <Box borderRadius="xl" width="100%" overflow="hidden">
        <Image
          src={product.image ?? ''}
          alt="product image"
          width="100%"
          height="80px"
          layout="responsive"
          objectFit={'cover'}
        />
      </Box>
      <Flex flexDir="column" justify="center" align="center" mt="1rem" w="100%">
        <Heading as="h1" size="md">
          {product.name.toLocaleUpperCase(locale)}
        </Heading>
        <Flex flexDir="column" align="flex-start" width="100%">
          <Text mt="1rem">{`Stock: ${product.stock.toLocaleString()}`}</Text>
          <Text mt="0.5rem">{`Precio: ${numberToCurrency(product.price)}`}</Text>
        </Flex>
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
