import React, {useEffect, useState} from "react";
import TableContainer from "../components/TableContainer";
import { collection, getDocs } from "firebase/firestore/lite";
import db from "../firebase/clientApp";

const ventasc = () => {
  const [products, setProducts] =useState([])

  const getProducts = db => {
    const prodsColl = collection(db, "productos");
    getDocs(prodsColl)
      .then(snapshot => snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
      .then(prods => setProducts(prods));
  };
  useEffect(() => getProducts(db), [])

  return (
    <>
      <TableContainer products={products}/>
    </>
  );
};

export default ventasc;
