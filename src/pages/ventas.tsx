import { SalesFooter, SalesHeader, TableContainer } from '@/components/Sales';
import { Layout } from '@/components/Shared';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateCheckoutData } from '@/redux/slices/salesSlice';
import React, { ReactElement, useEffect, useMemo, useState } from 'react';
import { checkAuth, IsAuth } from '@/utils/auth';
import Router from 'next/router';
import dynamic from 'next/dynamic';
const LoginPage = dynamic(() => import('@/pages/login'));

export interface RowData {
  id: number;
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
    id: 1,
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
  const { subtotal, tax } = useAppSelector((state) => state.sales.checkoutData);
  const productsList = useAppSelector((state) => state.sales.productsList);
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
    //TODO: Add proper validation
    const quantityArr = productsList?.map(({ quantity }) => quantity).filter((q) => q < 1);

    if (quantityArr?.length) {
      setSalesBtnDisabled(true);
    } else {
      setSalesBtnDisabled(false);
    }
  }, [productsList]);

  useEffect(() => {
    const newSubtotal = productsList?.reduce(
      (accumulator, product) => accumulator + product.rowTotal,
      0
    );
    dispatch(updateCheckoutData({ key: 'subtotal', value: newSubtotal ?? 0 }));
  }, [productsList, dispatch]);

  useEffect(() => {
    const newTotal = subtotal * (1 + tax);
    dispatch(updateCheckoutData({ key: 'total', value: newTotal }));
  }, [subtotal, tax, dispatch]);

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
