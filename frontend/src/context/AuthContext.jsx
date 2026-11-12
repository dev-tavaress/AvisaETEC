import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { disconnectSocket } from '../services/socket';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Inicializa o estado de autenticação a partir do localStorage
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('@AvisaETEC:token');
      const storedUser = localStorage.getItem('@AvisaETEC:user');

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error('Erro ao recuperar sessão local:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  async function login(email, senha) {
    try {
      const response = await api.post('/auth/login', { email, senha });
      const { token: receivedToken, user: receivedUser } = response.data;

      localStorage.setItem('@AvisaETEC:token', receivedToken);
      localStorage.setItem('@AvisaETEC:user', JSON.stringify(receivedUser));

      setToken(receivedToken);
      setUser(receivedUser);

      return { success: true, user: receivedUser };
    } catch (error) {
      const message = error.response?.data?.error || 'Erro ao realizar login. Tente novamente.';
      return { success: false, error: message };
    }
  }

  function logout() {
    localStorage.removeItem('@AvisaETEC:token');
    localStorage.removeItem('@AvisaETEC:user');
    disconnectSocket();
    setToken(null);
    setUser(null);
  }

  const isFuncionario = user?.tipo === 'FUNCIONARIO';
  const isAluno = user?.tipo === 'ALUNO';

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token && !!user,
        isLoading,
        isFuncionario,
        isAluno,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser utilizado dentro de um AuthProvider.');
  }
  return context;
}
