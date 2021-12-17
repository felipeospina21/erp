import React, { useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { decreaseStock } from "../app/slices/productsSlice";
import { toggle } from "../app/slices/salesBtnSlice";
import db from "../firebase/clientApp";
import TableContainer from "../components/SalesTable/TableContainer";
import ValueContainer from "../components/ValueContainer";
import TaxPicker from "../components/TaxPicker";
import Btn from "../components/Shared/Btn";
import ReduxTest from "../components/ReduxTest";
import CardsContainer from "../components/ProductsCard/CardsContainer";
import ClientSelect from "../components/Shared/ClientSelect";
import { saveSaleInfo, updateSales } from "../app/slices/salesSlice";

const Ventasc = () => {
  const [rowsData, setRowsData] = useState([{ id: "1", subtotal: 0 }]);
  const salesBtn = useSelector(state => state.salesBtn);
  const salesData = useSelector(state => state.sales.data);
  const clients = useSelector(state => state.clients.list);
  const dispatch = useDispatch();

  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""));
    Array.from(document.querySelectorAll("select")).forEach(
      select => (select.value = "")
    );
    setRowsData([{ id: 1, subtotal: 0 }]);
    dispatch(updateSales({ data: { tax: 0, subtotal: 0, total: 0 } }));
  };

  const handleClick = () => {
    dispatch(decreaseStock({ db, rowsData }));
    dispatch(updateSales({ data: { ...salesData, orderedProducts: rowsData } }));
    dispatch(saveSaleInfo({ db, rowsData }));
    handleReset();
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
    const newTotal = newSubtotal * (1 + salesData.tax / 100);
    dispatch(
      updateSales({ data: { ...salesData, subtotal: newSubtotal, total: newTotal } })
    );
  }, [rowsData, salesData.tax]); //rowsData, checkoutData.tax

  return (
    <>
      <ClientSelect options={clients} size='lg' />
      <TableContainer rowsData={rowsData} setRowsData={setRowsData} />
      <Flex justify='flex-end' align='center'>
        <Btn color='green' status={salesBtn.disabled} onClick={handleClick}>
          Vender
        </Btn>

        <Btn color='red' onClick={handleReset}>
          Borrar
        </Btn>

        {/* <Btn color='green'  onClick={saveSalesInfo}>
          test
        </Btn> */}

        {/* <ReduxTest /> */}
        <Flex
          flexDir='column'
          justifyItems='center'
          alignItems='stretch'
          p='0 1rem'
          minW='400px'>
          <ValueContainer name='subtotal' value={salesData.subtotal} />
          {/* <TaxPicker checkoutData={checkoutData} setCheckoutData={setCheckoutData} /> */}
          <TaxPicker />
          <ValueContainer name='total' value={salesData.total} />
        </Flex>
      </Flex>
      {/* <CardsContainer /> */}
    </>
  );
};

export default Ventasc;
