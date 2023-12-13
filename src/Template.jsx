// Mengimpor modul yang diperlukan
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";

// Mendefinisikan komponen `Template`
export default function Template() {
    // Menggunakan `useSelector` untuk mendapatkan `user` dari state Redux
    const user = useSelector((state) => state.user.user);
    // Menggunakan `useNavigate` untuk navigasi programatik
    const navigate = useNavigate();

    // Mendefinisikan fungsi asinkron `loginadmin` untuk melakukan verifikasi login admin
    const loginadmin = async () => {
        try {
            // Melakukan request GET ke API dengan token auth di header
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/user`,
                {
                    headers: {
                        "x-auth-token": user,
                    },
                }
            );
        } catch (error) {
            // Jika terjadi kesalahan, navigasi ke halaman '/err-unauthorized'
            navigate("/err-unauthorized");
        }
    };

    // Menggunakan `useEffect` untuk memanggil `loginadmin` saat komponen dipasang
    useEffect(() => {
        loginadmin();
    }, []);

    // Mengembalikan JSX yang mendefinisikan tampilan komponen
    return (
        <>
            {/* Menampilkan komponen `Navbar` */}
            <Navbar />
            <div className=" min-h-screen">
                {/* Menampilkan komponen anak yang didefinisikan oleh router */}
                <Outlet />
            </div>
            {/* Menampilkan komponen `Footer` */}
            <Footer />
        </>
    );
}
