import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import GalleryImage from "../components/GalleryImage"

export default function GalleryPage(){
    const [images, setImages] = useState([])
    const getPhotos = async () =>{
        const request = await axios.get(`${import.meta.env.VITE_API_URL}/api/gallery`)
        setImages(request.data)
    }
    useEffect(()=>{
        getPhotos()
    },[])
    return(
        <>
            <div className="pt-44 w-4/6 mx-auto text-neutral-200">
                <h1 className="text-xl font-semibold">GALLERY</h1>
                {
                    images.map((element)=>{
                        return(
                            <GalleryImage {...element} />
                        )
                    })
                }
            </div>
        </>
    )
}