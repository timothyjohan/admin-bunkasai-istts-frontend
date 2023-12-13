export default function GalleryImage(props){
    const imageUrl = props.img;

    const deleteImage = async () =>{
        // Regular expression to extract the desired part
        const regex = /\/([^\/]+)\.png$/;
        const match = imageUrl.match(regex);
    
        // Check if there's a match and get the captured group
        const imageId = match ? match[1] : '';
        console.log(imageId);
    }
    
    return(
        <>
            <div className=" my-10">
                <div>
                    <img src={`${props.img}`} alt="" className="h-60 mx-auto" />
                    <div className="my-auto text-center mt-2">
                        <button onClick={deleteImage} className="bg-neutral-700 px-5 py-1 rounded-xl ">Delete</button>
                    </div>
                </div>
                
            </div>
        </>
    )
}