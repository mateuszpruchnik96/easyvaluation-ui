import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axiosConfig from "../../api/axiosConfig.js";
import instance from "api/AxiosInterceptor.js";

const initialState = {
  projects: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchProjects = createAsyncThunk(
  `projects/fetchProjects`,
  async () => {
    console.log("Loading");
    try {
      // const response = await axiosConfig.get(
      const response = await instance.get(`http://localhost:8080/projects`);
      // state.status = "succeeded";

      console.log("Fulfilled", response.status);

      return [...response.data];
    } catch (error) {
      // state.status = "failed";
      console.log(error.response);
      return error.reponse.status;
    }
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    projectAdded: {
      reducer(state, action) {
        state.projects.push(action.payload);
      },
      prepare(id, version, name, description, openingProjectTime, items) {
        return {
          payload: {
            id,
            version,
            name,
            description,
            openingProjectTime,
            items,
          },
        };
      },
    },

    // projectUpdated(state, action) {
    //   const { id, title, content } = action.payload;
    //   const existingProject = state.projects.find(
    //     (project) => project.id === id
    //   );
    //   if (existingProject) {
    //     existingProject.title = title;
    //     existingProject.content = content;
    //   }
    // },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProjects.pending, (state, action) => {
        state.status = "loading";
        // console.log("ExR loading");
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.projects = action.payload;
        console.log("ExR succeeded", state.status, action);

        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        console.log("ExR failed");

        state.error = action.error.message;
      });
  },
});

export const selectAllUserProjects = (state) => state.projects.projects;
export const getProjectsStatus = (state) => state.projects.status;
export const getProjectsError = (state) => state.projects.error;

export default projectsSlice.reducer;
