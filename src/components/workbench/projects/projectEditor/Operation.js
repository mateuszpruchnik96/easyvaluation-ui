import React, { useState } from "react";
import {
  saveProjectLocally,
  selectUserProject,
  changeOperationList,
} from "./projectEditorSlice.js";
import { useDispatch, useSelector } from "react-redux";
import ConfirmWindow from "./ConfirmWindow.js";

const Operation = ({ i, operation, toggle, selected }) => {
  const dispatch = useDispatch();
  const project = useSelector(selectUserProject);

  const [contentModified, setContentModified] = useState(false);
  const [content, setContent] = useState(operation.description);
  const [hourPrice, setHourPrice] = useState(operation.hourPrice);
  const [hours, setHours] = useState(operation.hours);

  const updateOperation = function () {
    dispatch(saveProjectLocally(content, hourPrice, hours, selected));
  };

  const deleteOperation = function () {
    const updatedList = [...project.operationList];
    updatedList.splice(i, 1);

    dispatch(changeOperationList(updatedList));
  };

  return (
    <div key={operation + "_operation"} className="project__operation">
      {/* {JSON.stringify(operation)} */}
      <div className="project__operation__desc" onClick={() => toggle(i)}>
        <div className="project__operation__desc__iterator">{i + 1}</div>
        <h2>{operation.description}</h2>
      </div>
      <span></span>
      <div
        className={
          selected === i
            ? "project__operation__body--show"
            : "project__operation__body"
        }
      >
        <div className="project__operation__body__wrap">
          <form>
            {/* <label>Operation content</label> */}
            {contentModified ? (
              <textarea
                className="project__operation__body__content"
                type="text"
                value={content + ""}
                onChange={(event) => setContent(event.target.value)}
              />
            ) : (
              <p>{content}</p>
            )}
          </form>
          <div className="project__operation__body__price">
            Cost per hour:
            {contentModified ? (
              <input
                type="number"
                className="project__operation__body__price--modified"
                value={hourPrice + ""}
                min="0"
                max="10000000"
                onChange={(event) => {
                  setHourPrice(event.target.value);
                }}
              />
            ) : (
              operation.hourPrice
            )}
          </div>
          <div className="project__operation__body__hours">
            {`Hours: `}
            {contentModified ? (
              <input
                type="number"
                className="project__operation__body__hours--modified"
                value={hours + ""}
                min="0"
                max="10000000"
                onChange={(event) => {
                  setHours(event.target.value);
                }}
              />
            ) : (
              operation.hours
            )}
            h
          </div>

          <button
            onClick={() => {
              setContentModified(!contentModified);
              updateOperation();
            }}
          >
            {contentModified ? "Save" : "Modify"}
          </button>
          {contentModified ? (
            <ConfirmWindow
              title="Rollback changes"
              text="Do you want to undo changes in this operation?"
              onConfirm={() => console.log("rollback")}
              onCancel={() => console.log("cancel")}
            >
              <button>Rollback changes</button>
            </ConfirmWindow>
          ) : (
            <ConfirmWindow
              title="Delete"
              text="Do you want to delete this operation?"
              onConfirm={deleteOperation}
              onCancel={() => console.log("cancel")}
            >
              <button>Delete</button>
            </ConfirmWindow>
          )}
        </div>
      </div>
    </div>
  );
};

export default Operation;
