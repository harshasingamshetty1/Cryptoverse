import React from "react";
import { useContext } from "react";
import { Outlet } from "react-router-dom";
import TrendingCoin from "../components/TrendingCoin";
import { TrendingContext } from "../context/TrendingContext";

function Trending() {
  const { trendData } = useContext(TrendingContext);
  console.log("Crypto Data conins = ", trendData);
  return (
    <section className="w-[80%] h-full flex flex-col  mt-16 mb-24 relative">
      <div className="w-full min-h-[60vh] py-8 flex flex-wrap justify-evenly  border border-gray-100 rounded">
        {trendData &&
          trendData.map((coin) => {
            return <TrendingCoin coin={coin.item} />;
          })}
      </div>
      <Outlet />
    </section>
  );
}

export default Trending;
