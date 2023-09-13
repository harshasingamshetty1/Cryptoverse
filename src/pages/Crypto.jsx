import React from "react";
import { Outlet } from "react-router-dom";
import Filters from "../components/Filters";
import TableComp from "../components/TableComp";
import { CryptoProvider } from "../context/CryptoContext";

function Crypto() {
  return (
    <div>
      <section className=" h-full flex flex-col mt-16 mb-24 relative">
        <Filters />
        <TableComp />
        <Outlet />
      </section>
    </div>
  );
}

export default Crypto;
