import { useEffect } from "react";
import { createContext, useState, useLayoutEffect } from "react";

export const TrendingContext = createContext({});

export const TrendingProvider = ({ children }) => {
  const [trendData, setTrenData] = useState([]);

  const getTrendData = async () => {
    try {
      const data = await fetch(
        `https://api.coingecko.com/api/v3/search/trending`
      )
        .then((res) => res.json())
        .then((json) => json);

      console.log("Trending data context= ", data);
      setTrenData(data.coins);
    } catch (e) {
      console.log("error", e);
    }
  };

  const resetTrendingResult = () => {
    getTrendData();
  };
  //so that, the data will be loaded before the component renders completely
  //initially, the coinSearch will be "". therfore we fetch all top coins only. but when, a coin in selected, then we pass that to the api, therfore, only that particular coin data is shown in the table
  useLayoutEffect(() => {
    getTrendData();
  }, []);

  // remember to use return,
  return (
    <TrendingContext.Provider value={{ trendData, resetTrendingResult }}>
      {children}
    </TrendingContext.Provider>
  );
};
