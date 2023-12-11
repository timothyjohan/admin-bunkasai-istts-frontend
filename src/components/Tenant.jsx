import axios from "axios"
import { useState } from "react"

export default function Tenant(props){
    const [status, setStatus] = useState(props.status)
    const changeStatus = async () =>{
        axios.put(`${import.meta.env.VITE_API_URL}/api/tenants/${props.telp}`)
        setStatus(!status)
    }
    return(
        <>
            <tr className={`border border-neutral-300 ${status ? 'bg-green-400 text-violet-500' : 'bg-violet-500 text-green-400'}`}>
                <td className="border border-neutral-300 px-5">{props.nama_tenant}</td>
                <td className="border border-neutral-300 px-5">{props.nama_cp}</td>
                <td className="border border-neutral-300 px-5">{props.telp}</td>
                <td className="border border-neutral-300 px-5">{props.alamat}</td>
                <td className="border border-neutral-300 px-5">{status ? `Diterima` : `Pending`}</td>
                <td className="border border-neutral-300 px-5"><button onClick={changeStatus} className={` my-2 px-3 rounded-lg ${status ? 'bg-violet-500 text-green-400' : 'bg-green-400 text-violet-500'}`}>{status ? 'Hold' : 'Terima'}</button></td>
            </tr>
        </>
    )
}