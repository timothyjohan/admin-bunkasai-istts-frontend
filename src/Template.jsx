import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

export default function Template(){
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate()
    const loginadmin = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/user`,
                {
                    headers: {
                        "x-auth-token": user,
                    },
                }
            );            
        } catch (error) {
            navigate('/err-unauthorized')
        }
    };

    useEffect(() => {
        loginadmin();
    }, []);

    return(
        <>
            <Navbar />
            <div className=" min-h-screen">
                <Outlet/>
            </div>
            <Footer />
        </>
    )
}