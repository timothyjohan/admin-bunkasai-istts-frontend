import React from 'react';
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function CoswalkDetails(){
    const [coswalks, setCoswalks] = useState([])
    const [status, setStatus] = useState()
    const [instagram, setInstagram] = useState()
    const pathname = window.location.pathname.split("/");
    const getCoswalks = async () =>{
        const request = await axios.get(`${import.meta.env.VITE_API_URL}/api/coswalk/${pathname[pathname.length-1]}`)
        setCoswalks(request.data)
        setStatus(request.data.status)
        setInstagram(request.data.instagram.substring(1))
    }
    useEffect(()=>{
        getCoswalks()
    })

    const changeStatus = async () =>{
        axios.put(`${import.meta.env.VITE_API_URL}/api/coswalk/${coswalks.instagram}`)
        setStatus(!status)
    }

    const navigate = useNavigate()

    const goback=()=>{
        navigate(-1);
    }
    
    return(
        <>
        <div className="min-h-screen min-w-screen flex items-center justify-center text-neutral-200">
                <div className="bg-neutral-800 p-10 bg-opacity-75 rounded-xl">
                    <button className="mb-6 bg-neutral-700 py-1 px-5 text-md rounded-xl" onClick={goback}>Back</button>
                    <p className='text-xl'>Nama Peserta : {coswalks.nama_peserta}</p>
                    <p className='text-xl'><a href={`https://www.instagram.com/${instagram}`} target="_blank">Instagram : {coswalks.instagram}</a></p>
                    <p className='text-xl'>Nama Panggung : {coswalks.nama_panggung}</p>
                    <p className='text-xl'>Image : <img src={coswalks.img} width={'200px'} height={'200px'} /></p>
                    <p className='text-xl'>Status : {status ? "Diterima": "Pending"}</p>
                    <button className={`text-xl w-full my-2 px-3 py-1 rounded-lg ${status ? 'bg-green-400 text-violet-500' : 'bg-violet-500 text-green-400'}`} onClick={changeStatus}>{status ? 'Terima' : 'Pending'}</button>
                </div>
            </div>
        </>
    )    
}