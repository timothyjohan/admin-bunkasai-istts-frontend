import axios from "axios"
import { useEffect, useState } from "react"
import Coswalk from "../components/Coswalk"

export default function Coswalks(){
    const [coswalks, setCoswalks] = useState([])
    const getCoswalk = async () =>{
        const request = await axios.get(`${import.meta.env.VITE_API_URL}/api/coswalk`)
        setCoswalks(request.data)
    }
    useEffect(()=>{
        getCoswalk()
    },[])
    return(
        <>
        <table className="border-collapse border border-neutral-300 text-center text-lg ">
            <thead>
                <tr>
                    <th className="border border-neutral-300 px-5">Nama Peserta</th>
                    <th className="border border-neutral-300 px-5">Nama Panggung</th>
                    <th className="border border-neutral-300 px-5">Instagram</th>
                    <th className="border border-neutral-300 px-5">Status</th>
                    <th className="border border-neutral-300 px-5">Action</th>
                </tr>
            </thead>

            <tbody>
                {
                    coswalks.map((element, key)=>{
                        return <Coswalk key={key} {...element} />
                    })
                }

            </tbody>
        </table>
        </>
    )
}