// Mengimpor modul yang diperlukan
import axios from "axios";
import { useEffect, useState } from "react";
import Coswalk from "../components/Coswalk";

// Mendefinisikan komponen `Coswalks`
export default function Coswalks() {
    // Mendefinisikan state lokal `coswalks` dengan nilai awal array kosong
    const [coswalks, setCoswalks] = useState([]);

    // Mendefinisikan fungsi asinkron `getCoswalk` untuk mendapatkan data coswalk dari API
    const getCoswalk = async () => {
        const request = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/coswalk`
        );
        setCoswalks(request.data);
    };

    // Menggunakan `useEffect` untuk memanggil `getCoswalk` saat komponen dipasang
    useEffect(() => {
        getCoswalk();
    }, []);

    // Mengembalikan JSX yang mendefinisikan tampilan komponen
    return (
        <>
            <h1 className="text-2xl font-bold mb-5">COSWALK</h1>
            {/* Membuat tabel untuk menampilkan data coswalk */}
            <table className="border-collapse border border-neutral-300 text-center text-lg ">
                <thead>
                    <tr>
                        <th className="border border-neutral-300 px-5">
                            Nama Peserta
                        </th>
                        <th className="border border-neutral-300 px-5">
                            Nama Panggung
                        </th>
                        <th className="border border-neutral-300 px-5">
                            Instagram
                        </th>
                        <th className="border border-neutral-300 px-5">
                            Status
                        </th>
                        <th className="border border-neutral-300 px-5">
                            Action
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {/* Menggunakan `map` untuk membuat baris tabel untuk setiap item dalam `coswalks` */}
                    {coswalks.map((element, key) => {
                        return <Coswalk key={key} {...element} />;
                    })}
                </tbody>
            </table>
        </>
    );
}
