// Mengimpor modul yang diperlukan
import axios from "axios";
import { useEffect, useState } from "react";
import Jsong from "../components/Jsong";

// Mendefinisikan komponen `Jsongs`
export default function Jsongs() {
    // Mendefinisikan state lokal `jsongs` dengan nilai awal array kosong
    const [jsongs, setJsongs] = useState([]);

    // Mendefinisikan fungsi asinkron `getJsongs` untuk mendapatkan data jsong dari API
    const getJsongs = async () => {
        const request = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/jsong`
        );
        setJsongs(request.data);
    };

    // Menggunakan `useEffect` untuk memanggil `getJsongs` saat komponen dipasang
    useEffect(() => {
        getJsongs();
    }, []);

    // Mengembalikan JSX yang mendefinisikan tampilan komponen
    return (
        <>
            {/* Membuat tabel dengan border dan teks tengah */}
            <table className="border-collapse border border-neutral-300 text-center text-lg ">
                <thead>
                    <tr>
                        {/* Membuat header tabel */}
                        <th className="border border-neutral-300 px-5">
                            Nama Peserta
                        </th>
                        <th className="border border-neutral-300 px-5">
                            Nama Panggung
                        </th>
                        <th className="border border-neutral-300 px-5">
                            No Telp
                        </th>
                        <th className="border border-neutral-300 px-5">Lagu</th>
                        <th className="border border-neutral-300 px-5">
                            Status
                        </th>
                        <th className="border border-neutral-300 px-5">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {/* Menggunakan `map` untuk membuat komponen `Jsong` untuk setiap item dalam `jsongs` */}
                    {jsongs.map((element, key) => {
                        return <Jsong key={key} {...element} />;
                    })}
                </tbody>
            </table>
        </>
    );
}
