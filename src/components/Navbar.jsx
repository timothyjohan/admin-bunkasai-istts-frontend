import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUser } from "../app/userSlice";


export default function Navbar(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logout = () =>{
        dispatch(setUser(null));
        navigate('/')
    }

    
    return(
        <>
            <div className="fixed w-full z-20">
                <nav className="w-11/12 mx-auto p-2 mt-2 flex items-center justify-between ">
                    <div className="flex items-center">
                        <img src="/bunkasai-logo.png" className="w-20 h-20 object-contain mx-5" />
                    </div>
                    <div className="flex items-center text-neutral-300">
                        <Link to={""} className="mx-5 text-xl font-bold transition-all hover:scale-110">
                            <button className=" ">HOME</button>
                        </Link>
                        <Link to={"tenants"} className="mx-5 text-xl font-bold transition-all hover:scale-110">
                            <button className=" ">TENANTS</button>
                        </Link>
                        <Link  className="mx-5 text-xl font-bold transition-all hover:scale-110">
                            <button className="">COMPETITIONS</button>
                        </Link>
                        <Link  className="mx-5 text-xl font-bold transition-all hover:scale-110">
                            <button className="">GALLERY</button>
                        </Link>
                        <Link  className="mx-5 text-xl font-bold transition-all hover:scale-110">
                            <button className="">FEEDBACKS</button>
                        </Link>
                        <button onClick={logout} className="mx-5 text-xl font-bold transition-all hover:scale-110">
                            <button className="">LOGOUT</button>
                        </button>

                        
                    </div>
                </nav>
                {/* <hr className="border-neutral-200 border-solid w-11/12 mx-auto " /> */}
            </div>

        </>
    )
}