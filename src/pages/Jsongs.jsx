import axios from "axios"
import { useEffect, useState } from "react"
import Jsong from "../components/Jsong"

export default function Jsongs(){
    const [jsongs, setJsongs] = useState([])
    const getJsongs = async () =>{
        const request = await axios.get(`${import.meta.env.VITE_API_URL}/api/jsong`)
        setJsongs(request.data)
    }
    useEffect(()=>{
        getJsongs()
    },[])
    return(
        <>
            <table className="border-collapse border border-neutral-300 text-center text-lg ">
                <thead>
                    <tr>
                        <th className="border border-neutral-300 px-5">Nama Peserta</th>
                        <th className="border border-neutral-300 px-5">Nama Panggung</th>
                        <th className="border border-neutral-300 px-5">No Telp</th>
                        <th className="border border-neutral-300 px-5">Lagu</th>
                        <th className="border border-neutral-300 px-5">Status</th>
                        <th className="border border-neutral-300 px-5">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        jsongs.map((element, key)=>{
                            return <Jsong key={key} {...element} />
                        })
                    }
                </tbody>
            </table>
        </>
    )
}