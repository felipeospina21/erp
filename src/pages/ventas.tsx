import { SalesFooter, SalesHeader, TableContainer } from '@/components/Sales';
import { Layout } from '@/components/Shared';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateSalesData } from '@/redux/slices/salesSlice';
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
    subtotal: 0,
    stock: 0,
    quantity: 0,
    productId: '',
    price: 0,
    discount: 0,
  };
  const [rowsData, setRowsData] = useState<RowData[]>([initialRowSate]);
  const [isSalesBtnDisabled, setSalesBtnDisabled] = useState(true);
  const salesData = useAppSelector((state) => state.sales);
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
    const filteredRows = rowsData.filter(
      (row) => row.quantity > row.stock || isNaN(row.discount ?? 0) || isNaN(row.quantity)
    );
    if (filteredRows.length > 0 && !isSalesBtnDisabled) {
      setSalesBtnDisabled(true);
    } else if (filteredRows.length === 0 && isSalesBtnDisabled) {
      setSalesBtnDisabled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsData, isSalesBtnDisabled]);

  useEffect(() => {
    let newSubtotal = 0;
    rowsData.forEach((row) => {
      const rowSubtotal = row?.subtotal ?? 0;
      return (newSubtotal = newSubtotal + rowSubtotal);
    });
    dispatch(
      updateSalesData({
        subtotal: newSubtotal,
      })
    );
  }, [rowsData, dispatch]);

  useEffect(() => {
    const newTotal = salesData.newSaleData.subtotal * (1 + salesData.newSaleData.tax);
    dispatch(
      updateSalesData({
        total: newTotal,
      })
    );
  }, [salesData.newSaleData.subtotal, salesData.newSaleData.tax, dispatch]);

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
        rowsData={rowsData}
        setRowsData={setRowsData}
      />
    </>
  );
}

VentasPage.getLayout = function getLayout(page: ReactElement): JSX.Element {
  return <Layout>{page}</Layout>;
};

VentasPage.getInitialProps = checkAuth;
