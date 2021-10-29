import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import TableContainer from "../components/TableContainer";
import { collection, getDocs } from "firebase/firestore/lite";
import db from "../firebase/clientApp";
import ValueContainer from "../components/ValueContainer";
import TaxPicker from "../components/TaxPicker";

const ventasc = () => {
  const [products, setProducts] = useState([]);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);

  const getProducts = db => {
    const prodsColl = collection(db, "productos");
    getDocs(prodsColl)
      .then(snapshot => snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
      .then(prods => setProducts(prods));
  };
  useEffect(() => getProducts(db), []);

  return (
    <>
      <TableContainer products={products} setTotal={setTotal} />
      <Box float='right' justifyItems='right' m='auto'>
        <ValueContainer text='Subtotal: ' value={total} />
        <TaxPicker value={tax} setTax={setTax} />
        <ValueContainer text='Total: ' value={total * (1 + tax / 100)} />
      </Box>
    </>
  );
};

export default ventasc;
