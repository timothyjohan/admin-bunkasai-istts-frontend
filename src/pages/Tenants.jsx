// Mengimpor modul yang diperlukan
import axios from "axios";
import { useEffect, useState } from "react";
import Tenant from "../components/Tenant";

// Mendefinisikan komponen `Tenants`
export default function Tenants() {
    // Mendefinisikan state lokal `tenants` dengan nilai awal array kosong
    const [tenants, setTenants] = useState([]);
    const [page, setPage] = useState(1);
    const [jumlah, setJumlah] = useState(0);
    // Mendefinisikan fungsi asinkron `getTenants` untuk mendapatkan data tenant dari API
    const getTenants = async () => {
        const request = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/tenants`
        );
        setTenants(request.data);
        setPage(request.data.length)
    };

    // Mendefinisikan fungsi asinkron `changeStatus` untuk mengubah status tenant
    const changeStatus = async (index) => {
        // Melakukan request PUT ke API untuk mengubah status tenant
        axios.put(`${import.meta.env.VITE_API_URL}/api/tenants/${tenants[index].telp}`);

        setTenants("")
    };

    // Menggunakan `useEffect` untuk memanggil `getTenants` saat komponen dipasang
    useEffect(() => {
        getTenants();
    }, [!tenants]);

    let arr=[]
    
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
    
    if(tenants!=''){
        for (let index = jumlah; index < jumlah+3; index++) {
            if(index<tenants.length){
                arr.push(
                    <tr key={tenants[index].nama_cp}
                        className={`border border-neutral-300 ${
                            tenants[index].status
                                ? "bg-green-400 text-violet-500"
                                : "bg-violet-500 text-green-400"
                        }`}
                    >
                    <td className="border border-neutral-300 px-5">
                        {tenants[index].nama_tenant}
                    </td>
                    <td className="border border-neutral-300 px-5">
                        {tenants[index].nama_cp}
                    </td>
                    <td className="border border-neutral-300 px-5">{tenants[index].telp}</td>
                    <td className="border border-neutral-300 px-5">
                        {tenants[index].alamat}
                    </td>
                    <td className="border border-neutral-300 px-5">
                        {tenants[index].status ? `Diterima` : `Pending`}
                    </td>
                    {/* Membuat sel tabel dengan tombol untuk mengubah `status` */}
                    <td className="border border-neutral-300 px-5">
                        <button
                            onClick={()=>changeStatus(index)}
                            className={` my-2 px-3 rounded-lg ${
                                tenants[index].status
                                    ? "bg-violet-500 text-green-400"
                                    : "bg-green-400 text-violet-500"
                            }`}
                        >
                            {tenants[index].status ? "Hold" : "Terima"}
                        </button>
                    </td>
                </tr>)
            }
        }
    }

    // Mengembalikan JSX yang mendefinisikan tampilan komponen
    return (
        <>
            <div className="min-h-screen min-w-screen flex items-center justify-center text-neutral-200">
                <div className="bg-neutral-800 p-10 bg-opacity-75 rounded-xl">
                    <h1 className="text-2xl font-bold mb-5">TENANTS</h1>
                    <table className="border-collapse border border-neutral-300 text-center text-lg">
                        <thead>
                            <tr>
                                <th className="border border-neutral-300 px-5">
                                    Nama Tenant
                                </th>
                                <th className="border border-neutral-300 px-5">
                                    Nama Contact Person
                                </th>
                                <th className="border border-neutral-300 px-5">
                                    No Telp
                                </th>
                                <th className="border border-neutral-300 px-5">
                                    Alamat
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
                </div>
            </div>
        </>
    );
}