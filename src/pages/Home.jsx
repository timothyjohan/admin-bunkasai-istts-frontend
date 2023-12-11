import { data } from "autoprefixer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
export default function Home() {
    const user = useSelector((state) => state.user.user);

    const loginadmin = async () => {
        const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/user`,
            {
                headers: {
                    "x-auth-token": user,
                },
            }
        );
        console.log(res.data.result.userdata);
    };

    useEffect(() => {
        loginadmin();
    }, []);

    return (
        <>
            <div className="h-screen flex items-center justify-center bg-repeat w-full">
                
            </div>
        </>
    );
}
