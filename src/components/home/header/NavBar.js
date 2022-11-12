import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "actions";

const NavBar = ({ routes }) => {
  let navbar;

  const isLogged = useSelector((state) => state.isLogged);
  console.log(isLogged);
  const dispatch = useDispatch();

  if (!isLogged || isLogged === "PENDING") {
    navbar = (
      <div className="header__navbar">
        {routes
          .filter((route) => {
            if (route.name !== "Workbench") return route;
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
        <button
          className="header__navbar--btn"
          onClick={() => dispatch(signOut())}
        >
          Logout
        </button>
      </div>
    );
  }

  return navbar;
};

export default NavBar;
