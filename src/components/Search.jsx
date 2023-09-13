import debounce from "lodash.debounce";
import React from "react";
import { useContext } from "react";
import { useState, useEffect } from "react";
import searchIcon from "../assets/search-icon.svg";
import { CryptoContext } from "../context/CryptoContext";

const SearchInputComp = ({ debounceFunc }) => {
  const [searchText, setSearchText] = useState("");
  const [openSearchBox, setOpenSearchBox] = useState(false);
  const { searchResults, setSearchResults, setCoinSearch, reset, setPerPage } =
    useContext(CryptoContext);
  const handleInput = (e) => {
    e.preventDefault();
    setOpenSearchBox(true);
    let query = e.target.value;
    setSearchText(query);
    debounceFunc(query);
  };
  const selectCoin = (coin) => {
    setCoinSearch(coin);
    setOpenSearchBox(false);
    setSearchResults([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpenSearchBox(false);
    const ids = searchResults.map((coin) => coin.id);
    console.log("print ids = ", ids);

    setCoinSearch([...searchResults, ids]);
    // setSearchText("");
    setSearchResults([]);

    //doing the same thing, just taking the searched Text and
    // assigning them on the search card
    // debounceFunc(searchText);
  };

  useEffect(() => {
    setSearchText("");
  }, [reset]);

  return (
    <>
      <form
        className="w-96 flex items-center relative ml-7 font-nunito "
        onSubmit={handleSubmit}
      >
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

      {openSearchBox ? (
        // here, the parent comp is given as relative pos,
        //so, this absolute will be according to the search comp.
        // so, we gave right-0, therfore the ul will have 0 gap realative to the right side of the search comp
        <ul className="absolute top-11 right-0 w-96 h-96 bg-gray-200 overflow-x-hidden  flex flex-col  bg-opacity-60 backdrop-blur-md  scrollbar-thin scrollbar-track-gray-200 scrollbar-thumb-gray-100    ">
          {searchResults.length > 0 ? (
            searchResults.map((item) => {
              return (
                <li
                  key={item.id}
                  onClick={() => {
                    //here passing the id, bcoz in the api we are passing the ids={coinSearch}. i.e only ids needs to passed to get the relevant info from the api
                    selectCoin(item.id);
                  }}
                  className=" flex items-center ml-4 my-2 cursor-pointer"
                >
                  <img
                    className="w-[1rem] h-[1rem] mx-1.5"
                    src={item.thumb}
                    alt={item.name}
                  />
                  <span>{item.name}</span>
                </li>
              );
            })
          ) : (
            <div className="flex  justify-center h-full  items-center  ">
              <div className="w-8 h-8 border-4 border-cyan  rounded-full border-b-gray-200 animate-spin   " />
              <span className="text-md ml-2">Searching...</span>
            </div>
          )}
        </ul>
      ) : null}
    </>
  );
};

const Search = () => {
  /*  our plan is such that, we have to call the api only after 2 seconds but not for every single char typed. therefore we are using the debouncer. And its property is that, how many ever times we may call that(without re-rendering comp) , only once excn for every 2 scnds is carried out. And whichever was the latest function execution, i.e the latest query param at the end of 2secs will be considered for the invocation. therefore it suits best for our usecase of searching and hitting the api */

  /*Now, the reason, we have separated these function from the other comp is that, bcoz the seachInputComp is re-rendered everytime, the search text is changed, and every re-render will create a debounce function instance,therefore wasting the main purpose of debounce. */
  const { getSearchResults } = useContext(CryptoContext);
  const debounceFunc = debounce(function (query) {
    getSearchResults(query);
  }, 2000);

  return (
    <div className="relative">
      <SearchInputComp debounceFunc={debounceFunc} />
    </div>
  );
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
