import React from "react";
// import axiosConfig from "../../../../src/api/axiosConfig";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllUserProjects,
  getProjectsStatus,
  getProjectsError,
  fetchProjects,
} from "../projectsSlice";
import ProjectBar from "./ProjectBar";
import ProjectEditor from "./projectEditor/ProjectEditor";

const Projects = () => {
  const dispatch = useDispatch();

  const projects = useSelector(selectAllUserProjects);
  const projectsStatus = useSelector(getProjectsStatus);
  const error = useSelector(getProjectsError);

  if (projectsStatus === "idle") {
    dispatch(fetchProjects());
  }

  useEffect(() => {
    console.log(projects);
    console.log(projectsStatus);
    console.log(error);
    console.log(error);

    if (projectsStatus === "idle") {
      dispatch(fetchProjects());
    }
  }, [projectsStatus, dispatch]);

  let content;
  const header = (
    <header className="projects__project-bar">
      <div className="projects__project-bar__id">ID</div>
      <div className="projects__project-bar__date">Opening date</div>
    </header>
  );

  if (projectsStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (projectsStatus === "succeeded") {
    const orderedProjects = projects.slice();
    // .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedProjects.map((project) => (
      <ProjectBar project={project} />
    ));
  } else if (projectsStatus === "failed") {
    content = <p>{error}</p>;
  }

  let table = (
    <div className="projects">
      {header}
      {content}
    </div>
  );

  if (projects !== null) {
    return table;
  } else return <p>No projects found!</p>;
};

export default Projects;
