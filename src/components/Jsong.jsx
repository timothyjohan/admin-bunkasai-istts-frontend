import { useState } from "react"
import { Link, Outlet } from "react-router-dom"

export default function Jsong(props){
    const [status, setStatus] = useState(props.status)

    return(
        <>
            <tr className={`border border-neutral-300 ${status ? 'bg-green-400 text-violet-500' : 'bg-violet-500 text-green-400'}`}>
                <td className="border border-neutral-300 px-5">{props.nama_peserta}</td>
                <td className="border border-neutral-300 px-5">{props.nama_panggung}</td>
                <td className="border border-neutral-300 px-5">{props.telp}</td>
                <td className="border border-neutral-300 px-5">{props.lagu}</td>
                <td className="border border-neutral-300 px-5">{status ? `Diterima` : `Pending`}</td>
                <td className="border border-neutral-300 px-5"><Link to={`${props.telp}`}><button className={` my-2 px-3 rounded-lg ${status ? 'bg-violet-500 text-green-400' : 'bg-green-400 text-violet-500'}`}>Details</button></Link></td>
            </tr>
        </>
    )
}