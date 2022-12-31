import { createStore } from "redux";
import allReducers from "reducers/reducers";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import thunk from "redux-thunk";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, allReducers);

const store = configureStore({
  // reducer: allReducers,

  reducer: persistedReducer,
});

let persistor = persistStore(store);

export default store;
export { persistor, storage };

// export default () => {
//   let store = configureStore({
//     reducer: persistedReducer,
//   });
//   let persistor = persistStore(store);
//   return { store, persistor };
// };

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
