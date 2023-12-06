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
                path: "home",
                element: <Home />,
                children: [
                    {
                        path: "home",
                        element: <Home />,
                    },
                ],
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}></RouterProvider>
        </Provider>
    </React.StrictMode>
);
