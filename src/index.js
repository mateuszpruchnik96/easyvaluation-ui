import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { useEffect } from "react";
import { configureStore } from "@reduxjs/toolkit";
import { createStore } from "redux";
import allReducers from "./reducers/reducers";
import { Provider } from "react-redux";

let token = sessionStorage.easyValuationToken;
axios.defaults.baseURL = "http://localhost:8080/";
axios.defaults.headers.common = { Authorization: `bearer ${token}` };
export default axios;

//STORE
const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
