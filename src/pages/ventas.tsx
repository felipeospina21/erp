import { SalesHeader, TableContainer, tableHeader, ActionButtons } from '@/components/Sales';
import { Layout } from '@/components/Shared';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useGetwithholdingTaxQuery } from '@/redux/services';
import { addNewDeliveryToList, resetSale, updateCheckoutData } from '@/redux/slices/salesSlice';
import { checkAuth, IsAuth } from '@/utils/auth';
import { Heading } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import React, { ReactElement, useEffect, useState } from 'react';
import { useAuth } from '../utils';
const LoginPage = dynamic(() => import('@/pages/login'));

export interface RowData {
  id: string;
  item: string;
  subtotal: number;
  stock: number;
  quantity: number;
  discount: number;
  price: number;
  productId: string;
}

export default function VentasPage({ isAuth }: IsAuth): ReactElement {
  const initialRowSate: RowData = {
    id: '1',
    item: '',
    discount: 0,
    subtotal: 0,
    stock: 0,
    quantity: 0,
    productId: '',
    price: 0,
  };
  const [isSalesBtnDisabled, setSalesBtnDisabled] = useState(true);
  const { data: withholdingTax } = useGetwithholdingTaxQuery('62d19e8a3a4b06e0eed05d2d');
  const { subtotal, tax, deliveryCity, paymentTerm } = useAppSelector(
    (state) => state.sales.checkoutData
  );
  const {
    client: selectedClient,
    productsList,
    invoiceObservations,
    deliveriesList,
  } = useAppSelector((state) => state.sales);
  const dispatch = useAppDispatch();
  useAuth(isAuth, '/ventas');

  function addNewDelivery(): void {
    const newDelivery = {
      ...initialRowSate,
      rowId: initialRowSate.id,
      rowTotal: initialRowSate.subtotal,
      name: initialRowSate.item,
    };
    dispatch(addNewDeliveryToList([newDelivery]));
  }

  useEffect(() => {
    addNewDelivery();
    return () => {
      dispatch(resetSale());
    };
  }, []);

  useEffect(() => {
    const quantityArr = productsList?.map(({ quantity }) => quantity).filter((q) => q >= 1);

    if (
      selectedClient?._id &&
      deliveryCity &&
      paymentTerm &&
      productsList &&
      productsList?.length > 0 &&
      quantityArr?.length === productsList?.length &&
      !invoiceObservations?.areInvalid
    ) {
      setSalesBtnDisabled(false);
    } else {
      setSalesBtnDisabled(true);
    }
  }, [
    productsList,
    deliveryCity,
    paymentTerm,
    selectedClient?._id,
    invoiceObservations?.areInvalid,
  ]);

  useEffect(() => {
    const newSubtotal = productsList?.reduce(
      (accumulator, product) => accumulator + product.rowTotal,
      0
    );
    dispatch(updateCheckoutData({ key: 'subtotal', value: newSubtotal ?? 0 }));
  }, [productsList, dispatch]);

  useEffect(() => {
    let withholding = 0;
    if (withholdingTax && subtotal > withholdingTax?.base) {
      withholding = subtotal * (withholdingTax?.percentage ?? 0);
      dispatch(updateCheckoutData({ key: 'withholdingTax', value: withholding }));
    }
    const newTotal = subtotal * (1 + tax) - withholding;
    dispatch(updateCheckoutData({ key: 'total', value: newTotal }));
  }, [subtotal, tax, withholdingTax, dispatch]);

  if (!isAuth) {
    return <LoginPage />;
  }

  return (
    <>
      <SalesHeader pageMaxW={'var(--maxPageWitdth)'} />
      {deliveriesList.map((element, id) => (
        <>
          <Heading as="h2" size="sm" m="0 auto -1.5rem 3rem">{`Entrega ${id + 1}`}</Heading>
          <TableContainer
            key={id}
            pageMaxW={'var(--maxPageWitdth)'}
            header={tableHeader}
            deliveryId={id}
            deliveryData={element}
            salesBtnDisabled={isSalesBtnDisabled}
            setSalesBtnDisabled={setSalesBtnDisabled}
          />
        </>
      ))}

      <ActionButtons addNewDelivery={addNewDelivery} />
    </>
  );
}

VentasPage.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <Layout>{page}</Layout>;
};

VentasPage.getInitialProps = checkAuth;
