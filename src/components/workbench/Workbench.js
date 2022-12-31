import React, { useState, useEffect } from "react";
import TaskBar from "./taskBar/TaskBar";
import Desk from "./desk/Desk";
import { motion } from "framer-motion";
import NewProject from "./newProject/NewProject";
import Projects from "./projects/Projects";
import TaskBarButton from "./taskBar/TaskBarButton";
import axios from "axios";
import axiosConfig from "../../../src/api/axiosConfig";
import { Routes, Route } from "react-router-dom";
import allRoutes from "routes/allRoutes.js";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects } from "./projectsSlice";

const Workbench = ({ variants, transition }) => {
  // const tabs = [
  //   { key: "new-project", name: "New project", component: TaskBarButton },
  //   { key: "projects", name: "Projects", component: TaskBarButton },
  // ];

  let [active, setActive] = useState("new-project");

  let [projects, setProjects] = useState("");

  const workbenchRoutes = allRoutes().find(
    (route) => route.key === `/workbench`
  ).nestedRoutes;

  let idRoutes = workbenchRoutes[0].nestedRoutes;

  const dispatch = useDispatch();
  const projectsX = useSelector((state) => state.projects);

  //run with server
  console.log("render");

  return (
    <motion.div
      className="workbench"
      initial="out"
      animate="in"
      exit="out"
      variants={variants}
      transition={transition}
    >
      <TaskBar />
      {/* {active === "new-project" && <NewProject />}
      {active === "projects" && <Projects projects={projects} />} */}

      <Routes>
        {workbenchRoutes.map((route) => (
          <Route
            key={route.key}
            path={route.path}
            element={<route.component />}
            setProjects={setProjects}
            projects={projects}
          />
        ))}
        {idRoutes.map((route) => (
          <Route
            key={route.key}
            path={`/projects${route.path}`}
            element={<route.component />}
            // setProjects={setProjects}
            // projects={projects}
          />
        ))}
      </Routes>
    </motion.div>
  );
};

export default Workbench;
