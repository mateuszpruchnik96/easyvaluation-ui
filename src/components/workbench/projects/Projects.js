import React from "react";
import axiosConfig from "../../../../src/api/axiosConfig";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllUserProjects,
  getProjectsStatus,
  getProjectsError,
  fetchProjects,
} from "../projectsSlice";

const Projects = () => {
  const dispatch = useDispatch();

  const projects = useSelector(selectAllUserProjects);
  const projectsStatus = useSelector(getProjectsStatus);
  const error = useSelector(getProjectsError);

  useEffect(() => {
    console.log(projects);
    console.log(projectsStatus);
    console.log(error);
    if (projectsStatus === "idle") {
      dispatch(fetchProjects("1"));
    }
  }, [projectsStatus, dispatch]);

  let content;
  if (projectsStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (projectsStatus === "succeeded") {
    const orderedProjects = projects.slice();
    // .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedProjects.map((project) => (
      <p key={project.id} project={project.id}>
        {project.id} {project.openingProjectTime}
      </p>
    ));
  } else if (projectsStatus === "failed") {
    content = <p>{error}</p>;
  }

  if (projects !== null) {
    return <div>{content}</div>;
  } else return <p>No projects found!</p>;
};

export default Projects;
