import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export default function GalleryAdd(){
    const {register, handleSubmit, reset} = useForm()
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [btnClick, setBtnClick] = useState(false)



    const uploadImage = async data =>{
        setError(null)
        setSuccess(null)
        if(data.photo[0]){
            setBtnClick(true);
            
            try {
                const formData = new FormData();
                formData.append('photo', data.photo[0]);
                await axios.post(`${import.meta.env.VITE_API_URL}/api/gallery/new`, formData);
                setSuccess(true)
                
            } catch (error) {
                setError(error.message)
            }
            setBtnClick(false);
        }else{
            setError('File yang diupload kosong')
        }
    }
    return(
        <>
            <div className="m-10">
                <Link to={'/home/gallery'}>
                    <button>
                        <button className="bg-neutral-700 px-5 py-1 rounded-xl">Back</button>
                    </button>
                </Link>
            </div>
            
            <div className="bg-neutral-800/80 p-10 w-3/6 mx-auto">
                <form onSubmit={handleSubmit(uploadImage)}>
                    <input {...register('photo')} accept="image/*" type="file" className="mb-5"  /><br />
                    {
                        error ? 
                        <>
                        <div className="text-green-400  font-semibold py-2 px-4 mb-8 rounded-xl bg-violet-500 transition duration-400 scale-100">
                            <p> {error} </p>
                        </div>
                        </>
                        :
                        <>
                        <div className="text-green-400 font-semibold py-2 px-4 mb-8 rounded-xl bg-violet-500 transition duration-400 scale-0 absolute">
                            <p> {error} </p>
                        </div>
                        </>
                        
                    }

                    {
                        success ? 
                        <>
                        <div className="bg-green-400 font-semibold py-2 px-4 mb-8 rounded-xl text-violet-500 transition duration-400 scale-100">
                            <p >Foto berhasil diupload</p>
                        </div>
                        </>
                        :
                        <>
                        <div className="bg-green-400 font-semibold py-2 px-4 mb-8 rounded-xl text-violet-500 transition  duration-400 scale-0 absolute">
                            <p >Foto berhasil diupload</p>
                        </div>
                        </>
                    }
                    {
                        btnClick ?
                        <button type="submit" disabled className="w-full py-2 rounded-xl font-bold transition-all text-violet-500 bg-green-400"><img src="/loading.png"className="h-6 mx-auto transition-all animate-spin" alt="" /></button>:

                        <button type="submit" className="bg-neutral-700 w-full py-2 rounded-xl hover:bg-green-400 hover:scale-110 hover:text-violet-500 hover:font-bold transition-all">Upload</button>

                    }

                </form>
            </div>
        </>
    )
}