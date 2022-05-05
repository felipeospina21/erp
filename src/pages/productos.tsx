import React, { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { CardsContainer } from '@/components/Products';
import { useGetProductsQuery } from '@/redux/services';
import { FaPlus } from 'react-icons/fa';
import { CustomModal } from '@/components/Shared';
import { CustomForm } from '@/components/Shared/Form';
import { productsFields } from '@/components/Products/ProductForm/fields/productFields';

export default function ProductosPage(): JSX.Element {
  const [displayModal, setDisplayModal] = useState(false);
  const { data: products } = useGetProductsQuery();

  function createNewProduct(data: any) {
    console.log(data);
  }
  return (
    <Flex flexDir="column" align="center" justify="space-around" minH="100vh">
      <CustomModal
        title="Nuevo Producto"
        isDisplayed={displayModal}
        setDisplayModal={setDisplayModal}
        button={{ icon: <FaPlus />, bgColor: 'brand.green.100' }}
      >
        <CustomForm
          onSubmit={createNewProduct}
          isLoading={false}
          buttonText="crear"
          fields={productsFields}
        />
      </CustomModal>
      <CardsContainer data={products ?? []} />
    </Flex>
  );
}
