// Hanya digunakan untuk mengimpor komponen `Feedback` dan mendefinisikan komponen `GetFeedback`

// Mengimpor modul yang diperlukan
import axios from "axios";
import { useEffect, useState } from "react";
import Feedback from "../components/Feedback";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

// Mendefinisikan komponen `GetFeedback`
export default function GetFeedback() {
    // Mendefinisikan state lokal `feedbacks` dengan nilai awal array kosong
    const [feedbacks, setFeedbacks] = useState([]);

    // Menggunakan `useSelector` untuk mendapatkan `user` dari state Redux
    const user = useSelector((state) => state.user.user);

    // Mendefinisikan fungsi asinkron `getFeedbacks` untuk mendapatkan data feedback dari API
    const getFeedbacks = async () => {
        const request = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/feedback`,
            {
                headers: {
                    "x-auth-token": user,
                },
            }
        );
        setFeedbacks(request.data);
    };

    // Menggunakan `useEffect` untuk memanggil `getFeedbacks` saat komponen dipasang
    useEffect(() => {
        getFeedbacks();
    }, []);

    // Mengembalikan JSX yang mendefinisikan tampilan komponen
    return (
        <>
            <div className="pt-44 w-4/6 mx-auto text-neutral-200">
                <div className="flex justify-between">
                    <h1 className="text-xl font-semibold">FEEDBACK</h1>
                </div>
                <div className="bg-neutral-800 my-10 p-10 bg-opacity-75 rounded-xl">
                    <table className="border-collapse border border-neutral-300 text-lg">
                        <thead>
                            <tr className="text-2xl bg-neutral-900/80">
                                <th className="border border-neutral-300 px-5">
                                    Kritik
                                </th>
                                <th className="border border-neutral-300 px-5">
                                    Saran
                                </th>
                                <th className="border border-neutral-300 px-5">
                                    Pesan
                                </th>
                                <th className="border border-neutral-300 px-5">
                                    Kesan
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Menggunakan `map` untuk membuat komponen `Feedback` untuk setiap item dalam `feedbacks` */}
                            {feedbacks.map((element, key) => {
                                return <Feedback key={key} {...element} />;
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
