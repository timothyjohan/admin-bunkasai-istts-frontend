import React from 'react';
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import ShowInstagram from './ShowInstagram';

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
                <div className="bg-neutral-800 w-3/6 p-10 mt-20 my-20 bg-opacity-75 rounded-xl">
                    <button className="mb-6 bg-neutral-700 py-1 px-5 text-md rounded-xl" onClick={goback}>Back</button>
                    <p className='text-2xl text-center'>{coswalks.nama_peserta} ({coswalks.nama_panggung})</p>
                    <ShowInstagram instagram={instagram}/>
                    <div className='text-center'>
                        <br />
                        <p className='text-3xl'>Image
                            <center><img src={coswalks.img} width={'470px'} height={'470px'}/></center>
                        </p>
                    </div>
                    <br />
                    <p className='text-xl'>Status : {status ? "Diterima": "Pending"}</p>
                    <button className={`text-xl w-full my-2 px-3 py-1 rounded-lg ${status ? 'bg-violet-500 text-green-400' : 'bg-green-400 text-violet-500'}`} onClick={changeStatus}>{status ? 'Pending' : 'Terima'}</button>
                </div>
            </div>
        </>
    )    
}