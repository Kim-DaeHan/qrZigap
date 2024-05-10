import CryptoJS from "crypto-js";
import "./App.css";
import QRCodeComponent from "./QRCodeComponent";
import WebSocketComponent from "./WebSocketComponent";

function App() {
  const secretKey = CryptoJS.lib.WordArray.random(32);
  const keyString = CryptoJS.enc.Hex.stringify(secretKey);
  const zgKey = CryptoJS.lib.WordArray.random(16);
  const zgString = CryptoJS.enc.Hex.stringify(zgKey);

  const qrData = `sk:${keyString}&zg:${zgString}&type:login`;

  return (
    <div>
      <h1>QR Code Generator</h1>
      <QRCodeComponent data={qrData} />
      <p>{qrData}</p>
      <WebSocketComponent />
    </div>
  );
}

export default App;
