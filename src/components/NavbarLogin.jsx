import { Link } from "react-router-dom";

export default function NavbarLogin(){
    
    return(
        <>
            <div className="fixed w-full z-20">
                <nav className="w-11/12 mx-auto p-2 mt-2 flex items-center justify-between ">
                    <div className="flex items-center">
                        <img src="bunkasai-logo.png" className="w-20 h-20 object-contain mx-5" />
                        {/* <img src="nippongo.png" className="w-20 h-20 object-contain" /> */}
                    </div>
                    
                </nav>
                {/* <hr className="border-neutral-200 border-solid w-11/12 mx-auto " /> */}
            </div>

        </>
    )
}