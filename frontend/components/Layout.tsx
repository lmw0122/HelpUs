import react, { ReactNode, FC } from "react";
import { NextPage } from "next";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface Props {
  children: ReactNode;
}

const Layout = ({children}: Props) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh"}}>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

