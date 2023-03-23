import React, { useState, Drag } from "react";
import { useParams } from "react-router-dom";
import {
  selectUserProject,
  getProjectStatus,
  getProjectError,
  fetchProject,
  selectProjectOperations,
  updateProject,
  actions,
  changeOperationList,
} from "./projectEditorSlice";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Operation from "./Operation";
import ProjectClass from "./../ProjectClass.js";
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";
import { uuid } from "uuidv4";
import Materials from "./Materials";

const ProjectEditor = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

  const project = useSelector(selectUserProject);
  const projectStatus = useSelector(getProjectStatus);
  const error = useSelector(getProjectError);

  let projectX;

  const [selected, setSelected] = useState(null);

  const emptyOperation = {
    title: "New operation",
    description: "New operation",
    hours: 0,
    hourPrice: 0,
  };

  // console.log(operationList);

  const handleDrop = (droppedItem) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;
    var updatedList = [...project.operationList];
    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    // Update State
    dispatch(changeOperationList(updatedList));
  };

  const toggle = (i) => {
    if (selected == i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  if (
    projectStatus === "idle" ||
    projectStatus === "saved" ||
    // projectStatus === "failed" ||
    (project ? project.id !== Number(id) : false)
  ) {
    dispatch(fetchProject(id));
  }

  useEffect(() => {
    if (
      projectStatus == "idle" ||
      projectStatus == "saved"
      // ||
      // projectStatus === "failed" ||
      // (project ? project.id !== Number(id) : false)
    ) {
      dispatch(fetchProject(id));
    }

    project != null
      ? (projectX = new ProjectClass(...Object.values(project)))
      : (projectX = null);
  }, [projectStatus, dispatch]);

  return (
    <div>
      projectEditor {project != null ? JSON.stringify(project) : "Nie pobrano"}
      {project != null ? (
        <div className="project">
          <Materials selected={selected} />
          <DragDropContext onDragEnd={handleDrop}>
            <Droppable droppableId="list-container">
              {(provided) => (
                <div
                  className="list-container"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {project.operationList != null
                    ? project.operationList.map((operation, i) => (
                        <Draggable
                          key={i + operation.description}
                          draggableId={
                            operation.description +
                            operation.hourPrice +
                            operation.hours +
                            i
                          }
                          index={i}
                          isDragDisabled={i == selected ? true : false}
                        >
                          {(provided) => (
                            <div
                              className="item-container"
                              ref={provided.innerRef}
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                            >
                              <Operation
                                i={i}
                                operation={operation}
                                toggle={toggle}
                                selected={selected}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))
                    : ""}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          <div className="project__btn-container">
            <button
              onClick={() => {
                const newList = project.operationList
                  ? [...project.operationList, emptyOperation]
                  : [emptyOperation];
                console.log(newList, project.operationList, emptyOperation);
                dispatch(changeOperationList(newList));
              }}
            >
              add operation
            </button>
            <button
              onClick={() => {
                console.log(project);
                dispatch(updateProject(project));
              }}
            >
              Save the project
            </button>
            <button
              onClick={() => {
                dispatch(fetchProject(id));
              }}
            >
              Undo changes
            </button>
          </div>
        </div>
      ) : (
        // "Loading..."
        <button
          onClick={() => {
            dispatch(fetchProject(id));
          }}
        >
          Try again
        </button>
      )}
    </div>
  );
};

export default ProjectEditor;
