import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosConfig from "../../../../api/axiosConfig.js";
import instance from "api/AxiosInterceptor.js";

const initialState = {
  project: null,
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchProject = createAsyncThunk(
  `projectEditor/fetchProject`,
  async (projectId) => {
    // console.log("Loading Fetch Project...");
    // console.log(axiosConfig.token);
    try {
      // const response = await axiosConfig.get(
      const response = await instance.get(
        `http://localhost:8080/projects/project?projectId=${projectId}`
      );

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
    try {
      const response = await instance.post(
        `http://localhost:8080/projects`,
        project,
        {
          data: project,
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return error.reponse.status;
    }
  }
);

export const findItemsByName = createAsyncThunk(
  `projectEditor/findItemsByName`,
  async (letters) => {
    try {
      console.log("finding...");
      const response = await instance.get(
        `http://localhost:8080/materials/items?name=${letters}`
      );

      return response.data;
    } catch (error) {
      console.error(error);
      return error.reponse.status;
    }
  }
);

export const findItemById = createAsyncThunk(
  `projectEditor/findItemById`,
  async (id) => {
    try {
      console.log("finding...");
      const response = await instance.get(
        `http://localhost:8080/materials/items/${id}`
      );

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
        state.project.operationList[action.payload.index].description =
          action.payload.operationDescToUpdate;
        state.project.operationList[action.payload.index].hourPrice =
          action.payload.hourPrice;
        state.project.operationList[action.payload.index].hours =
          action.payload.hours;
      },
      prepare(operationDescToUpdate, hourPrice, hours, index) {
        return {
          payload: {
            operationDescToUpdate,
            hourPrice,
            hours,
            index,
          },
        };
      },
    },
    changeOperationList: {
      reducer(state, action) {
        state.project.operationList = action.payload.operationList;
      },
      prepare(operationList) {
        return {
          payload: {
            operationList,
          },
        };
      },
    },
    changeProjectItems: {
      reducer(state, action) {
        state.project.projectItems = action.payload.projectItems;
      },
      prepare(projectItems) {
        return {
          payload: {
            projectItems,
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
  state.project.project != null && state.project.project != "undefined"
    ? state.project.project
    : null;
// export const selectProjectOperations = (state) =>
//   state.project.project != null && state.project.project[0] == "undefined"
//     ? state.project.project[0].operationList
//     : null;
export const getProjectStatus = (state) => state?.project?.status;
export const getProjectError = (state) => state?.project?.error;
export const getProjectItems = (state) => state?.project?.project?.projectItems;

const { actions } = projectEditorSlice;
export const { saveProjectLocally, changeOperationList, changeProjectItems } =
  actions;

export default projectEditorSlice.reducer;
