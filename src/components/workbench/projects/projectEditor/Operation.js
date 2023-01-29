import React, { useState } from "react";
import { saveProjectLocally } from "./projectEditorSlice.js";
import { useDispatch } from "react-redux";

const Operation = ({ i, operation, toggle, selected }) => {
  const dispatch = useDispatch();

  const [contentModified, setContentModified] = useState(false);
  const [content, setContent] = useState(operation.description);
  const [hourPrice, setHourPrice] = useState(operation.hourPrice);

  const updateOperation = function () {
    dispatch(saveProjectLocally(content, selected));
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
                value={hourPrice + ""}
                min="0"
                max="10000000"
                onChange={(event) => {
                  setHourPrice(event.target.value);
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
        </div>
      </div>
    </div>
  );
};

export default Operation;
