import Workbench from "./components/workbench/Workbench.js";

import { useSelector, useDispatch } from "react-redux";
import "./styles.css";
// import { AnimatePresence, motion } from "framer-motion";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // useLocation,
} from "react-router-dom";
import React from "react";

import allRoutes from "routes/allRoutes.js";

function App() {
  // const [isLogged, setIsLogged] = useState(false);
  // useEffect(() => {
  //   let key = sessionStorage.getItem("easyValuationKey");
  //   if (key) {
  //     setIsLogged(true);
  //   }
  // }, []);

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
                element={
                  <route.component
                    // isLogged={isLogged}
                    // setIsLogged={() => setIsLogged(true)}
                    variants={pageVariants}
                    transition={pageTransition}
                    routes={routes}
                  ></route.component>
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
