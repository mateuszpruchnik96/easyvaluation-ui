import React from "react";
import TaskBarButton from "./TaskBarButton";

const TaskBar = ({ onClick, tabs }) => {
  return (
    <div className="workbench__task-bar">
      {tabs.map((tab) => (
        <tab.component onClick={onClick} tab={tab}></tab.component>
      ))}
    </div>
  );
};

export default TaskBar;
