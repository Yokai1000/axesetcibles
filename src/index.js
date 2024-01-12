import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import SearchHome from "./components/pages/search-home-page/SearchHome";
import SchoolList from "./components/pages/school-map-list-page/SchoolList";

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import SchoolDetailPage from "./components/pages/school-detail-page/SchoolDetailPage";
import { Navbar } from "./components/nav-bar/NavBar";
import { NotFoundPage } from "./components/pages/not-found-page/NotFoundPage";

const HeaderLayout = () => (
  <>
    <header>
      <Navbar />
    </header>
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <HeaderLayout />,
    children: [
      {
        path: "/",
        element: <SearchHome />,
      },
      {
        path: "/etablissements",
        element: <SchoolList />,
      },
      {
        path: "/etablissements/details/:uuid",
        element: <SchoolDetailPage />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
