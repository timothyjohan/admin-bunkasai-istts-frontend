// Mengimpor modul yang diperlukan
import axios from "axios";
import { useEffect, useState } from "react";
import Coswalk from "../components/Coswalk";
import { Link } from "react-router-dom";


// Mendefinisikan komponen `Coswalks`
export default function Coswalks() {
    // Mendefinisikan state lokal `coswalks` dengan nilai awal array kosong
    const [coswalks, setCoswalks] = useState([]);
    const [page, setPage] = useState(1);
    const [jumlah, setJumlah] = useState(0);
    // Mendefinisikan fungsi asinkron `getCoswalk` untuk mendapatkan data coswalk dari API
    const getCoswalk = async () => {
        const request = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/coswalk`
        );
        setCoswalks(request.data);
        setPage(request.data.length)
    };

    // Menggunakan `useEffect` untuk memanggil `getCoswalk` saat komponen dipasang
    useEffect(() => {
        getCoswalk();
    }, [!coswalks]);

    const prev = ()=>{
        if(jumlah-3<0){
            setJumlah(0)
        }else{
            setJumlah(jumlah-3)
        }
    }
    const next = ()=>{
        if(coswalks.length<=jumlah+3){
            setJumlah(coswalks.length-3)
        }else{
            setJumlah(jumlah+3)
        }
    }

    let arr =[];

    if(coswalks!=''){
        for (let index = jumlah; index < jumlah+3; index++) {
            if(index<coswalks.length){
                arr.push(
                    <tr
                        className={`border border-neutral-300 ${
                            coswalks[index].status
                                ? "bg-green-400 text-violet-500"
                                : "bg-violet-500 text-green-400"
                        }`}
                    >
                        {/* Membuat sel tabel untuk `nama_peserta`, `nama_panggung`, dan `instagram` */}
                        <td className="border border-neutral-300 px-5">
                            {coswalks[index].nama_peserta}
                        </td>
                        <td className="border border-neutral-300 px-5">
                            {coswalks[index].nama_panggung}
                        </td>
                        <td className="border border-neutral-300 px-5">
                            {coswalks[index].instagram}
                        </td>
                        {/* Membuat sel tabel untuk `status`, yang menampilkan "Diterima" jika `status` adalah `true`, dan "Pending" jika `status` adalah `false` */}
                        <td className="border border-neutral-300 px-5">
                            {coswalks[index].status ? `Diterima` : `Pending`}
                        </td>
                        {/* Membuat sel tabel dengan link ke halaman detail, yang URL-nya diambil dari `props.instagram` */}
                        <td className="border border-neutral-300 px-5">
                            <Link to={`${coswalks[index].instagram}`}>
                                <button
                                    className={` my-2 px-3 rounded-lg ${
                                        coswalks[index].status
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