import React, { useState, useEffect } from 'react';
import { Heading, Text, Flex, Box } from '@chakra-ui/react';
import { numberToCurrency } from '@/utils/index';
import {
  Product,
  UpdateProduct,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from '@/redux/services';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';
import { DeleteButton } from '@/components/Shared/IconButtons';
import Image from 'next/image';
import { CardSkeleton, ConfirmationAlert, CustomModal, CustomForm } from '@/components/Shared';
import { Edit } from '@/assets/icons';
import { SubmitHandler } from 'react-hook-form';
import { productsFields } from '../ProductForm';

export interface CardProps {
  product: Product;
  locale?: string;
}

export function Card({ product, locale }: CardProps): JSX.Element {
  const [displayModal, setDisplayModal] = useState(false);
  const [displayAlert, setDisplayAlert] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteProduct, { isLoading: isDeleteLoading }] = useDeleteProductMutation();
  const [updateProduct, { isLoading: isUpdateLoading }] = useUpdateProductMutation();
  const { isFetching: areProductsFetching } = useGetProductsQuery();

  async function handleDelete(): Promise<
    { data: Product } | { error: FetchBaseQueryError | SerializedError }
  > {
    return await deleteProduct({ _id: product._id ?? '' });
  }

  function onSubmit(values: Product): void | SubmitHandler<UpdateProduct> {
    const payload = { _id: product._id ?? '', update: { ...values } };
    updateProduct(payload);
    setDisplayModal(false);
  }

  useEffect(() => {
    if (confirmDelete) {
      handleDelete();
      setConfirmDelete(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmDelete]);

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
      <Flex w="100%" borderRadius="2xl" justify={'space-evenly'} align="center" bg="brand.grey.50">
        <CustomModal
          title="Actualizar Producto"
          isDisplayed={displayModal}
          setDisplayModal={setDisplayModal}
          button={{
            text: 'actualizar',
            icon: <Edit />,
            variant: 'ghost',
            color: 'brand.green.500',
            size: 'md',
          }}
        >
          <CustomForm
            data={product}
            onSubmit={onSubmit}
            buttonText="modificar"
            fields={productsFields}
            isLoading={isUpdateLoading}
            controlled
          />
        </CustomModal>

        <ConfirmationAlert
          header="Desea Eliminar?"
          body={`Seguro desea eliminar de forma permanente el cliente ${product.name}?`}
          button={
            <DeleteButton
              isLoading={isDeleteLoading}
              size="md"
              onClick={(): void => {
                setDisplayAlert(true);
              }}
            />
          }
          setConfirmation={setConfirmDelete}
          isOpen={displayAlert}
          toggleDisplay={setDisplayAlert}
        />
      </Flex>
    </Flex>
  );
}

export default Card;
