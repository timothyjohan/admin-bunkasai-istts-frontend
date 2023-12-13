// Mengimpor hook `useState` dari pustaka "react"
import { useState } from "react";

// Mengimpor komponen `Link` dari pustaka "react-router-dom"
import { Link } from "react-router-dom";

// Mendefinisikan komponen `Coswalk` yang menerima `props` sebagai argumen
export default function Coswalk(props) {
    // Menggunakan hook `useState` untuk mendefinisikan state lokal `status`
    // Nilai awal `status` diambil dari `props.status`
    const [status, setStatus] = useState(props.status);

    // Mengembalikan JSX yang mendefinisikan tampilan komponen
    return (
        <>
            {/* Membuat baris tabel dengan warna latar dan teks yang berbeda tergantung pada `status` */}
            <tr
                className={`border border-neutral-300 ${
                    status
                        ? "bg-green-400 text-violet-500"
                        : "bg-violet-500 text-green-400"
                }`}
            >
                {/* Membuat sel tabel untuk `nama_peserta`, `nama_panggung`, dan `instagram` */}
                <td className="border border-neutral-300 px-5">
                    {props.nama_peserta}
                </td>
                <td className="border border-neutral-300 px-5">
                    {props.nama_panggung}
                </td>
                <td className="border border-neutral-300 px-5">
                    {props.instagram}
                </td>
                {/* Membuat sel tabel untuk `status`, yang menampilkan "Diterima" jika `status` adalah `true`, dan "Pending" jika `status` adalah `false` */}
                <td className="border border-neutral-300 px-5">
                    {status ? `Diterima` : `Pending`}
                </td>
                {/* Membuat sel tabel dengan link ke halaman detail, yang URL-nya diambil dari `props.instagram` */}
                <td className="border border-neutral-300 px-5">
                    <Link to={`${props.instagram}`}>
                        <button
                            className={` my-2 px-3 rounded-lg ${
                                status
                                    ? "bg-violet-500 text-green-400"
                                    : "bg-green-400 text-violet-500"
                            }`}
                        >
                            Details
                        </button>
                    </Link>
                </td>
            </tr>
        </>
    );
}
