import Home from "./components/pages/Home";
import Major from "./components/pages/Major";
import NotFound from "./components/pages/NotFound";
import MajorEdit from "./components/pages/MajorEdit";
import Student from "./components/pages/Student";
import Nointernet from "./components/pages/Nointernet";
import Nopermission from "./components/pages/Nopermission";
import Instructors from "./components/pages/Instructors";
const routes = [
  {
    path: "",
    component: <Home />,
  },
  {
    path: "home",
    component: <Home />,
  },
  {
    path: "major",
    component: <Major />,
  },
  {
    path: "major/:id",
    component: <MajorEdit />,
  },
  {
    path: "student",
    component: <Student />,
  },
  {
    path: "instructors",
    component: <Instructors />,
  },
  {
    path: "no-internet",
    component: <Nointernet />,
  },
  {
    path: "no-permission",
    component: <Nopermission />,
  },
  {
    path: "*",
    component: <NotFound />,
  },
];
export default routes;
