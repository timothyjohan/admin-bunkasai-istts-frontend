import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from './pages/Login.jsx';
import TemplateLogin from './TemplateLogin.jsx';
import Template from './Template.jsx';


const router = createBrowserRouter([
  {
    path:"/",
    element: <TemplateLogin />,
    children:[
      {
        path:"",
        element:<Login />
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}>

    </RouterProvider>
  </React.StrictMode>,
)
