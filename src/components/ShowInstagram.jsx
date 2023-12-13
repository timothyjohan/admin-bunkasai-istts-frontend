// Mengimpor modul yang diperlukan
import React from "react";

// Mendefinisikan komponen `ShowInstagram`
export default function ShowInstagram(props) {
    // Mengembalikan JSX yang mendefinisikan tampilan komponen
    return (
        <>
            {/* Membuat div dengan teks "Instagram" dan iframe untuk menampilkan profil Instagram */}
            <div className="text-xl text-center border rounded-xl w-fit mx-auto bg-white text-4xl text-black">
                Instagram
                {/* Membuat iframe dengan sumber dari URL profil Instagram */}
                <iframe
                    className="border rounded-xl mx-auto"
                    src={`https://www.instagram.com/${props.instagram}/embed/`}
                    width="500"
                    height="525"
                    frameborder="1"
                    scrolling="no"
                    allowtransparency="true"
                ></iframe>
            </div>
        </>
    );
}
