import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { load, update, getProducts, updateProducts } from "../app/slices/productsSlice";
import { Button } from "@chakra-ui/react";
import db from "../firebase/clientApp";

const ReduxTest = () => {
  const products = useSelector(state => state.products.list);
  const dispatch = useDispatch();

  return (
    <div>
      <Button onClick={() => dispatch(update("4jdx08dPUYYbz6hDiuWa"))}>test redux</Button>
      <Button
        onClick={() =>
          dispatch(updateProducts({ db, productId: "4jdx08dPUYYbz6hDiuWa" }))
        }>
        click
      </Button>
      <Button onClick={() => console.log(products)}>print</Button>
    </div>
  );
};

export default ReduxTest;
