import React, { useState, useEffect } from "react";
import { Flex, Wrap, WrapItem } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { decreaseStock } from "../app/slices/productsSlice";
import { toggle } from "../app/slices/salesBtnSlice";
import { saveSaleInfo, updateSales } from "../app/slices/salesSlice";
import db from "../firebase/clientApp";
import TableContainer from "../components/SalesTable/TableContainer";
import ValueContainer from "../components/ValueContainer";
import TaxPicker from "../components/TaxPicker";
import Btn from "../components/Shared/Btn";
import ObjSelectInput from "../components/Shared/ObjSelectInput";
import ArrSelectInput from "../components/Shared/ArrSelectInput";

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
    dispatch(updateSales({ status: null, data: { tax: 0, subtotal: 0, total: 0 } }));
  };

  const handleClick = () => {
    dispatch(decreaseStock({ db, rowsData }));
    dispatch(
      updateSales({
        ...salesData,
        data: { ...salesData.data, orderedProducts: rowsData },
      })
    );
    dispatch(saveSaleInfo({ db, rowsData }));
    handleReset();
  };

  const handleSelect = event => {
    const name = event.target.name;
    const value = event.target.value;
    dispatch(
      updateSales({
        ...salesData,
        data: { ...salesData.data, [name]: value },
      })
    );
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
    const newTotal = newSubtotal * (1 + salesData.data.tax);
    dispatch(
      updateSales({
        ...salesData,
        data: { ...salesData.data, subtotal: newSubtotal, total: newTotal },
      })
    );
  }, [rowsData, salesData.data.tax]); //rowsData, checkoutData.tax

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
