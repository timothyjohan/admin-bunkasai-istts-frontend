import React from 'react';

export default function ShowInstagram(props){
    return(
        <>
            <p className='text-xl'>Instagram : </p>
            <iframe className='border rounded-xl'
                src={`https://www.instagram.com/${props.instagram}/embed/`}
                width="500" 
                height="550" 
                frameborder="0" 
                scrolling="no"
                allowtransparency="true">
            </iframe>
        </>
    )    
}