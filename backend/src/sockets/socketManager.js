import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';

let io = null;

export function initSocket(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: [ENV.CLIENT_URL, 'http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000'],
      methods: ['GET', 'POST', 'PATCH', 'DELETE'],
      credentials: true
    }
  });

  // Middleware de Autenticação do Socket no Handshake (RNF04)
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth?.token || socket.handshake.headers?.authorization?.split(' ')[1];

      if (!token) {
        return next(new Error('Autenticação WebSocket falhou: Token ausente.'));
      }

      const decoded = jwt.verify(token, ENV.JWT_SECRET);
      socket.user = decoded;
      return next();
    } catch (err) {
      return next(new Error('Autenticação WebSocket falhou: Token inválido ou expirado.'));
    }
  });

  io.on('connection', (socket) => {
    const user = socket.user;
    console.log(`🔌 [Socket.io] Conexão estabelecida: ${user.nome} (${user.tipo}) - Socket ID: ${socket.id}`);

    // Alocação em Salas Virtuais (Rooms)
    if (user.tipo === 'ALUNO') {
      const userRoom = `user:${user.id}`;
      const moduloRoom = `modulo:${user.id_modulo}`;
      
      socket.join(userRoom);
      socket.join(moduloRoom);
      console.log(`🏫 [Socket.io] Aluno ${user.nome} ingressou nas salas: [${userRoom}] e [${moduloRoom}]`);
    } else if (user.tipo === 'FUNCIONARIO') {
      socket.join('staff');
      console.log(`💼 [Socket.io] Funcionário ${user.nome} (${user.perfil}) ingressou na sala [staff]`);
    }

    socket.on('disconnect', (reason) => {
      console.log(`❌ [Socket.io] Cliente desconectado: ${user.nome} (Motivo: ${reason})`);
    });
  });

  return io;
}

export function getIO() {
  if (!io) {
    throw new Error('Socket.io não foi inicializado ainda!');
  }
  return io;
}

/**
 * Despacho em tempo real da notificação persistida para as salas de destino
 */
export function emitirNotificacao(notificacao) {
  if (!io) return;

  if (notificacao.id_modulo_destino) {
    const salaModulo = `modulo:${notificacao.id_modulo_destino}`;
    io.to(salaModulo).emit('nova_notificacao', notificacao);
    console.log(`📡 [Socket.io] Notificação #${notificacao.id_notificacao} emitida para a sala ${salaModulo}`);
  }

  if (notificacao.id_aluno_destino) {
    const salaAluno = `user:${notificacao.id_aluno_destino}`;
    io.to(salaAluno).emit('nova_notificacao', notificacao);
    console.log(`📡 [Socket.io] Notificação #${notificacao.id_notificacao} emitida para a sala ${salaAluno}`);
  }

  // Notificar também a coordenação/professores para manter a sincronização institucional
  io.to('staff').emit('nova_notificacao', notificacao);
}
