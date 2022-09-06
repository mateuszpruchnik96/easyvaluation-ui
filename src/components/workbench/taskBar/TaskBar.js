import React from "react";
import TaskBarButton from "./TaskBarButton";
import Projects from "../projects/Projects";
import { Route, Routes } from "react-router-dom";

// import allRoutes from "routes/allRoutes.js";

const TaskBar = ({ onClick, tabs }) => {
  // const allRoutex = allRoutes;
  return (
    <div className="workbench__task-bar">
      {tabs.map((tab) => (
        <tab.component onClick={onClick} tab={tab}></tab.component>
      ))}
      {/* <Routes>
        <Route
          path={`/projects`}
          element={
            <Projects
            // isLogged={isLogged}
            // setIsLogged={() => setIsLogged(true)}
            // variants={pageVariants}
            // transition={pageTransition}
            // routes={routes}
            />
          }
        />
      </Routes> */}

      {/* { key: "new-project", name: "New project", component: TaskBarButton }, */}
    </div>
  );
};

export default TaskBar;
