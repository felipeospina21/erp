import { CardsContainer } from '@/components/Products';
import { productsFields } from '@/components/Products/ProductForm/fields/productFields';
import { CardSkeleton, CustomForm, CustomModal, Layout } from '@/components/Shared';
import { Product, useCreateProductMutation, useGetProductsQuery } from '@/redux/services';
import { checkAuth, IsAuth } from '@/utils/auth';
import { Flex, Skeleton } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
const LoginPage = dynamic(() => import('@/pages/login'));

export interface ProductDataForm extends Omit<Product, 'price' | 'stock'> {
  price: string | Blob;
  stock: string | Blob;
}
export default function ProductosPage({ isAuth }: IsAuth): ReactElement {
  const [displayModal, setDisplayModal] = useState(false);
  const result = useGetProductsQuery();
  const { data: products, isLoading: areProductsLoading, isError, error } = result;
  const [createProduct] = useCreateProductMutation();

  function createNewProduct(data: ProductDataForm): void {
    const newProduct = new FormData();

    newProduct.append('alias', data.alias);
    newProduct.append('name', data.name);
    newProduct.append('price', data.price);
    newProduct.append('stock', data.stock);
    if (data.image) {
      newProduct.append('image', data.image[0]);
    }

    createProduct(newProduct);
    setDisplayModal(false);
  }

  useEffect(() => {
    if (isAuth) return; // do nothing if the user is logged in
    Router.replace('/productos', '/login', { shallow: true });
  }, [isAuth]);

  if (!isAuth) {
    return <LoginPage />;
  }

  if (areProductsLoading) {
    return (
      <Flex flexDir="column" align="center" justify="space-around" h="50vh" m="5rem auto">
        <Skeleton borderRadius="md" h="40px" w="40px" />
        <Flex justify="center" m="1rem" w="100%" wrap="wrap">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </Flex>
      </Flex>
    );
  }

  if (isError) {
    return <>{JSON.stringify(error)}</>;
  }

  return (
    <Flex
      flexDir="column"
      align="center"
      justify="space-around"
      minH="100vh"
      m={['1rem auto', null, '2rem auto']}
    >
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

ProductosPage.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <Layout>{page}</Layout>;
};

ProductosPage.getInitialProps = checkAuth;
