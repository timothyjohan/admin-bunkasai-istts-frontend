// Komponen ini digunakan untuk menampilkan data feedback
// yang diberikan oleh peserta Coswalk. Komponen ini digunakan
// pada halaman `Feedback`.

// Mengimpor modul yang diperlukan
import axios from "axios";
import { useState } from "react";

// Mendefinisikan komponen `Feedback`
export default function Feedback(props) {
    // Mengembalikan JSX yang mendefinisikan tampilan komponen
    return (
        <>
            {/* Membuat baris tabel */}
            <tr className={`border border-neutral-300`}>
                {/* Membuat sel tabel untuk `kritik`, `saran`, `pesan`, dan `kesan` */}
                <td className="border border-neutral-300 px-5">
                    {props.kritik}
                </td>
                <td className="border border-neutral-300 px-5">
                    {props.saran}
                </td>
                <td className="border border-neutral-300 px-5">
                    {props.pesan}
                </td>
                <td className="border border-neutral-300 px-5">
                    {props.kesan}
                </td>
            </tr>
        </>
    );
}
