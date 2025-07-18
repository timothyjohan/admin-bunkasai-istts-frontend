import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login.jsx";
import TemplateLogin from "./TemplateLogin.jsx";
import Template from "./Template.jsx";
import { Provider } from "react-redux";
import store from "./app/store";
import Home from "./pages/Home.jsx";
import Tenants from "./pages/Tenants.jsx";
import Scan from "./pages/Scan.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import NotFound from "./pages/NotFound.jsx";
import Competitions from "./pages/Competitions";
import Jsong from "./pages/Jsongs";
import Coswalks from "./pages/Coswalks.jsx";
import JsongDetails from "./components/JsongDetails.jsx";
import CoswalkDetails from "./components/CoswalkDetails.jsx";
import GetFeedback from "./pages/GetFeedback.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import GalleryAdd from "./pages/GalleryAdd";
import Gallery from "./pages/Gallery";
import Qr from "./pages/Qr.jsx";
import TicketsPage from "./pages/TicketsPage.jsx";
import Yonkomas from "./pages/Yonkoma.jsx";
import YonkomaDetails from "./components/YonkomaDetails.jsx";
import CosplayCompetitions from "./pages/CosplayCompetitions.jsx";
import CosplayCompetitionDetails from "./components/CosplayCompetitionDetails.jsx";
import UserList from "./pages/UserList.jsx";
import UserDetail from "./pages/UserDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TemplateLogin />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "err-unauthorized",
        element: <Unauthorized />,
      },
    ],
    errorElement: <NotFound />,
  },
  {
    path: "/home",
    element: <Template />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "tenants",
        element: <Tenants />,
      },
      {
        path: "competitions",
        element: <Competitions />,
        children: [
          {
            path: "jsong",
            element: <Jsong />,
          },
          {
            path: "coswalk",
            element: <Coswalks />,
          },
          {
            path: "yonkoma",
            element: <Yonkomas />,
          },
          {
            path: "cosplay-competition",
            element: <CosplayCompetitions />,
          },
        ],
      },
      {
        path: "feedback",
        element: <GetFeedback />,
      },
      {
        path: "competitions/jsong/:telp",
        element: <JsongDetails />,
      },
      {
        path: "competitions/yonkoma/:telp",
        element: <YonkomaDetails />,
      },
      {
        path: "competitions/cosplay-competition/:telp",
        element: <CosplayCompetitionDetails />,
      },
      {
        path: "competitions/coswalk/:instagram",
        element: <CoswalkDetails />,
      },
      {
        path: "user-list",
        element: <UserList />,
      },
      {
        path: "user/:email",
        element: <UserDetail />,
      },
      {
        path: "gallery",
        element: <GalleryPage />,
        children: [
          {
            path: "",
            element: <Gallery />,
          },
          {
            path: "add",
            element: <GalleryAdd />,
          },
        ],
      },
      {
        path: "tickets",
        element: <TicketsPage />,
      },
      {
        path: "scan",
        element: <Scan />,
      }
    ],
  },
  {
    path: "/qr",
    element: <Qr />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
