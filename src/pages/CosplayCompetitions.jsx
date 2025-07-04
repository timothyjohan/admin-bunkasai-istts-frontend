// Mengimpor modul yang diperlukan
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CosplayCompetition from "../components/CosplayCompetition";


// Komponen utama untuk halaman admin Cosplay Competition
export default function CosplayCompetitions() {
  // State untuk menyimpan daftar pendaftar
  const [competitions, setCompetitions] = useState([]);
  const user = useSelector((state) => state.user.user);

  // Fungsi untuk mengambil data pendaftar dari API
  const getCosplayCompetitions = async () => {
    try {
        const request = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/cosplay-competition`,
            {
                headers: {
                    "x-auth-token": user,
                },
            }
        );
        setCompetitions(request.data);
    } catch (error) {
        console.error("Gagal mengambil data Cosplay Competition:", error);
    }
  };

  // `useEffect` untuk memanggil `getCosplayCompetitions` saat komponen pertama kali dirender
  useEffect(() => {
    if(user) {
        getCosplayCompetitions();
    }
  }, [user]);

  // JSX untuk merender tampilan komponen
  return (
    <>
      <h1 className="text-2xl font-bold mb-5">COSPLAY COMPETITION</h1>
      <table className="border-collapse border border-neutral-300 text-center text-lg">
        <thead>
          <tr>
            <th className="border border-neutral-300 px-5">Nama Peserta</th>
            <th className="border border-neutral-300 px-5">Nama Kelompok</th>
            <th className="border border-neutral-300 px-5">No. Telepon</th>
            <th className="border border-neutral-300 px-5">Status</th>
            <th className="border border-neutral-300 px-5">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Mapping data pendaftar ke komponen `CosplayCompetition` */}
          {competitions.map((element, key) => {
            return <CosplayCompetition key={key} {...element} />;
          })}
        </tbody>
      </table>
    </>
  );
}
