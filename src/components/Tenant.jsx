// Mengimpor modul yang diperlukan
import axios from "axios";
import { useState } from "react";

// Mendefinisikan komponen `Tenant`
export default function Tenant(props) {
    // Mendefinisikan state lokal `status` dengan nilai awal dari `props.status`
    const [status, setStatus] = useState(props.status);

    // Mendefinisikan fungsi asinkron `changeStatus` untuk mengubah status tenant
    const changeStatus = async () => {
        // Melakukan request PUT ke API untuk mengubah status tenant
        axios.put(`${import.meta.env.VITE_API_URL}/api/tenants/${props.telp}`);
        // Memperbarui state lokal `status`
        setStatus(!status);
    };

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
                {/* Membuat sel tabel untuk `nama_tenant`, `nama_cp`, `telp`, `alamat`, dan `status` */}
                <td className="border border-neutral-300 px-5">
                    {props.nama_tenant}
                </td>
                <td className="border border-neutral-300 px-5">
                    {props.nama_cp}
                </td>
                <td className="border border-neutral-300 px-5">{props.telp}</td>
                <td className="border border-neutral-300 px-5">
                    {props.alamat}
                </td>
                <td className="border border-neutral-300 px-5">
                    {status ? `Diterima` : `Pending`}
                </td>
                {/* Membuat sel tabel dengan tombol untuk mengubah `status` */}
                <td className="border border-neutral-300 px-5">
                    <button
                        onClick={changeStatus}
                        className={` my-2 px-3 rounded-lg ${
                            status
                                ? "bg-violet-500 text-green-400"
                                : "bg-green-400 text-violet-500"
                        }`}
                    >
                        {status ? "Hold" : "Terima"}
                    </button>
                </td>
            </tr>
        </>
    );
}
