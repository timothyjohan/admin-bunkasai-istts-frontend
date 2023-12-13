import React from 'react';
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function JsongDetails(){
    const pathname = window.location.pathname.split("/");
    const [jsongs, setJsongs] = useState([])
    const [status, setStatus] = useState()
    const getJsongs = async () =>{
        const request = await axios.get(`${import.meta.env.VITE_API_URL}/api/jsong/${pathname[pathname.length-1]}`)
        setJsongs(request.data)
        setStatus(request.data.status)
        setLink(request.data.link)
    }
    useEffect(()=>{
        getJsongs()
    },[])

    

    const changeStatus = async () =>{
        axios.put(`${import.meta.env.VITE_API_URL}/api/jsong/${jsongs.telp}`)
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
                    <p className='text-2xl text-center'>{jsongs.nama_peserta} ({jsongs.nama_panggung})</p>
                    <p className='text-2xl text-center'>{jsongs.telp}</p>
                    <p className='text-2xl text-center'>{jsongs.lagu}</p>
                    <p className='text-2xl text-center'><a className='text-blue-800' href={jsongs.link} target='_blank'><u>{jsongs.link}</u></a></p>
                    <div className='text-center'>
                        <br />
                        <p className='text-3xl'>Image
                            <center><img src={jsongs.img} width={'400px'} height={'300px'}/></center>
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