import { CardsContainer } from '@/components/Products';
import { productsFields } from '@/components/Products/ProductForm/fields/productFields';
import { CustomModal, CustomForm } from '@/components/Shared';
import { useGetProductsQuery } from '@/redux/services';
import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';

export default function ProductosPage(): JSX.Element {
  const [displayModal, setDisplayModal] = useState(false);
  const { data: products } = useGetProductsQuery();

  function createNewProduct(data: any) {
    console.log(data);
  }
  return (
    <Flex flexDir="column" align="center" justify="space-around" minH="100vh">
      <img />
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
