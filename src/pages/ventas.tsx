import React, { useEffect, useMemo, useState } from 'react';
import { SalesFooter, SalesHeader, TableContainer } from '@/components/Sales';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateSalesData } from '@/redux/slices/salesSlice';

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

const Ventas = (): JSX.Element => {
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
  // const { data: client } = useGetClientByIdQuery(sales);
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
    ],
    []
  );

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
    const newTotal = salesData.data.subtotal * (1 + salesData.data.tax);
    dispatch(
      updateSalesData({
        total: newTotal,
      })
    );
  }, [salesData.data.subtotal, salesData.data.tax, dispatch]);

  return (
    <>
      <SalesHeader />

      <TableContainer
        header={header}
        rowsData={rowsData}
        setRowsData={setRowsData}
        salesBtnDisabled={isSalesBtnDisabled}
        setSalesBtnDisabled={setSalesBtnDisabled}
      />

      <SalesFooter
        initialRowSate={initialRowSate}
        isSalesBtnDisabled={isSalesBtnDisabled}
        rowsData={rowsData}
        setRowsData={setRowsData}
      />
    </>
  );
};

export default Ventas;
