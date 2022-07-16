import { SalesFooter, SalesHeader, TableContainer } from '@/components/Sales';
import { Layout } from '@/components/Shared';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateCheckoutData } from '@/redux/slices/salesSlice';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { checkAuth, IsAuth } from '@/utils/auth';
import Router from 'next/router';
import dynamic from 'next/dynamic';
import { useGetwithholdingTaxQuery } from '@/redux/services';
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
  const [rowsData, setRowsData] = useState<RowData[]>([initialRowSate]);
  const [isSalesBtnDisabled, setSalesBtnDisabled] = useState(true);
  const { data: withholdingTax } = useGetwithholdingTaxQuery('62d19e8a3a4b06e0eed05d2d');
  const { subtotal, tax, deliveryCity, paymentTerm } = useAppSelector(
    (state) => state.sales.checkoutData
  );
  const {
    client: selectedClient,
    productsList,
    invoiceObservations,
  } = useAppSelector((state) => state.sales);
  const dispatch = useAppDispatch();

  const header = useMemo(
    () => [
      {
        title: 'Producto',
        id: 'product',
      },
      {
        title: 'Stock',
        id: 'stock',
      },
      {
        title: 'Precio',
        id: 'price',
      },
      {
        title: 'Cantidad',
        id: 'quantity',
      },
      {
        title: 'Descuento',
        id: 'discount',
      },
      {
        title: 'Transporte (und)',
        id: 'shipping',
      },
      {
        title: 'Total',
        id: 'total',
      },
      {
        title: '',
        id: 'action',
      },
    ],
    []
  );

  useEffect(() => {
    if (isAuth) return; // do nothing if the user is logged in
    Router.replace('/ventas', '/login', { shallow: true });
  }, [isAuth]);

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
      <TableContainer
        pageMaxW={'var(--maxPageWitdth)'}
        header={header}
        rowsData={rowsData}
        setRowsData={setRowsData}
        salesBtnDisabled={isSalesBtnDisabled}
        setSalesBtnDisabled={setSalesBtnDisabled}
      />

      <SalesFooter
        pageMaxW={'var(--maxPageWitdth)'}
        initialRowSate={initialRowSate}
        isSalesBtnDisabled={isSalesBtnDisabled}
        setRowsData={setRowsData}
      />
    </>
  );
}

VentasPage.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <Layout>{page}</Layout>;
};

VentasPage.getInitialProps = checkAuth;
