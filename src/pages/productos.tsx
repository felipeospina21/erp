import { CardsContainer } from '@/components/Products';
import { productsFields } from '@/components/Products/ProductForm/fields/productFields';
import { CustomModal, CustomForm, CardSkeleton, Layout } from '@/components/Shared';
import { useCreateProductMutation, useGetProductsQuery } from '@/redux/services';
import { Flex, Skeleton } from '@chakra-ui/react';
import { ReactElement, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from '@/utils/session';
import type { UserResponse } from '@/redux/services';
import { InferGetServerSidePropsType } from 'next';

export default function ProductosPage({
  user,
}: InferGetServerSidePropsType<typeof getServerSideProps>): ReactElement {
  const [displayModal, setDisplayModal] = useState(false);
  const { data: products, isLoading: areProductsLoading } = useGetProductsQuery();
  const [createProduct] = useCreateProductMutation();

  console.log(user);

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

export const getServerSideProps = withIronSessionSsr(async function ({ req, res }) {
  console.log(req.token);
  const user = req.session.user;

  if (user === undefined) {
    res.setHeader('location', '/login');
    res.statusCode = 302;
    res.end();
    return {
      props: {
        user: { message: 'unauthorized', token: '' } as UserResponse,
      },
    };
  }

  return {
    props: { user: req.session.user },
  };
}, sessionOptions);
