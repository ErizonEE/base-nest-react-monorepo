import { Route, Routes } from "react-router-dom";
import NotFound from "./Pages/NotFound";

interface RouteInterface {
  path: string;
  element: any;
}

export default function Index() {
  const routes: RouteInterface[] = [
    {
      path: "*",
      element: <NotFound />,
    },
  ];

  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}
