import { CardsContainer } from '@/components/Products';
import { productFields } from '@/components/Products/ProductForm/fields/productFields';
import { CardSkeleton, CustomForm, CustomModal, Layout } from '@/components/Shared';
import { AddButton } from '@/components/Shared/IconButtons/AddButton/AddButton';
import {
  Product,
  useCreateProductMutation,
  useGetCategoriesQuery,
  useGetProductsQuery,
} from '@/redux/services';
import { checkAuth, IsAuth } from '@/utils/auth';
import { Flex, Skeleton, useToast } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
const LoginPage = dynamic(() => import('@/pages/login'));

export interface ProductDataForm extends Omit<Product, 'price' | 'stock'> {
  price: string | Blob;
  stock: string | Blob;
}
export default function ProductosPage({ isAuth }: IsAuth): JSX.Element {
  const [displayModal, setDisplayModal] = useState(false);
  const { data: categories } = useGetCategoriesQuery();
  const { data: products, isLoading: areProductsLoading, isError, error } = useGetProductsQuery();
  const [
    createProduct,
    {
      isSuccess: isCreateProductSuccess,
      isUninitialized: isCreateProductUninitialized,
      isLoading: isCreateProductLoading,
    },
  ] = useCreateProductMutation();
  const toast = useToast();

  function createNewProduct(data: ProductDataForm): void {
    const newProduct = new FormData();

    newProduct.append('category', data.category);
    newProduct.append('name', data.name);
    newProduct.append('price', data.price);
    newProduct.append('stock', data.stock);
    if (data.image?.length) {
      newProduct.append('image', data.image[0]);
    }

    createProduct(newProduct);
    setDisplayModal(false);
  }

  useEffect(() => {
    productFields.map((field) => {
      if (field.name === 'category' && categories) {
        field.options = [...categories];
      }
    });
  }, [categories]);

  useEffect(() => {
    if (isCreateProductSuccess) {
      toast({
        title: 'Creacion Exitosa',
        description: 'nuevo producto creado',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    }

    if (!isCreateProductSuccess && !isCreateProductUninitialized && !isCreateProductLoading) {
      toast({
        title: 'Error En Creacion',
        description: 'ha ocurrido un error, favor intentar de nuevo',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }

    return () => {
      toast.closeAll();
    };
  }, [isCreateProductSuccess, isCreateProductUninitialized, isCreateProductLoading, toast]);

  useEffect(() => {
    if (isAuth) return; // do nothing if the user is logged in
    Router.replace('/productos', '/login', { shallow: true });
  }, [isAuth]);

  if (!isAuth) {
    return <LoginPage />;
  }

  if (areProductsLoading) {
    return (
      <Flex
        data-testid="cards-skeleton"
        flexDir="column"
        align="center"
        justify="space-around"
        h="50vh"
        m="5rem auto"
      >
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
        iconButton={
          <AddButton size="sm" margin="1.5rem" onClick={(): void => setDisplayModal(true)} />
        }
      >
        <CustomForm
          onSubmit={createNewProduct}
          isLoading={false}
          button={{ text: 'crear' }}
          fields={productFields}
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
