import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';

let socket = null;

export function getSocket(token) {
  if (!token) {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
    return null;
  }

  // Se já existe e está conectado com o mesmo token, reaproveita
  if (socket && socket.connected) {
    return socket;
  }

  // Se existe socket desconectado ou com token desatualizado, reconecta
  if (socket) {
    socket.disconnect();
  }

  socket = io(SOCKET_URL, {
    auth: { token },
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000
  });

  socket.on('connect', () => {
    console.log('⚡ [Socket.io] Conectado ao servidor com sucesso! ID:', socket.id);
  });

  socket.on('connect_error', (err) => {
    console.warn('⚠️ [Socket.io] Falha na conexão WebSocket:', err.message);
  });

  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
