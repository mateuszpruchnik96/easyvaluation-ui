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

  //run with server
  console.log("render");
  useEffect(() => {
    console.log("resource type change");
    let temp = null;
    const userId = 1;
    axiosConfig
      .get(`http://localhost:8080/projects?userAccountId=${userId}`)
      // .then((resp) => resp.json())
      .then((resp) => (temp = resp.data))
      .then((resp) => {
        setProjects(temp);

        console.log(temp);
        console.log(workbenchRoutes);
      })
      .catch((e) => {
        console.error(`Error: ${e}`);
      });
  }, []);

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
      </Routes>
    </motion.div>
  );
};

export default Workbench;
