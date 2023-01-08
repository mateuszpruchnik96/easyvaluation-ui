import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  selectUserProject,
  getProjectStatus,
  getProjectError,
  fetchProject,
  selectProjectOperations,
  updateProject,
} from "./projectEditorSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Operation from "./Operation";
import ProjectClass from "./../ProjectClass.js";

const ProjectEditor = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

  const project = useSelector(selectUserProject);
  const projectStatus = useSelector(getProjectStatus);
  const error = useSelector(getProjectError);
  let projectX;
  const operationList = useSelector(selectProjectOperations);

  const [selected, setSelected] = useState(null);

  const toggle = (i) => {
    if (selected == i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  useEffect(() => {
    console.log("page Id: " + id);
    if (projectStatus === "idle") {
      dispatch(fetchProject(id));
    }
    console.log(projectX);
    project != null
      ? (projectX = new ProjectClass(...Object.values(project)))
      : (projectX = null);
  }, [projectStatus, dispatch]);

  return (
    <div>
      projectEditor {project != null ? JSON.stringify(project) : "Nie pobrano"}
      <div className="project">
        {operationList != null
          ? operationList.map((operation, i) => (
              <Operation
                i={i}
                operation={operation}
                toggle={toggle}
                selected={selected}
              />
            ))
          : ""}
        <button
          onClick={() => {
            dispatch(updateProject(project));
          }}
        >
          Save the project
        </button>
      </div>
    </div>
  );
};

export default ProjectEditor;
