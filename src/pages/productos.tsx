import { CardsContainer } from '@/components/Products';
import ProductForm from '@/components/Products/ProductForm/ProductForm';
import StockForm, { StockFormValues } from '@/components/Products/StockForm/StockForm';
import { CardsSkeleton, CustomModal, EditButton, LargeSpinner, Layout } from '@/components/Shared';
import { AddButton } from '@/components/Shared/IconButtons/AddButton/AddButton';
import {
  Product,
  useCreateProductMutation,
  useGetCategoriesQuery,
  useGetProductsQuery,
  useUpdateProductStockInBatchMutation,
} from '@/redux/services';
import { useCustomToast } from 'hooks';
import { Flex } from '@chakra-ui/react';
import { ReactElement, useState } from 'react';
import { toastConfig } from 'config/toastsConfig';

export interface ProductDataForm extends Omit<Product, 'price' | 'stockAvailable' | 'category'> {
  price: string | Blob;
  stockAvailable: string | Blob;
  category: string;
}
export default function ProductosPage(): JSX.Element {
  const [displayModal, setDisplayModal] = useState(false);
  const [displayStockModal, setDisplayStockModal] = useState(false);
  const { data: categories } = useGetCategoriesQuery();
  const {
    data: products,
    isLoading: isProductsLoading,
    isError: isProductsError,
  } = useGetProductsQuery();
  const [
    createProduct,
    {
      isSuccess: isCreateProductSuccess,
      isUninitialized: isCreateProductUninitialized,
      isLoading: isCreateProductLoading,
    },
  ] = useCreateProductMutation();
  const [
    addToStock,
    {
      isSuccess: isAddToStockSuccess,
      isUninitialized: isAddToStockUninitialized,
      isLoading: isAddToStockLoading,
    },
  ] = useUpdateProductStockInBatchMutation();

  useCustomToast(
    isCreateProductSuccess,
    isCreateProductUninitialized,
    isCreateProductLoading,
    'nuevo producto creado',
    toastConfig.creation
  );

  useCustomToast(
    isAddToStockSuccess,
    isAddToStockUninitialized,
    isAddToStockLoading,
    'inventario actualizado',
    toastConfig.update
  );

  function createNewProduct(data: ProductDataForm): void {
    const newProduct = new FormData();

    newProduct.append('category', data.category);
    newProduct.append('name', data.name);
    newProduct.append('price', data.price);
    newProduct.append('stockAvailable', data.stockAvailable);
    newProduct.append('stockReserved', '0');
    if (data.image?.length) {
      newProduct.append('image', data.image[0]);
    }

    createProduct(newProduct);
    setDisplayModal(false);
  }

  function updateStockInBatch(data: StockFormValues): void {
    addToStock(data);
    setDisplayStockModal(false);
  }

  if (isProductsLoading) {
    return <CardsSkeleton cards={4} />;
  }

  if (isProductsError) {
    return <LargeSpinner />;
  }

  return (
    <Flex
      flexDir="column"
      align="center"
      justify="space-around"
      minH="100vh"
      m={['1rem auto', null, '2rem auto']}
    >
      <Flex align="center">
        <CustomModal
          title="Nuevo Producto"
          isDisplayed={displayModal}
          setDisplayModal={setDisplayModal}
          iconButton={
            <AddButton
              ariaLabel="agregar"
              variant="primary"
              size="sm"
              margin="1.5rem"
              onClick={(): void => setDisplayModal(true)}
            />
          }
        >
          <ProductForm
            buttonText="Crear"
            categories={categories ?? []}
            onSubmit={createNewProduct}
          />
        </CustomModal>

        <CustomModal
          title="Adicionar Inventario"
          isDisplayed={displayStockModal}
          setDisplayModal={setDisplayStockModal}
          iconButton={
            <EditButton
              ariaLabel="adicionar inventarios"
              variant="primary"
              color="white"
              size="sm"
              margin="1.5rem"
              onClick={(): void => setDisplayStockModal(true)}
            />
          }
        >
          <StockForm products={products} onSubmit={updateStockInBatch} />
        </CustomModal>
      </Flex>

      <CardsContainer data={products ?? []} />
    </Flex>
  );
}

ProductosPage.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <Layout>{page}</Layout>;
};
