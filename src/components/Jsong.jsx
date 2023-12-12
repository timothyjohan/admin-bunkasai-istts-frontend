import { useState } from "react"

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
                <td className="border border-neutral-300 px-5"><button className={` my-2 px-3 rounded-lg ${status ? 'bg-violet-500 text-green-400' : 'bg-green-400 text-violet-500'}`}>Details</button></td>
            </tr>
        </>
    )
}