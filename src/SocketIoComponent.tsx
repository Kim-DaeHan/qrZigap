import { useState, useEffect } from 'react';
import {
  joinRoom,
  onMessageReceived,
  offMessageReceived,
  sendReqMessage,
  sendAccount,
  sendProvide,
  sendhandleSendComplete,
} from './util/socket';
import CryptoJS from 'crypto-js';

function encrypt(text: string, key: string) {
  const encrypted = CryptoJS.AES.encrypt(text, key).toString();
  return encrypted;
}

function SocketIoComponent() {
  const [roomId, setRoomId] = useState<string>('');
  const [sigMsg, setSigMsg] = useState<string>('');
  const [checkMsg, setCheckMsg] = useState<string>('');

  useEffect(() => {
    onMessageReceived('verify', (message: any) => {
      console.log('msg: ', message);
      console.log('msg: ', typeof message);
    });

    onMessageReceived('confirmMessage', (message: any) => {
      console.log('confirmMessage: ', message);
      setSigMsg(message);
    });
    onMessageReceived('checkVerified', (message: any) => {
      console.log('checkVerified: ', message);
      // if (message) {
      //   completeMessage(roomId, { dapp: 'dappp', device: 'device', network: 'network', address: 'addresss' });
      // }

      setCheckMsg(message);
    });
    onMessageReceived('completeMessage', (message: any) => {
      console.log('completeMessage: ', message);
    });
    return () => {
      offMessageReceived('checkVerified');
      offMessageReceived('confirmMessage');
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
    sendAccount(roomId, 'asdf login', sigMsg);
  };

  const handleSendProvide = () => {
    sendProvide(roomId, 'asdf provide');
  };
  const handleSendComplete = () => {
    sendhandleSendComplete(roomId, { dapp: 'dappp', device: 'device', network: 'network', address: 'addresss' });
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
      <br />
      <button onClick={handleSendProvide}>Send Provide</button>
      <br />
      <button onClick={handleSendComplete}>Send handleSendComplete</button>
    </div>
  );
}

export default SocketIoComponent;
