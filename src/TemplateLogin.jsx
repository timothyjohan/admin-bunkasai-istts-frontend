import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NavbarLogin from "./components/NavbarLogin";

export default function TemplateLogin(){
    return(
        <>
            <NavbarLogin />
            <div className=" min-h-screen">
                <Outlet/>
            </div>
            <Footer />
        </>
    )
}