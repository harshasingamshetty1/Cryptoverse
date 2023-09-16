import React from "react";
import { Outlet } from "react-router-dom";
import Filters from "../components/Filters";
import TableComp from "../components/TableComp";
import { CryptoProvider } from "../context/CryptoContext";

function Crypto() {
  return (
    <section className=" w-[80%] h-full flex flex-col mt-16 mb-24 relative">
      <Filters />
      <TableComp />
      <Outlet />
    </section>
  );
}

export default Crypto;
