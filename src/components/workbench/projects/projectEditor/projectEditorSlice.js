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
        `http://localhost:8080/projects/project_with_items?projectId=${projectId}`
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
    console.log("Saving...");
    console.log(axiosConfig.token);
    console.log(project);
    try {
      const response = await axiosConfig.post(
        `http://localhost:8080/projects`,
        project,
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
    saveProjectLocally: {
      reducer(state, action) {
        state.project[0].operationList[action.payload.index].description =
          action.payload.operationDescToUpdate;
      },
      prepare(operationDescToUpdate, index) {
        return {
          payload: {
            operationDescToUpdate,
            index,
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
      })
      .addCase(updateProject.pending, (state, action) => {
        state.status = "saving";
        console.log("Saving the project...");
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.status = "saved";
        // state.project = action.payload
        console.log("Project saved!");
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.status = "failed";
        // state.project = action.payload
        console.log("Project not saved!");
      });
  },
});

export const selectUserProject = (state) =>
  state.project.project != null ? state.project.project[0] : null;
export const selectProjectOperations = (state) =>
  state.project.project != null ? state.project.project[0].operationList : null;
export const getProjectStatus = (state) => state.project.status;
export const getProjectError = (state) => state.project.error;
export const getProjectItems = (state) => state.project.project[1];

const { actions, reducer } = projectEditorSlice;
export const { saveProjectLocally } = actions;

export default projectEditorSlice.reducer;
