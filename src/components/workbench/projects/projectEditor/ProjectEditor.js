import React, { useState, Drag } from "react";
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
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";

const ProjectEditor = () => {
  let { id } = useParams();
  const dispatch = useDispatch();

  const project = useSelector(selectUserProject);
  const projectStatus = useSelector(getProjectStatus);
  const error = useSelector(getProjectError);
  let projectX;
  const operationList = useSelector(selectProjectOperations);

  const [selected, setSelected] = useState(null);

  console.log(operationList);
  let defaultList;

  // React state to track order of items
  const [itemList, setItemList] = useState(defaultList);

  // Function to update list on drop
  const handleDrop = (droppedItem) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;
    var updatedList = [...itemList];
    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    // Update State
    setItemList(updatedList);
  };

  const toggle = (i) => {
    if (selected == i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  useEffect(() => {
    console.log("page Id: " + id);
    if (projectStatus === "idle" || projectStatus === "saved") {
      dispatch(fetchProject(id));
    }
    console.log(projectX);
    project != null
      ? (projectX = new ProjectClass(...Object.values(project)))
      : (projectX = null);
    setItemList([...operationList]);
  }, [projectStatus, dispatch]);

  return (
    <div>
      projectEditor {project != null ? JSON.stringify(project) : "Nie pobrano"}
      <div className="project">
        <DragDropContext onDragEnd={handleDrop}>
          <Droppable droppableId="list-container">
            {(provided) => (
              <div
                className="list-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {operationList != null
                  ? operationList.map((operation, i) => (
                      <Draggable
                        key={operation.description}
                        draggableId={operation.description}
                        index={i}
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

        <button
          onClick={() => {
            console.log(project);
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
