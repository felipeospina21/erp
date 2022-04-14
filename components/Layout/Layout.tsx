import React, { useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { getProducts } from "../../redux/slices/productsSlice";
import { getClients } from "../../redux/slices/clientsSlice";
import db from "../../firebase/clientApp";
import SideNav from "./SideNav";
import { useAppDispatch } from "../../redux/hooks";

export interface LayoutProps {
  children: JSX.Element;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProducts(db));
  }, []);
  useEffect(() => {
    dispatch(getClients(db));
  }, []);

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
