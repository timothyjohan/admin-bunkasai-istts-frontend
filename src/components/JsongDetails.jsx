import React from 'react';
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function JsongDetails(){
    const pathname = window.location.pathname.split("/");
    const [jsongs, setJsongs] = useState([])
    const [link, setLink] = useState(false)
    const [status, setStatus] = useState()
    const getJsongs = async () =>{
        const request = await axios.get(`${import.meta.env.VITE_API_URL}/api/jsong/${pathname[pathname.length-1]}`)
        setJsongs(request.data)
        setStatus(request.data.status)
    }
    useEffect(()=>{
        getJsongs()
    },[])

    useEffect(()=>{
        if(jsongs!=''){
            if(jsongs.link.includes('https://www.youtube.com/watch?')){
                setLink(true)
            }else{
                setLink(false)
            }
        }
    },[jsongs])

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
                <div className="bg-neutral-800 p-10 bg-opacity-75 rounded-xl">
                <button className="mb-6 bg-neutral-700 py-1 px-5 text-md rounded-xl" onClick={goback}>Back</button>
                    <p className='text-xl'>Nama Peserta : {jsongs.nama_peserta}</p>
                    <p className='text-xl'>No Telpon : {jsongs.telp}</p>
                    <p className='text-xl'>Nama Panggung : {jsongs.nama_panggung}</p>
                    <p className='text-xl'>Lagu : {jsongs.lagu}</p>
                    <p className='text-xl'>Link : {link ? <a href={jsongs.link} target="_blank" className='text-blue-800'>{jsongs.link}</a> : <label>{jsongs.link}</label>} </p>
                    <p className='text-xl'>Image : <img src={jsongs.img} width={'200px'} height={'200px'} /></p>
                    <p className='text-xl'>Status : {status ? "Diterima": "Pending"}</p>
                    <button className={`text-xl w-full my-2 px-3 py-1 rounded-lg ${status ? 'bg-green-400 text-violet-500' : 'bg-violet-500 text-green-400'}`} onClick={changeStatus}>{status ? 'Terima' : 'Pending'}</button>
                </div>
            </div>
        </>
    )
}