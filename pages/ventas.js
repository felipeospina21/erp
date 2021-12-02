import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import TableContainer from "../components/TableContainer";
import { collection, getDocs } from "firebase/firestore/lite";
import { load, getProducts} from "../app/slices/productsSlice";
import { useSelector, useDispatch } from "react-redux";

import db from "../firebase/clientApp";
import ValueContainer from "../components/ValueContainer";
import TaxPicker from "../components/TaxPicker";
import ReduxTest from "../components/ReduxTest";

const Ventasc = () => {
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.list);

  useEffect(() => dispatch(getProducts(db)), [dispatch]);
 

  //TODO: Agregar boton de venta, descontando inventario de la bd y almacenando la venta en la bd.

  return (
    <>
      <TableContainer products={products} setTotal={setTotal} />
      <Box float='right' justifyItems='right' m='auto'>
        <ValueContainer text='Subtotal: ' value={total} />
        <TaxPicker value={tax} setTax={setTax} />
        <ValueContainer text='Total: ' value={total * (1 + tax / 100)} />
      </Box>
      <ReduxTest/>
    </>
  );
};

export default Ventasc;
