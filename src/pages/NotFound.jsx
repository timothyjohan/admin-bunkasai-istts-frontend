import { Link } from "react-router-dom";

export default function NotFound(){
    return(
        <>
            <div className="min-h-screen min-w-screen flex justify-center items-center text-neutral-200 text-center">
                <div>
                    <h1 className="font-bold text-6xl">404 - NOT FOUND</h1>
                    <br />
                    <h1 className="font-bold text-2xl">dirrectory page does not exist, please make sure you type in the right dirrectory</h1>
                    <br />
                    <Link to={"/"}>
                        <button className="bg-neutral-800 text-xl py-2 px-10 rounded-lg">Back</button>

                    </Link>

                </div>

            </div>
        </>
    )
}