import React from "react";
import Search from "../components/Search";
import Sorting from "../components/Sorting";
import Currency from "../components/Currency";

function Filters() {
  return (
    <div className="border-2 width-full rounded-lg h-12 flex items-center relative justify-between">
      <Search />
      <Currency />
      <Sorting />
    </div>
  );
}

export default Filters;
