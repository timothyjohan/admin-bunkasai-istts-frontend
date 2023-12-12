import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { Link, Outlet } from "react-router-dom"
import Tenant from "../components/Tenant"

export default function Competitions(){


    return(
        <>
            <nav className="w-full h-44 fixed mt-44">
                <div className="w-4/6 mx-auto text-neutral-200 grid grid-cols-5">
                    <Link to={'/home/competitions/jsong'}>
                        <button className="hover:scale-110 transition-all">J-SONG</button>
                    </Link>
                    <Link to={'/home/competitions/coswalk'}>
                        <button className="hover:scale-110 transition-all">COSWALK</button>
                    </Link>
                </div>
            </nav>

            <div className="min-h-screen min-w-screen flex items-center justify-center text-neutral-200">
                <div className="bg-neutral-800 p-10 bg-opacity-75 rounded-xl">
                    <table className="border-collapse border border-neutral-300 text-center text-lg ">
                        <Outlet />
                    </table>
                </div>
            </div>
        </>
    )
}