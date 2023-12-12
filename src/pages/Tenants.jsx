import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import Tenant from "../components/Tenant"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Tenants(){
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate()
    const loginadmin = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/user`,
                {
                    headers: {
                        "x-auth-token": user,
                    },
                }
            );
            
        } catch (error) {
            navigate('/err-unauthorized')
        }
    };

    const [tenants, setTenants] = useState([])
    const getTenants = async () =>{
        const request = await axios.get(`${import.meta.env.VITE_API_URL}/api/tenants`)
        setTenants(request.data)
    }

    useEffect(()=>{
        getTenants()
        loginadmin();
    },[])

    return(
        <>
            <div className="min-h-screen min-w-screen flex items-center justify-center text-neutral-200">
                <div className="bg-neutral-800 p-10 bg-opacity-75 rounded-xl">
                    <table className="border-collapse border border-neutral-300 text-center text-lg">
                        <thead>
                            <tr>
                                <th className="border border-neutral-300 px-5">Nama Tenant</th>
                                <th className="border border-neutral-300 px-5">Nama Contact Person</th>
                                <th className="border border-neutral-300 px-5">No Telp</th>
                                <th className="border border-neutral-300 px-5">Alamat</th>
                                <th className="border border-neutral-300 px-5">Status</th>
                                <th className="border border-neutral-300 px-5">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                tenants.map((element, key)=>{
                                    return <Tenant key={key} {...element} />
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}