import React from 'react';
import { Heading, Flex, IconButton } from '@chakra-ui/react';
import { CardsContainer } from '@/components/Products';
import { useGetProductsQuery } from '@/redux/services';
import { FaPlus } from 'react-icons/fa';
import { CustomModal } from '@/components/Shared';
import ProductForm from '@/components/Products/ProductForm/ProductForm';

export default function ProductosPage(): JSX.Element {
  const { data: products } = useGetProductsQuery();

  function createNewProduct() {
    console.log('new product');
  }
  return (
    <Flex flexDir="column" align="center" justify="space-around" minH="100vh">
      <Heading as="h1" size="2xl" mb="2rem">
        Products
      </Heading>
      <IconButton
        icon={<FaPlus />}
        onClick={createNewProduct}
        bgColor="brand.green.100"
        aria-label="new product"
      />
      <CustomModal title="Nuevo Producto">
        <ProductForm />
      </CustomModal>
      <CardsContainer data={products ?? []} />
    </Flex>
  );
}
