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
            <thead>
                <tr>
                    <th className="border border-neutral-300 px-5">Nama Peserta</th>
                    <th className="border border-neutral-300 px-5">Nama Panggung</th>
                    <th className="border border-neutral-300 px-5">No Telp</th>
                    <th className="border border-neutral-300 px-5">Lagu</th>
                    <th className="border border-neutral-300 px-5">Status</th>
                </tr>
            </thead>

            <tbody>
                {
                    jsongs.map((element, key)=>{
                        return <Jsong key={key} {...element} />
                        return <h1>aa</h1>
                    })
                }

            </tbody>
        </>
    )
}