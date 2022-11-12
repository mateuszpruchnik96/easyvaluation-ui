import React from "react";
import NavBar from "./NavBar";

const Header = ({ routes}) => {
  return (
    <div className="header">
      <div className="header__logo">Easy Valuation</div>
      <NavBar routes={routes} />
    </div>
  );
};

export default Header;
