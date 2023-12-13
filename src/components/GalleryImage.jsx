// Komponent ini digunakan untuk menampilkan gambar yang ada di halaman gallery

// Mengimpor modul yang diperlukan
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mendefinisikan komponen `GalleryImage`
export default function GalleryImage(props) {
    // Mendefinisikan state lokal `btnClick` dengan nilai awal `false`
    const [btnClick, setBtnClick] = useState(false);

    // Mendefinisikan fungsi asinkron `deleteImage` untuk menghapus gambar dari galeri
    const deleteImage = async () => {
        // Mengubah `btnClick` menjadi `true` untuk menunjukkan bahwa tombol telah diklik
        setBtnClick(true);

        // Mengambil URL gambar dari `props.img`
        const imageUrl = props.img;

        // Membuat ekspresi reguler untuk mengekstrak bagian yang diinginkan dari URL
        const regex = /\/([^\/]+)\.png$/;
        const match = imageUrl.match(regex);

        // Memeriksa apakah ada kecocokan dan mendapatkan grup yang ditangkap
        const imageId = match ? match[1] : "";

        // Mencoba menghapus gambar dari API
        try {
            await axios.delete(
                `${import.meta.env.VITE_API_URL}/api/gallery/${imageId}`
            );
        } catch (error) {
            // Menangani kesalahan jika ada
        }

        // Mengubah `btnClick` menjadi `false` setelah operasi selesai
        setBtnClick(false);

        // Memanggil `props.getPhotos` untuk memperbarui daftar foto
        props.getPhotos();
    };

    // Mengembalikan JSX yang mendefinisikan tampilan komponen
    return (
        <>
            <div className=" my-10">
                <div>
                    <img src={`${props.img}`} alt="" className="h-60 mx-auto" />
                    <div className="my-auto text-center mt-2">
                        {btnClick ? (
                            <button
                                type="submit"
                                disabled
                                className="px-5 py-1 rounded-xl font-bold transition-all text-violet-500 bg-green-400"
                            >
                                <img
                                    src="/loading.png"
                                    className="h-6 mx-auto transition-all animate-spin"
                                    alt=""
                                />
                            </button>
                        ) : (
                            <button
                                onClick={deleteImage}
                                className="bg-neutral-700 px-5 py-1 rounded-xl hover:scale-110 hover:bg-neutral-600 hover:font-bold transition-all"
                            >
                                Delete
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
