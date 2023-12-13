// Mengimpor modul yang diperlukan
import { Outlet } from "react-router-dom";
import NavbarLogin from "./components/NavbarLogin";
import Footer from "./components/Footer";

// Mendefinisikan komponen `TemplateLogin`
export default function TemplateLogin() {
    // Mengembalikan JSX yang mendefinisikan tampilan komponen
    return (
        <>
            {/* Menampilkan komponen `NavbarLogin` */}
            <NavbarLogin />
            <div className=" min-h-screen">
                {/* Menampilkan komponen anak yang didefinisikan oleh router */}
                <Outlet />
            </div>
            {/* Menampilkan komponen `Footer` */}
            <Footer />
        </>
    );
}
