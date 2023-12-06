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
    };

    useEffect(() => {
        loginadmin();
    }, []);

    return (
        <>
            <div className="h-screen flex items-center justify-center bg-repeat w-full">
                <div className="bg-neutral-800 bg-opacity-90 p-5 px-10 w-[100] text-neutral-200 rounded-xl">
                    Welcome Admin
                    <br />
                    <Link
                        className="bg-neutral-700 w-full py-2 px-6 rounded-xl hover:font-bold transition-all hover:scale-110 hover:text-violet-500 hover:bg-green-400"
                        to={"home"}
                    >
                        Update gallery
                    </Link>
                    <br />
                    <button className="bg-neutral-700 w-full py-2 rounded-xl hover:font-bold transition-all hover:scale-110 hover:text-violet-500 hover:bg-green-400">
                        Update status tenant
                    </button>
                    <br />
                    <button className="bg-neutral-700 w-full py-2 rounded-xl hover:font-bold transition-all hover:scale-110 hover:text-violet-500 hover:bg-green-400">
                        Update status lomba
                    </button>
                    <br />
                    <button className="bg-neutral-700 w-full py-2 rounded-xl hover:font-bold transition-all hover:scale-110 hover:text-violet-500 hover:bg-green-400">
                        Get Feedback
                    </button>
                    <br />
                    <Outlet />
                </div>
            </div>
        </>
    );
}
