// Halaman `Gallery` menampilkan daftar gambar yang diunggah oleh pengguna

// Mengimpor modul yang diperlukan
import axios from "axios";
import { useEffect, useState } from "react";
import GalleryImage from "../components/GalleryImage";

// Mendefinisikan komponen `Gallery`
export default function Gallery() {
    // Mendefinisikan state lokal `images` dengan nilai awal array kosong
    const [images, setImages] = useState([]);

    // Mendefinisikan fungsi asinkron `getPhotos` untuk mendapatkan data gambar dari API
    const getPhotos = async () => {
        const request = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/gallery`
        );
        setImages(request.data);
    };

    // Menggunakan `useEffect` untuk memanggil `getPhotos` saat komponen dipasang
    useEffect(() => {
        getPhotos();
    }, []);

    // Mengembalikan JSX yang mendefinisikan tampilan komponen
    return (
        <>
            <div className="bg-neutral-800 p-8 my-10 mb-24 bg-opacity-75 rounded-xl w-5/6 mx-auto">
                {/* Menggunakan `map` untuk membuat komponen `GalleryImage` untuk setiap item dalam `images` */}
                {images.map((element, key) => {
                    return (
                        <GalleryImage
                            getPhotos={getPhotos}
                            key={key}
                            {...element}
                        />
                    );
                })}

            </div>
        </>
    );
}
