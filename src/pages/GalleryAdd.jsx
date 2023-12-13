// Halaman untuk mengunggah gambar

// Mengimpor modul yang diperlukan
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

// Mendefinisikan komponen `GalleryAdd`
export default function GalleryAdd() {
    // Menggunakan `useForm` untuk mengelola form
    const { register, handleSubmit, reset } = useForm();
    // Mendefinisikan state lokal `error`, `success`, dan `btnClick`
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [btnClick, setBtnClick] = useState(false);

    // Mendefinisikan fungsi asinkron `uploadImage` untuk mengunggah gambar
    const uploadImage = async (data) => {
        // Mengatur `error` dan `success` menjadi `null`
        setError(null);
        setSuccess(null);
        // Jika `data.photo[0]` ada, maka lakukan proses pengunggahan
        if (data.photo[0]) {
            // Mengatur `btnClick` menjadi `true`
            setBtnClick(true);

            try {
                // Membuat `FormData` dan menambahkan `photo` ke dalamnya
                const formData = new FormData();
                formData.append("photo", data.photo[0]);
                // Melakukan request POST ke API untuk mengunggah gambar
                await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/gallery/new`,
                    formData
                );
                // Mengatur `success` menjadi `true`
                setSuccess(true);
            } catch (error) {
                // Jika terjadi error, maka atur `error` dengan pesan error
                setError(error.message);
            }
            // Mengatur `btnClick` menjadi `false`
            setBtnClick(false);
        } else {
            // Jika `data.photo[0]` tidak ada, maka atur `error` dengan pesan "File yang diupload kosong"
            setError("File yang diupload kosong");
        }
    };

    // Mengembalikan JSX yang mendefinisikan tampilan komponen
    return (
        <>
            {/* Membuat link ke halaman "/home/gallery" */}
            <div className="m-10">
                <Link to={"/home/gallery"}>
                    <button>
                        <button className="bg-neutral-700 px-5 py-1 rounded-xl">
                            Back
                        </button>
                    </button>
                </Link>
            </div>

            {/* Membuat form untuk mengunggah gambar */}
            <div className="bg-neutral-800/80 p-10 w-3/6 mx-auto">
                <form onSubmit={handleSubmit(uploadImage)}>
                    <input
                        {...register("photo")}
                        accept="image/*"
                        type="file"
                        className="mb-5"
                    />
                    <br />
                    {error ? (
                        <div className="text-green-400  font-semibold py-2 px-4 mb-8 rounded-xl bg-violet-500 transition duration-400 scale-100">
                            {error}
                        </div>
                    ) : null}
                    {success ? (
                        <div className="text-green-400  font-semibold py-2 px-4 mb-8 rounded-xl bg-violet-500 transition duration-400 scale-100">
                            Upload successful
                        </div>
                    ) : null}
                    <button
                        type="submit"
                        disabled={btnClick}
                        className="bg-neutral-700 px-5 py-1 rounded-xl"
                    >
                        Upload
                    </button>
                </form>
            </div>
        </>
    );
}
