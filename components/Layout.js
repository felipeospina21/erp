import React from "react";
import SideNav from "./SideNav";

const Layout = ({ children }) => {
  return (
    <>
      <SideNav />
      <main>{children}</main>
    </>
  );
};

export default Layout;
