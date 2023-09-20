import React from "react";
import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import { CryptoProvider } from "../context/CryptoContext";
import { StorageProvider } from "../context/StorageContext";
import { TrendingProvider } from "../context/TrendingContext";

const Home = () => {
  return (
    // The relative value for the position property is used to create a positioning context for child elements.
    // When an element is set to position: relative, it serves as the reference point for absolutely positioned child elements.
    <CryptoProvider>
      <TrendingProvider>
        <StorageProvider>
          <main className="w-full h-full flex flex-col font-nunito relative first-letter:content-center items-center text-white  ">
            {/* It's a common practice to use negative z-index values for background elements to ensure that they don't interfere with the layout and interaction of other elements on the page. */}
            {/* so with this div, we need not think about bg again, coz its for the
      entire viewport */}
            <div className="w-screen h-screen bg-gradient-to-tr from-gray-300 to-gray-900      fixed -z-10" />

            <Logo />
            <Navigation />
            {/* This is required in the parent path for the router dom, 
      as we are having childern for this path, in the main.jsx*/}
            <Outlet />
          </main>
        </StorageProvider>
      </TrendingProvider>
    </CryptoProvider>
  );
};

export default Home;
