import { io, Socket } from 'socket.io-client';
import cryptoUtils from './cryptoUtils';

const socket: Socket = io('http://localhost:8090');

export const joinRoom = (roomId: string): void => {
  socket.emit('joinRoom', roomId);
};

export const sendMessageToRoom = (roomId: string, message: string): void => {
  socket.emit('message', roomId, message);
};

export const sendReqMessage = (roomId: string): void => {
  console.log('send request message');
  socket.emit('requestMessage', roomId, 'Request Message');
};

export const sendAccount = (roomId: string, address: string): void => {
  const message = 'Welcom to DAPP';
  const publicKey =
    '0428eb86d2df9a7d36c7aacecc85ef491a7158a81a1f194fd6a9207370e7536551378985d86bb18b2a797faa23567a43bf2bd9a422a0677e267124957a3f5dfdfd';
  const signature = cryptoUtils.sign(message, '8c1e0213b608b84f5b01e4dcc71ab3801aace3287087d0148fe387cfd0a4e023');
  const etc = '...';
  socket.emit('cryptoInfo', roomId, { signature, publicKey, address, etc });
};

export const onMessageReceived = (type: string, callback: (message: any) => void): void => {
  if (type === 'message') {
    socket.on('message', (message: string) => {
      callback(message);
    });
  } else if (type === 'verify') {
    socket.on('verify', (message: boolean) => {
      callback(message);
    });
  } else if (type === 'sendMessage') {
    socket.on('sendMessage', (message: string) => {
      callback(message);
    });
  }
};

export const offMessageReceived = (type: string): void => {
  if (type === 'message') {
    socket.off('message');
  } else if (type === 'verify') {
    socket.off('verify');
  } else if (type === 'sendMessage') {
    socket.off('sendMessage');
  }
};

export default socket;
