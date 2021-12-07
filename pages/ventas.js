import React, { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { decreaseStock } from "../app/slices/productsSlice";
import db from "../firebase/clientApp";
import TableContainer from "../components/TableContainer";
import ValueContainer from "../components/ValueContainer";
import TaxPicker from "../components/TaxPicker";
import ReduxTest from "../components/ReduxTest";

const Ventasc = () => {
  const [rowsData, setRowsData] = useState([{ id: "1", subtotal: 0 }]);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.list);

  const handleReset = () => {
    Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""));
    Array.from(document.querySelectorAll("select")).forEach(
      select => (select.value = "")
    );
    setRowsData([{ id: 1, subtotal: 0 }]);
  };
  //TODO: Agregar boton de venta, descontando inventario de la bd y almacenando la venta en la bd.

  return (
    <>
      {/* <TableContainer props={products, setTotal} /> */}
      <TableContainer
        products={products}
        setTotal={setTotal}
        rowsData={rowsData}
        setRowsData={setRowsData}
      />
      <Box float='right' justifyItems='right' m='auto'>
        <ValueContainer text='Subtotal: ' value={total} />
        <TaxPicker value={tax} setTax={setTax} />
        <ValueContainer text='Total: ' value={total * (1 + tax / 100)} />
      </Box>
      <Button
        onClick={() => {
          dispatch(decreaseStock({ db, rowsData }));
          handleReset();
        }}>
        Vender
      </Button>
      <Button
        onClick={() => {
          handleReset();
        }}>
        reset
      </Button>
      <ReduxTest />
    </>
  );
};

export default Ventasc;
