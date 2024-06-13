import { io, Socket } from 'socket.io-client';
import cryptoUtils from './cryptoUtils';

const socket: Socket = io('http://159.138.233.132:8080');

export const joinRoom = (roomId: string): void => {
  console.log('socketId: ', socket.id);
  socket.emit('joinRoom', roomId);
};

export const sendMessageToRoom = (roomId: string, message: string): void => {
  socket.emit('message', roomId, message);
};

export const sendReqMessage = (roomId: string): void => {
  console.log('socketId: ', socket.id);
  console.log('send request message');
  socket.emit('requestMessage', roomId, { message: 'Request Message' });
};

export const sendAccount = (roomId: string, address: string, message: string): void => {
  console.log('socketId: ', socket.id);
  // const publicKey =
  //   '0428eb86d2df9a7d36c7aacecc85ef491a7158a81a1f194fd6a9207370e7536551378985d86bb18b2a797faa23567a43bf2bd9a422a0677e267124957a3f5dfdfd';
  // const signature = cryptoUtils.sign(message, '8c1e0213b608b84f5b01e4dcc71ab3801aace3287087d0148fe387cfd0a4e023');
  const publicKey = '4754f36126f15b16c77ddb81730edc75a8f5b6d348dca65da63e9ebb4d03f93f';
  // const signature = cryptoUtils.sign(message, '98081cfbcd5663d35f64d42d20837b8241b8d990afe3bcb144aa749770d8750a');
  const signature = cryptoUtils.xphereSign(message, '98081cfbcd5663d35f64d42d20837b8241b8d990afe3bcb144aa749770d8750a');
  const network = 'xphere';
  const etc = '...';
  console.log('message: ', message);
  console.log('signature: ', signature);
  socket.emit('accountInfo', roomId, { signature, publicKey, address, network, etc });
};

export const sendProvide = (roomId: string, address: string): void => {
  const network = 'xphere';
  socket.emit('addressProvide', roomId, { address, network });
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
  } else if (type === 'confirmMessage') {
    socket.on('confirmMessage', (message: string) => {
      callback(message);
    });
  }
};

export const offMessageReceived = (type: string): void => {
  if (type === 'message') {
    socket.off('message');
  } else if (type === 'verify') {
    socket.off('verify');
  } else if (type === 'confirmMessage') {
    socket.off('confirmMessage');
  }
};

export default socket;
