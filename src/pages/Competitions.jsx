// Halaman untuk menampilkan daftar kompetisi

// Mengimpor modul yang diperlukan
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";


export default function Competitions() {
    return (
        <>
            <nav className="w-full h-12 absolute mt-44">
                <div className="w-4/6 mx-auto text-neutral-200 grid grid-cols-5 font-semibold text-xl">
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
