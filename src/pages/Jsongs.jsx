// Mengimpor modul yang diperlukan
import axios from "axios";
import { useEffect, useState } from "react";
import Jsong from "../components/Jsong";
import { Link } from "react-router-dom";

// Mendefinisikan komponen `Jsongs`
export default function Jsongs() {
    // Mendefinisikan state lokal `jsongs` dengan nilai awal array kosong
    const [jsongs, setJsongs] = useState([]);
    const [page, setPage] = useState(1);
    const [jumlah, setJumlah] = useState(0);

    // Mendefinisikan fungsi asinkron `getJsongs` untuk mendapatkan data jsong dari API
    const getJsongs = async () => {
        const request = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/jsong`
        );
        setJsongs(request.data);
        setPage(request.data.length)
    };

    // Menggunakan `useEffect` untuk memanggil `getJsongs` saat komponen dipasang
    useEffect(() => {
        getJsongs();
    }, [!jsongs]);
    let arr=[]

    const prev = ()=>{
        if(jumlah-3<0){
            setJumlah(0)
        }else{
            setJumlah(jumlah-3)
        }
    }
    const next = ()=>{
        if(jsongs.length<=jumlah+3){
            setJumlah(jsongs.length-3)
        }else{
            setJumlah(jumlah+3)
        }
    }

    if(jsongs!=''){
        for (let index = jumlah; index < jumlah+3; index++) {
            if(index<jsongs.length){
                arr.push(
                    <tr
                        className={`border border-neutral-300 ${
                            jsongs[index].status
                                ? "bg-green-400 text-violet-500"
                                : "bg-violet-500 text-green-400"
                        }`}>
                        {/* Membuat sel tabel untuk `nama_peserta`, `nama_panggung`, `telp`, dan `lagu` */}
                        <td className="border border-neutral-300 px-5">
                            {jsongs[index].nama_peserta}
                        </td>
                        <td className="border border-neutral-300 px-5">
                            {jsongs[index].nama_panggung}
                        </td>
                        <td className="border border-neutral-300 px-5">{jsongs[index].telp}</td>
                        <td className="border border-neutral-300 px-5">{jsongs[index].lagu}</td>
                        {/* Membuat sel tabel untuk `status`, yang menampilkan `Diterima` jika `status` adalah `true` dan `Pending` jika `status` adalah `false` */}
                        <td className="border border-neutral-300 px-5">
                            {jsongs[index].status ? `Diterima` : `Pending`}
                        </td>
                        {/* Membuat sel tabel dengan link ke halaman detail */}
                        <td className="border border-neutral-300 px-5">
                            <Link to={`${jsongs[index].telp}`}>
                                <button
                                    className={` my-2 px-3 rounded-lg ${
                                        jsongs[index].status
                                            ? "bg-violet-500 text-green-400"
                                            : "bg-green-400 text-violet-500"
                                    }`}
                                >
                                    Details
                                </button>
                            </Link>
                        </td>
                    </tr>
                )
            }
        }
    }

    // Mengembalikan JSX yang mendefinisikan tampilan komponen
    return (
        <>
            <h1 className="text-2xl font-bold mb-5">J-SONG</h1>
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
                    {arr}
                </tbody>
            </table>
            <div className="mx-auto w-fit flex">
                <button onClick={prev}>prev</button>
                <div className="w-80 text-center">{(jumlah/3)+1}/{Math.ceil(page/3)}</div>
                <button onClick={next}>next</button>
            </div>
        </>
    );
}
