import Header from "./components/layout-componenets/Header";
import Footer from "./components/layout-componenets/Footer";
import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
