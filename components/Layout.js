import React from "react";
import SideNav from "./SideNav";
import { Box } from "@chakra-ui/react";

const Layout = ({ children }) => {
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
