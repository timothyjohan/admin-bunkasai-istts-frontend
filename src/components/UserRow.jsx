// Mengimpor modul yang diperlukan
import React from "react";
import { useNavigate } from "react-router-dom";

// Komponen untuk satu baris data Pengguna
const UserRow = ({ name, email, phone_number }) => {
    const navigate = useNavigate();

    // Fungsi untuk navigasi ke halaman detail pengguna
    const handleDetailClick = () => {
        // Arahkan ke halaman detail menggunakan email sebagai ID unik
        navigate(`/home/user/${email}`);
    };

    return (
        <tr className="border border-neutral-300 text-white">
            <td className="border border-neutral-300 px-5 py-2">{name}</td>
            <td className="border border-neutral-300 px-5 py-2">{email}</td>
            <td className="border border-neutral-300 px-5 py-2">{phone_number || 'N/A'}</td>
            <td className="border border-neutral-300 px-5 py-2">
                <button
                    onClick={handleDetailClick}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-1 px-4 rounded-md transition-all"
                >
                    Detail
                </button>
            </td>
        </tr>
    );
};

export default UserRow;
