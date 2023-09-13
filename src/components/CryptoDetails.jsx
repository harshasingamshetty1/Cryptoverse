import React from "react";
import { useContext } from "react";
import ReactDOM from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { CryptoContext } from "../context/CryptoContext";
import { useLayoutEffect } from "react";

function CryptoDetails() {
  // this we have mentioned, the param name is coinId in the router defn
  const { coinId } = useParams();
  // here just taking coinData into data variable
  const { getCoinData, coinData: data } = useContext(CryptoContext);

  //The primary purpose of useNavigate is to provide a function that allows you to programmatically navigate to different routes in your application.

  const navigate = useNavigate();
  const close = () => {
    navigate("..");
  };
  useLayoutEffect(() => {
    getCoinData(coinId);
  }, []);
  console.log("coin Data = ", coinData);
  //Portals in React are used to render a component's content in a different DOM hierarchy, typically outside the parent component's DOM hierarchy.
  // here we want the pop up to be above, the base comps, so, we created a new div in index.html and then used that "modal" tag to create a new DOM hierarchy
  return ReactDOM.createPortal(
    <div
      className="w-full h-full flex items-center justify-center bg-gray-200 bg-opacity-30 backdrop-blur-sm fixed top-0
     font-nunito"
      onClick={close}
    >
      <div
        className="w-[65%] h-[75%] relative bg-gray-300 rounded-lg text-white"
        //e.stopPropagation(), is a method used in JS event handling to prevent the event from "bubbling up" through the DOM tree.
        //we used it coz, as we have given "close" to onClick of parent div, so as this div also comes under that div, therfore without this stopPropagation(), the modal will get closed even when u click on this div.
        onClick={(e) => e.stopPropagation()}
      >
        {coinData ? <h1>{coinData.id}</h1> : null}
      </div>
    </div>,
    document.getElementById("modal")
  );
}

export default CryptoDetails;
