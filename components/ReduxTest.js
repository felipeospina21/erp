import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { load, sale, extraReducers} from "../app/slices/productsSlice";
import {Button} from '@chakra-ui/react'
const ReduxTest = () => {
  const products = useSelector(state => state.products);
  const dispatch = useDispatch();

  return (
    <div>
      <Button onClick={() => dispatch(sale())}>test redux</Button>
      <Button onClick={()=>dispatch(extraReducers.getFromDb())}>click</Button>
    </div>
  );
};

export default ReduxTest;
