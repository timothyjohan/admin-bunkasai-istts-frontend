import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import QrScanner from "react-qr-scanner";
import { set } from "react-hook-form";

export default function Scan() {
    const user = useSelector((state) => state.user.user);

    const [scanResult, setScanResult] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleScan = async (data) => {
        if (data && !isLoading) {
            setIsLoading(true);
            setScanResult("");
            setErrorMsg("");
            try {
                const request = await axios.put(
                    `${import.meta.env.VITE_API_URL}/api/ticket/scan/${data.text}`,
                    {},
                    {
                        headers: {
                            "x-auth-token": user,
                        },
                    }
                );
                setScanResult(request.data.message);
            } catch (err) {
                setErrorMsg("Gagal scan: " + (err?.response?.data?.message || err.message));
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleError = (err) => {
        setErrorMsg("Tidak dapat mengakses kamera: " + err?.message);
    };

    return (
        <div className="min-h-screen min-w-screen flex items-center justify-center text-neutral-200">
            <div className="bg-neutral-800 p-10 bg-opacity-75 rounded-xl">
                <h2 className="text-xl font-bold mb-4">Scan QR Code</h2>
                <div className="mb-4">
                    <QrScanner
                        delay={isLoading ? false : 3000}
                        onError={handleError}
                        onScan={handleScan}
                        style={{ width: "100%" }}
                        facingMode="environment"
                    />
                </div>
                {isLoading && (
                    <div className="text-blue-400 mb-2">Memproses scan...</div>
                )}
                {errorMsg && (
                    <div className="text-red-500 mb-2">{errorMsg}</div>
                )}
                {scanResult && (
                    <div className="text-green-400 break-all">
                        Hasil Scan: {scanResult}
                    </div>
                )}
            </div>
        </div>
    );
}
