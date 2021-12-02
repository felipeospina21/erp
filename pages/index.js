import React, { useEffect, useContext } from "react";
import CardsContainer from "../components/CardsContainer";
import { collection, getDocs } from "firebase/firestore/lite";
import { ProductsContext } from "../context/ProductsContext";
import db from "../firebase/clientApp";

export default function Home() {
  //TODO: Take products state as global state (context or redux)
  const [products, setProducts] = useContext(ProductsContext);

  const getProducts = db => {
    const prodsColl = collection(db, "productos");
    getDocs(prodsColl)
      .then(snapshot => snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
      .then(prods => setProducts(prods));
  };

  useEffect(() => getProducts(db), []);

  return (
    <div>
      <CardsContainer products={products} />
    </div>
  );
}
