import React, { useState } from "react";
import {
  getProjectItems,
  selectUserProject,
  findItemsByName,
  findItemById,
  changeProjectItems,
} from "./projectEditorSlice";
import { useDispatch, useSelector } from "react-redux";

const Materials = ({}) => {
  const dispatch = useDispatch();
  const project = useSelector(selectUserProject);
  const items = project.projectItems;

  const [isClicked, setIsClicked] = useState(false);
  const [inputLetters, setInputLetters] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [selectedMaterial, setSelectedMaterial] = useState({});

  console.log(project.projectItems);

  let debounceTimerId = null;

  const onSearch = async function (letters) {
    setInputLetters(letters);

    if (debounceTimerId !== null) {
      clearTimeout(debounceTimerId);
    }

    debounceTimerId = setTimeout(async () => {
      console.log(letters);
      try {
        const response = await dispatch(findItemsByName(letters));
        console.log(response.payload);
        const data = await [...response.payload];
        await setSearchResult(data);
      } catch (error) {
        setSearchResult(null);
      }
    }, 500);
  };

  const onSelect = async function (id) {
    try {
      const response = await dispatch(findItemById(id));
      console.log(response);

      await setSelectedMaterial(response.payload);
      await setInputLetters(response.payload.itemName);
    } catch (error) {
      console.error("Error occured: " + error);
    }
  };

  return (
    <div
      key="materials"
      className="project__operation project__materials"
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
            <div className="project__materials__choose">
              <div className="project__materials__choose__find">
                <label>Find items</label>
                <form onSubmit={(e) => console.log(e)}>
                  <div className="dropdown">
                    <input
                      type="text"
                      placeholder="Enter material description"
                      onChange={(event) => onSearch(event.target.value)}
                    ></input>
                    {searchResult &&
                      searchResult
                        .filter((item) => {
                          console.log(item[Object.keys(item)]);
                          const searchTerm = inputLetters.toLowerCase();
                          const fullName =
                            item[Object.keys(item)].toLowerCase();
                          console.log(searchResult);

                          return (
                            searchTerm &&
                            fullName.startsWith(searchTerm) &&
                            fullName !== searchTerm
                          );
                        })
                        .slice(0, 10)
                        .map((item) => (
                          <div
                            onClick={() => onSelect(Object.keys(item))}
                            className="dropdown__row"
                            key={Object.keys(item) + item[Object.keys(item)]}
                          >
                            {item[Object.keys(item)]}
                          </div>
                        ))}
                  </div>
                  {/* <input type="submit" value="Choose"></input> */}
                </form>
              </div>
              <div
                className={
                  Object.keys(selectedMaterial) != 0
                    ? "project__materials__choose__form--show"
                    : "project__materials__choose__form"
                }
              >
                <div>Name: {selectedMaterial.itemName}</div>
                <div>Producer: {selectedMaterial.producer}</div>
                <div>Symbol: {selectedMaterial.symbol}</div>
                <input
                  type="text"
                  placeholder="Enter quantity/lenght/mass"
                ></input>
                <button
                  onClick={() => {
                    const projectItems = [
                      ...project.projectItems,
                      {
                        item: selectedMaterial,
                        quantity: 11,
                      },
                    ];
                    dispatch(changeProjectItems(projectItems));
                  }}
                >
                  Add material
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Materials;
