import React from 'react';

export default function ShowInstagram(props){
    return(
        <>
            <div className='text-xl text-center border rounded-xl w-fit mx-auto bg-white text-4xl text-black'>Instagram
                <iframe className='border rounded-xl mx-auto'
                    src={`https://www.instagram.com/${props.instagram}/embed/`}
                    width="500" 
                    height="525" 
                    frameborder="1" 
                    scrolling="no"
                    allowtransparency="true">
                </iframe>
            </div>
        </>
    )    
}