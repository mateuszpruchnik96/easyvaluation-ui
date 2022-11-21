import React from "react";
import Moment from "moment";

const ProjectBar = ({ project }) => {
  Moment.locale("en");

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
    </div>
  );
};

export default ProjectBar;
