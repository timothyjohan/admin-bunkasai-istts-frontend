// Komponen ini digunakan untuk menampilkan detail pendaftaran Cosplay Competition.

// Mengimpor package yang dibutuhkan
import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CosplayCompetitionDetails() {
    // Mendefinisikan state lokal dengan hook `useState`
    const [cosplayData, setCosplayData] = useState({});
    const [status, setStatus] = useState(false);
    const [buktiTransfer, setBuktiTransfer] = useState('');

    // Menggunakan `useSelector` untuk mendapatkan `user` dari state Redux
    const user = useSelector((state) => state.user.user);

    // Mendapatkan `telp` dari URL saat ini
    const pathname = window.location.pathname.split("/");
    const telp = pathname[pathname.length - 1];

    // Mendefinisikan fungsi asinkron `getCosplayDetails` untuk mengambil data dari API
    const getCosplayDetails = async () => {
        try {
            const request = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/cosplay-competition/${telp}`,
                {
                    headers: {
                        "x-auth-token": user,
                    },
                }
            );
            setCosplayData(request.data);
            setStatus(request.data.status);

            // Mengambil bukti transfer menggunakan email dari data cosplay
            if (request.data.email) {
                getBuktiTransfer(request.data.email);
            }
        } catch (error) {
            console.error("Gagal mengambil detail Cosplay Competition:", error);
        }
    };

    // Fungsi untuk mengambil bukti transfer
    const getBuktiTransfer = async (email) => {
        try {
            const request = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/transfer-proof/getTransferProof/${email}/cosplay-competition`,
                {
                    headers: {
                        "x-auth-token": user,
                    },
                }
            );
            // Memperbarui state lokal dengan data bukti transfer
            setBuktiTransfer(request.data.filePath);
        } catch (error) {
            console.error("Gagal mengambil bukti transfer:", error);
        }
    };

    // Menggunakan hook `useEffect` untuk memanggil `getCosplayDetails` saat komponen dimuat
    useEffect(() => {
        if (user && telp) {
            getCosplayDetails();
        }
    }, [user, telp]);

    // Mendefinisikan fungsi asinkron `changeStatus` untuk mengubah status di API
    const changeStatus = async () => {
        try {
            await axios.put(
                `${import.meta.env.VITE_API_URL}/api/cosplay-competition/${telp}`,
                {}, // Body bisa kosong jika backend hanya melakukan toggle
                {
                    headers: {
                        "x-auth-token": user,
                    },
                }
            );
            setStatus(!status); // Update status di UI secara langsung
        } catch (error) {
            console.error("Gagal mengubah status:", error);
            alert("Gagal mengubah status.");
        }
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
                        className="mb-6 bg-neutral-700 py-1 px-5 text-md rounded-xl hover:bg-neutral-600 transition-all"
                        onClick={goback}
                    >
                        Back
                    </button>
                    <p className="text-2xl text-center mb-2">
                        {cosplayData.nama_peserta}
                    </p>
                    <p className="text-xl text-center text-neutral-400 mb-2">
                        ({cosplayData.nama_kelompok})
                    </p>
                     <p className="text-lg text-center text-neutral-400 mb-6">
                        {cosplayData.telp}
                    </p>
                    <div className="text-center">
                        <p className="text-xl mb-4">
                            Bukti Transfer
                        </p>
                        <div className="flex justify-center">
                            {buktiTransfer ? (
                                <img
                                    src={`${import.meta.env.VITE_API_URL}/${buktiTransfer}`}
                                    alt="Bukti Transfer"
                                    className="max-w-full h-auto rounded-lg"
                                    style={{ maxHeight: '470px' }}
                                />
                            ) : (
                                <p>Bukti transfer tidak ditemukan.</p>
                            )}
                        </div>
                    </div>
                    <br />
                    <p className="text-xl">
                        Status : {status ? <span className="text-green-400">Diterima</span> : <span className="text-yellow-400">Pending</span>}
                    </p>
                    {!status && (
                        <button
                            className={`text-xl w-full my-2 px-3 py-1 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-all`}
                            onClick={changeStatus}
                            disabled={status}
                        >
                            Terima
                        </button>
                    )}
                </div>
            </div>
        </>
    );
}
