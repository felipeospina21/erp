import React, { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { decreaseStock } from "../app/slices/productsSlice";
import { toggle } from "../app/slices/salesBtnSlice";
import db from "../firebase/clientApp";
import TableContainer from "../components/TableContainer";
import ValueContainer from "../components/ValueContainer";
import TaxPicker from "../components/TaxPicker";
import Btn from "../components/Btn/Btn";
import ReduxTest from "../components/ReduxTest";

const Ventasc = () => {
  const [rowsData, setRowsData] = useState([{ id: "1", subtotal: 0 }]);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const btnDisabled = useSelector(state => state.salesBtn);
  const dispatch = useDispatch();

  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""));
    Array.from(document.querySelectorAll("select")).forEach(
      select => (select.value = "")
    );
    setRowsData([{ id: 1, subtotal: 0 }]);
    setTax(0);
  };

  const handleClick = () => {
    dispatch(decreaseStock({ db, rowsData }));
    handleReset();
  };
  //TODO: Agregar boton de venta, descontando inventario de la bd y almacenando la venta en la bd.
  //TODO: Cambiar nombre en BD, quantity => stock y actualizar en componentes.
  //TODO: Agrupar componenetes en carpetas de funcionalidad

  return (
    <>
      <TableContainer setTotal={setTotal} rowsData={rowsData} setRowsData={setRowsData} />
      <Flex justify='flex-end' align='center'>
        <Btn color='green' status={btnDisabled} onClick={handleClick}>
          Vender
        </Btn>

        <Btn color='red' onClick={handleReset}>
          Borrar
        </Btn>
        {/* <ReduxTest /> */}
        <Box justifyItems='right' p='0 1rem'>
          <ValueContainer text='Subtotal: ' value={total} />
          <TaxPicker value={tax} setTax={setTax} />
          <ValueContainer text='Total: ' value={total * (1 + tax / 100)} />
        </Box>
      </Flex>
    </>
  );
};

export default Ventasc;
