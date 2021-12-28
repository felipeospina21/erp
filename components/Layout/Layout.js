import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { getProducts } from "../../app/slices/productsSlice";
import { getClients } from "../../app/slices/clientsSlice";
import db from "../../firebase/clientApp";
import SideNav from "./SideNav";

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => dispatch(getProducts(db)), []);
  useEffect(() => dispatch(getClients(db)), []);

  return (
    <>
      <SideNav />
      <Box as='main' m='1rem 2rem'>
        {children}
      </Box>
    </>
  );
};

export default Layout;
