import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { getSocket } from '../services/socket';
import { useAuth } from './AuthContext';

const NotificationContext = createContext({});

export function NotificationProvider({ children }) {
  const { token, user, isAuthenticated } = useAuth();
  const [notificacoes, setNotificacoes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [novoAvisoToast, setNovoAvisoToast] = useState(null);

  // Carregar histórico de avisos via HTTP REST
  const carregarNotificacoes = useCallback(async () => {
    if (!isAuthenticated) return;
    try {
      setIsLoading(true);
      const res = await api.get('/notificacoes');
      setNotificacoes(res.data);
    } catch (err) {
      console.error('Erro ao buscar avisos da API:', err);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  // Conectar WebSocket e registrar listeners em tempo real
  useEffect(() => {
    if (!isAuthenticated || !token) {
      setIsConnected(false);
      return;
    }

    carregarNotificacoes();

    const socket = getSocket(token);
    if (!socket) return;

    function handleConnect() {
      setIsConnected(true);
    }

    function handleDisconnect() {
      setIsConnected(false);
    }

    function handleNovaNotificacao(notificacao) {
      console.log('🔔 [WebSocket] Nova notificação recebida em tempo real:', notificacao);
      
      // Adiciona o novo aviso no topo da lista sem duplicar
      setNotificacoes((prev) => {
        const existe = prev.some((n) => n.id_notificacao === notificacao.id_notificacao);
        if (existe) return prev;
        return [notificacao, ...prev];
      });

      // Disparar toast sonoro / visual
      setNovoAvisoToast({
        titulo: notificacao.titulo,
        mensagem: notificacao.mensagem,
        remetente: notificacao.funcionario?.nome || 'Escola'
      });

      // Tocar bipe sutil com fechamento seguro de AudioContext (Performance)
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.value = 587.33; // D5
          gain.gain.setValueAtTime(0.05, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
          osc.start();
          osc.stop(ctx.currentTime + 0.3);
          osc.onended = () => {
            ctx.close().catch(() => {});
          };
        }
      } catch (e) {
        // Ignora caso áudio não seja permitido sem interação do usuário
      }
    }

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('nova_notificacao', handleNovaNotificacao);

    if (socket.connected) {
      setIsConnected(true);
    }

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('nova_notificacao', handleNovaNotificacao);
    };
  }, [isAuthenticated, token, carregarNotificacoes]);

  // Auto-fechar o toast de nova notificação após 6 segundos
  useEffect(() => {
    if (novoAvisoToast) {
      const timer = setTimeout(() => {
        setNovoAvisoToast(null);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [novoAvisoToast]);

  // Atualiza o estado local após a confirmação da API.
  async function marcarComoLida(id_notificacao) {
    try {
      await api.patch(`/notificacoes/${id_notificacao}/status`, { status: true });
      setNotificacoes((prev) =>
        prev.map((notif) =>
          notif.id_notificacao === id_notificacao ? { ...notif, status: true } : notif
        )
      );
    } catch (err) {
      console.error('Erro ao marcar aviso como lido:', err);
    }
  }

  // Criar novo aviso (Funcionários)
  async function criarAviso(payload) {
    try {
      const res = await api.post('/notificacoes', payload);
      // Se a resposta retornar a notificação, adiciona localmente caso o socket demore
      const criada = res.data.notificacao;
      if (criada) {
        setNotificacoes((prev) => {
          const existe = prev.some((n) => n.id_notificacao === criada.id_notificacao);
          if (existe) return prev;
          return [criada, ...prev];
        });
      }
      return { success: true };
    } catch (err) {
      const msg = err.response?.data?.error || 'Erro ao publicar notificação.';
      return { success: false, error: msg };
    }
  }

  // Contagem de não lidos
  const unreadCount = notificacoes.filter((n) => !n.status).length;

  return (
    <NotificationContext.Provider
      value={{
        notificacoes,
        isLoading,
        isConnected,
        unreadCount,
        carregarNotificacoes,
        marcarComoLida,
        criarAviso,
        novoAvisoToast,
        fecharToast: () => setNovoAvisoToast(null)
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications deve ser usado dentro de um NotificationProvider.');
  }
  return context;
}
