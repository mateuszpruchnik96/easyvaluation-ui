import Workbench from "./components/workbench/Workbench.js";

import { useSelector, useDispatch } from "react-redux";
import "./styles.css";
// import { AnimatePresence, motion } from "framer-motion";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import React, { useEffect } from "react";
import axiosRefreshConfig from "./api/axiosRefreshConfig.js";

import allRoutes from "routes/allRoutes.js";
import { signOut } from "actions/index.js";

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
    window.onbeforeunload = checkValidation();

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  const checkValidation = async (e) => {
    // e.preventDefault();
    // e.returnValue = "";

    try {
      console.log("REFRESH TOKEN CHECK");
      await axiosRefreshConfig.post(
        // `http://localhost:8080/refreshtoken`,
        "",
        localStorage.easyValuationRefreshToken,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
    } catch (error) {
      console.log("dispatch logout");
      dispatch(signOut());
    }
  };

  return (
    <Router>
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
    </Router>
  );
}

export default App;

// {
//   // (() => {
//   route.nestedRoutes
//     ? route.nestedRoutes.map(function (nestedRoute) {
//         return (
//           <Route
//             path={nestedRoute.path}
//             element={
//               <nestedRoute.component
//                 variants={pageVariants}
//                 transition={pageTransition}
//                 //  routes={routes}
//               />
//             }
//           />
//         );
//       })
//     : () => {
//         return <></>;
//       }
// })()
//

// <Route
// path="/workbenchX"
// element={
//   <Workbench
//     variants={pageVariants}
//     transition={pageTransition}
//     routes={routes}
//   ></Workbench>
// }
// >
// <Route
//   path="/workbenchX/projects"
//   variants={pageVariants}
//   transition={pageTransition}
// ></Route>
// </Route>
