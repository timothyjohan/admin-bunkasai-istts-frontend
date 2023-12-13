import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import GalleryImage from "../components/GalleryImage"
export default function Gallery(){
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
            {
            images.map((element, key)=>{
                return(
                    <GalleryImage key={key} {...element} />
                )
            })
        }
        </>
    )
}