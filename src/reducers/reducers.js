import isLoggedReducer from "./isLoggedReducer.js";
import projectsReducer from "../components/workbench/projectsSlice.js";
import projectEditorReducer from "../components/workbench/projects/projectEditor/projectEditorSlice.js";

import { combineReducers } from "redux";
import { storage } from "../store.js";
import { signOut } from "actions/index.js";

const allReducers = combineReducers({
  projects: projectsReducer,
  project: projectEditorReducer,
  isLogged: isLoggedReducer,
});

const rootReducer = (state, action) => {
  if (action.type == "SIGN_OUT") {
    // for all keys defined in your persistConfig(s)
    storage.removeItem("persist:root");
    // storage.removeItem('persist:otherKey')

    return allReducers(undefined, action);
  }
  return allReducers(state, action);
};

export default rootReducer;
