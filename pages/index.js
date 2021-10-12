import React, { useState, useEffect } from "react";
import CardsContainer from "../components/CardsContainer";
import { collection, getDocs } from "firebase/firestore/lite";
import db from "../firebase/clientApp";

export default function Home() {
  const [products, setProducts] = useState();

  const getProducts = db => {
    const prodsColl = collection(db, "productos");
    getDocs(prodsColl)
      .then(snapshot => snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
      .then(prods => setProducts(prods));
  };

  useEffect(() => getProducts(db));

  return (
    <div>
      <button onClick={() => getProducts(db)}>click</button>
      {products.map(producto => {
        return <div key={producto.id}>{producto.name}</div>;
      })}
      {/* <CardsContainer /> */}
    </div>
  );
}
