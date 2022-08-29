import Login from "./components/login/Login.js";
import Landing from "./components/home/Landing";
import Header from "./components/header/Header";
import Workbench from "./components/workbench/Workbench.js";
import axios from "axios";
import Registration from "./components/registration/Registration.js";
import "./styles.css";
// import { AnimatePresence, motion } from "framer-motion";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // useLocation,
} from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    let key = sessionStorage.getItem("easyValuationKey");
    if (key) {
      setIsLogged(true);
    }
  }, []);

  const pageVariants = {
    in: {
      opacity: 1,
      y: 0,
    },
    out: {
      opacity: 0,
      y: "5%",
    },
  };

  const pageTransition = {
    transform: "rotate(100deg)",
    transition: "transform 3000, opacity 3000",
  };

  const routes = [
    { key: "/", path: "/", name: "Home", component: Landing },
    {
      key: "/workbench",
      path: "/workbench",
      name: "Workbench",
      component: Workbench,
    },
    { key: "/login", path: "/login", name: "Login", component: Login },
    {
      key: "/registration",
      path: "/registration",
      name: "Registration",
      component: Registration,
    },

    // { path: "/about", name: "About us", component: About },
  ];

  return (
    <Router>
      <div className="app">
        <Header routes={routes} isLogged={isLogged} />
        <Routes>
          {routes.map(function (route) {
            return (
              <Route
                path={route.path}
                element={
                  <route.component
                    isLogged={isLogged}
                    setIsLogged={() => setIsLogged(true)}
                    variants={pageVariants}
                    transition={pageTransition}
                    routes={routes}
                  />
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
