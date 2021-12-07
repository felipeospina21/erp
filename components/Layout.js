import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, decreaseStock } from "../app/slices/productsSlice";
import db from "../firebase/clientApp";
import SideNav from "./SideNav";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  // const products = useSelector(state => state.products.list);

  useEffect(() => dispatch(getProducts(db)), [dispatch]);

  return (
    <>
      <SideNav />
      <Box as='main' p='1rem'>
        {children}
      </Box>
    </>
  );
};

export default Layout;
