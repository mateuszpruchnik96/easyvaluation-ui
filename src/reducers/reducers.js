import isLoggedReducer from "./isLoggedReducer.js";
import projectsReducer from "../components/workbench/projectsSlice.js";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  projects: projectsReducer,
  isLogged: isLoggedReducer,
});

export default allReducers;
