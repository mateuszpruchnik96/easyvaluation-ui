import React from "react";

const NewProject = () => {
  return (
    <div>
      <form>
        <label>
          Project name:
          <input type="text" placeholder="Project name" />
        </label>
        <input type="submit" />
      </form>
    </div>
  );
};

export default NewProject;
