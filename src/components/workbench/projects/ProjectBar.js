import React from "react";
import Moment from "moment";
import { Link } from "react-router-dom";

const ProjectBar = ({ project }) => {
  Moment.locale("en");
  console.log(project);

  let description = () => {
    return project.description
      ? project.description.slice(16) + "..."
      : "No description";
  };

  return (
    <div
      key={project.id}
      project={project.id}
      className="projects__project-bar"
    >
      <div className="projects__project-bar__id">{project.id}</div>
      <div className="projects__project-bar__date">
        {Moment(project.openingProjectTime).format("MMM Do YYYY, h:mm a")}
      </div>
      <div className="projects__project-bar__name">
        {project.name ? project.name : "Unnamed project"}
      </div>
      <div className="projects__project-bar__desc">{description()}</div>
      <Link
        to={`${project.id}`}
        className="projects__project-bar__go-to-editor-button"
      >
        Edit
      </Link>
    </div>
  );
};

export default ProjectBar;
