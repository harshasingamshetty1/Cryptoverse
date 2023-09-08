import React from "react";
import { Link } from "react-router-dom";
import logoSvg from "../assets/logo.svg";
function Logo() {
  return (
    <Link
      to="/"
      className="absolute left-[1.5rem] top-[1.5rem] flex items-center"
    >
      <img src={logoSvg} alt="CryptoVerse" />
      <span className="font-nunito text-cyan text-lg "> Cryptoverse</span>
    </Link>
  );
}

export default Logo;
