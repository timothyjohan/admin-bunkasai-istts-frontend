import { Link, Outlet } from "react-router-dom"
export default function GalleryPage(){

    return(
        <>
            <div className="pt-44 w-4/6 mx-auto text-neutral-200">
                <div className="flex justify-between">
                    <h1 className="text-xl font-semibold">GALLERY</h1>
                    <Link to={'add'}>
                        <button className="bg-neutral-700 px-5 py-1 rounded-xl">Add Photo</button>
                    </Link>
                </div>
                <Outlet />
            </div>
        </>
    )
}