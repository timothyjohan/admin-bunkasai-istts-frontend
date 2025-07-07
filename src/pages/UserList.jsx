// Mengimpor modul yang diperlukan
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserRow from "../components/UserRow"; // Impor komponen UserRow

// Mendefinisikan komponen `UserList`
export default function UserList() {
    // Mendefinisikan state lokal `users` dengan nilai awal array kosong
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Menggunakan `useSelector` untuk mendapatkan `user` dari state Redux
    const userToken = useSelector((state) => state.user.user);

    // Mendefinisikan fungsi asinkron `getUsers` untuk mendapatkan data pengguna dari API
    const getUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const request = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/user/`,
                {
                    headers: {
                        "x-auth-token": userToken,
                    },
                }
            );
            setUsers(request.data.result.userdata);
        } catch (err) {
            console.error("Gagal mengambil data pengguna:", err);
            setError("Gagal mengambil data pengguna.");
        } finally {
            setLoading(false);
        }
    };

    // Menggunakan `useEffect` untuk memanggil `getUsers` saat komponen dipasang
    useEffect(() => {
        if (userToken) {
            getUsers();
        } else {
            setLoading(false);
            setError("Admin tidak terautentikasi.");
        }
    }, [userToken]);

    // Mengembalikan JSX yang mendefinisikan tampilan komponen
    return (
        <div className="min-h-screen min-w-screen flex items-center justify-center text-neutral-200">

            <div className="flex flex-col items-center">
                <h1 className="text-2xl font-bold mb-5">DAFTAR PENGGUNA</h1>
                {loading && <p className="text-center text-neutral-400">Memuat data...</p>}
                {error && <p className="text-center text-red-500">{error}</p>}
                {!loading && !error && (
                    <table className="border-collapse border border-neutral-300 text-center text-lg">
                        <thead>
                            <tr>
                                <th className="border border-neutral-300 px-5">Nama</th>
                                <th className="border border-neutral-300 px-5">Email</th>
                                <th className="border border-neutral-300 px-5">No. Telepon</th>
                                <th className="border border-neutral-300 px-5">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Menggunakan `map` untuk membuat baris tabel untuk setiap item dalam `users` */}
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <UserRow key={user.email} {...user} />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="p-4 text-neutral-400">Tidak ada data pengguna.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
