import Workbench from "components/workbench/Workbench";
import Landing from "components/home/Landing";
import Projects from "components/workbench/projects/Projects";
import Login from "components/home/login/Login";
import Registration from "components/home/registration/Registration";

const allRoutes = [
  { key: "/", path: "/", name: "Home", component: Landing },
  {
    key: "/workbench",
    path: "/workbench",
    name: "Workbench",
    component: Workbench,
    nestedRoutes: [
      {
        key: "/workbench/projects",
        path: "/workbench/projects",
        name: "Your Projects",
        component: Projects,
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

export default allRoutes;
