export default function GalleryImage(props){
    return(
        <>
            <div className=" my-10">
                <div>
                    <img src={`${props.img}`} alt="" className="h-60 mx-auto" />
                    <div className="items-center my-auto ml-10 text-center mt-2">
                        <button className="bg-neutral-700 px-5 py-1 rounded-xl">Edit</button>
                        
                        <button className="bg-neutral-700 px-5 py-1 rounded-xl ml-5">Delete</button>
                    </div>
                </div>
                
            </div>
        </>
    )
}