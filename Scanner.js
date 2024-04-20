import React, { useState } from 'react';
import Quagga from 'quagga';
import './Scanner.css';

const Scanner = () => {
  const [result, setResult] = useState('');

  const startScanner = () => {
    Quagga.init({
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector('#scanner-container')
      },
      decoder: {
        readers: ["code_128_reader"]
      }
    }, function (err) {
      if (err) {
        console.error(err);
        return;
      }
      Quagga.start();
    });

    Quagga.onDetected(async data => {
      const code = data.codeResult.code;
      setResult(code);
      Quagga.stop();

      const response = await fetch('http://localhost:5000/scan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code })
      });

      const result = await response.json();
      console.log(result);
    });
  };

  return (
    <div className="scanner-container">
      <h1>Barcode Scanner</h1>
      <button className="start-button" onClick={startScanner}>Start Scanner</button>
      <div id="scanner-container" className="video-container"></div>
      <p className="result">Result: {result}</p>
    </div>
  );
};

export default Scanner;
