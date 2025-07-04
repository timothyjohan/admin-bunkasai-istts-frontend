// Halaman untuk menampilkan daftar kompetisi

// Mengimpor modul yang diperlukan
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";


export default function Competitions() {
    return (
        <>
            <nav className="w-full h-12 absolute mt-44">
                {/* Updated grid to have 4 columns for even spacing */}
                <div className="w-4/6 mx-auto text-neutral-200 grid grid-cols-4 font-semibold text-xl text-center">
                    <Link to={"jsong"}>
                        <button className="hover:scale-110 transition-all">
                            J-SONG
                        </button>
                    </Link>
                    <Link to={"coswalk"}>
                        <button className="hover:scale-110 transition-all">
                            COSWALK
                        </button>
                    </Link>
                    {/* Added link for Yonkoma */}
                    <Link to={"yonkoma"}>
                        <button className="hover:scale-110 transition-all">
                            YONKOMA
                        </button>
                    </Link>
                    {/* Added link for Cosplay Competition */}
                    <Link to={"cosplay-competition"}>
                        <button className="hover:scale-110 transition-all">
                            COSPLAY COMP
                        </button>
                    </Link>
                </div>
            </nav>

            <div className="min-h-screen min-w-screen flex items-center justify-center text-neutral-200">
                <div className="bg-neutral-800 p-10 bg-opacity-75 rounded-xl">
                    <Outlet />
                </div>
            </div>
        </>
    );
}
