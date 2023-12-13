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
import Unauthorized from "./pages/Unauthorized.jsx";
import NotFound from "./pages/NotFound.jsx";
import Competitions from "./pages/Competitions";
import Jsong from "./pages/Jsongs";
import Coswalks from "./pages/Coswalks.jsx";
import JsongDetails from "./components/JsongDetails.jsx";

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
        errorElement: <NotFound/>
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
                children:[
                    {
                        path: "jsong",
                        element: <Jsong/>,
                    },
                    {
                        path: "jsong/:telp",
                        element: <JsongDetails/>,
                    },
                    {
                        path: "coswalk",
                        element: <Coswalks/>,
                    },
                ]
            },
            
        ],
    }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}></RouterProvider>
        </Provider>
    </React.StrictMode>
);
