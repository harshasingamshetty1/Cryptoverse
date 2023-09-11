import React from "react";
import TableComp from "../components/TableComp";
import { CryptoProvider } from "../context/CryptoContext";

function Crypto() {
  return (
    <div>
      <section className=" h-full flex flex-col mt-16 mb-24 relative">
        <TableComp />
      </section>
    </div>
  );
}

export default Crypto;
