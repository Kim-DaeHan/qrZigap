import { useState, useEffect } from 'react';
import { joinRoom, onMessageReceived, offMessageReceived, sendReqMessage, sendAccount } from './util/socket';
import CryptoJS from 'crypto-js';

function encrypt(text: string, key: string) {
  const encrypted = CryptoJS.AES.encrypt(text, key).toString();
  return encrypted;
}

function SocketIoComponent() {
  const [roomId, setRoomId] = useState<string>('');
  const [secretKey, setSecretKey] = useState<string>('');

  useEffect(() => {
    onMessageReceived('verify', (message: any) => {
      console.log('msg: ', message);
      console.log('msg: ', typeof message);
    });

    onMessageReceived('sendMessage', (message: any) => {
      console.log('sendMessage: ', message);
    });

    return () => {
      offMessageReceived('verify');
    };
  }, []);

  const handleJoinRoom = () => {
    joinRoom(roomId);
    console.log(`Joined room: ${roomId}`);
  };

  const handleSendReqMessage = () => {
    sendReqMessage(roomId);
  };

  const handleSendAccount = () => {
    sendAccount(roomId, 'asdf');
    setSecretKey('');
  };

  return (
    <div className='App'>
      <h1>여기는 ZIGAP</h1>
      <input type='text' value={roomId} onChange={(e) => setRoomId(e.target.value)} placeholder='Room ID' />
      <button onClick={handleJoinRoom}>Join Room</button>
      <br />
      <button onClick={handleSendReqMessage}>Send Request Message</button>
      <br />
      <button onClick={handleSendAccount}>Send Account Info</button>
    </div>
  );
}

export default SocketIoComponent;
