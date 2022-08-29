import React, { useState, useEffect } from "react";
import TaskBar from "./taskBar/TaskBar";
import Desk from "./desk/Desk";
import { motion } from "framer-motion";
import NewProject from "./newProject/NewProject";
import Projects from "./projects/Projects";
import TaskBarButton from "./taskBar/TaskBarButton";
import axios from "axios";
import axiosConfig from "../../../src/api/axiosConfig";

const Workbench = ({ variants, transition }) => {
  const tabs = [
    { key: "new-project", name: "New project", component: TaskBarButton },
    { key: "projects", name: "Projects", component: TaskBarButton },
  ];

  let [active, setActive] = useState("new-project");

  let [projects, setProjects] = useState("");

  console.log("render");
  useEffect(() => {
    console.log("resource type change");

    const userId = 1;
    setProjects(
      axiosConfig
        .get(`http://localhost:8080/projects?userAccountId=${userId}`)
        .then((resp) => console.log(resp))
        .catch((e) => console.error(`Error: ${e}`))
    );
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
      <TaskBar onClick={setActive} tabs={tabs} />
      {active === "new-project" && <NewProject />}
      {active === "projects" && <Projects projects={projects} />}
    </motion.div>
  );
};

export default Workbench;
