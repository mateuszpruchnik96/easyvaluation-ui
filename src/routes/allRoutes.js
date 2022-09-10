import Workbench from "components/workbench/Workbench";
import Landing from "components/home/Landing";
import Projects from "components/workbench/projects/Projects";
import NewProject from "components/workbench/newProject/NewProject";
import Login from "components/home/login/Login";
import Registration from "components/home/registration/Registration";

const allRoutes = () => [
  { key: "/", path: "/", name: "Home", component: Landing },
  {
    key: "/workbench",
    path: "/workbench/*",
    name: "Workbench",
    component: Workbench,
    nestedRoutes: [
      // {
      //   key: "/workbench/profile",
      //   path: "/workbench/profile",
      //   name: "My Profile",
      //   component: Projects,
      // },
      {
        key: "/projects",
        path: "/projects",
        name: "Your Projects",
        component: Projects,
      },
      {
        key: "/newproject",
        path: "/newproject",
        name: "New Project",
        component: NewProject,
      },
    ],
  },
  { key: "/login", path: "/login", name: "Login", component: Login },
  {
    key: "/registration",
    path: "/registration",
    name: "Registration",
    component: Registration,
  },

  // { path: "/about", name: "About us", component: About },
];

const allRoutesJSON = { ...allRoutes };
console.log(allRoutesJSON);

export { allRoutesJSON };
export default allRoutes;
