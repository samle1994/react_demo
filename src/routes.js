import Home from "./components/pages/Home";
import Major from "./components/pages/Major";
import NotFound from "./components/pages/NotFound";
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
    path: "*",
    component: <NotFound />,
  },
];
export default routes;
