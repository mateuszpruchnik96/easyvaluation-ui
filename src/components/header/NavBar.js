import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ routes, isLogged }) => {
  let navbar;
  if (!isLogged) {
    navbar = (
      <div className="header__navbar">
        {routes.map((route) => (
          <Link
            key={route.path}
            to={route.path}
            className="header__navbar--link"
          >
            {route.name}
          </Link>
        ))}
      </div>
    );
  } else {
    navbar = (
      <div className="header__navbar">
        {routes
          .filter((route) => {
            if (route.name !== "Login" && route.name !== "Registration")
              return route;
          })
          .map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className="header__navbar--link"
            >
              {route.name}
            </Link>
          ))}
        <button className="header__navbar--btn">Logout</button>
      </div>
    );
  }

  return navbar;
};

export default NavBar;
