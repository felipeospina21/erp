import React, { useState, useEffect } from "react";
import { Flex, Wrap, WrapItem } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { decreaseStock } from "../app/slices/productsSlice";
import { toggle } from "../app/slices/salesBtnSlice";
import { saveSaleInfo, updateSalesData, resetState } from "../app/slices/salesSlice";
import { createPdf } from "../utils";
import db from "../firebase/clientApp";
import TableContainer from "../components/SalesTable/TableContainer";
import ValueContainer from "../components/ValueContainer";
import TaxPicker from "../components/TaxPicker";
import Btn from "../components/Shared/Btn";
import ObjSelectInput from "../components/Shared/ObjSelectInput";
import ArrSelectInput from "../components/Shared/ArrSelectInput";

//BUG: useEffect in line 74 is updating tha data in a buggy way
const Ventasc = () => {
  const [rowsData, setRowsData] = useState([{ id: "1", subtotal: 0 }]);
  const salesBtn = useSelector(state => state.salesBtn);
  const salesData = useSelector(state => state.sales);
  const clients = useSelector(state => state.clients.list);
  const dispatch = useDispatch();

  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""));
    Array.from(document.querySelectorAll("select")).forEach(
      select => (select.value = "")
    );
    setRowsData([{ id: 1, subtotal: 0 }]);
    dispatch(resetState())
  };

  const handleClick = async () => {
    //TODO: Check option to creat a custom hook to wrap async functions into promises
    const decreaseStockPromise = new Promise((resolve, reject) => {
      resolve(dispatch(decreaseStock({ db, rowsData })));
    });
    const saveSalesInfoPromise = new Promise((resolve, reject) => {
      resolve(dispatch(saveSaleInfo({ db, rowsData })));
    });
    const createPdfPromise = new Promise((resolve, reject) => {
      resolve(createPdf(salesData.data));
    });

    await decreaseStockPromise;
    await saveSalesInfoPromise;
    await createPdfPromise;
    // handleReset();
  };

  const handleSelect = event => {
    const name = event.target.name;
    const value = event.target.value;
    dispatch(updateSalesData({[name]: value}));
  };

  useEffect(() => {
    const filteredRows = rowsData.filter(
      row => row.quantity > row.stock || isNaN(row.discount) || isNaN(row.quantity)
    );
    if (filteredRows.length > 0 && !salesBtn.disabled) {
      dispatch(toggle(true));
    } else if (filteredRows.length === 0 && salesBtn.disabled) {
      dispatch(toggle(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsData, salesBtn.disabled]);

  useEffect(() => {
    let newSubtotal = 0;
    rowsData.forEach(row => {
      newSubtotal = newSubtotal + row.subtotal;
    });
    // const newTotal = newSubtotal * (1 + salesData.data.tax);
    dispatch(
      updateSalesData({
        subtotal: newSubtotal,
      })
    );
  }, [rowsData]); //rowsData, checkoutData.tax

  useEffect(() => {
    // let newSubtotal = 0;
    // rowsData.forEach(row => {
    //   newSubtotal = newSubtotal + row.subtotal;
    // });
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
          <ObjSelectInput
            name='clientName'
            title='Cliente'
            options={clients}
            size='lg'
            onChangeFn={handleSelect}
          />
        </WrapItem>
      </Wrap>

      <TableContainer rowsData={rowsData} setRowsData={setRowsData} />
      <Flex justify='flex-end' align='center'>
        <Btn color='green' status={salesBtn.disabled} onClick={handleClick}>
          Vender
        </Btn>

        <Btn color='red' onClick={handleReset}>
          Borrar
        </Btn>

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

export default Ventasc;
