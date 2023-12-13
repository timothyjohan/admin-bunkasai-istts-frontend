import axios from "axios"
import { useState } from "react"

export default function Feedback(props){
    return(
        <>
            <tr className={`border border-neutral-300`}>
                <td className="border border-neutral-300 px-5">{props.kritik}</td>
                <td className="border border-neutral-300 px-5">{props.saran}</td>
                <td className="border border-neutral-300 px-5">{props.pesan}</td>
                <td className="border border-neutral-300 px-5">{props.kesan}</td>
            </tr>
        </>
    )
}