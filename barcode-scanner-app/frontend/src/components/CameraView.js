import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import './CameraView.css';

const CameraView = ({ addProduct }) => {
  const [qrCode, setQrCode] = useState('');

  const handleScan = (data) => {
    if (data && data !== qrCode) {
      setQrCode(data);
      const isConfirmed = window.confirm(`QR Code scanned: ${data}. Do you want to save it?`);
      if (isConfirmed) {
        addProduct(data);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className="camera-view">
      <h2>Scan QR Code</h2>
      <QrReader
        delay={300}
        onError={handleError}
        onResult={(result, error) => {
          if (!!result) {
            handleScan(result?.text);
          }

          if (!!error) {
            console.info(error);
          }
        }}
        style={{ width: '100%' }}
      />
      {qrCode && <p>Scanned QR Code: {qrCode}</p>}
    </div>
  );
};

export default CameraView;
