// Mengimpor modul yang diperlukan
import axios from "axios";
import { useEffect, useState } from "react";
import Tenant from "../components/Tenant";

// Mendefinisikan komponen `Tenants`
export default function Tenants() {
    // Mendefinisikan state lokal `tenants` dengan nilai awal array kosong
    const [tenants, setTenants] = useState([]);

    // Mendefinisikan fungsi asinkron `getTenants` untuk mendapatkan data tenant dari API
    const getTenants = async () => {
        const request = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/tenants`
        );
        setTenants(request.data);
    };

    // Menggunakan `useEffect` untuk memanggil `getTenants` saat komponen dipasang
    useEffect(() => {
        getTenants();
    }, []);

    // Mengembalikan JSX yang mendefinisikan tampilan komponen
    return (
        <>
            <div className="min-h-screen min-w-screen flex items-center justify-center text-neutral-200">
                <div className="bg-neutral-800 p-10 bg-opacity-75 rounded-xl">
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
                            {tenants.map((element, key) => {
                                return <Tenant key={key} {...element} />;
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
