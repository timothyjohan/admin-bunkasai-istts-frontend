// Mengimpor modul yang diperlukan
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUser } from "../app/userSlice";
import { useNavigate } from "react-router-dom";

// Mendefinisikan komponen `Login`
export default function Login() {
    // Mendefinisikan state lokal
    const [load, setLoad] = useState(false);
    const [btnClick, setBtnClick] = useState(null);
    const [error, setError] = useState(null);

    // Menggunakan `useForm` untuk mengelola form
    const { register, handleSubmit, reset, formState } = useForm();

    // Menggunakan `useEffect` untuk mengatur `load` menjadi `true` setelah waktu tertentu
    useEffect(() => {
        setTimeout(() => {
            setLoad(true);
        }, 0);
    }, []);

    // Mendapatkan fungsi `dispatch` dari `useDispatch` dan `navigate` dari `useNavigate`
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Mendefinisikan fungsi `handleLogin` untuk mengelola proses login
    const handleLogin = async (data) => {
        try {
            setError(null);
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/user`,
                data
            );
            dispatch(setUser(response.data.body.token));
            navigate("/home");
        } catch (error) {
            setError("Gagal Login");
        }
    };

    // Mengembalikan JSX yang mendefinisikan tampilan komponen
    return (
        <>
            <div className="h-screen flex items-center justify-center bg-repeat w-full">
                <div className="bg-neutral-800 bg-opacity-90 p-5 px-10 w-[100] text-neutral-200 rounded-xl">
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <h1 className="text-center text-xl font-semibold">
                            Admin Log in
                        </h1>
                        <br />
                        <label htmlFor="username" className="px-2 ">
                            Username
                        </label>
                        <br />
                        <input
                            type="username"
                            id="username"
                            className="bg-neutral-700 w-96 py-2 px-5 rounded-lg my-1 mb-5"
                            placeholder="Username"
                            {...register("username")}
                        />
                        <br />
                        <label htmlFor="password" className="px-2 ">
                            Password
                        </label>
                        <br />
                        <input
                            type="password"
                            id="password"
                            className="bg-neutral-700 w-96 py-2 px-5 rounded-lg my-1 mb-5"
                            placeholder="Password"
                            {...register("password")}
                        />
                        {error ? (
                            <>
                                <div className="text-green-400 font-semibold py-2 px-4  rounded-xl bg-violet-500 transition duration-400 scale-100">
                                    <p> {error} </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="text-green-400 font-semibold py-2 px-4  rounded-xl bg-violet-500 transition duration-400 scale-0 absolute">
                                    <p> {error} </p>
                                </div>
                            </>
                        )}
                        <br />
                        {btnClick ? (
                            <button
                                type="submit"
                                disabled
                                className="w-full py-2 rounded-xl font-bold transition-all text-violet-500 bg-green-400"
                            >
                                <img
                                    src="loading.png"
                                    className="h-6 mx-auto transition-all animate-spin"
                                    alt=""
                                />
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="bg-neutral-700 w-full py-2 rounded-xl hover:font-bold transition-all hover:scale-110 hover:text-violet-500 hover:bg-green-400"
                            >
                                Submit
                            </button>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}
