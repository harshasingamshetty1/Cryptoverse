import React from "react";
import { useContext } from "react";
import selectIcon from "../assets/select-icon.svg";
import { CryptoContext } from "../context/CryptoContext";
const Sorting = () => {
  const { setSortBy } = useContext(CryptoContext);
  const handleSort = (e) => {
    e.preventDefault();
    let val = e.target.value;
    setSortBy(val);
  };
  return (
    <div className="flex ml-3 mr-7 ">
      <label className="flex items-center justify-center relative ">
        <span className="font-bold mr-2">sort by: </span>
        <select
          name="sortby"
          className="bg-gray-200  
         pl-2 pr-10 capitalize focus:outline-0 py-0.5 rounded-lg"
          onClick={handleSort}
        >
          <option value="market_cap_desc">market cap desc</option>
          <option value="market_cap_asc">market cap asc</option>
          <option value="volume_desc">volume desc</option>
          <option value="volume_asc">volume asc</option>
          <option value="id_desc">id desc</option>
          <option value="id_asc">id asc</option>
          <option value="gecko_desc">gecko desc</option>
          <option value="gecko_asc">gecko asc</option>
        </select>
        <img
          src={selectIcon}
          alt="submit"
          //  the pointer-events-none class will not respond to mouse clicks or other pointer interactions. This is useful when you want to visually overlay an element on top of other content without blocking interaction with the content beneath.
          // so without this class, when user clicks on the img, the drop down wont show up, bcoz the select tag is beneath the img, therefore now with pointer-events-none, we can click on img, but still the select tag beneath it will be activated!
          className=" absolute w-[1rem] h-full right-0 pointer-events-none
         "
        />
      </label>
    </div>
  );
};

export default Sorting;
