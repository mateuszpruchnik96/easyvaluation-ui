import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { createBatcher } from "framer-motion";
import { isAccordionItemSelected } from "react-bootstrap/esm/AccordionContext";
import axiosConfig from "../../../../api/axiosConfig.js";

const initialState = {
  project: null,
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchProject = createAsyncThunk(
  `projectEditor/fetchProject`,
  async (projectId) => {
    console.log("Loading Fetch Project...");
    console.log(axiosConfig.token);
    try {
      const response = await axiosConfig.get(
        `http://localhost:8080/projects/project?projectId=${projectId}`
      );
      console.log("Fulfilled", response);

      return response.data;
    } catch (error) {
      console.error(error);
      return error.reponse.status;
    }
  }
);

export const updateProject = createAsyncThunk(
  `projectEditor/updateProject`,
  async (project) => {
    console.log("Loading");
    console.log(axiosConfig.token);
    try {
      const response = await axiosConfig.post(
        `http://localhost:8080/projects`,
        {
          data: project,
        }
      );
      console.log("Fulfilled", response.status);

      return response.data;
    } catch (error) {
      console.error(error);
      return error.reponse.status;
    }
  }
);

const projectEditorSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    saveProject: {
      reducer(state, action) {
        state.project.push(action.payload);
      },
      prepare(
        id,
        version,
        name,
        description,
        openingProjectTime,
        items,
        operationList
      ) {
        return {
          payload: {
            id,
            version,
            name,
            description,
            openingProjectTime,
            items,
            operationList,
          },
        };
      },
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProject.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProject.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("ExR succeeded", state.status, action);

        state.project = action.payload;
      })
      .addCase(fetchProject.rejected, (state, action) => {
        state.status = "failed";
        console.log("ExR failed");

        state.error = action.error.message;
      });
  },
});

export const selectUserProject = (state) => state.project.project;
export const selectProjectOperations = (state) =>
  state.project.project != null ? state.project.project.operationList : null;
export const getProjectStatus = (state) => state.project.status;
export const getProjectError = (state) => state.project.error;

export default projectEditorSlice.reducer;
