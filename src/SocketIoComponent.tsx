import { useState, useEffect } from 'react';
import {
  joinRoom,
  sendMessageToRoom,
  onMessageReceived,
  offMessageReceived,
  sendCryptoInfo,
  sendAccount,
} from './util/socket';
import CryptoJS from 'crypto-js';

function encrypt(text: string, key: string) {
  const encrypted = CryptoJS.AES.encrypt(text, key).toString();
  return encrypted;
}

// function decrypt(encryptedText: string, key: string) {
//   const bytes = CryptoJS.AES.decrypt(encryptedText, key);
//   const decrypted = bytes.toString(CryptoJS.enc.Utf8);
//   return decrypted;
// }

function SocketIoComponent() {
  const [roomId, setRoomId] = useState<string>('');
  const [secretKey, setSecretKey] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [cryptoInfo, setCryptoInfo] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    onMessageReceived('message', (message: string) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    onMessageReceived('verify', (message: any) => {
      console.log('msg: ', message);
      console.log('msg: ', typeof message);
    });

    return () => {
      offMessageReceived('message');
      offMessageReceived('verify');
    };
  }, []);

  const handleJoinRoom = () => {
    joinRoom(roomId);
    console.log(`Joined room: ${roomId}`);
  };

  const handleSendMessage = () => {
    sendMessageToRoom(roomId, encrypt(message, 'aaa'));
    setMessage('');
  };

  const handleSendCryptoInfo = () => {
    sendCryptoInfo(roomId, cryptoInfo);
    setCryptoInfo('');
  };

  const handleSendAccount = () => {
    sendAccount(roomId, 'asdf', secretKey);
    setSecretKey('');
  };

  return (
    <div className='App'>
      <h1>여기는 ZIGAP</h1>
      <input type='text' value={roomId} onChange={(e) => setRoomId(e.target.value)} placeholder='Room ID' />
      <button onClick={handleJoinRoom}>Join Room</button>
      <br />
      <input type='text' value={message} onChange={(e) => setMessage(e.target.value)} placeholder='Message' />
      <button onClick={handleSendMessage}>Send Message</button>
      <br />
      <input type='text' value={cryptoInfo} onChange={(e) => setCryptoInfo(e.target.value)} placeholder='cryptoInfo' />
      <button onClick={handleSendCryptoInfo}>Send Crypto Info</button>
      <br />
      <input type='text' value={secretKey} onChange={(e) => setSecretKey(e.target.value)} placeholder='secretKey' />
      <button onClick={handleSendAccount}>Send Account Info</button>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}

export default SocketIoComponent;
