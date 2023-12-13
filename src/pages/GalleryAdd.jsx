import { Link } from "react-router-dom";

export default function GalleryAdd(){
    return(
        <>
            <div className="m-10">
                <Link to={'/home/gallery'}>
                    <button>
                        <button className="bg-neutral-700 px-5 py-1 rounded-xl">Back</button>
                    </button>
                </Link>
            </div>
            
            <div className="bg-neutral-800/80 p-10 w-3/6 mx-auto">
                <input type="file" name="" id="" />
            </div>
        </>
    )
}