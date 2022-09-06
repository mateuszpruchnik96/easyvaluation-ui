export const workbenchPageReducer = (state = "/workbench", action) => {
  switch (action.type) {
    case "PROJECTS":
      state.push(`/workbench/projects`);
    case "NEW_PROJECT":
      state.push(`/workbench/newproject`);
  }
};
