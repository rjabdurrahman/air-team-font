import { Navigate, Outlet } from "react-router-dom";
import CreatorDash from "./components/creator/CreatorDash";
import NewHome from "./components/NewHome";

const routes = isLoggedIn => [
  {
    path: "/app",
    element: isLoggedIn ? <CreatorDash /> : <Navigate to="/" />,
    children: [
      { path: "/dashboard", element: <CreatorDash /> },
      { path: "/account", element: <CreatorDash /> },
      { path: "/", element: <Navigate to="/app/dashboard" /> },
      {
        path: "member",
        element: <Outlet />,
        children: [
          { path: "/", element: <CreatorDash /> },
          { path: "/add", element: <CreatorDash /> }
        ]
      }
    ]
  },
  {
    path: "/",
    element: !isLoggedIn ? <CreatorDash /> : <Navigate to="/" />,
    children: [
      { path: "login", element: <NewHome /> },
      { path: "/", element: <Navigate to="/" /> }
    ]
  }
];

export default routes;
