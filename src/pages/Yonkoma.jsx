// Mengimpor modul yang diperlukan
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Yonkoma from "../components/Yonkoma";


// Komponen utama untuk halaman admin Yonkoma
export default function Yonkomas() {
  // State untuk menyimpan daftar pendaftar Yonkoma
  const [yonkomas, setYonkomas] = useState([]);
  const user = useSelector((state) => state.user.user);

  // Fungsi untuk mengambil data pendaftar dari API
  const getYonkomas = async () => {
    try {
        const request = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/yonkoma`,
            {
                headers: {
                    "x-auth-token": user,
                },
            }
        );
        setYonkomas(request.data);
    } catch (error) {
        console.error("Gagal mengambil data Yonkoma:", error);
    }
  };

  // `useEffect` untuk memanggil `getYonkomas` saat komponen pertama kali dirender
  useEffect(() => {
    if(user) {
        getYonkomas();
    }
  }, [user]);

  // JSX untuk merender tampilan komponen
  return (
    <>
      <h1 className="text-2xl font-bold mb-5">YONKOMA</h1>
      <table className="border-collapse border border-neutral-300 text-center text-lg">
        <thead>
          <tr>
            <th className="border border-neutral-300 px-5">Nama Peserta</th>
            <th className="border border-neutral-300 px-5">No. Telepon</th>
            <th className="border border-neutral-300 px-5">Status</th>
            <th className="border border-neutral-300 px-5">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapping data pendaftar ke komponen `Yonkoma` */}
          {yonkomas.map((element, key) => {
            return <Yonkoma key={key} {...element} />;
          })}
        </tbody>
      </table>
    </>
  );
}
