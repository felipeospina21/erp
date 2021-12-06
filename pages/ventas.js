import React, { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import TableContainer from "../components/TableContainer";
import { getProducts, decreaseStock } from "../app/slices/productsSlice";
import { useSelector, useDispatch } from "react-redux";

import db from "../firebase/clientApp";
import ValueContainer from "../components/ValueContainer";
import TaxPicker from "../components/TaxPicker";
import ReduxTest from "../components/ReduxTest";

const Ventasc = () => {
  //TODO: Add product id (from db) to rowsData state
  const [rowsData, setRowsData] = useState([
    { id: "1", item: null, q: null, subtotal: 0 },
  ]);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.list);

  useEffect(() => dispatch(getProducts(db)), [dispatch]);

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
        onClick={() =>
          dispatch(decreaseStock({ db, productId: "4jdx08dPUYYbz6hDiuWa", quantity: 1 }))
        }>
        Vender
      </Button>
      <ReduxTest />
    </>
  );
};

export default Ventasc;
