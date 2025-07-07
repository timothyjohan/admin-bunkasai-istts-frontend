// Mengimpor modul yang diperlukan
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

// Komponen untuk menampilkan detail lengkap seorang pengguna
export default function UserDetail() {
    // State untuk data dan status UI
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null); // State untuk data pengguna
    const [tickets, setTickets] = useState([]); // State untuk array tiket

    // Mengambil token admin dan parameter email dari URL
    const userToken = useSelector((state) => state.user.user);
    const { email } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userToken) {
                setError("Admin tidak terautentikasi.");
                setLoading(false);
                return;
            }
            if (!email) {
                setError("Email pengguna tidak ditemukan di URL.");
                setLoading(false);
                return;
            }

            const API_BASE_URL = import.meta.env.VITE_API_URL;
            const headers = { "x-auth-token": userToken };

            try {
                // Menggunakan metode POST untuk mengirim email di dalam body request
                const response = await axios.get(`${API_BASE_URL}/api/user/details-ticket?email=${email}`, { headers });

                // Destructure data dari response tunggal sesuai struktur baru
                const { user: userData, tickets: ticketsData = [] } = response.data;

                // Memperbarui state dari satu response
                setUser(userData);
                setTickets(ticketsData);

            } catch (err) {
                console.error("Gagal mengambil data detail pengguna:", err);
                setError("Gagal mengambil data detail pengguna.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [email, userToken]);

    const goback = () => navigate(-1);

    const addTicket = async () => {
        if (!window.confirm("Apakah Anda yakin ingin menambahkan tiket untuk pengguna ini?")) return;
        try {
            const name = user.name
            setLoading(true);
            setError(null);
            const API_BASE_URL = import.meta.env.VITE_API_URL;
            const headers = { "x-auth-token": userToken };
            await axios.post(`${API_BASE_URL}/api/ticket/admin/new`, { email, name }, { headers });
            // Refresh data setelah berhasil menambah tiket
            const response = await axios.get(`${API_BASE_URL}/api/user/details-ticket?email=${email}`, { headers });
            const { user: userData, tickets: ticketsData = [] } = response.data;
            setUser(userData);
            setTickets(ticketsData);
        } catch (err) {
            setError("Gagal menambah tiket.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-center text-neutral-400">Memuat data detail pengguna...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen min-w-screen flex items-center justify-center text-neutral-200">
            <div className="flex flex-col items-center w-full mt-24">
                <div className="w-full max-w-4xl mx-auto bg-neutral-800/80 p-8 rounded-xl shadow-lg">
                    <div className="flex justify-between mb-6">
                        <button onClick={goback} className="bg-neutral-700 py-1 px-5 text-md rounded-xl hover:bg-neutral-600 transition-all">
                            Back
                        </button>
                        <button onClick={addTicket} className="bg-neutral-700 py-1 px-5 text-md rounded-xl hover:bg-neutral-600 transition-all">
                            Add Ticket
                        </button>
                    </div>
                    <h1 className="text-3xl font-bold text-center mb-2 text-yellow-400">Detail Pengguna</h1>
                    <p className="text-center text-lg mb-2 text-neutral-300">{user?.name}</p>
                    <p className="text-center text-md mb-2 text-neutral-400">{user?.email}</p>
                    <p className="text-center text-md mb-8 text-neutral-400">{user?.phone_number}</p>

                    {tickets.length > 0 ? (
                        <div className="p-4 bg-neutral-700 rounded-lg">
                            <h2 className="text-xl font-semibold mb-2">Pembelian Tiket</h2>
                            {tickets.map((ticket) => (
                                <div key={ticket.ulid} className="bg-neutral-600 p-3 rounded-md mb-2">
                                    <p><span className="font-semibold">ULID:</span> {ticket.ulid}</p>
                                    <p><span className="font-semibold">Nama di Tiket:</span> {ticket.name}</p>
                                    <p><span className="font-semibold">Status:</span> {ticket.status ? 
                                        <span className="text-green-400">Diterima</span> : 
                                        <span className="text-yellow-400">Pending</span>}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-neutral-400 mt-4">Pengguna ini tidak memiliki data tiket.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
