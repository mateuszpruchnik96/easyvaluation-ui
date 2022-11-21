import React from "react";
import TaskBarButton from "./TaskBarButton";
// import Projects from "../projects/Projects";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import allRoutes from "routes/allRoutes.js";

const workbenchRoutes = allRoutes().find(
  (route) => route.key === `/workbench`
).nestedRoutes;

const TaskBar = () => {
  const location = useLocation();

  return (
    <div className="workbench__task-bar">
      <div className="workbench__task-bar__header">Easy Valuation</div>
      {workbenchRoutes.map((route) => (
        <Link
          to={`/workbench${route.path}`}
          key={route.key}
          className={
            location.pathname.endsWith(route.path)
              ? "workbench__task-bar__button workbench__task-bar__button--active"
              : "workbench__task-bar__button "
          }
          active={location.pathname.endsWith(route.path).toString()}
        >
          {route.name}
        </Link>
      ))}
    </div>
  );
};

export default TaskBar;
