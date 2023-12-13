import { Link } from "react-router-dom";

// Mendefinisikan komponen `NotFound`
export default function NotFound() {
    return (
        <>
            {/* Membuat div dengan tinggi dan lebar minimal layar penuh, layout flex, pusat item, justifikasi pusat, dan teks tengah */}
            <div className="min-h-screen min-w-screen flex justify-center items-center text-neutral-200 text-center">
                <div>
                    {/* Membuat judul "404 - NOT FOUND" dengan teks tebal dan ukuran 6xl */}
                    <h1 className="font-bold text-6xl">404 - NOT FOUND</h1>
                    <br />
                    {/* Membuat pesan kesalahan dengan teks tebal dan ukuran 2xl */}
                    <h1 className="font-bold text-2xl">
                        dirrectory page does not exist, please make sure you
                        type in the right dirrectory
                    </h1>
                    <br />
                    {/* Membuat link ke halaman utama ("/") dengan tombol "Back" */}
                    <Link to={"/"}>
                        <button className="bg-neutral-800 text-xl py-2 px-10 rounded-lg">
                            Back
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}
