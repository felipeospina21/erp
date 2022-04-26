import React, { useState, useEffect } from 'react';
import { Flex, Wrap, WrapItem } from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {  updateSalesData, resetState } from '../redux/slices/salesSlice/salesSlice';
import TableContainer from '../components/SalesTable/TableContainer';
import ValueContainer from '../components/ValueContainer';
import TaxPicker from '../components/TaxPicker';
import Btn from '../components/Shared/Btn';
import ObjSelectInput from '../components/Shared/ObjSelectInput';
import ArrSelectInput from '../components/Shared/ArrSelectInput';
import {
  // useGetClientByIdQuery,
  useGetClientsQuery,
  useSaveSaleMutation,
  useUpdateProductMutation,
} from '../redux/services';

export interface RowData {
  id: number;
  subtotal: number;
  stock: number;
  quantity: number;
  discount: number;
  productId: string;
}

const Ventasc = (): JSX.Element => {
  const initialRowSate: RowData = { id: 1, subtotal: 0, stock: 0, quantity: 0, productId: '', discount: 0 };
  const [rowsData, setRowsData] = useState<RowData[]>([initialRowSate]);
  const [salesBtnDisabled, setSalesBtnDisabled] = useState(true);
  const salesData = useAppSelector((state) => state.sales);
  const { data: clients } = useGetClientsQuery();
  // const { data: client } = useGetClientByIdQuery(sales);
  const dispatch = useAppDispatch();
  const [updateProduct] = useUpdateProductMutation();
  const [saveSale] = useSaveSaleMutation();

  const handleReset = (): void => {
    Array.from(document.querySelectorAll('input')).forEach((input) => (input.value = ''));
    Array.from(document.querySelectorAll('select')).forEach((select) => (select.value = ''));
    setRowsData([initialRowSate]);
    dispatch(resetState());
  };

  const handleNewSale = (): void => {
    // Decrease Stock
    // TODO: create api for updating multiple items
    rowsData.forEach((row) => {
      const newStock = row.stock - row.quantity;
      updateProduct({ _id: row.productId, update: { stock: newStock } });
    });

    saveSale(salesData.data);
    handleReset();
  };



  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const name = event.target.name;
    const value = event.target.value;
    dispatch(updateSalesData({ [name]: value }));
  };

  useEffect(() => {
    const filteredRows = rowsData.filter(
      (row) => row.quantity > row.stock || isNaN(row.discount ?? 0) || isNaN(row.quantity)
    );
    if (filteredRows.length > 0 && !salesBtnDisabled) {
      setSalesBtnDisabled(true);
    } else if (filteredRows.length === 0 && salesBtnDisabled) {
      setSalesBtnDisabled(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsData, salesBtnDisabled]);

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
  }, [rowsData]);

  useEffect(() => {
    const newTotal = salesData.data.subtotal * (1 + salesData.data.tax);
    dispatch(
      updateSalesData({
        total: newTotal,
      })
    );
  }, [salesData.data.subtotal, salesData.data.tax]);

  return (
    <>
      <Wrap spacing='30px' m='2rem auto' justify='space-evenly'>
        <WrapItem w='20rem'>
          <ArrSelectInput
            name='deliveryCity'
            title='Ciudad'
            options={['Medellin', 'Bogotá']}
            size='lg'
            onChangeFn={handleSelect}
          />
        </WrapItem>
        <WrapItem w='20rem'>
          <ArrSelectInput
            name='chanel'
            title='Canal'
            options={['Directo', 'Tercero']}
            size='lg'
            onChangeFn={handleSelect}
          />
        </WrapItem>
        <WrapItem w='20rem'>
          <ObjSelectInput
            name='clientName'
            title='Cliente'
            options={clients?.map(client => ({id: client._id, name:client.name}))}
            size='lg'
            onChangeFn={handleSelect}
          />
        </WrapItem>
      </Wrap>

      <TableContainer
        rowsData={rowsData}
        setRowsData={setRowsData}
        salesBtnDisabled={salesBtnDisabled}
        setSalesBtnDisabled={setSalesBtnDisabled}
      />
      <Flex justify='flex-end' align='center'>
        <Btn color='green' status={salesBtnDisabled} onClick={handleNewSale}>
          Vender
        </Btn>

        <Btn color='red' onClick={handleReset}>
          Borrar
        </Btn>

        <Flex flexDir='column' justifyItems='center' alignItems='stretch' p='0 1rem' m='1rem 2rem' minW='400px'>
          <ValueContainer name='subtotal' value={salesData.data.subtotal} />
          <TaxPicker />
          <ValueContainer name='total' value={salesData.data.total} />
        </Flex>
      </Flex>
    </>
  );
};

export default Ventasc;
