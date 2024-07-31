import { useState, useEffect } from 'react';
import {
  onMessageReceived,
  offMessageReceived,
  paymentJoinRoom,
  sendHealthCheck,
  sendTransactionResult,
} from './util/socket';

function PaymentSocketIoComponent() {
  const [roomId, setRoomId] = useState<string>('');

  useEffect(() => {
    onMessageReceived('responding', (message: any) => {
      console.log('responding: ', message);
    });

    return () => {
      offMessageReceived('responding');
    };
  }, []);

  const handleJoinRoom = () => {
    paymentJoinRoom(roomId);
    console.log(`Joined room: ${roomId}`);
  };

  const handleHealthCheck = () => {
    sendHealthCheck(roomId);
  };

  const handleTransactionSend = () => {
    sendTransactionResult(roomId);
  };

  return (
    <div className='App'>
      <h1>여기는 ZIGAP</h1>
      <input type='text' value={roomId} onChange={(e) => setRoomId(e.target.value)} placeholder='Room ID' />
      <button onClick={handleJoinRoom}>Payment Join Room</button>
      <br />
      <button onClick={handleHealthCheck}>Health Check</button>
      <br />
      <button onClick={handleTransactionSend}>Transaction Result Send</button>
    </div>
  );
}

export default PaymentSocketIoComponent;
