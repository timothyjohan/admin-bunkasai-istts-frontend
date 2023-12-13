// Mengimpor modul yang diperlukan
import { Link } from "react-router-dom";

// Mendefinisikan komponen `NavbarLogin`
export default function NavbarLogin() {
    // Mengembalikan JSX yang mendefinisikan tampilan komponen
    return (
        <>
            {/* Membuat div dengan posisi fixed dan lebar penuh */}
            <div className="fixed w-full z-20">
                {/* Membuat navbar dengan lebar 11/12 dari lebar viewport dan margin otomatis */}
                <nav className="w-11/12 mx-auto p-2 mt-2 flex items-center justify-between ">
                    {/* Membuat div untuk logo */}
                    <div className="flex items-center">
                        {/* Menampilkan logo */}
                        <img
                            src="bunkasai-logo.png"
                            className="w-20 h-20 object-contain mx-5"
                        />
                        {/* Kode untuk menampilkan logo lainnya telah dikomentari */}
                        {/* <img src="nippongo.png" className="w-20 h-20 object-contain" /> */}
                    </div>
                </nav>
                {/* Kode untuk membuat garis horizontal telah dikomentari */}
                {/* <hr className="border-neutral-200 border-solid w-11/12 mx-auto " /> */}
            </div>
        </>
    );
}
