import { Flex, Wrap, WrapItem } from '@chakra-ui/react';
import { nanoid } from '@reduxjs/toolkit';
import React, { useEffect, useMemo, useState } from 'react';
import TableContainer from '../components/SalesTable/TableContainer';
import { CustomSelect, CustomButton, FormContainer } from "../components/Shared";
import TaxPicker from '../components/TaxPicker';
import ValueContainer from '../components/ValueContainer';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  useGetClientsQuery,
  useSaveSaleMutation,
  useUpdateProductMutation
} from '../redux/services';
import { resetState, updateSalesData } from '../redux/slices/salesSlice/salesSlice';

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
  const [ selectedValue, setSelectedValue] = useState({deliveryCity:'', channel: '', clientName: ''})
  const [salesBtnDisabled, setSalesBtnDisabled] = useState(true);
  const salesData = useAppSelector((state) => state.sales);
  const { data: clients } = useGetClientsQuery();
  // const { data: client } = useGetClientByIdQuery(sales);
  const dispatch = useAppDispatch();
  const [updateProduct] = useUpdateProductMutation();
  const [saveSale] = useSaveSaleMutation();

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
    const {name, value} = event.target;
    setSelectedValue({...selectedValue, [name]:value})
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
          <FormContainer label='Ciudad' id='ciudad'>
            <CustomSelect
              name='deliveryCity'
              placeholder='Ciudad'
              options={[{id:nanoid(), name:'Medellín'}, {id:nanoid(), name:'Bogota'}]}
              size='lg'
              onChangeFn={handleSelect}
              value={selectedValue.deliveryCity}
            />
          </FormContainer>
        </WrapItem>
        <WrapItem w='20rem'>
          <FormContainer label='Canal' id='channel'>
            <CustomSelect
              name='channel'
              placeholder='Canal'
              options={[{id:nanoid(), name:'Directo'}, {id:nanoid(), name:'Tercero'}]}
              size='lg'
              onChangeFn={handleSelect}
              value={selectedValue.channel}
            />
          </FormContainer>
        </WrapItem>
        <WrapItem w='20rem'>
          <FormContainer label='Cliente' id='client'>
            <CustomSelect
              name='clientName'
              placeholder='Cliente'
              options={clients?.map((client) => ({ id: client._id, name: client.name }))}
              size='lg'
              onChangeFn={handleSelect}
              value={selectedValue.clientName}
            />
          </FormContainer>
        </WrapItem>
      </Wrap>

      <TableContainer
        header={header}
        rowsData={rowsData}
        setRowsData={setRowsData}
        salesBtnDisabled={salesBtnDisabled}
        setSalesBtnDisabled={setSalesBtnDisabled}
      />
      <Flex justify='flex-end' align='center'>
        <CustomButton color='green' status={salesBtnDisabled} onClick={handleNewSale}>
          Vender
        </CustomButton>

        <CustomButton color='red' onClick={handleReset}>
          Borrar
        </CustomButton>

        <Flex
          flexDir='column'
          justifyItems='center'
          alignItems='stretch'
          p='0 1rem'
          m='1rem 2rem'
          minW='400px'>
          <ValueContainer name='subtotal' value={salesData.data.subtotal} />
          <TaxPicker />
          <ValueContainer name='total' value={salesData.data.total} />
        </Flex>
      </Flex>
    </>
  );
};

export default Ventas;
