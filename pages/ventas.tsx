import React, { useState, useEffect } from "react";
import { Flex, Wrap, WrapItem } from "@chakra-ui/react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { decreaseStock, Product } from "../redux/slices/productsSlice";
import { saveSaleInfo, updateSalesData, resetState } from "../redux/slices/salesSlice";
import db from "../firebase/clientApp";
import TableContainer from "../components/SalesTable/TableContainer";
import ValueContainer from "../components/ValueContainer";
import TaxPicker from "../components/TaxPicker";
import Btn from "../components/Shared/Btn";
import ObjSelectInput from "../components/Shared/ObjSelectInput";
import ArrSelectInput from "../components/Shared/ArrSelectInput";

//BUG: useEffect in line 74 is updating tha data in a buggy way
const Ventasc = () => {
  const [rowsData, setRowsData] = useState<Product[]>([{ id: 1, subtotal: 0, stock: 0, quantity: 0 }]);
  const [salesBtnDisabled, setSalesBtnDisabled] = useState(true);
  const salesData = useAppSelector((state) => state.sales);
  const clients = useAppSelector((state) => state.clients.list);
  const dispatch = useAppDispatch();

  const handleReset = (): void => {
    Array.from(document.querySelectorAll("input")).forEach((input) => (input.value = ""));
    Array.from(document.querySelectorAll("select")).forEach((select) => (select.value = ""));
    setRowsData([{ id: 1, subtotal: 0, stock: 0, quantity: 0 }]);
    dispatch(resetState());
  };

  const handleClick = async (): Promise<void> => {
    //TODO: Check option to creat a custom hook to wrap async functions into promises
    const decreaseStockPromise = new Promise((resolve) => {
      resolve(dispatch(decreaseStock({ db, rowsData })));
    });
    const saveSalesInfoPromise = new Promise((resolve) => {
      resolve(dispatch(saveSaleInfo({ db, rowsData })));
    });
    await decreaseStockPromise;
    await saveSalesInfoPromise;
    handleReset();
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>):void => {
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
            options={["Medellin", "Bogotá"]}
            size='lg'
            onChangeFn={handleSelect}
          />
        </WrapItem>
        <WrapItem w='20rem'>
          <ArrSelectInput
            name='chanel'
            title='Canal'
            options={["Directo", "Tercero"]}
            size='lg'
            onChangeFn={handleSelect}
          />
        </WrapItem>
        <WrapItem w='20rem'>
          <ObjSelectInput name='clientName' title='Cliente' options={clients} size='lg' onChangeFn={handleSelect} />
        </WrapItem>
      </Wrap>

      <TableContainer
        rowsData={rowsData}
        setRowsData={setRowsData}
        salesBtnDisabled={salesBtnDisabled}
        setSalesBtnDisabled={setSalesBtnDisabled}
      />
      <Flex justify='flex-end' align='center'>
        <Btn color='green' status={salesBtnDisabled} onClick={handleClick}>
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
