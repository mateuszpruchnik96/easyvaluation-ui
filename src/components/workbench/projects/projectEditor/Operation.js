import React from "react";

const Operation = ({ i, operation, toggle, selected }) => {
  return (
    <div className="project__operation">
      {JSON.stringify(operation)}
      <div className="project__operation__desc" onClick={() => toggle(i)}>
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
        Body
        <form>
          <label>Body</label>
          <input type="text" />
        </form>
      </div>
    </div>
  );
};

export default Operation;
