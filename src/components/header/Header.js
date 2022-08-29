import React from "react";
import NavBar from "./NavBar";

const Header = ({ routes, isLogged }) => {
  return (
    <div className="header">
      <div className="header__logo">Easy Valuation</div>
      <NavBar routes={routes} isLogged={isLogged} />
    </div>
  );
};

export default Header;
