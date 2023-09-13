import React from "react";
import { useContext } from "react";
import ReactDOM from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { CryptoContext } from "../context/CryptoContext";
import { useLayoutEffect } from "react";

const HighLowIndicator = ({ currentPrice, high, low }) => {
  return (
    //n HTML, &nbsp; is an entity reference that stands for "non-breaking space." It's a special character used to represent a space that should not be collapsed by web browsers or text processors. Unlike a regular space character (which browsers collapse into a single space), a non-breaking space character prevents line breaks and extra spaces from appearing in its place.
    <>
      <span className="h-1.5 bg-red w-[50%] rounded-l-lg">&nbsp;</span>
      <span className="h-1.5 bg-green w-[50%] rounded-r-lg">&nbsp;</span>
    </>
  );
};

function CryptoDetails() {
  // this we have mentioned, the param name is coinId in the router defn
  const { coinId } = useParams();
  // here just taking coinData into data variable (for simplicity)
  const { getCoinData, coinData: data, currency } = useContext(CryptoContext);

  //The primary purpose of useNavigate is to provide a function that allows you to programmatically navigate to different routes in your application.

  const navigate = useNavigate();
  const close = () => {
    navigate("..");
  };
  useLayoutEffect(() => {
    getCoinData(coinId);
  }, []);
  console.log("coin Data = ", data);
  //Portals in React are used to render a component's content in a different DOM hierarchy, typically outside the parent component's DOM hierarchy.
  // here we want the pop up to be above, the base comps, so, we created a new div in index.html and then used that "modal" tag to create a new DOM hierarchy
  return ReactDOM.createPortal(
    <div
      className="w-full h-full flex items-center justify-center bg-gray-200 bg-opacity-30 backdrop-blur-sm fixed top-0
     font-nunito"
      onClick={close}
    >
      <div
        className="w-[75%] h-[75%] relative bg-opacity-75 bg-gray-300 rounded-lg text-white"
        //e.stopPropagation(), is a method used in JS event handling to prevent the event from "bubbling up" through the DOM tree.
        //we used it coz, as we have given "close" to onClick of parent div, so as this div also comes under that div, therfore without this stopPropagation(), the modal will get closed even when u click on this div.
        onClick={(e) => e.stopPropagation()}
      >
        {data ? (
          <div className="w-full h-full flex justify-between p-4 items-center">
            <div className="w-[45%] h-full  flex flex-col pr-2">
              <div className="flex items-center w-full">
                <img
                  className="w-[3rem] h-[3rem] mx-1.5"
                  src={data.image.large}
                  alt={data.id}
                />
                <h1 className="text-lg font-bold capitalize ">{data.name}</h1>
                <span className="text-sm py-0.5 px-2.5 ml-2 bg-cyan text-cyan bg-opacity-25 rounded uppercase">
                  {data.symbol}
                </span>
              </div>

              <div className="w-full mt-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-100 capitalize ">
                    Price
                  </span>
                  <span
                    className={`flex rounded items-center justify-centerpx-1 ml-2 p-1 bg-opacity-25 text-sm ${
                      data.market_data.price_change_percentage_24h > 0
                        ? `text-green bg-green`
                        : `text-red bg-red`
                    }`}
                  >
                    {Number(
                      data.market_data.price_change_percentage_24h
                    ).toFixed(2)}
                    %
                    <svg
                      className={`ml-1 ${
                        data.market_data.price_change_percentage_24h > 0
                          ? `fill-green rotate-180`
                          : `fill-red`
                      } `}
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z" />
                    </svg>
                  </span>
                </div>
                <div>
                  <h2 className="font-bold text-[1.4rem] ">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      maximumSignificantDigits: 5,
                    }).format(data.market_data.current_price[currency])}
                  </h2>
                </div>
              </div>

              <div className="w-full mt-4 flex flex-col">
                <div className="flex justify-between items-center capitalize text-sm text-gray-100 ">
                  <span>market cap</span>
                  <span>fully diluted valuation</span>
                </div>
                <div className="flex justify-between items-center font-bold">
                  <h2>
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 0,
                    }).format(data.market_data.market_cap[currency])}
                  </h2>
                  <h2>
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      // this gives value like TCr for thousand crores
                      notation: "compact",
                    }).format(
                      data.market_data.fully_diluted_valuation[currency]
                    )}
                  </h2>
                </div>
              </div>

              <div className="w-full mt-4 flex flex-col justify-center ">
                <h2 className="capitalize text-gray-100 text-sm">
                  Total Volume
                </h2>
                <span className="font-bold">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: currency,
                    minimumFractionDigits: 0,
                  }).format(data.market_data.total_volume[currency])}
                </span>
              </div>

              <div className="w-full mt-4 flex  justify-between ">
                <HighLowIndicator
                  currentPrice={data.market_data.current_price[currency]}
                  high={data.market_data.high_24h[currency]}
                  low={data.market_data.low_24h[currency]}
                />
              </div>

              <div className="w-full mt-4 flex flex-col">
                <div className="flex justify-between items-center capitalize text-sm text-gray-100 ">
                  <span>low 24H</span>
                  <span>high 24H</span>
                </div>
                <div className="flex justify-between items-center font-bold">
                  <h2>
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 5,
                    }).format(data.market_data.low_24h[currency])}
                  </h2>
                  <h2>
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,

                      minimumFractionDigits: 5,
                    }).format(data.market_data.high_24h[currency])}
                  </h2>
                </div>
              </div>

              <div className="w-full mt-4 flex flex-col">
                <div className="flex justify-between items-center capitalize text-sm text-gray-100 ">
                  <span>max supply</span>
                  <span>circulating supply</span>
                </div>
                <div className="flex justify-between items-center font-bold">
                  <h2>
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 0,
                    }).format(data.market_data.max_supply)}
                  </h2>
                  <h2>
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,

                      minimumFractionDigits: 0,
                    }).format(data.market_data.circulating_supply)}
                  </h2>
                </div>
              </div>

              <div className="w-full mt-4 flex justify-between items-center">
                <div className="flex flex-col">
                  <a
                    target={"_blank"}
                    rel="noreferrer"
                    className="text-sm bg-gray-200 text-gray-100 px-1.5 py-0.5 my-1 rounded"
                    //here we use optional chaining "?", so that even though the data does not exist, we just show undefined instead of throwing an error
                    href={data?.links?.homepage[0]}
                  >
                    {data?.links?.homepage[0].substring(0, 30)}
                  </a>
                  <a
                    target={"_blank"}
                    rel="noreferrer"
                    className="text-sm bg-gray-200 text-gray-100 px-1.5 py-0.5 my-1 rounded"
                    href={data?.links?.blockchain_site[0]}
                  >
                    {data?.links?.blockchain_site[0].substring(0, 30)}
                  </a>
                  {/* most coins might not have forum links, so first verifying if its present, if so only then return the jsx element. 
                  The above 2 links definitely will be present for every coin, thus we dint check this for them. 
                  */}
                  {data?.links?.official_forum_url[0] && (
                    <a
                      target={"_blank"}
                      rel="noreferrer"
                      className="text-sm bg-gray-200 text-gray-100 px-1.5 py-0.5 my-1 rounded"
                      href={data?.links?.official_forum_url[0]}
                    >
                      {data?.links?.official_forum_url[0].substring(0, 30)}
                    </a>
                  )}
                </div>
                <div className="flex flex-col content-start">
                  <span className="text-sm capitalize text-gray-100">
                    sentiment
                  </span>
                  <div className="flex justify-between">
                    <div
                      className={`text-sm px-1 ml-2 my-1 font-medium flex items-center
          rounded uppercase bg-opacity-25 bg-green text-green
          
          `}
                    >
                      <span>
                        {Number(data.sentiment_votes_up_percentage).toFixed(2)}%
                      </span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`
                        w-[1rem] ml-0.5
                        fill-green rotate-180
                        `}
                      >
                        <path d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div
                      className={`text-sm px-1 ml-2 my-1 font-medium flex items-center
          rounded uppercase bg-opacity-25
           bg-red text-red
          `}
                    >
                      <span>
                        {Number(data.sentiment_votes_down_percentage).toFixed(
                          2
                        )}
                        %
                      </span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`
                        w-[1rem] ml-0.5 fill-red
                        `}
                      >
                        <path d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-[55%] h-full bg-black flex  pl-3 flex-col">
              right
            </div>
          </div>
        ) : null}
      </div>
    </div>,
    document.getElementById("modal")
  );
}

export default CryptoDetails;
