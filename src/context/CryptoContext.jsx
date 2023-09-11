import { createContext, useState, useLayoutEffect } from "react";

export const CryptoContext = createContext({});

export const CryptoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState([]);

  const getCryptoData = async () => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en
        `
      )
        .then((res) => res.json())
        .then((json) => json);
      if (!data) {
        throw Error("Fetching error");
      }
      console.log("data from context= ", data);
      setCryptoData(data);
    } catch (e) {
      console.log("error", e);
    }
  };
  //so that, the data will be loaded before the component renders completely
  useLayoutEffect(() => {
    getCryptoData();
  }, []);
  // remember to use return,
  return (
    <CryptoContext.Provider value={{ cryptoData }}>
      {children}
    </CryptoContext.Provider>
  );
};
