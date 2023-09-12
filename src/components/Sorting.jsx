import React from "react";
import selectIcon from "../assets/select-icon.svg";
const Sorting = () => {
  const handleSort = () => {};
  return (
    <div className="mr-4">
      <label className="flex">
        <span className="font-bold mr-2">sort by: </span>
        <select
          name="sortby"
          className="bg-gray-200 text-gray-100 relative
         "
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
          className=" absolute right-0 top-4
         "
        />
      </label>
    </div>
  );
};

export default Sorting;
