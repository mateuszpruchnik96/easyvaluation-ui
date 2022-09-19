import { createStore } from "redux";
import allReducers from "reducers/reducers";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: allReducers,
});

export default store;

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
