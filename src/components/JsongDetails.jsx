import React from 'react';
import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

export default function JsongDetails(){
    const pathname = window.location.pathname.split("/");
    const [jsongs, setJsongs] = useState([])
    const [link, setLink] = useState(false)
    const getJsongs = async () =>{
        const request = await axios.get(`${import.meta.env.VITE_API_URL}/api/jsong/${pathname[pathname.length-1]}`)
        setJsongs(request.data)
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
    
    return(
        <>
            <p>Nama Peserta : {jsongs.nama_peserta}</p>
            <p>No Telpon : {jsongs.telp}</p>
            <p>Nama Panggung : {jsongs.nama_panggung}</p>
            <p>Lagu : {jsongs.lagu}</p>
            <p>Link : {link ? <a href={jsongs.link} className='text-blue-800'>{jsongs.link}</a> : <label>{jsongs.link}</label>} </p>
            <p>Image : {jsongs.img}</p>
        </>
    )
}