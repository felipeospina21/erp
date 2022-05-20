import { CardsContainer } from '@/components/Products';
import { productsFields } from '@/components/Products/ProductForm/fields/productFields';
import { CardSkeleton, CustomForm, CustomModal, Layout } from '@/components/Shared';
import { useCreateProductMutation, useGetProductsQuery } from '@/redux/services';
import { IsAuth } from '@/utils/auth';
import { Flex, Skeleton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';

export default function ProductosPage({ isAuth }: IsAuth): ReactElement {
  const [displayModal, setDisplayModal] = useState(false);
  const { data: products, isLoading: areProductsLoading, isError, error } = useGetProductsQuery();
  const [createProduct] = useCreateProductMutation();
  const router = useRouter();

  function createNewProduct(data: any): void {
    const newProduct = new FormData();

    newProduct.append('alias', data.alias);
    newProduct.append('name', data.name);
    newProduct.append('price', data.price);
    newProduct.append('stock', data.stock);
    newProduct.append('image', data.image[0]);

    createProduct(newProduct);
    setDisplayModal(false);
  }

  useEffect(() => {
    if (!isAuth) {
      router.push('/login');
    }
  }, [isAuth, router]);

  if (!isAuth) {
    return <>Not authorized</>;
  }

  if (isError) {
    return <>{JSON.stringify(error)}</>;
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

ProductosPage.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <Layout>{page}</Layout>;
};

ProductosPage.getInitialProps = async () => {
  if (typeof window !== 'undefined') {
    const isAuth = sessionStorage.getItem('isAuth');
    if (isAuth) {
      return { isAuth: true };
    } else {
      return { isAuth: false };
    }
  }
  return {};
};
