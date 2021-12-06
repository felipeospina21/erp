import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { load, getProducts, decreaseStock } from "../app/slices/productsSlice";
import { Button } from "@chakra-ui/react";
import db from "../firebase/clientApp";

const ReduxTest = () => {
  const products = useSelector(state => state.products.list);
  const dispatch = useDispatch();

  return (
    <div>
      <Button onClick={() => dispatch(getProducts(db))}>get products</Button>
      <Button
        onClick={() =>
          dispatch(decreaseStock({ db, productId: "4jdx08dPUYYbz6hDiuWa",quantity: 1 }))
        }>
        update products
      </Button>

    </div>
  );
};

export default ReduxTest;
