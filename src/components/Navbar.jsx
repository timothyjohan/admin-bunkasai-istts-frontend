// Mengimpor modul yang diperlukan
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../app/userSlice";

// Mendefinisikan komponen `Navbar`
export default function Navbar() {
    // Mendapatkan fungsi `dispatch` dari hook `useDispatch`
    const dispatch = useDispatch();
    // Mendapatkan fungsi `navigate` dari hook `useNavigate`
    const navigate = useNavigate();

    // Mendefinisikan fungsi `logout` untuk melakukan logout
    const logout = () => {
        // Mengubah user menjadi `null` di state Redux
        dispatch(setUser(null));
        // Mengarahkan pengguna ke halaman utama
        navigate("/");
    };

    // Mengembalikan JSX yang mendefinisikan tampilan komponen
    return (
        <>
            <div className="fixed w-full z-20">
                <nav className="w-11/12 mx-auto p-2 mt-2 flex items-center justify-between ">
                    <div className="flex items-center">
                        <img
                            src="/bunkasai-logo.png"
                            className="w-20 h-20 object-contain mx-5"
                        />
                    </div>
                    <div className="flex items-center text-neutral-300">
                        {/* Membuat link ke berbagai halaman */}
                        <Link
                            to={""}
                            className="mx-5 text-xl font-bold transition-all hover:scale-110"
                        >
                            <button className=" ">HOME</button>
                        </Link>
                        <Link
                            to={"tenants"}
                            className="mx-5 text-xl font-bold transition-all hover:scale-110"
                        >
                            <button className=" ">TENANTS</button>
                        </Link>
                        <Link
                            to={"competitions/jsong"}
                            className="mx-5 text-xl font-bold transition-all hover:scale-110"
                        >
                            <button className="">COMPETITIONS</button>
                        </Link>
                        <Link
                            to={"gallery"}
                            className="mx-5 text-xl font-bold transition-all hover:scale-110"
                        >
                            <button className="">GALLERY</button>
                        </Link>
                        <Link
                            to={"tickets"}
                            className="mx-5 text-xl font-bold transition-all hover:scale-110"
                        >
                            <button className="">TICKETS</button>
                        </Link>
                        {/* <Link
                            to={"feedback"}
                            className="mx-5 text-xl font-bold transition-all hover:scale-110"
                        >
                            <button className="">FEEDBACKS</button>
                        </Link> */}
                        {/* Membuat tombol logout */}
                        <button
                            onClick={logout}
                            className="mx-5 text-xl font-bold transition-all hover:scale-110"
                        >
                            <button className="">LOGOUT</button>
                        </button>
                    </div>
                </nav>
            </div>
        </>
    );
}
