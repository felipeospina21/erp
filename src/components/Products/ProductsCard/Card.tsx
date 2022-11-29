import { CardSkeleton, ConfirmationAlert, CustomModal } from '@/components/Shared';
import { DeleteButton, EditButton } from '@/components/Shared/IconButtons';
import { useConfirmDelete } from '@/hooks/useConfirmDelete';
import {
  Product,
  useDeleteProductMutation,
  useGetCategoriesQuery,
  useGetProductsQuery,
  useUpdateProductMutation,
} from '@/redux/services';
import { numberToCurrency } from '@/utils/numberToCurrency';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import ProductForm from '../ProductForm/ProductForm';

export interface CardProps {
  product: Product;
  locale?: string;
}

export function Card({ product, locale }: CardProps): JSX.Element {
  const [displayModal, setDisplayModal] = useState(false);
  const [displayAlert, setDisplayAlert] = useState(false);
  const setConfirmDelete = useConfirmDelete(handleDelete);
  const { data: categories } = useGetCategoriesQuery();
  const [deleteProduct, { isLoading: isDeleteLoading }] = useDeleteProductMutation();
  const [updateProduct, { isLoading: isUpdateLoading }] = useUpdateProductMutation();
  const { isFetching: areProductsFetching } = useGetProductsQuery();

  async function handleDelete(): Promise<{ data: Product } | { error: unknown }> {
    return await deleteProduct({ _id: product._id ?? '' });
  }

  function onSubmit(values: Product): void | SubmitHandler<Product> {
    const updatedProduct = { ...values, _id: product._id };
    updateProduct(updatedProduct);
    setDisplayModal(false);
  }

  if (areProductsFetching) {
    return <CardSkeleton data-testid="update-card-skeleton" />;
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
      bgColor="brand.bgLight"
    >
      <Box borderRadius="xl" width="100%" overflow="hidden"></Box>
      <Flex flexDir="column" justify="center" align="center" mt="1rem" w="100%">
        <Heading as="h1" size="md">
          {product.name.toLocaleUpperCase(locale)}
        </Heading>
        <Flex flexDir="column" align="flex-start" width="100%">
          <Text mt="1rem">{`Stock: ${product.stockAvailable.toLocaleString()}`}</Text>
          <Text mt="0.5rem">{`Precio: ${numberToCurrency(product.price)}`}</Text>
        </Flex>
      </Flex>
      <Flex
        w="100%"
        borderRadius="2xl"
        justify={'space-evenly'}
        align="center"
        bg="brand.grey.50"
        data-testid="modal-container"
      >
        <CustomModal
          title="Actualizar Producto"
          isDisplayed={displayModal}
          setDisplayModal={setDisplayModal}
          iconButton={
            <EditButton
              ariaLabel="editar producto"
              size="md"
              onClick={(): void => setDisplayModal(true)}
            />
          }
        >
          <ProductForm
            onSubmit={onSubmit}
            buttonText="Modificar"
            defaultValues={{ ...product }}
            categories={categories ?? []}
            isLoading={isUpdateLoading}
          />
        </CustomModal>

        <ConfirmationAlert
          header="Desea Eliminar?"
          body={`Seguro desea eliminar de forma permanente el producto ${product.name}?`}
          button={
            <DeleteButton
              ariaLabel="eliminar producto"
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
