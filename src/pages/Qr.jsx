import React, { useRef, useEffect, useState } from "react";
import { BrowserMultiFormatReader } from "@zxing/library";

export default function Qr() {
  const videoRef = useRef(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    const startScanner = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" }, // Use the back camera
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
          console.log("Video stream started");
        } else {
          console.error("Video element not found");
        }
        codeReader.decodeFromVideoDevice(
          null,
          videoRef.current,
          (result, err) => {
            if (result) {
              setResult(result.getText());
              console.log("QR Code detected:", result.getText());
            }
            if (err && !(err.name === "NotFoundException")) {
              console.error(err);
            }
          }
        );
      } catch (err) {
        setError("Camera access denied or not supported");
        console.error("Error accessing camera: ", err);
      }
    };

    startScanner();

    return () => {
      codeReader.reset();
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
        console.log("Video stream stopped");
      }
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} style={{ width: "100%", height: "auto" }} />
      {error && <p>{error}</p>}
      <p style={{ color: "white" }}>
        <span>Last result:</span>
        <span>{result}</span>
      </p>
    </div>
  );
}
