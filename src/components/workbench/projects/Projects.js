import React from "react";

const Projects = ({ projects }) => {
  return (
    <table>
      {() =>
        projects.map((project) => (
          <tr>
            <th>Projects</th>
          </tr>
        ))
      }
    </table>
  );
};

export default Projects;
