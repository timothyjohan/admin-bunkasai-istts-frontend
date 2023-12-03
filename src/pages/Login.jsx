import { data } from "autoprefixer";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Login() {
    const [load, setLoad] = useState(false);
    const [btnClick, setBtnClick] = useState(null);
    const { register, handleSubmit, reset, formState } = useForm();

    useEffect(() => {
        setTimeout(() => {
            setLoad(true);
        }, 0);
    }, []);

    const name = async () => {
        const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/user`
            // data
        );
        console.log(res);
    };

    useEffect(() => {
        name();
    }, []);

    const handleLogin = async (data) => {
        console.log(data);
    };

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
                            className="bg-neutral-600 w-96 py-2 px-5 rounded-lg my-1 mb-5"
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
                            className="bg-neutral-600 w-96 py-2 px-5 rounded-lg my-1 mb-5"
                            placeholder="Password"
                            {...register("password")}
                        />
                        <br />
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
