import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import { createBatcher } from "framer-motion";
import { isAccordionItemSelected } from "react-bootstrap/esm/AccordionContext";
import axiosConfig from "../../api/axiosConfig.js";

const initialState = {
  projects: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchProjects = createAsyncThunk(
  `projects/fetchProjects`,
  async (userId) => {
    console.log("Loading");
    try {
      const response = await axiosConfig.get(
        `http://localhost:8080/projects?userAccountId=${userId}`
      );
      console.log("Fullfilled");

      return response.data;
    } catch (error) {
      return error.status;
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
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        return action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectAllUserProjects = (state) => state.projects.projects;
export const getProjectsStatus = (state) => state.projects.status;
export const getProjectsError = (state) => state.projects.error;

export default projectsSlice.reducer;
