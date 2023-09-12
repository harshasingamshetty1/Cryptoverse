import { useEffect } from "react";
import { createContext, useState, useLayoutEffect } from "react";

export const CryptoContext = createContext({});

export const CryptoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  // this is used, when a coin in selected afrer searching
  const [coinSearch, setCoinSearch] = useState("");
  const getCryptoData = async () => {
    try {
      //coinSearch param is passed
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&ids=${coinSearch}&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en
        `
      )
        .then((res) => res.json())
        .then((json) => json);

      console.log("data from context= ", data);
      setCryptoData(data);
    } catch (e) {
      console.log("error", e);
    }
  };

  let getSearchResults = async (query) => {
    try {
      let data =
        await fetch(`https://api.coingecko.com/api/v3/search?query=${query}
    `)
          .then((res) => res.json())
          .then((json) => json);

      console.log("data from context= ", data);
      // we are showing results for only coins
      //but the api has, for evrythng like, markets etc
      setSearchResults(data.coins);
    } catch (e) {
      console.log("error", e);
    }
  };
  //so that, the data will be loaded before the component renders completely
  //initially, the coinSearch will be "". therfore we fetch all top coins only. but when, a coin in selected, then we pass that to the api, therfore, only that particular coin data is shown in the table
  useLayoutEffect(() => {
    getCryptoData();
  }, [coinSearch]);

  // remember to use return,
  return (
    <CryptoContext.Provider
      value={{
        cryptoData,
        searchResults,
        setSearchResults,
        getSearchResults,
        setCoinSearch,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
