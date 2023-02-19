import React, { useState } from "react";
import { getProjectItems, selectUserProject } from "./projectEditorSlice";
import { useDispatch, useSelector } from "react-redux";

const Materials = ({}) => {
  const dispatch = useDispatch();
  const project = useSelector(selectUserProject);

  const [isClicked, setIsClicked] = useState(false);
  const [inputLetters, setInputLetters] = useState("");
  console.log(project.projectItems);
  const items = project.projectItems;
  const findItemsByName = async function () {
    let response = await findItemsByName(inputLetters);
    console.log(response);
  };

  return (
    <div
      key="materials"
      className="project__operation"
      onClick={(event) => {
        event.preventDefault();
        setIsClicked(!isClicked);
        console.log("CLICK");
      }}
    >
      Materials
      <div
        className={
          isClicked == true
            ? "project__operation__body--show"
            : "project__operation__body"
        }
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="project__operation__body__wrap">
          {items.map((item) => (
            <div>{item.item.id}</div>
          ))}
          <div>
            Find items
            <textarea></textarea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Materials;
