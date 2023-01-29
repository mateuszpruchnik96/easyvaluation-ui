import Workbench from "./components/workbench/Workbench.js";

import { useSelector, useDispatch } from "react-redux";
import "./styles.css";
// import { AnimatePresence, motion } from "framer-motion";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // useLocation,
  // useNavigate,
  Navigate,
} from "react-router-dom";
import React, { useEffect } from "react";
import axiosRefreshConfig from "./api/axiosRefreshConfig.js";

import allRoutes from "routes/allRoutes.js";
import { signOut } from "actions/index.js";
import { AxiosInterceptor } from "api/AxiosInterceptor.js";

function App() {
  const isLogged = useSelector((state) => state.isLogged);

  console.log(isLogged);
  const dispatch = useDispatch();

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

  const routes = allRoutes();

  useEffect(() => {
    // window.onbeforeunload = checkValidation();

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  const checkValidation = async (e) => {
    // e.preventDefault();
    // e.returnValue = "";

    try {
      console.log("REFRESH TOKEN CHECK");
      let response = await axiosRefreshConfig.post(
        // `http://localhost:8080/refreshtoken`,
        "",
        localStorage.easyValuationRefreshToken,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      console.log(response);
      if (response.status == 404) {
        console.log("dispatch logout");
        dispatch(signOut());
      }
    } catch (error) {
      console.log("dispatch logout because of error: " + error);
      dispatch(signOut());
    }
  };

  return (
    <Router>
      <AxiosInterceptor>
        <div className="app">
          {/* <Header routes={routes} isLogged={isLogged} /> */}
          <Routes>
            {routes.map(function (route) {
              return (
                <Route
                  key={route.key}
                  path={route.path}
                  authed={route.authed}
                  element={
                    route.authed === true ? (
                      isLogged === true ? (
                        <route.component
                          variants={pageVariants}
                          transition={pageTransition}
                          routes={routes}
                        ></route.component>
                      ) : (
                        <Navigate
                          to="/login"
                          // replace
                          // state={{ path: location.pathname }}
                        />
                      )
                    ) : (
                      <route.component
                        variants={pageVariants}
                        transition={pageTransition}
                        routes={routes}
                      ></route.component>
                    )
                  }
                >
                  {/* {
                  // (() => {
                    route.nestedRoutes
                    ? route.nestedRoutes.map(function (nestedRoute) {
                        return (
                          <Route
                          path={nestedRoute.path}
                          element={
                            <nestedRoute.component
                                variants={pageVariants}
                                transition={pageTransition}
                                //  routes={routes}
                                />
                              }
                          />
                          );
                      })
                    : () => {
                      return <></>;
                    }
                  } */}
                  {/* // })() */}
                </Route>
              );
            })}
          </Routes>
        </div>
      </AxiosInterceptor>
    </Router>
  );
}

export default App;
