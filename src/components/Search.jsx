import debounce from "lodash.debounce";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import searchIcon from "../assets/search-icon.svg";
import { CryptoContext } from "../context/CryptoContext";

const SearchInputComp = ({ debounceFunc }) => {
  const [searchText, setSearchText] = useState("");
  let handleInput = (e) => {
    e.preventDefault();
    let query = e.target.value;
    setSearchText(query);
    debounceFunc(query);
    console.log("ssss", searchText);
  };
  return (
    <>
      <form className="w-96 flex items-center relative ml-7 font-nunito ">
        <input
          className="w-full rounded-lg bg-gray-200 pl-2 placeholder:text-gray-100 required border border-transparent
          focus:border-cyan outline-0  "
          type={"text"}
          value={searchText}
          onChange={handleInput}
          placeholder="seach here..."
        ></input>
        <button type="submit" className="absolute right-1 ">
          <img src={searchIcon} alt="search" />
        </button>
      </form>

      {searchText.length > 0 ? (
        // here, the filters comp is given as relative pos,
        //so, this absolute will be according to the filters comp.
        <ul className="absolute top-11 right-0 w-full h-96 bg-gray-200 flex flex-col items-center bg-opacity-60 backdrop-blur-md  ">
          <li>btc</li>
          <li>eth</li>
          <li>btc</li>
        </ul>
      ) : null}
    </>
  );
};

const Search = () => {
  const { getSearchResults } = useContext(CryptoContext);
  /*  our plan is such that, we have to call the api only after 2 seconds but not for every single char typed. therefore we are using the debouncer. And its property is that, how many ever times we may call that(without re-rendering comp) , only once excn for every 2 scnds is carried out. And whichever was the latest function execution, i.e the latest query param at the end of 2secs will be considered for the invocation. therefore it suits best for our usecase of searching and hitting the api */

  /*Now, the reason, we have separated these function from the other comp is that, bcoz the seachInputComp is re-rendered everytime, the search text is changed, and every re-render will create a debounce function instance,therefore wasting the main purpose of debounce. */
  const debounceFunc = debounce(function (query) {
    getSearchResults(query);
  }, 2000);

  return <SearchInputComp debounceFunc={debounceFunc} />;
};

export default Search;

/*
When you place the debounceFunc directly inside the SearchInputComp, it does indeed create a new debounced function each time SearchInputComp is re-rendered (e.g., when the input value changes). This is because the handleInput function, which contains the debounceFunc call, is re-created with every render.

When you separate the creation of the debounceFunc outside of SearchInputComp and use the same instance of debounceFunc across re-renders of SearchInputComp, the debounce function instance remains the same. Therefore, it doesn't reset its internal timer with each re-render.

In both cases, the handleInput function is called when the input value changes. However:

In the first case (where debounceFunc is defined within SearchInputComp), a new debounce function is created for every SearchInputComp re-render. If the input value changes rapidly, multiple debounce functions with their independent timers are created, leading to multiple executions of the debounced function.

In the second case (where debounceFunc is created outside SearchInputComp and reused), there's only one instance of debounceFunc shared across re-renders. It has its own internal timer, and if the input value changes rapidly, it continues the countdown from where it left off, resulting in a single execution of the debounced function once the timer reaches zero.

So, the crucial difference is that in the second case, you're reusing the same debounced function instance across re-renders, whereas in the first case, you're creating new debounced function instances on each re-render. This is why you observe multiple executions in the first case and only one in the second.

 */
