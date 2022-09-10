import React from "react";
import TaskBarButton from "./TaskBarButton";
// import Projects from "../projects/Projects";
import { Link } from "react-router-dom";

import allRoutes from "routes/allRoutes.js";

const workbenchRoutes = allRoutes().find(
  (route) => route.key === `/workbench`
).nestedRoutes;

const TaskBar = () => {
  return (
    <div className="workbench__task-bar">
      {workbenchRoutes.map((route) => (
        <Link
          to={`/workbench${route.path}`}
          key={route.key}
          className="workbench__task-bar--button"
        >
          {route.name}
        </Link>
      ))}
    </div>
  );
};

export default TaskBar;
