export default function Tenant(props){
    return(
        <>
            <tr className={`border border-neutral-300 ${props.status ? 'bg-green-400 text-violet-500' : 'bg-violet-500 text-green-400'}`}>
                <td className="border border-neutral-300 px-5">{props.nama_tenant}</td>
                <td className="border border-neutral-300 px-5">{props.nama_cp}</td>
                <td className="border border-neutral-300 px-5">{props.telp}</td>
                <td className="border border-neutral-300 px-5">{props.alamat}</td>
                <td className="border border-neutral-300 px-5">{props.status ? `Diterima` : `Pending`}</td>
                <td className="border border-neutral-300 px-5"><button className={` my-2 px-3 rounded-lg ${props.status ? 'bg-violet-500 text-green-400' : 'bg-green-400 text-violet-500'}`}>{props.status ? 'Hold' : 'Terima'}</button></td>
            </tr>
        </>
    )
}