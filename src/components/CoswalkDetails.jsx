// Komponen ini merupakan komponen yang digunakan untuk menampilkan
// data coswalk yang diberikan oleh peserta Coswalk. Komponen ini
// digunakan pada halaman `Coswalks`.

// Mengimpor package yang dibutuhkan
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ShowInstagram from "./ShowInstagram";
import { useSelector } from "react-redux";

export default function CoswalkDetails() {
    // Mendefinisikan state lokal dengan hook `useState`
    const [coswalks, setCoswalks] = useState([]);
    const [status, setStatus] = useState();
    const [instagram, setInstagram] = useState();
    const [buktiTransfer, setBuktiTransfer] = useState();

    // Menggunakan `useSelector` untuk mendapatkan `user` dari state Redux
    const user = useSelector((state) => state.user.user);

    // Mendapatkan pathname dari URL saat ini
    const pathname = window.location.pathname.split("/");

    // Mendefinisikan fungsi asinkron `getCoswalks` untuk mengambil data coswalk dari API
    const getCoswalks = async () => {
        const request = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/coswalk/${
                pathname[pathname.length - 1]
            }`,
            {
                headers: {
                    "x-auth-token": user,
                },
            }
        );
        setCoswalks(request.data);
        setStatus(request.data.status);
        setInstagram(request.data.instagram.substring(1));

        // Mengambil bukti transfer menggunakan email dari data coswalk
        getBuktiTransfer(request.data.email);
    };

    const getBuktiTransfer = async (email) => {
        const request = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/transfer-proof/getTransferProof/${email}/coswalk`,
            {
                headers: {
                    "x-auth-token": user,
                },
            }
        );
        // Memperbarui state lokal dengan data bukti transfer
        setBuktiTransfer(request.data.filePath);
    };

    // Menggunakan hook `useEffect` untuk memanggil `getCoswalks` saat komponen dimuat
    useEffect(() => {
        getCoswalks();
    }, []);

    // Mendefinisikan fungsi asinkron `changeStatus` untuk mengubah status coswalk di API
    const changeStatus = async () => {
        axios.put(
            `${import.meta.env.VITE_API_URL}/api/coswalk/${coswalks.instagram}`,
            {},
            {
            headers: {
                "x-auth-token": user,
            },
            }
        );
        setStatus(!status);
    };

    // Mendapatkan fungsi `navigate` dari hook `useNavigate`
    const navigate = useNavigate();

    // Mendefinisikan fungsi `goback` untuk kembali ke halaman sebelumnya
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
                        {coswalks.nama_peserta} ({coswalks.nama_panggung})
                    </p>
                    <ShowInstagram instagram={instagram} />
                    <div className="text-center">
                        <br />
                        <p className="text-3xl">
                            Image
                            <center>
                                <img
                                    src={`${import.meta.env.VITE_API_URL}/${buktiTransfer}`}
                                    width={"470px"}
                                    height={"470px"}
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
                            disabled={status}
                            >
                                {status ? "Pending" : "Terima"}
                        </button>

                    }
                    
                </div>
            </div>
        </>
    );
}
