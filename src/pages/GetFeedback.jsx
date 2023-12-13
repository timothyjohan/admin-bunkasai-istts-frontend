import axios from "axios"
import { useEffect, useState } from "react"
import Feedback from "../components/Feedback"
import { Outlet } from "react-router-dom"

export default function GetFeedback(){
    const [feedbacks, setFeedbacks] = useState([])
    const getFeedbacks = async () =>{
        const request = await axios.get(`${import.meta.env.VITE_API_URL}/api/feedback`)
        setFeedbacks(request.data)
    }

    useEffect(()=>{
        getFeedbacks()
    },[])
    return(
        <>
            <div className="pt-44 w-4/6 mx-auto text-neutral-200">
                <div className="flex justify-between">
                    <h1 className="text-xl font-semibold">FEEDBACK</h1>
                </div>
                <div className="bg-neutral-800 my-10 p-10 bg-opacity-75 rounded-xl">
                    <table className="border-collapse border border-neutral-300 text-lg">
                        <thead>
                            <tr className="text-2xl bg-neutral-900/80">
                                <th className="border border-neutral-300 px-5">Kritik</th>
                                <th className="border border-neutral-300 px-5">Saran</th>
                                <th className="border border-neutral-300 px-5">Pesan</th>
                                <th className="border border-neutral-300 px-5">Kesan</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                feedbacks.map((element, key)=>{
                                    return <Feedback key={key} {...element} />
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}