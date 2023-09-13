import React from "react";
import { useRef } from "react";
import { useContext } from "react";
import submitIcon from "../assets/submit-icon.svg";
import { CryptoContext } from "../context/CryptoContext";
function Currency() {
  const currencyRef = useRef("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const cur = currencyRef.current.value;
    console.log("cur = ", cur);
    setCurrency(cur);
    currencyRef.current.value = "";
  };
  const { setCurrency } = useContext(CryptoContext);
  return (
    <div className="ml-3">
      <form className="flex ">
        {/* in react we use htmlFor attr equivalent to "for", which basically points to the id of the input */}
        <label htmlFor="currency" className="font-bold mr-2">
          currency:
        </label>
        <input
          id="currency"
          name="currency"
          ref={currencyRef}
          type="text"
          placeholder="usd"
          className="w-16 rounded bg-gray-200 pl-2  placeholder:text-gray-100 border border-transparent focus:border-cyan ml-2 outline-0"
        ></input>
        <button type="submit" onClick={handleSubmit}>
          <img src={submitIcon}></img>
        </button>
      </form>
    </div>
  );
}

export default Currency;
