// Mengimpor modul yang diperlukan
import { useState } from "react";
import { Link } from "react-router-dom";

// Mendefinisikan komponen `Jsong`
export default function Jsong(props) {
    // Mendefinisikan state lokal `status` dengan nilai awal dari `props.status`
    const [status, setStatus] = useState(props.status);

    // Mengembalikan JSX yang mendefinisikan tampilan komponen
    return (
        <>
            {/* Membuat baris tabel dengan latar belakang dan warna teks yang berbeda tergantung pada `status` */}
            <tr className="border border-neutral-300 text-white">
                {/* Membuat sel tabel untuk `nama_peserta`, `nama_panggung`, `telp`, dan `lagu` */}
                <td className="border border-neutral-300 px-5">
                    {props.nama_peserta}
                </td>
                <td className="border border-neutral-300 px-5">
                    {props.nama_panggung}
                </td>
                <td className="border border-neutral-300 px-5">{props.telp}</td>
                <td className="border border-neutral-300 px-5">{props.lagu}</td>
                {/* Membuat sel tabel untuk `status`, yang menampilkan `Diterima` jika `status` adalah `true` dan `Pending` jika `status` adalah `false` */}
                <td className="border border-neutral-300 px-5">
                    {status ? `Diterima` : `Pending`}
                </td>
                {/* Membuat sel tabel dengan link ke halaman detail */}
                <td className="border border-neutral-300 px-5">
                    <Link to={`${props.telp}`}>
                        <button
                            className={` my-2 px-3 rounded-lg ${
                                status
                                    ? "bg-violet-600 text-white"
                                    : "bg-green-600 text-white"
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
