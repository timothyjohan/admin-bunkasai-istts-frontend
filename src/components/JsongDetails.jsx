// Komponen untuk menampilkan detail data jsong
// yang diberikan oleh peserta Jsong. Komponen ini digunakan
// pada halaman `Jsongs`.

// Mengimpor modul yang diperlukan
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Mendefinisikan komponen `JsongDetails`
export default function JsongDetails() {
    // Mendapatkan pathname dari URL saat ini dan membaginya menjadi array
    const pathname = window.location.pathname.split("/");
    // Mendefinisikan state lokal `jsongs`, `status`, dan `link`
    const [jsongs, setJsongs] = useState([]);
    const [status, setStatus] = useState();
    const [link, setLink] = useState();

    // Mendefinisikan fungsi asinkron `getJsongs` untuk mendapatkan detail jsong
    const getJsongs = async () => {
        // Melakukan request GET ke API untuk mendapatkan detail jsong
        const request = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/jsong/${
                pathname[pathname.length - 1]
            }`
        );
        // Memperbarui state lokal dengan data yang diterima dari API
        setJsongs(request.data);
        setStatus(request.data.status);
        setLink(request.data.link);
    };

    // Menggunakan useEffect untuk memanggil `getJsongs` saat komponen dimuat
    useEffect(() => {
        getJsongs();
    }, []);

    // Mendefinisikan fungsi asinkron `changeStatus` untuk mengubah status jsong
    const changeStatus = async () => {
        // Melakukan request PUT ke API untuk mengubah status jsong
        axios.put(`${import.meta.env.VITE_API_URL}/api/jsong/${jsongs.telp}`);
        // Memperbarui state lokal `status`
        setStatus(!status);
    };

    // Mendefinisikan fungsi `goback` untuk kembali ke halaman sebelumnya
    const navigate = useNavigate();
    const goback = () => {
        navigate(-1);
    };

    // Mengembalikan JSX yang mendefinisikan tampilan halaman
    return (
        <>
            <div className="min-h-screen min-w-screen flex items-center justify-center text-neutral-200">
                <div className="bg-neutral-800 w-3/6 p-10 mt-20 my-20 bg-opacity-75 rounded-xl">
                    <button
                        className="mb-6 bg-neutral-700 py-1 px-5 text-md rounded-xl"
                        onClick={goback}
                    >
                        Back
                    </button>
                    <p className="text-2xl text-center">
                        {jsongs.nama_peserta} ({jsongs.nama_panggung})
                    </p>
                    <p className="text-2xl text-center">{jsongs.telp}</p>
                    <p className="text-2xl text-center">{jsongs.lagu}</p>
                    <p className="text-2xl text-center">
                        <a
                            className="text-blue-800"
                            href={jsongs.link}
                            target="_blank"
                        >
                            <u>{jsongs.link}</u>
                        </a>
                    </p>
                    <div className="text-center">
                        <br />
                        <p className="text-3xl">
                            Image
                            <center>
                                <img
                                    src={jsongs.img}
                                    width={"400px"}
                                    height={"300px"}
                                />
                            </center>
                        </p>
                    </div>
                    <br />
                    <p className="text-xl">
                        Status : {status ? "Diterima" : "Pending"}
                    </p>
                    {
                        status ? 
                        
                        null 
                        :

                        <button
                        className={`text-xl w-full my-2 px-3 py-1 rounded-lg ${
                            status
                                ? "bg-violet-500 text-green-400"
                                : "bg-green-400 text-violet-500"
                        }`}
                        onClick={changeStatus}
                    >
                        {status ? "Pending" : "Terima"}
                    </button>
                    }
                    
                </div>
            </div>
        </>
    );
}
