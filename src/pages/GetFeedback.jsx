// Hanya digunakan untuk mengimpor komponen `Feedback` dan mendefinisikan komponen `GetFeedback`

// Mengimpor modul yang diperlukan
import axios from "axios";
import { useEffect, useState } from "react";
import Feedback from "../components/Feedback";
import { Outlet } from "react-router-dom";

// Mendefinisikan komponen `GetFeedback`
export default function GetFeedback() {
    // Mendefinisikan state lokal `feedbacks` dengan nilai awal array kosong
    const [feedbacks, setFeedbacks] = useState([]);
    const [page, setPage] = useState(1);
    const [jumlah, setJumlah] = useState(0);

    // Mendefinisikan fungsi asinkron `getFeedbacks` untuk mendapatkan data feedback dari API
    const getFeedbacks = async () => {
        const request = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/feedback`
        );
        setFeedbacks(request.data);
    };

    // Menggunakan `useEffect` untuk memanggil `getFeedbacks` saat komponen dipasang
    useEffect(() => {
        getFeedbacks();
    }, [!feedbacks]);

    let arr = []

    const prev = ()=>{
        if(jumlah-3<0){
            setJumlah(0)
        }else{
            setJumlah(jumlah-3)
        }
    }
    const next = ()=>{
        if(tenants.length<=jumlah+3){
            setJumlah(tenants.length-3)
        }else{
            setJumlah(jumlah+3)
        }
    }
    

    if(feedbacks!=''){
        for (let index = jumlah; index < jumlah+3; index++) {
            if(index<feedbacks.length){
                arr.push(
                    <tr className={`border border-neutral-300`}>
                        {/* Membuat sel tabel untuk `kritik`, `saran`, `pesan`, dan `kesan` */}
                        <td className="border border-neutral-300 px-5">
                            {feedbacks[index].kritik}
                        </td>
                        <td className="border border-neutral-300 px-5">
                            {feedbacks[index].saran}
                        </td>
                        <td className="border border-neutral-300 px-5">
                            {feedbacks[index].pesan}
                        </td>
                        <td className="border border-neutral-300 px-5">
                            {feedbacks[index].kesan}
                        </td>
                    </tr>
                )
            }
        }
    }



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
                            {arr}
                        </tbody>
                    </table>
                    <div className="mx-auto w-fit flex">
                        <button onClick={prev}>prev</button>
                        <div className="w-80 text-center">{(jumlah/3)+1}/{Math.ceil(page/3)}</div>
                        <button onClick={next}>next</button>
                    </div>
                </div>
            </div>
        </>
    );
}
