import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GalleryImage(props){
    const [btnClick, setBtnClick] = useState(false)
    const deleteImage = async () =>{
        setBtnClick(true)
        const imageUrl = props.img;
        // Regular expression to extract the desired part
        const regex = /\/([^\/]+)\.png$/;
        const match = imageUrl.match(regex);
    
        // Check if there's a match and get the captured group
        const imageId = match ? match[1] : '';
        console.log(imageId);
        try {
            await axios.delete(`${import.meta.env.VITE_API_URL}/api/gallery/${imageId}`)
            
        } catch (error) {
            
        }
        setBtnClick(false)
        props.getPhotos()
    }
    
    return(
        <>
            <div className=" my-10">
                <div>
                    <img src={`${props.img}`} alt="" className="h-60 mx-auto" />
                    <div className="my-auto text-center mt-2">
                        {
                            btnClick? 
                            <button type="submit" disabled className="px-5 py-1 rounded-xl font-bold transition-all text-violet-500 bg-green-400"><img src="/loading.png"className="h-6 mx-auto transition-all animate-spin" alt="" /></button>
                            :
                            <button onClick={deleteImage} className="bg-neutral-700 px-5 py-1 rounded-xl hover:scale-110 hover:bg-neutral-600 hover:font-bold transition-all">Delete</button>
                            
                        }
                    </div>
                </div>
                
            </div>
        </>
    )
}