import { io, Socket } from 'socket.io-client';
import cryptoUtils from './cryptoUtils';

const socket: Socket = io('http://localhost:8090');

export const joinRoom = (roomId: string): void => {
  socket.emit('joinRoom', roomId);
};

export const sendMessageToRoom = (roomId: string, message: string): void => {
  socket.emit('message', roomId, message);
};

export const sendCryptoInfo = (roomId: string, message: string): void => {
  console.log('info: ', message);
  const { privateKey, publicKey } = cryptoUtils.generateKeys();
  const signature = cryptoUtils.sign(message, privateKey);
  socket.emit('cryptoInfo', roomId, { signature, publicKey });
};

export const sendAccount = (roomId: string, message: string, secretKey: string): void => {
  const address = cryptoUtils.encrypt(message, secretKey);
  const decrypt = cryptoUtils.decrypt(address, secretKey);
  console.log('account: ', address);
  console.log('decrypt: ', decrypt);
  socket.emit('encryptedMessage', roomId, { address });
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
  }
};

export const offMessageReceived = (type: string): void => {
  if (type === 'message') {
    socket.off('message');
  } else if (type === 'verify') {
    socket.off('verify');
  }
};

export default socket;
