// Mengimpor modul yang diperlukan
import axios from "axios";
import { useEffect, useState } from "react";
import Tenant from "../components/Tenant";

// Mendefinisikan komponen `Tenants`
export default function Qr() {
  // Mengembalikan JSX yang mendefinisikan tampilan komponen
  const [qr, setQR] = useState("");
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/qr`).then((response) => {
      setQR(response.data.qr);
    });
  }, []);
  return (
    <>
      <img src={qr} alt="" />
    </>
  );
}
