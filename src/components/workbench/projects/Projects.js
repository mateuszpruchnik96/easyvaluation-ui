import React from "react";
import axiosConfig from "../../../../src/api/axiosConfig";

const Projects = ({ projects, setProjects }) => {
  // let userId = 1;
  // let temp = null;
  // axiosConfig
  //   .get(`http://localhost:8080/projects?userAccountId=${userId}`)
  //   .then((resp) => resp.json())
  //   .then((resp) => setProjects(resp.data))
  //   .catch((e) => {
  //     console.error(`Error: ${e}`);
  //   });

  if (projects !== null) {
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
  } else return <p>No projects found!</p>;
};

export default Projects;
