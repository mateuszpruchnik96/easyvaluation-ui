import isLoggedReducer from "./isLoggedReducer.js";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  isLogged: isLoggedReducer,
});

export default allReducers;
