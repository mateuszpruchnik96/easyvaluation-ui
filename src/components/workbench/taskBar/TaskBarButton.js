import React from "react";

const TaskBarButton = ({ tab, onClick }) => {
  return (
    <button
      key={tab.key}
      className={`workbench__task-bar--button workbench__task-bar--${tab.key}`}
      onClick={() => {
        onClick(tab.key);
      }}
    >
      {tab.name}
    </button>
  );
};

export default TaskBarButton;
