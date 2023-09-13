import { useEffect } from "react";
import { createContext, useState, useLayoutEffect } from "react";

export const CryptoContext = createContext({});

export const CryptoProvider = ({ children }) => {
  const [cryptoData, setCryptoData] = useState([]);
  const [coinData, setCoinData] = useState();
  const [searchResults, setSearchResults] = useState([]);
  // this is used, when a coin in selected afrer searching
  const [coinSearch, setCoinSearch] = useState([]);
  const [currency, setCurrency] = useState("usd");
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [page, setPage] = useState(1);
  const [totalCoins, setTotalCoins] = useState(250);
  const [perPage, setPerPage] = useState(10);

  // I had created this, bcoz, with just the resetfunction, the searchText in search comp was not being set to empty string, therfore, created a new state for reset and passed it there.
  const [reset, setReset] = useState(false);
  const getCryptoData = async () => {
    console.log("before seetting pages", totalCoins);

    setTotalCoins(9920);
    console.log("after seetting pages,", totalCoins);

    // try {
    //   const data = await fetch(`https://api.coingecko.com/api/v3/coins/list`)
    //     .then((res) => res.json())
    //     .then((json) => json);

    //   console.log(data);
    //   setTotalCoins(data.length);
    // } catch (error) {
    //   console.log(error);
    // }

    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${sortBy}&per_page=${perPage}&page=${page}&ids=${coinSearch}&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d&locale=en
        `
      )
        .then((res) => res.json())
        .then((json) => json);

      console.log("data for whole table context= ", data);
      setCryptoData(data);
    } catch (e) {
      console.log("error", e);
    }
  };
  const getCoinData = async (coinid) => {
    setCoinData();
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinid}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=true&sparkline=false`
      )
        .then((res) => res.json())
        .then((json) => json);

      // console.log("CoinData", data);
      setCoinData(data);
    } catch (error) {
      console.log(error);
    }
  };
  let getSearchResults = async (query) => {
    try {
      let data =
        await fetch(`https://api.coingecko.com/api/v3/search?query=${query}
    `)
          .then((res) => res.json())
          .then((json) => json);

      console.log("data from search query context= ", data);
      // we are showing results for only coins
      //but the api has, for evrythng like, markets etc
      setSearchResults(data.coins);
    } catch (e) {
      console.log("error", e);
    }
  };
  const resetFunction = () => {
    setPage(1);
    setPerPage(10);
    setCoinSearch([]);
    setSearchResults([]);
    setReset(true);
  };
  //so that, the data will be loaded before the component renders completely
  //initially, the coinSearch will be "". therfore we fetch all top coins only. but when, a coin in selected, then we pass that to the api, therfore, only that particular coin data is shown in the table
  useLayoutEffect(() => {
    getCryptoData();
  }, [coinSearch, currency, sortBy, page, perPage]);

  // I had done this, bcoz, with reset, the searchText in search comp was not being set to empty string, therfore, created a new state for reset and passed it there.
  useEffect(() => {
    setReset(false);
  }, []);
  // remember to use return,
  return (
    <CryptoContext.Provider
      value={{
        cryptoData,
        searchResults,
        currency,
        sortBy,
        page,
        perPage,
        coinData,
        totalCoins,
        reset,
        setReset,
        getCoinData,
        setTotalCoins,
        setPage,
        setPerPage,
        setSortBy,
        setSearchResults,
        getSearchResults,
        setCoinSearch,
        setCurrency,
        resetFunction,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};
