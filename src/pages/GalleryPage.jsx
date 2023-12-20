// Halaman ini merupakan halaman utama dari fitur Gallery

// Mengimpor modul yang diperlukan
import { Link, Outlet } from "react-router-dom";

// Mendefinisikan komponen `GalleryPage`
export default function GalleryPage() {
    // Mengembalikan JSX yang mendefinisikan tampilan komponen
    return (
        <>
            {/* Membuat div dengan padding atas 44 unit, lebar 4/6 dari lebar viewport, dan margin otomatis */}
            <div className="pt-44 w-4/6 mx-auto text-neutral-200">
                {/* Membuat div dengan layout flex dan justifikasi konten antara */}
                <div className="flex justify-between">
                    {/* Membuat heading dengan teks "GALLERY" */}
                    <h1 className="text-2xl font-bold">GALLERY</h1>
                    {/* Membuat link ke halaman "add" */}
                    <Link to={"add"}>
                        {/* Membuat tombol dengan teks "Add Photo" */}
                        <button className="bg-neutral-700 px-5 py-1 rounded-xl">
                            Add Photo
                        </button>
                    </Link>
                </div>
                {/* Menampilkan komponen anak yang sesuai dengan rute saat ini */}
                <Outlet />
            </div>
        </>
    );
}
